/**
 * DLL push - Exercise
Implement the following on the DoublyLinkedList class

push

This function should accept a value add a node to the end of the DoublyLinkedList with the given value. It should return the DoublyLinkedList.

Examples

var doublyLinkedList = new DoublyLinkedList;
doublyLinkedList.push(5); // doublyLinkedList
doublyLinkedList.length; // 1
doublyLinkedList.head.val; // 5
doublyLinkedList.tail.val; // 5
doublyLinkedList.head.prev // null
doublyLinkedList.push(10); doublyLinkedList
doublyLinkedList.length; // 2
doublyLinkedList.head.val; // 5
doublyLinkedList.head.next.val; // 10
doublyLinkedList.tail.val; // 10
 */
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if (!this.length) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
        }
        this.length++;
        return this;
    }
}

let doublyLinkedList = new DoublyLinkedList();
console.log(doublyLinkedList.push(5)); // doublyLinkedList
console.log(doublyLinkedList.length); // 1
console.log(doublyLinkedList.head.val); // 5
console.log(doublyLinkedList.tail.val); // 5
console.log(doublyLinkedList.head.prev); // null
console.log(doublyLinkedList.push(10)); // doublyLinkedList
console.log(doublyLinkedList.length); // 2
console.log(doublyLinkedList.head.val); // 5
console.log(doublyLinkedList.head.next.val); // 10
console.log(doublyLinkedList.tail.val); // 10
