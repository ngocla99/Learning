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
