/**
 * Sorting Exercise - pivot helper
In this exercise, your goal is to implement a function called pivot . This function contains nearly all of the logic you'll need in order to implement Quick Sort in the next exercise.

The pivot  function is responsible for taking an array, setting the pivot value, and mutating the array so that all values less than the pivot wind up to the left of it, and all values greater than the pivot wind up to the right of it. It's also helpful if this helper returns the index of where the pivot value winds up.

For example, if we decide the pivot will always be the first element in the array, it should behave in the following way:

var arr = [4, 2, 5, 3, 6];
pivot(arr); // 2
arr; // [3, 2, 4, 5, 6];
In this code, the specifics of how the arr  variable gets mutated are not important. All that matters is that 4 winds up at index 2, with 3 and 2 to the left of it (in any order), and with 5 and 6 to the right of it (in any order).

Hint: When we get to Quick Sort, it will be helpful for the pivot  helper to accept not only an array an an optional comparator, but also an optional start and end index. These should default to 0 and the array length minus 1, respectively. We've provided these to you in the starter code, but their utility may not be apparent yet. That's okay! When you get to implementing Quick Sort, their usefulness will become clearer.

Examples

var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
var arr3 = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strLength(a, b) {
  return a.length - b.length
}

pivot(arr1); // 3
pivot(arr2); // 4
pivot(arr3, strLength); // 1

arr1.slice(0, 3).sort((a, b) => a - b); // [2, 3, 4]
arr1.slice(3).sort((a, b) => a - b); // [5, 7, 8, 9, 10, 20]

arr2.slice(0, 4).sort((a, b) => a - b); // [0, 2, 4, 5]
arr2.slice(4).sort((a, b) => a - b); // [8, 10, 11, 12, 13, 16]

arr3.slice(0, 1).sort(strLength); // ["Blue"]
arr3.slice(1).sort(strLength); // ["LilBub", "Grumpy", "Garfield", "Heathcliff"]

 */

function pivot(arr, comparator, start = 0, end = arr.length - 1) {
    let numPivot = arr[start];
    let idx = start;
    if (typeof comparator !== 'function') comparator = (a, b) => a - b;
    for (let i = start + 1; i <= end; i++) {
        if (comparator(numPivot, arr[i]) > 0) {
            idx++;
            if (i > idx) [arr[i], arr[idx]] = [arr[idx], arr[i]];
        }
    }
    [arr[start], arr[idx]] = [arr[idx], arr[start]];
    return idx;
}

var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];
var arr3 = ['LilBub', 'Garfield', 'Heathcliff', 'Blue', 'Grumpy'];

function strLength(a, b) {
    return a.length - b.length;
}

// console.log(pivot(arr1)); // 3
// console.log(pivot(arr2)); // 4
// console.log(pivot(arr3, strLength)); // 1

// console.log(arr1.slice(0, 3).sort((a, b) => a - b)); // [2, 3, 4]
// console.log(arr1.slice(3).sort((a, b) => a - b)); // [5, 7, 8, 9, 10, 20]

// console.log(arr2.slice(0, 4).sort((a, b) => a - b)); // [0, 2, 4, 5]
// console.log(arr2.slice(4).sort((a, b) => a - b)); // [8, 10, 11, 12, 13, 16]

// console.log(arr3.slice(0, 1).sort(strLength)); // ["Blue"]
// console.log(arr3.slice(1).sort(strLength)); // ["LilBub", "Grumpy", "Garfield", "Heathcliff"]

/**
 *Quick Sort
The next sorting algorithm we'll consider is Quick Sort. Unfortunately, quicksort is not the most intuitive of algorithms and has a wide range of implementations. It may help to check out this great video from Computerphile for a quick introduction to how quicksort works:https://www.youtube.com/watch?v=XE4VP_8Y0BU

The algorithm is as follows:

Pick an element in the array and designate it as the "pivot". While there are quite a few options for choosing the pivot. We'll make things simple to start, and will choose the pivot as the first element. This is not an ideal choice, but it makes the algorithm easier to understand for now.
Next, compare every other element in the array to the pivot.
If it's less than the pivot value, move it to the left of the pivot.
If it's greater, move it to the right.
Once you have finished comparing, the pivot will be in the right place.
Next, recursively call quicksort again with the left and right halves from the pivot until the array is sorted.
It's easiest to implement Quick Sort with the aid of your pivot  helper from the earlier exercise. This function is responsible for taking an array, setting the pivot value, and mutating the array so that all values less than the pivot wind up to the left of it, and all values greater than the pivot wind up to the right of it. It's also helpful if this helper returns the index of where the pivot value winds up.

The default comparator you provide should assume that the two parameters are numbers and that we are sorting the values from smallest to largest.

Examples

quickSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
quickSort([0, -10, 7, 4]); // [-10, 0, 4, 7]
quickSort([1, 2, 3]); // [1, 2, 3]
quickSort([]);

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
quickSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strComp(a, b) {
  if (a < b) { return -1;}
  else if (a > b) { return 1;}
  return 0;
}

quickSort(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

var moarKittyData = [{
  name: "LilBub",
  age: 7
}, {
  name: "Garfield",
  age: 40
}, {
  name: "Heathcliff",
  age: 45
}, {
  name: "Blue",
  age: 1
}, {
  name: "Grumpy",
  age: 6
}];

function oldestToYoungest(a, b) {
  return b.age - a.age;
}

quickSort(moarKittyData, oldestToYoungest); // sorted by age in descending order

 */
function quickSort(arr, comparator, left = 0, right = arr.length - 1) {
    if (left < right) {
        let numPivot = pivot(arr, comparator, left, right);
        // left
        quickSort(arr, comparator, left, numPivot - 1);
        // right
        quickSort(arr, comparator, numPivot + 1, right);
    }
    return arr;
}

console.log(quickSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(quickSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(quickSort([1, 2, 3])); // [1, 2, 3]
console.log(quickSort([]));

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(quickSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ['LilBub', 'Garfield', 'Heathcliff', 'Blue', 'Grumpy'];

function strComp(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

console.log(quickSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

var moarKittyData = [
    {
        name: 'LilBub',
        age: 7,
    },
    {
        name: 'Garfield',
        age: 40,
    },
    {
        name: 'Heathcliff',
        age: 45,
    },
    {
        name: 'Blue',
        age: 1,
    },
    {
        name: 'Grumpy',
        age: 6,
    },
];

function oldestToYoungest(a, b) {
    return b.age - a.age;
}

console.log(quickSort(moarKittyData, oldestToYoungest)); // sorted by age in descending order
