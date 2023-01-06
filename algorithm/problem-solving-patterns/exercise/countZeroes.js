/**
 * Divide and Conquer - countZeroes
Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

countZeroes([1,1,1,1,0,0]) // 2
countZeroes([1,0,0,0,0]) // 4
countZeroes([0,0,0]) // 3
countZeroes([1,1,1,1]) // 0
Time Complexity - O(log n)
 */

function countZeroes(arr) {
    let start = 0;
    let end = arr.length - 1;
    let middle;
    while (start < end) {
        middle = Math.ceil((start + end) / 2);
        if (arr[middle] === 1) {
            if (arr[middle + 1] === 0) {
                return arr.length - (middle + 1);
            } else {
                if (middle === arr.length - 2) return 0;
                start = middle;
            }
        } else {
            if (arr[middle - 1] === 1) {
                return arr.length - middle;
            } else {
                if (middle === 1) return arr.length;
                else end = middle;
            }
        }
    }
}

console.log(countZeroes([1, 1, 1, 1, 0, 0])); // 2
console.log(countZeroes([1, 0, 0, 0, 0])); // 4
console.log(countZeroes([0, 0, 0])); // 3
console.log(countZeroes([1, 1, 1, 1])); // 0
