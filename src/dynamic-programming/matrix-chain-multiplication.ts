
/**
 * Calculates the minimum cost of matrix chain multiplication.
 * 
 * @param dimensions - An array of dimensions of matrices.
 * @returns The minimum cost of matrix chain multiplication.
 */
export default function matrixChainMultiplication(dimensions: number[]): number {
    const n = dimensions.length;
    const dp: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0));

    for (let i = 1; i < n; i++) {
        dp[i][i] = 0;
    }

    for (let len = 2; len < n; len++) {
        for (let i = 1; i < n - len + 1; i++) {
            const j = i + len - 1;
            dp[i][j] = Number.MAX_SAFE_INTEGER;

            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + dimensions[i - 1] * dimensions[k] * dimensions[j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }

    return dp[1][n - 1];
}