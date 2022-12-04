/**
Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

Examples:

isSubsequence('hello', 'hello world'); // true
isSubsequence('sing', 'sting'); // true
isSubsequence('abc', 'abracadabra'); // true
isSubsequence('abc', 'acb'); // false (order matters)
Your solution MUST have AT LEAST the following complexities:

Time Complexity - O(N + M)
Space Complexity - O(1)
 */
function isSubsequence(str1, str2) {
    let i = 0;
    let j = 0;
    while (i < str1.length) {
        while (j < str2.length) {
            if (str1[i] === str2[j]) {
                i++;
                break;
            } else {
                j++;
            }
        }
        if (j === str2.length) return false;
    }
    return true;
}

/**
Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.
Bonus Constraints:
Time: O(N)
Space: O(1)
Sample Input:

averagePair([1,2,3],2.5) // true
averagePair([1,3,3,5,6,7,10,12,19],8) // true
averagePair([-1,0,3,4,5,6], 4.1) // false
averagePair([],4) // false
 */

function averagePair(arr, avg) {
    // add whatever parameters you deem necessary - good luck!
    if (arr.length < 2) return false;
    let i = 0;
    let j = arr.length - 1;

    while (i < j) {
        if (arr[i] + arr[j] > avg * 2) j--;
        if (arr[i] + arr[j] < avg * 2) i++;
        if (arr[i] + arr[j] === avg * 2) return true;
    }
    return false;
}

console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8));
