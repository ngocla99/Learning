/**
 * Graphs Exercise - addVertex
Implement the following methods on the Graph class

addVertex- this function should add a node to the graph and place a new key in the adjacency list with the value of an empty array.

var graph = new Graph;

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.adjacencyList['A']; // []
graph.adjacencyList['B']; // []
graph.adjacencyList['C']; // []
 */

class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }

    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter((el) => el !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter((el) => el !== v1);
    }

    removeVertex(v) {
        this.adjacencyList[v].forEach((el) => {
            this.removeEdge(el, v);
        });
        delete this.adjacencyList[v];
    }

    depthFirstSearch(v) {
        const visited = [v];
        const helper = (vertex) => {
            let next;
            for (let i = 0; i < vertex.length; i++) {
                if (!visited.includes(vertex[i])) {
                    next = vertex[i];
                    visited.push(next);
                    break;
                }
            }
            if (next) helper(this.adjacencyList[next]);
        };

        helper(this.adjacencyList[v]);
        return visited;
    }
}

var graph = new Graph();

graph.addVertex('S');
graph.addVertex('P');
graph.addVertex('U');
graph.addVertex('X');
graph.addVertex('Q');
graph.addVertex('Y');
graph.addVertex('V');
graph.addVertex('R');
graph.addVertex('W');
graph.addVertex('T');

graph.addEdge('S', 'P');
graph.addEdge('S', 'U');

graph.addEdge('P', 'X');
graph.addEdge('U', 'X');

graph.addEdge('P', 'Q');
graph.addEdge('U', 'V');

graph.addEdge('X', 'Q');
graph.addEdge('X', 'Y');
graph.addEdge('X', 'V');

graph.addEdge('Q', 'R');
graph.addEdge('Y', 'R');

graph.addEdge('Y', 'W');
graph.addEdge('V', 'W');

graph.addEdge('R', 'T');
graph.addEdge('W', 'T');
console.log(graph.depthFirstSearch('S'));

/**
 * results:
 ["S", "P", "X", "U", "V", "W", "Y", "R", "Q", "T"] // recursive version
 ["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"] // iterative (stack) version
 *
 */
