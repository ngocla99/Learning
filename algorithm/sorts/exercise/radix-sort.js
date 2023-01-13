/**
 *Radix Sort Helper - getDigit
Implement a function called getDigit  which accepts a positive integer and a position, and returns the digit in that number at the given position. The position reads from right to left, so the 0th position corresponds to the rightmost digit.

Examples

getDigit(12345, 0); // 5
getDigit(12345, 1); // 4
getDigit(12345, 2); // 3
getDigit(12345, 3); // 2
getDigit(12345, 4); // 1
getDigit(12345, 5); // 0

getDigit(8987, 0); // 7
getDigit(8987, 1); // 8
getDigit(8987, 2); // 9
getDigit(8987, 3); // 8
getDigit(8987, 4); // 0

 */
function getDigit(num, i) {
    return Math.floor(num / Math.pow(10, i)) % 10;
}

/**
 * Radix Sort Helper - digitCount
Implement a function called digitCount  which accepts a positive integer and returns the number of digits that the integer has.

Examples

digitCount(1); // 1
digitCount(9); // 1
digitCount(25); // 2
digitCount(314); // 3
digitCount(1234); // 4
digitCount(77777); // 5
 */

function digitCount(num) {
    return num.toString().length;
}

/**
 * Radix Sort Helper - mostDigits
Implement a function called mostDigits  which accepts an array of integers and returns a count of the number of digits for the number in the array with the most digits.

It may help to use your digitCount  code from the previous exercise in this function.

Examples

mostDigits([1, 9, 10, 100, 99]); // 3
mostDigits([100, 1010, 1, 500]); // 4
mostDigits([0, 100000, 400, 12, 8]); // 6
mostDigits([]); // 0
 */
function mostDigits(nums) {
    let max = 0;
    nums.forEach((num) => {
        if (digitCount(num) > max) max = digitCount(num);
    });
    return max;
}

/**
 * Radix Sort
Finally, you're ready to implement Radix Sort! Write a function called radixSort  which accepts an array of numbers and sorts them in ascending order.

You'll need to make use of the helper functions from the previous exercises here. Good luck!

Examples

radixSort([8, 6, 1, 12]); // [1, 6, 8, 12]
radixSort([10, 100, 1, 1000, 10000000]); // [1, 10, 100, 1000, 10000000]
radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]);
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]
 */

function radixSort(nums) {
    const mostDigit = mostDigits(nums);
    for (let i = 0; i < mostDigit; i++) {
        let buckets = Array.from({ length: 10 }, () => []);
        for (let j = 0; j < nums.length; j++) {
            let idx = getDigit(nums[j], i);
            buckets[idx].push(nums[j]);
        }
        nums = [].concat(...buckets);
    }
    return nums;
}

console.log(radixSort([8, 6, 1, 12])); // [1, 6, 8, 12]
console.log(radixSort([10, 100, 1, 1000, 10000000])); // [1, 10, 100, 1000, 10000000]
console.log(radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]));
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]
