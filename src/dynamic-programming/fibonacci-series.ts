/**
 * Generates the Fibonacci series up to a given number.
 * @param n - The number of elements in the Fibonacci series to generate.
 * @returns An array containing the Fibonacci series.
 */
export default function fibonacciSeries(n: number): number[] {
    const series: number[] = [0, 1];

    for (let i = 2; i < n; i++) {
        series[i] = series[i - 1] + series[i - 2];
    }

    return series;
}