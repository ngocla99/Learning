/**
 * Binary Search Tree - insert Exercise
Write a function on the BinarySearchTree class

insert - accepts a value and inserts it into the BST in the correct position. The function should return the binary search tree.

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15);
binarySearchTree.insert(20);
binarySearchTree.insert(10);
binarySearchTree.insert(12);
binarySearchTree.root.value // 15
binarySearchTree.root.right.value // 20
binarySearchTree.root.left.right.value // 12

var binarySearchTree = new BinarySearchTree();
binarySearchTree
    .insert(15)
    .insert(20)
    .insert(10)
    .insert(12);
binarySearchTree.root.value // 15
binarySearchTree.root.right.value // 20
binarySearchTree.root.left.right.value // 12
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        const node = new Node(value);
        if (this.root === null) {
            this.root = node;
            return this;
        }

        let current = this.root;
        while (current.value !== null) {
            if (value === current.value) return undefined;
            if (value > current.value) {
                if (current.right === null) {
                    current.right = node;
                    break;
                }
                current = current.right;
            } else {
                if (current.left === null) {
                    current.left = node;
                    break;
                }
                current = current.left;
            }
        }
        return this;
    }

    find(value) {
        let current = this.root;
        while (current.value !== null) {
            if (value === current.value) return current;
            if (value > current.value) {
                if (current.right === null) {
                    break;
                }
                current = current.right;
            } else {
                if (current.left === null) {
                    break;
                }
                current = current.left;
            }
        }
        return undefined;
    }

    DFSPreOrder() {
        let result = [];
        function traverse(node) {
            result.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }

        traverse(this.root);
        return result;
    }

    DFSInOrder() {
        let result = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            result.push(node.value);
            if (node.right) traverse(node.right);
        }

        traverse(this.root);
        return result;
    }

    DFSPostOrder() {
        let result = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            result.push(node.value);
        }

        traverse(this.root);
        return result;
    }

    breadthFirstSearch() {
        let data = [];
        let queue = [];
        let node = this.root;
        queue.push(node);
        while (queue.length) {
            node = queue.shift();
            data.push(node.value);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        return data;
    }

    remove(val) {
        let delNode;
        const del = (root, val) => {
            if (root === null) return root;
            else if (val > root.value) root.right = del(root.right, val);
            else if (val < root.value) root.left = del(root.left, val);
            else {
                // if node is found
                if (delNode === undefined) delNode = root.value;

                // case 1: no children (leaf)
                if (root.left === null && root.right === null) {
                    root = null;
                }

                // case 2: 1 child
                else if (root.left === null) {
                    // right child
                    root = root.right;
                } else if (root.right === null) {
                    // left child
                    root = root.left;
                }

                // case 3: 2 children
                else {
                    let temp = findMin(root.right); // assign a root to min in a right subtree
                    root.value = temp.value;
                    root.right = del(root.right, root.value);
                }
            }
            return root;
        };
        const findMin = (root) => {
            if (root === null) return root;
            if (root.left) return findMin(root.left);
            return root;
        };

        this.root = del(this.root, val);
        return delNode;
    }

    findMax() {
        const max = (node) => {
            if (node === null) return null;
            if (node.right) return max(node.right);
            return node;
        };
        return max(this.root);
    }

    findSecondLargest() {
        const secondMax = (node) => {
            if (node === null) return null;
            if (node.right && node.right.right) return secondMax(node.right);
            return node.value;
        };
        return secondMax(this.root);
    }

    getDepth(node = this.root) {
        if (!node) return 0;
        return Math.max(this.getDepth(node.left) + 1, this.getDepth(node.right) + 1);
    }

    isBalanced() {
        return Math.abs(this.getDepth(this.root.right) - this.getDepth(this.root.left)) <= 1;
    }
}

var binarySearchTree = new BinarySearchTree();
binarySearchTree.insert(15).insert(20).insert(10).insert(12);

var binarySearchTree2 = new BinarySearchTree();
binarySearchTree2.insert(5);
console.log(binarySearchTree2.isBalanced()); // true
binarySearchTree2.insert(6);
console.log(binarySearchTree2.isBalanced()); // true
binarySearchTree2.insert(7);
console.log(binarySearchTree2.isBalanced()); // false
