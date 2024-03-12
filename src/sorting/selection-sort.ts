/**
 * Sorts an array of numbers in ascending order using the Selection Sort algorithm.
 * 
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array.
 */
export default function selectionSort(arr: number[]): number[] {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
}