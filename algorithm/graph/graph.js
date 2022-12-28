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
        this.adjacencyList[v1] = this.adjacencyList[v1].filter((item) => item !== v2);
        this.adjacencyList[v2] = this.adjacencyList[v2].filter((item) => item !== v1);
    }

    removeVertex(vertex) {
        this.adjacencyList[vertex].forEach((v) => {
            this.removeEdge(vertex, v);
        });

        delete this.adjacencyList[vertex];
    }

    depthFirstRecursive(start) {
        const result = [];
        let visited = {};
        const adjacencyList = this.adjacencyList;

        function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);

            adjacencyList[vertex].forEach((el) => {
                if (!visited[el]) return dfs(el);
            });
        }
        dfs(start);

        return result;
    }

    depthFirstIterative(start) {
        const stack = [];
        const result = [];
        const visited = {};
        visited[start] = true;
        stack.push(start);
        while (stack.length) {
            const currentVertex = stack.pop();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach((v) => {
                if (!visited[v]) {
                    visited[v] = true;
                    stack.push(v);
                }
            });
        }
        return result;
    }
}

const g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');
console.log(g.depthFirstRecursive('A'));
console.log(g.depthFirstRecursive('D'));
console.log(g.depthFirstIterative('A'));
