/**
 * reverse
Write a recursive function called reverse which accepts a string and returns a new string in reverse.
 */
function reverse(str) {
    const length = str.length;
    if (length === 0) return '';
    return str.slice(-1) + reverse(str.slice(0, length - 1));
}

/**
 * isPalindrome
Write a recursive function called isPalindrome which returns true if the string passed to it is a palindrome (reads the same forward and backward). Otherwise it returns false.
 */
function isPalindrome(str) {
    function reverse(text) {
        if (text.length === 0) return '';
        return text.slice(-1) + reverse(text.slice(0, text.length - 1));
    }

    const reverseStr = reverse(str);

    if (reverseStr === str) return true;
    else return false;
}

/**
 * someRecursive
Write a recursive function called someRecursive which accepts an array and a callback. The function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false.
 */

function someRecursive(arr, callback) {
    // add whatever parameters you deem necessary - good luck!
    if (arr.length === 0) return false;
    if (callback(arr[0])) return true;

    return someRecursive(arr.slice(1), callback);
}

const isOdd = (val) => val % 2 !== 0;
/**
 * flatten
Write a recursive function called flatten which accepts an array of arrays and returns a new array with all values flattened.
 */
function flatten(array) {
    // add whatever parameters you deem necessary - good luck!
    let result = [];

    function helper(arr) {
        if (!Array.isArray(arr)) {
            result.push(arr);
            return;
        }
        arr.forEach((itm) => {
            helper(itm);
        });
    }

    helper(array);

    return result;
}

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
/**
 * capitalizeFirst
Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first letter of each string in the array.
 */

function capitalizeFirst(arr) {
    if (arr.length === 0) return [];
    let result = [arr[0][0].toUpperCase() + arr[0].slice(1)];
    return result.concat(capitalizeFirst(arr.splice(1)));
}

// console.log(capitalizeFirst(['car', 'taco', 'banana']));

/**
 * nestedEvenSum
Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.
 */

function nestedEvenSum(obj) {
    // 1) Loop all key of obj
    let sum = 0;

    function helper(object) {
        Object.values(object).forEach((value) => {
            // Check if value is an object
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                helper(value);
            }
            // 2) Check if value is number and event
            if (typeof value == 'number' && value % 2 === 0) sum += value;
        });
    }

    helper(obj);
    return sum;
}

var obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: 'yup',
        },
    },
};

var obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' },
};

// console.log(nestedEvenSum(obj1)); // 6
// console.log(nestedEvenSum(obj2)); // 10

/**
 * capitalizeWords
Write a recursive function called capitalizeWords. Given an array of words, return a new array containing each word capitalized.
 */
function capitalizeWords(arr) {
    // add whatever parameters you deem necessary - good luck!
    if (arr.length === 0) return [];
    let result = [arr[0].toUpperCase()];
    return result.concat(capitalizeWords(arr.splice(1)));
}

let words = ['i', 'am', 'learning', 'recursion'];
// console.log(capitalizeWords(words)); // ['I', 'AM', 'LEARNING', 'RECURSION']

/**
 * stringifyNumbers
Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings. Recursion would be a great way to solve this!
 */
function stringifyNumbers(obj) {
    // 1) Loop all key of obj
    let result = {};

    Object.entries(obj).forEach(([key, value]) => {
        // Check if value is an object
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            result[key] = stringifyNumbers(value);
        }
        // 2) Check if value is number
        else if (typeof value == 'number') {
            result[key] = value + '';
        } else {
            result[key] = value;
        }
    });

    return result;
}

let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66,
        },
    },
};

// console.log(stringifyNumbers(obj));
/**
 * collectStrings
Write a function called collectStrings which accepts an object and returns an array of all the values in the object that have a typeof string
 */
function collectStrings(obj) {
    let result = [];

    function helper(object) {
        Object.entries(object).forEach(([key, value]) => {
            // Check if value is an object
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                helper(value);
            }
            // 2) Check if value is string
            if (typeof value == 'string') {
                result.push(value);
            }
        });
    }

    helper(obj);
    return result;
}

const collectStringObj = {
    stuff: 'foo',
    data: {
        val: {
            thing: {
                info: 'bar',
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: 'baz',
                    },
                },
            },
        },
    },
};

console.log(collectStrings(collectStringObj)); // ["foo", "bar", "baz"])
