/**
 * DLL unshift - Exercise
Implement the following on the DoublyLinkedList class

unshift

This function should accept a value and add a node to the beginning of the DoublyLinkedList with the given value. It should return the DoublyLinkedList.

Examples

var doublyLinkedList = new DoublyLinkedList;
doublyLinkedList.unshift(5); // doublyLinkedList
doublyLinkedList.length; // 1
doublyLinkedList.head.val; // 5
doublyLinkedList.tail.val; // 5
doublyLinkedList.unshift(10); doublyLinkedList
doublyLinkedList.length; // 2
doublyLinkedList.head.val; // 10
doublyLinkedList.head.next.val; // 5
doublyLinkedList.tail.val; // 5
doublyLinkedList.unshift(15); doublyLinkedList
doublyLinkedList.length; // 3
doublyLinkedList.head.val; // 15
doublyLinkedList.tail.val; // 5
doublyLinkedList.head.next.next.val; // 5
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
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    unshift(val) {
        let newNode = new Node(val);
        if (!this.length) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
}

var doublyLinkedList = new DoublyLinkedList();
console.log(doublyLinkedList.unshift(5)); // doublyLinkedList
console.log(doublyLinkedList.length); // 1
console.log(doublyLinkedList.head.val); // 5
console.log(doublyLinkedList.tail.val); // 5
console.log(doublyLinkedList.unshift(10)); //doublyLinkedList
console.log(doublyLinkedList.length); // 2
console.log(doublyLinkedList.head.val); // 10
console.log(doublyLinkedList.head.next.val); // 5
console.log(doublyLinkedList.tail.val); // 5
console.log(doublyLinkedList.unshift(15)); //doublyLinkedList
console.log(doublyLinkedList.length); // 3
console.log(doublyLinkedList.head.val); // 15
console.log(doublyLinkedList.tail.val); // 5
console.log(doublyLinkedList.head.next.next.val); // 5
