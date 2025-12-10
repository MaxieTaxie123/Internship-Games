export interface Pair {
    deepfake: string;
    real: string;
}

export const imagePairs: string[][] = [
    // Pair 1
    ["./deepfake/deepfakes/Jonge-vrouw.jpg", "./deepfake/reals/Jonge-vrouw-1.jpg"],
    // Pair 2
    ["./deepfake/deepfakes/Oudere-man.jpg", "./deepfake/reals/Oudere-man-1.jpg"],
    // Pair 3
    ["./deepfake/deepfakes/Pasfoto.jpg", "./deepfake/reals/Pasfoto-1.jpg"],
    // Pair 4
    ["./deepfake/deepfakes/Zijkant.jpg", "./deepfake/reals/Zijkant-1.jpg"],
    // Pair 5
    ["./deepfake/deepfakes/Zittende-vrouw.jpg", "./deepfake/reals/Zittende-vrouw-1.jpg"],
    // Pair 6
    ["./deepfake/deepfakes/Stef.jpg", "./deepfake/reals/Stef-1.jpg"],
];