/**
 * Represents a graph data structure that uses the Breadth-First Search algorithm.
 */
class BFSGraph {
    private adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map<number, number[]>();
    }

    addVertex(vertex: number): void {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(vertex1: number, vertex2: number): void {
        this.adjacencyList.get(vertex1)?.push(vertex2);
        this.adjacencyList.get(vertex2)?.push(vertex1);
    }

    /**
     * Performs a Breadth-First Search starting from the specified vertex.
     * @param startVertex - The vertex to start the search from.
     * @returns An array of visited vertices in the order they were visited.
     */
    breadthFirstSearch(startVertex: number): number[] {
        const visited: Set<number> = new Set<number>();
        const queue: number[] = [];

        visited.add(startVertex);
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift()!;
            const neighbors = this.adjacencyList.get(currentVertex);

            for (const neighbor of neighbors!) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return Array.from(visited);
    }
}

export default BFSGraph;