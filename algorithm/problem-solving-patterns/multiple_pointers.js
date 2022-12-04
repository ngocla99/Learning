function sumZero(arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === 0) {
            return [arr[left], arr[right]];
        } else if (sum > 0) {
            right--;
        } else {
            left++;
        }
    }
}

// Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

function countUniqueValues(arr) {
    if (arr.length < 2) return arr.length;

    let count = arr.length;
    let i = 0;
    let j = 1;
    let compare = arr[i];
    while (j < arr.length) {
        if (compare !== arr[j]) {
            i++;
            compare = arr[j];
        }
        j++;
    }
    return i + 1;
}

console.log(countUniqueValues([1, 1, 2, 2, 2, 3, 4, 5, 5, 6]));

//sumZero([-4,-3,-2,-1,0,1,2,3,10])
