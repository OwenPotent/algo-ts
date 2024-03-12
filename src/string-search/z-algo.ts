/**
 * How the Z algorithm works:
 * 
 * 1. Create a new string by concatenating the pattern and text with a special character in between.
 * 2. Create an array of the same length as the new string.
 * 3. Initialize two pointers, left and right, to 0.
 * 4. Iterate through the new string starting from the second character.
 * 5. If the current index is greater than the right pointer, start a new comparison.
 * 6. If the current index is less than the right pointer, copy the value from the corresponding index in the z array.
 *
*/


/**
 * Performs the Z algorithm to find all occurrences of a pattern in a given text.
 * 
 * @param text - The text to search in.
 * @param pattern - The pattern to search for.
 * @returns An array of indices where the pattern is found in the text.
 */
export default function zAlgo(text: string, pattern: string): number[] {
    const combinedString = pattern + '$' + text;
    const zValues = new Array(combinedString.length).fill(0);
    let left = 0;
    let right = 0;

    for (let k = 1; k < combinedString.length; k++) {
        if (k > right) {
            left = right = k;
            while (right < combinedString.length && combinedString[right - left] === combinedString[right]) {
                right++;
            }
            zValues[k] = right - left;
            right--;
        } else {
            const k1 = k - left;
            if (zValues[k1] < right - k + 1) {
                zValues[k] = zValues[k1];
            } else {
                left = k;
                while (right < combinedString.length && combinedString[right - left] === combinedString[right]) {
                    right++;
                }
                zValues[k] = right - left;
                right--;
            }
        }
    }

    const matches: number[] = [];
    for (let i = 0; i < zValues.length; i++) {
        if (zValues[i] === pattern.length) {
            matches.push(i - pattern.length - 1);
        }
    }

    return matches;
}