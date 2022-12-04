/*
Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
Your solution MUST have the following complexities:
Time: O(N)
Sample Input:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false
 */

function sameFrequency(num1, num2) {
    const obj1 = {};
    const obj2 = {};

    for (let i of String(num1)) obj1[i] = (obj1[i] || 0) + 1;

    for (let i of String(num2)) obj2[i] = (obj2[i] || 0) + 1;

    for (let key in obj1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
}

/*
Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.  You can solve this using the frequency counter pattern OR the multiple pointers pattern.

Examples:

areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true
areThereDuplicates('a', 'b', 'c', 'a') // true
 */

function areThereDuplicates(...arr) {
    // good luck. (supply any arguments you deem necessary.)
    let obj = {};
    for (let i of arr) {
        obj[i] = (obj[i] || 0) + 1;
        if (obj[i] > 1) return false;
    }
    return true;
}

areThereDuplicates(1, 2, 3);
