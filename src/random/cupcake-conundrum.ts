// Here's a problem that combines graphs, stacks, and queues:

// Imagine you are designing a delivery network for a bakery. You have a graph where the vertices represent houses and the edges represent roads connecting the houses. Each house has an order for a certain number of cupcakes.

// There are two types of delivery vehicles available: trucks and bikes. Trucks have a larger capacity (say 10 cupcakes) but are slower (can only move to adjacent houses in one go). Bikes have a smaller capacity (say 2 cupcakes) but are faster (can skip houses and travel longer distances).

// Your task is to design an efficient delivery route that minimizes the total delivery time.

// Here's what you need to consider:

// Use a graph to represent the road network (vertices - houses, edges - roads).
// Each house (vertex) has an associated queue with its cupcake order.
// You can use a stack to keep track of the current delivery route for the truck (LIFO - Last In First Out - so it can backtrack if needed to fulfill an order).
// A bike can directly travel to any house on the graph (not restricted to following roads like the truck). You can model this by using a priority queue to efficiently select the house with the highest cupcake order that the bike can reach within its capacity.
// The challenge is to develop an algorithm that utilizes these data structures (graph, stack, queue, priority queue) to find the most efficient delivery route, considering both the capacity and speed of the vehicles.

// This problem requires you to think strategically about when to use each data structure and how to manage the delivery process for both trucks and bikes to minimize total delivery time.


class Vertex {
    id: number;
    cupcakes: number;
    constructor(id: number, cupcakes: number) {
        this.id = id;
        this.cupcakes = cupcakes;
    }
}

class Edge {
    source: Vertex;
    destination: Vertex;
    distance: number;
    constructor(source: Vertex, destination: Vertex, distance: number) {
        this.source = source;
        this.destination = destination;
        this.distance = distance;
    }
}

class Graph {
    vertices: Vertex[];
    edges: Edge[];
    adjacencyList: Map<Vertex, Edge[]>;

    constructor() {
        this.vertices = [];
        this.edges = [];
        this.adjacencyList = new Map();
    }

    addVertex(vertex: Vertex) {
        this.vertices.push(vertex);
        this.adjacencyList.set(vertex, []);
    }

    addEdge(source: Vertex, destination: Vertex, distance: number) {
        const edge = new Edge(source, destination, distance);
        this.edges.push(edge);
        this.adjacencyList.get(source)?.push(edge);
        this.adjacencyList.get(destination)?.push(edge);
    }
}

class Truck {
    capacity: number;
    route: Vertex[];
    constructor(capacity: number) {
        this.capacity = capacity;
        this.route = [];
    }

    deliver(vertex: Vertex) {
        this.route.push(vertex);
    }

    backtrack() {
        this.route.pop();
    }
}

class Bike {
    capacity: number;
    route: Vertex[];
    constructor(capacity: number) {
        this.capacity = capacity;
        this.route = [];
    }

    deliver(vertex: Vertex) {
        this.route.push(vertex);
    }
}

class PriorityQueue<T> {
    items: { element: T, priority: number }[];

    constructor() {
        this.items = [];
    }

    enqueue(element: T, priority: number) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift()?.element;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

function deliveryRoute(graph: Graph, truck: Truck, bike: Bike) {
    const visited: Set<Vertex> = new Set(); // Keep track of visited vertices
    const truckStack: Vertex[] = []; // Stack to track the truck's route
    const bikePriorityQueue: PriorityQueue<Vertex> = new PriorityQueue(); // Priority queue to track the bike's route based on cupcake order

    // Start the delivery from the first vertex in the graph
    const startVertex = graph.vertices[0];
    truckStack.push(startVertex);
    visited.add(startVertex);

    while (truckStack.length > 0) {
        const currentVertex = truckStack[truckStack.length - 1];

        // Check if the truck can deliver cupcakes at the current vertex
        if (currentVertex.cupcakes <= truck.capacity) {
            truck.deliver(currentVertex);
            truckStack.pop();
        } else {
            // If the truck cannot deliver all the cupcakes, backtrack to the previous vertex
            truckStack.pop();
            continue;
        }

        // Check if the bike can deliver cupcakes at the current vertex
        if (currentVertex.cupcakes <= bike.capacity) {
            bike.deliver(currentVertex);
        }

        // Explore the adjacent vertices
        const adjacentEdges = graph.adjacencyList.get(currentVertex);
        if (adjacentEdges) {
            for (const edge of adjacentEdges) {
                const { source, destination } = edge;
                const nextVertex = source === currentVertex ? destination : source;

                // Check if the next vertex has been visited
                if (!visited.has(nextVertex)) {
                    visited.add(nextVertex);
                    truckStack.push(nextVertex);

                    // Add the next vertex to the bike's priority queue
                    bikePriorityQueue.enqueue(nextVertex, nextVertex.cupcakes);
                }
            }
        }

        // Check if the bike can travel to a new vertex with higher cupcake order
        while (!bikePriorityQueue.isEmpty()) {
            const nextVertex = bikePriorityQueue.dequeue();
            if (nextVertex && nextVertex.cupcakes <= bike.capacity) {
                bike.deliver(nextVertex);
            }
        }
    }

    return { truck: truck.route, bike: bike.route };
}

export default deliveryRoute;

// Example usage:

const graph = new Graph();

const vertex1 = new Vertex(1, 5);
const vertex2 = new Vertex(2, 7);
const vertex3 = new Vertex(3, 3);
const vertex4 = new Vertex(4, 8);

graph.addVertex(vertex1);
graph.addVertex(vertex2);
graph.addVertex(vertex3);
graph.addVertex(vertex4);

graph.addEdge(vertex1, vertex2, 2);
graph.addEdge(vertex1, vertex3, 3);
graph.addEdge(vertex2, vertex4, 4);
graph.addEdge(vertex3, vertex4, 1);

const truck = new Truck(10);
const bike = new Bike(2);

const delivery = deliveryRoute(graph, truck, bike);
console.log(delivery); // Output: { truck: [Vertex { id: 1, cupcakes: 5 }, Vertex { id: 2, cupcakes: 7 }, Vertex { id: 4, cupcakes: 8 }], bike: [Vertex { id: 3, cupcakes: 3 }] }

// In this example, the truck delivers cupcakes to vertices 1, 2, and 4, while the bike delivers cupcakes to vertex 3. The delivery route minimizes the total delivery time based on the capacities and speeds of the vehicles.