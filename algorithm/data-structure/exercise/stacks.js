/**
 * Stacks - push Exercise
Implement the following methods on the Stack class

push - takes in a node and puts it at the top of the stack. Should return the new size of the stack.

var stack = new Stack();

stack.push(10) // 1
stack.first.value // 10
stack.last.value // 10
stack.push(100);
stack.first.value // 100
stack.last.value // 10
stack.push(1000);
stack.first.value // 1000
stack.last.value // 10

var stack = new Stack();

stack.push(10) // 1
stack.size // 1
stack.push(100) // 2
stack.size // 2
stack.push(1000) // 3
stack.size // 3
 */
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(val) {
        const node = new Node(val);
        if (this.last === null) {
            this.last = node;
            this.first = node;
        } else {
            this.first.next = node;
            this.first = node;
        }
        this.size++;

        return this.size;
    }

    pop() {
        if (this.size === 0) return undefined;
        let temp = this.first;
        if (this.size === 1) {
            this.first = null;
            this.last = null;
        } else {
            let idx = this.size - 2;
            let currentNode = this.last;
            while (idx > 0) {
                currentNode = currentNode.next;
                idx--;
            }

            currentNode.next = null;
            this.first = currentNode;
        }

        this.size--;
        return temp.value;
    }
}

var stack = new Stack();
stack.push(10);
stack.push(100);
stack.push(1000);
var removed = stack.pop();
console.log(removed); // 1000
console.log(stack.size); // 2
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.size); // 0
