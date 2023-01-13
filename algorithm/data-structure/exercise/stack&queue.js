/**
 * Stack with 2 Queues
Implement a stack using two queues:

You should implement the following functions:

- push (returns the stack)

- pop (returns the value popped)

Comment on your time complexity for all of these operations:

var s = new Stack()
s.push(10).push(20).push(30)
s.pop() // 30
s.pop() // 20
s.pop() // 10
s.pop() // null
s.push(30).push(40).push(50)
s.pop() // 50
s.push(60)
s.pop() // 60

 */

class Stack {
    constructor() {
        this.queue = new Queue();
    }

    push(val) {
        this.queue.enqueue(val);
        return this;
    }

    pop() {
        if (this.queue.size === 0) return null;
        let temp = this.queue.last;
        if (this.queue.size === 1) {
            this.queue.last = null;
            this.queue.first = null;
        } else {
            let idx = this.queue.size - 2;
            let currentNode = this.queue.first;
            while (idx > 0) {
                currentNode = currentNode.next;
                idx--;
            }

            currentNode.next = null;
            this.queue.last = currentNode;
        }

        this.queue.size--;
        return temp.value;
    }
}

// QUEUE AND NODE HAVE BEEN IMPLEMENTED FOR YOU

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(data) {
        var node = new Node(data);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }

        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

var s = new Stack();
console.log(s.push(10).push(20).push(30));
console.log(s.pop()); // 30
console.log(s.pop()); // 20
console.log(s.pop()); // 10
console.log(s.pop()); // null
console.log(s.push(30).push(40).push(50));
console.log(s.pop()); // 50
console.log(s.push(60));
console.log(s.pop()); // 60
