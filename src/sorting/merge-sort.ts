export default function mergeSort(arr: number[]): number[] {
    const n = arr.length;

    if (n <= 1) {
        return arr;
    }

    const mid = Math.floor(n / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

/**
 * Merges two sorted arrays into a single sorted array.
 * @param left - The left array to merge.
 * @param right - The right array to merge.
 * @returns The merged and sorted array.
 */
function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i), right.slice(j));
}