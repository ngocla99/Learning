class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        let newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (newNode.value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            } else if (newNode.value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            }
        }
    }

    find(value) {
        if (this.root.value === value) return false;
        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value > current.value) current = current.right;
            else if (value < current.value) current = current.left;
            else found = true;
        }
        if (!found) return undefined;
        return current;
    }

    BFS() {
        let data = [];
        let queue = [];
        let node = this.root;
        queue.push(node);
        while (queue.length) {
            let node = queue.shift();
            data.push(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }

    DFSPreOrder() {
        let data = [];
        function traverse(node) {
            data.push(node);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }

    DFSPostOrder() {
        let data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node);
        }
        traverse(this.root);
        return data;
    }

    DFSInOrder() {
        let data = [];
        function traverse(node) {
            node.left && traverse(node.left);
            data.push(node);
            node.right && traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
}

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(20);
tree.insert(23);
// console.log(tree.BFS());
// console.log(tree.DFSPreOrder());
console.log(tree.DFSInOrder());
