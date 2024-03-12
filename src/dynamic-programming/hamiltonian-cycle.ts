/**
 * Represents a class that solves the Hamiltonian Cycle problem.
 */
export default class HamiltonianCycle {
    private adjacencyMatrix: number[][];
    private hamiltonianPath: number[];
    private numberOfVertices: number;

    /**
     * Creates an instance of HamiltonianCycle.
     * @param adjacencyMatrix - The adjacency matrix representing the graph.
     */
    constructor(adjacencyMatrix: number[][]) {
        this.adjacencyMatrix = adjacencyMatrix;
        this.hamiltonianPath = [];
        this.numberOfVertices = adjacencyMatrix.length;
    }

    /**
     * Solves the Hamiltonian Cycle problem.
     * @returns The Hamiltonian Cycle if one exists, otherwise an empty array.
     */
    solve(): number[] {
        this.hamiltonianPath = new Array(this.numberOfVertices).fill(-1);

        this.hamiltonianPath[0] = 0;
        if (this.solveHamiltonianCycle(1)) {
            return this.hamiltonianPath;
        }

        return [];
    }

    /**
     * Recursively solves the Hamiltonian Cycle problem.
     * @param position - The current position in the path.
     * @returns True if a Hamiltonian Cycle is found, otherwise false.
     */
    private solveHamiltonianCycle(position: number): boolean {
        if (position === this.numberOfVertices) {
            const lastVertex = this.hamiltonianPath[position - 1];
            const startVertex = this.hamiltonianPath[0];
            if (this.adjacencyMatrix[lastVertex][startVertex] === 1) {
                return true;
            }
            return false;
        }

        for (let vertexIndex = 1; vertexIndex < this.numberOfVertices; vertexIndex++) {
            if (this.isValidMove(position, vertexIndex)) {
                this.hamiltonianPath[position] = vertexIndex;
                if (this.solveHamiltonianCycle(position + 1)) {
                    return true;
                }
                this.hamiltonianPath[position] = -1;
            }
        }

        return false;
    }

    /**
     * Checks if a move to the given vertex is valid.
     * @param position - The current position in the path.
     * @param vertexIndex - The index of the vertex to move to.
     * @returns True if the move is valid, otherwise false.
     */
    private isValidMove(position: number, vertexIndex: number): boolean {
        const lastVertex = this.hamiltonianPath[position - 1];
        if (this.adjacencyMatrix[lastVertex][vertexIndex] === 0) {
            return false;
        }

        if (this.hamiltonianPath.includes(vertexIndex)) {
            return false;
        }

        return true;
    }

    /**
     * Prints the Hamiltonian Cycle.
     */
    printHamiltonianCycle(): void {
        console.log("Hamiltonian Cycle:");
        for (const vertex of this.hamiltonianPath) {
            console.log(vertex);
        }
    }
}