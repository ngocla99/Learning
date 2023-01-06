/**
 * Divide and Conquer - sortedFrequency
Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array

sortedFrequency([1,1,2,2,2,2,3],2) // 4
sortedFrequency([1,1,2,2,2,2,3],3) // 1
sortedFrequency([1,1,2,2,2,2,3],1) // 2
sortedFrequency([1,1,2,2,2,2,3],4) // -1
Time Complexity - O(log n)
 */
function sortedFrequency(arr, num) {
    let start = 0;
    let end = arr.length - 1;
    let middle;

    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        if (arr[middle] < num) {
            start = middle + 1;
        } else if (arr[middle] > num) {
            end = middle - 1;
        } else {
            let back = middle;
            let forward = middle;
            while (arr[back] === num) {
                back--;
            }
            while (arr[forward] === num) {
                forward++;
            }
            return forward - back - 1;
        }
    }
    return -1;
}

// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 2)); // 4
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 3)); // 1
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1)); // 2
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 4)); // -1

/**
 * Divide and Conquer - findRotatedIndex
Write a function called findRotatedIndex which accepts a rotated array of sorted numbers and an integer. The function should return the index of the integer in the array. If the value is not found, return -1.

Constraints:

Time Complexity - O(log n)

Space Complexity - O(1)

findRotatedIndex([3,4,1,2],4) // 1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
findRotatedIndex([37,44,66,102,10,22],14) // -1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
findRotatedIndex([11,12,13,14,15,16,3,5,7,9], 16) // 5
 */

function findRotatedIndex(arr, num) {
    const pivot = searchPivot(arr);

    if (pivot === -1) {
        return search(arr, num);
    } else {
        if (arr[0] > num) return search(arr, num, pivot, arr.length - 1);
        else return search(arr, num, 0, pivot - 1);
    }
}

function search(arr, num, start = 0, end = arr.length - 1) {
    let middle;

    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        if (arr[middle] > num) {
            end = middle - 1;
        } else if (arr[middle] < num) {
            start = middle + 1;
        } else {
            return middle;
        }
    }

    return -1;
}

function searchPivot(arr) {
    let start = 0;
    let end = arr.length - 1;
    let middle;

    while (start <= end) {
        middle = Math.floor((start + end) / 2);
        if (middle === 0) break;
        if (arr[middle] > arr[end]) {
            start = middle + 1;
        } else if (arr[middle] > arr[middle - 1]) {
            end = middle - 1;
        } else {
            return middle;
        }
    }

    return -1;
}

console.log(findRotatedIndex([3, 4, 1, 2], 4)); // 1
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8)); // 2
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3)); // 6
console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14)); // -1
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)); // -1
console.log(findRotatedIndex([11, 12, 13, 14, 15, 16, 3, 5, 7, 9], 16)); // 5
