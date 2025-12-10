import { useEffect, useState } from "react";

type PreloadOptions = {
  saveToLocalStorage?: boolean;
  namespace?: string; // prefix for localStorage keys
  maxSizeKB?: number; // skip saving images larger than this (approx)
  maxEntries?: number; // maximum number of images to keep in storage
  storage?: "localStorage" | "indexedDB";
};

const DEFAULTS: Required<Pick<PreloadOptions, "saveToLocalStorage" | "namespace" | "maxSizeKB" | "maxEntries" | "storage">> = {
  saveToLocalStorage: false,
  namespace: "image-preload",
  maxSizeKB: 1024 * 2, // 2MB default
  maxEntries: 50,
  storage: "localStorage",
};

function storageKey(namespace: string, url: string) {
  return `${namespace}:img:${encodeURIComponent(url)}`;
}

function keysKey(namespace: string) {
  return `${namespace}:keys`;
}

function getSavedKeys(namespace: string): string[] {
  try {
    const raw = localStorage.getItem(keysKey(namespace));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setSavedKeys(namespace: string, keys: string[]) {
  try {
    localStorage.setItem(keysKey(namespace), JSON.stringify(keys));
  } catch (e) {
    console.warn("Failed to update saved keys in localStorage", e);
  }
}

export function clearSavedImages(namespace = DEFAULTS.namespace) {
  try {
    const keys = getSavedKeys(namespace);
    keys.forEach((k) => localStorage.removeItem(k));
    localStorage.removeItem(keysKey(namespace));
  } catch (e) {
    console.warn("Failed to clear saved images (localStorage)", e);
  }
}

// ---------- IndexedDB helpers ----------
function openIDB(namespace: string): Promise<IDBDatabase> {
  const name = `${namespace}-images-db`;
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(name, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "url" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPut(namespace: string, url: string, blob: Blob) {
  const db = await openIDB(namespace);
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("images", "readwrite");
    const store = tx.objectStore("images");
    const putReq = store.put({ url, blob, createdAt: Date.now() });
    putReq.onsuccess = () => resolve();
    putReq.onerror = () => reject(putReq.error);
    tx.oncomplete = () => db.close();
  });
}

async function idbGet(namespace: string, url: string): Promise<Blob | null> {
  const db = await openIDB(namespace);
  return new Promise((resolve, reject) => {
    const tx = db.transaction("images", "readonly");
    const store = tx.objectStore("images");
    const getReq = store.get(url);
    getReq.onsuccess = () => {
      const result = getReq.result;
      resolve(result ? (result.blob as Blob) : null);
    };
    getReq.onerror = () => reject(getReq.error);
    tx.oncomplete = () => db.close();
  });
}

export async function listSavedImageKeysIndexedDB(namespace: string): Promise<string[]> {
  const db = await openIDB(namespace);
  return new Promise((resolve, reject) => {
    const tx = db.transaction("images", "readonly");
    const store = tx.objectStore("images");
    const keys: string[] = [];
    const req = store.openCursor();
    req.onsuccess = (ev) => {
      const cursor = (ev.target as IDBRequest).result as IDBCursorWithValue | null;
      if (cursor) {
        keys.push(cursor.key as string);
        cursor.continue();
      } else {
        resolve(keys);
      }
    };
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

async function idbClear(namespace: string) {
  const db = await openIDB(namespace);
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("images", "readwrite");
    const store = tx.objectStore("images");
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

export async function clearSavedImagesIndexedDB(namespace = DEFAULTS.namespace) {
  try {
    await idbClear(namespace);
  } catch (e) {
    console.warn("Failed to clear saved images (IndexedDB)", e);
  }
}

async function trySaveImageToLocalStorage(namespace: string, url: string, dataUrl: string, maxSizeKB: number, maxEntries: number) {
  try {
    // approximate size in KB
    const approxKB = (dataUrl.length * 3) / 4 / 1024;
    if (approxKB > maxSizeKB) {
      console.warn(`Skipping saving ${url} (${Math.round(approxKB)}KB) - exceeds max ${maxSizeKB}KB`);
      return;
    }

    const key = storageKey(namespace, url);
    localStorage.setItem(key, dataUrl);

    // maintain keys list to allow eviction
    const savedKeys = getSavedKeys(namespace);
    // ensure key uniqueness by removing existing occurrence
    const existingIndex = savedKeys.indexOf(key);
    if (existingIndex !== -1) savedKeys.splice(existingIndex, 1);
    savedKeys.push(key);

    // evict oldest if over limit
    while (savedKeys.length > maxEntries) {
      const evict = savedKeys.shift();
      if (evict) localStorage.removeItem(evict);
    }
    setSavedKeys(namespace, savedKeys);
  } catch (e) {
    console.warn("Failed to save image to localStorage", e);
  }
}

async function trySaveImageToIndexedDB(namespace: string, url: string, blob: Blob) {
  try {
    await idbPut(namespace, url, blob);
  } catch (e) {
    console.warn("Failed to save image to IndexedDB", e);
  }
}

export async function getSavedImage(namespace: string, url: string, storage: "localStorage" | "indexedDB" = "localStorage") {
  if (storage === "localStorage") {
    const key = storageKey(namespace, url);
    return localStorage.getItem(key);
  }

  try {
    const blob = await idbGet(namespace, url);
    if (!blob) return null;
    return URL.createObjectURL(blob);
  } catch (e) {
    console.warn("Failed to get saved image from IndexedDB", e);
    return null;
  }
}

export function useImagePreload(urls: string[], opts?: PreloadOptions) {
  const options = { ...DEFAULTS, ...(opts || {}) };
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadImage = (url: string) => {
      const img = new Image();
      // attempt to allow cross-origin fetch for canvas extraction
      img.crossOrigin = "Anonymous";

      img.onload = async () => {
        if (!isMounted) return;
        setLoaded((prev) => [...prev, url]);
        console.log(`Cached: ${url}`);

        if (options.saveToLocalStorage) {
          try {
            // draw to canvas and extract a data URL
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth || img.width;
            canvas.height = img.naturalHeight || img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              // Prefer saving as Blob for IndexedDB to avoid data URL expansion
              if (options.storage === "indexedDB") {
                // try canvas.toBlob first (better for size)
                await new Promise<void>((resolve) => {
                  canvas.toBlob(async (blob) => {
                    if (blob) {
                      await trySaveImageToIndexedDB(options.namespace!, url, blob);
                    }
                    resolve();
                  }, "image/png");
                });
              } else {
                const dataUrl = canvas.toDataURL("image/png");
                await trySaveImageToLocalStorage(options.namespace!, url, dataUrl, options.maxSizeKB!, options.maxEntries!);
              }
            }
          } catch (e) {
            console.warn(`Could not convert/save ${url} to localStorage`, e);
          }
        }
      };

      img.onerror = () => {
        if (isMounted) {
          setFailed((prev) => [...prev, url]);
          console.warn(`Failed: ${url}`);
        }
      };

      // start loading
      img.src = url;
    };

    urls.forEach(loadImage);
    return () => {
      isMounted = false;
    };
  }, [urls, options.saveToLocalStorage, options.namespace, options.maxSizeKB, options.maxEntries, options.storage]);

  return { loaded, failed };
}
