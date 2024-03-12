export default function gaussianElimination(matrix: number[][]): number[] {
    const n = matrix.length;
    const coefficients = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let maxRow = i;
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = j;
            }
        }

        for (let k = i; k < n + 1; k++) {
            const temp = matrix[maxRow][k];
            matrix[maxRow][k] = matrix[i][k];
            matrix[i][k] = temp;
        }

        if (matrix[i][i] === 0) {
            throw new Error("Matrix is singular");
        }

        for (let j = i + 1; j < n; j++) {
            const f = matrix[j][i] / matrix[i][i]; // Fix: Perform division with floating-point numbers
            for (let k = i; k < n + 1; k++) {
                matrix[j][k] -= f * matrix[i][k];
            }
        }
    }

    for (let i = n - 1; i > -1; i--) {
        coefficients[i] = matrix[i][n] / matrix[i][i]; // Fix: Perform division with floating-point numbers
        for (let j = i - 1; j > -1; j--) {
            matrix[j][n] -= matrix[j][i] * coefficients[i];
        }
    }

    return coefficients;
}

const matrix = [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3]
];

console.log(gaussianElimination(matrix)); // [2, 3, -1]