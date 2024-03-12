/**
 * Represents a graph data structure that uses Depth-First Search (DFS) algorithm.
 */
class DFSGraph {
    private adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map<number, number[]>();
    }

    /**
     * Adds a vertex to the graph.
     * @param vertex - The vertex to be added.
     */
    addVertex(vertex: number): void {
        this.adjacencyList.set(vertex, []);
    }

    /**
     * Adds an edge between two vertices in the graph.
     * @param vertex1 - The first vertex.
     * @param vertex2 - The second vertex.
     */
    addEdge(vertex1: number, vertex2: number): void {
        this.adjacencyList.get(vertex1)?.push(vertex2);
        this.adjacencyList.get(vertex2)?.push(vertex1);
    }

    /**
     * Performs Depth-First Search (DFS) starting from the specified vertex.
     * @param startVertex - The starting vertex for DFS.
     * @returns An array of vertices visited in the order of traversal.
     */
    dfs(startVertex: number): number[] {
        const visited: Set<number> = new Set<number>();
        const result: number[] = [];

        this.dfsHelper(startVertex, visited, result);

        return result;
    }

    private dfsHelper(vertex: number, visited: Set<number>, result: number[]): void {
        visited.add(vertex);
        result.push(vertex);

        const neighbors = this.adjacencyList.get(vertex);

        if (neighbors) {
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    this.dfsHelper(neighbor, visited, result);
                }
            }
        }
    }
}

export default DFSGraph;