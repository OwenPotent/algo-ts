/**
 * Finds the longest common subsequence between two strings.
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns The longest common subsequence.
 */
export default function longestCommonSequence(str1: string, str2: string): string {
    const dp: number[][] = new Array(str1.length + 1).fill(0).map(() => new Array(str2.length + 1).fill(0));
    let max = 0;
    let result = '';

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }

            if (dp[i][j] > max) {
                max = dp[i][j];
                result = str1.slice(i - max, i);
            }
        }
    }

    return result;
}