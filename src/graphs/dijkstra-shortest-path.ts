/**
 * Represents a graph for Dijkstra's shortest path algorithm.
 */
class DSGraph {
    private vertices: number;
    private adjacencyMatrix: number[][];

    /**
     * Creates an instance of DSGraph.
     * @param vertices - The number of vertices in the graph.
     */
    constructor(vertices: number) {
        this.vertices = vertices;
        this.adjacencyMatrix = new Array(vertices).fill(0).map(() => new Array(vertices).fill(0));
    }

    /**
     * Adds an edge between two vertices with a given weight.
     * @param source - The source vertex.
     * @param destination - The destination vertex.
     * @param weight - The weight of the edge.
     */
    addEdge(source: number, destination: number, weight: number) {
        this.adjacencyMatrix[source][destination] = weight;
        this.adjacencyMatrix[destination][source] = weight;
    }

    /**
     * Finds the shortest path from a given source vertex to all other vertices using Dijkstra's algorithm.
     * @param source - The source vertex.
     * @returns An array of distances representing the shortest path from the source vertex to all other vertices.
     */
    dijkstra(source: number) {
        const distances: number[] = new Array(this.vertices).fill(Number.MAX_VALUE);
        const visited: boolean[] = new Array(this.vertices).fill(false);

        distances[source] = 0;

        for (let i = 0; i < this.vertices - 1; i++) {
            const minDistanceVertex = this.getMinDistanceVertex(distances, visited);
            visited[minDistanceVertex] = true;

            for (let j = 0; j < this.vertices; j++) {
                if (!visited[j] && this.adjacencyMatrix[minDistanceVertex][j] !== 0 &&
                    distances[minDistanceVertex] !== Number.MAX_VALUE &&
                    distances[minDistanceVertex] + this.adjacencyMatrix[minDistanceVertex][j] < distances[j]) {
                    distances[j] = distances[minDistanceVertex] + this.adjacencyMatrix[minDistanceVertex][j];
                }
            }
        }

        return distances;
    }

    private getMinDistanceVertex(distances: number[], visited: boolean[]) {
        let minDistance = Number.MAX_VALUE;
        let minDistanceVertex = -1;

        for (let v = 0; v < this.vertices; v++) {
            if (!visited[v] && distances[v] <= minDistance) {
                minDistance = distances[v];
                minDistanceVertex = v;
            }
        }

        return minDistanceVertex;
    }
}

export default DSGraph;