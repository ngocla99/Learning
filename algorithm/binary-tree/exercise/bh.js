/**
 * BinaryHeap - insert Exercise
Implement the following functions on the maxBinaryHeap class

insert

Implement the `insert` function on the `MaxBinaryHeap.prototype`: This function should insert a node in a binary heap. Make sure to re-order the heap after insertion if necessary.

 */
class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    insert(val) {
        this.values.push(val);
        this.bubbleUp();
        return this;
    }

    extractMax() {
        let idx = this.values.length - 1;
        [this.values[0], this.values[idx]] = [this.values[idx], this.values[0]];
        this.values.pop();
        this.sinkDown();
    }

    sinkDown() {
        let parentIdx = 0;
        while (parentIdx < this.values.length - 1) {
            let left = parentIdx * 2 + 1;
            let right = parentIdx * 2 + 2;
            let valueLeft = this.values[left] || 0;
            let valueRight = this.values[right] || 0;
            let valueParent = this.values[parentIdx];

            if ((!valueLeft && !valueRight) || (valueParent > valueRight && valueParent > valueLeft)) break;
            if (valueLeft > valueRight) [this.values[parentIdx], this.values[left]] = [valueLeft, valueParent];
            if (valueLeft < valueRight) [this.values[parentIdx], this.values[right]] = [valueRight, valueParent];
        }
    }

    bubbleUp() {
        let idx = this.values.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.values[idx] < this.values[parentIdx]) break;

            [this.values[idx], this.values[parentIdx]] = [this.values[parentIdx], this.values[idx]];
            idx = parentIdx;
        }
    }
}

let binaryHeap = new MaxBinaryHeap();
console.log(binaryHeap.insert(1));
console.log(binaryHeap.values[0]); // 1

console.log(binaryHeap.insert(2));
console.log(binaryHeap.values[0]); // 2

console.log(binaryHeap.values); // [2, 1]

console.log(binaryHeap.insert(3));
console.log(binaryHeap.values[0]); // 3

console.log(binaryHeap.values); // [3, 1, 2]

console.log(binaryHeap.insert(4));
console.log(binaryHeap.values[0]); // 4

console.log(binaryHeap.values); // [4, 3, 2, 1]

console.log(binaryHeap.insert(5));
console.log(binaryHeap.values[0]); // 5
console.log(binaryHeap.values); // [5, 4, 2, 1, 3]

console.log(binaryHeap.insert(6));
console.log(binaryHeap.values[0]); // 6

console.log(binaryHeap.values); // [6, 4, 5, 1, 3, 2]
binaryHeap.extractMax();
console.log(binaryHeap.values); // [6, 4, 5, 1, 3, 2]
binaryHeap.extractMax();
console.log(binaryHeap.values); // [4,3,2,1]

binaryHeap.extractMax();
console.log(binaryHeap.values); // [3,1,2]
