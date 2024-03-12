/**
 * Solves the knapsack problem using dynamic programming.
 * Given a set of items with weights and values, and a maximum capacity,
 * this function determines the maximum value that can be obtained by
 * selecting a subset of the items such that the sum of their weights
 * does not exceed the maximum capacity.
 *
 * @param weights - An array of item weights.
 * @param values - An array of item values.
 * @param capacity - The maximum capacity of the knapsack.
 * @returns The maximum value that can be obtained.
 */
export default function knapsackProblem(
    weights: number[],
    values: number[],
    capacity: number
): number {
    const n = weights.length;
    const dp: number[][] = [];

    for (let i = 0; i <= n; i++) {
        dp[i] = [];
        for (let j = 0; j <= capacity; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
            } else if (weights[i - 1] <= j) {
                dp[i][j] = Math.max(
                    values[i - 1] + dp[i - 1][j - weights[i - 1]],
                    dp[i - 1][j]
                );
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[n][capacity];
}