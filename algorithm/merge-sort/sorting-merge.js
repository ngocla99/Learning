function merge(arr1, arr2) {
    let result = [];

    let start1 = 0;
    let start2 = 0;
    while (start1 < arr1.length && start2 < arr2.length) {
        if (arr1[start1] > arr2[start2]) {
            result.push(arr2[start2]);
            start2++;
        } else {
            result.push(arr1[start1]);
            start1++;
        }
    }
    while (start1 < arr1.length) {
        result.push(arr1[start1]);
        start1++;
    }
    while (start2 < arr2.length) {
        result.push(arr2[start2]);
        start2++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

console.log(mergeSort([10, 24, 76, 73]));
