// EX: Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman

function anagrams(str1, str2) {
    if (str1 === '' && str2 === '') return true;
    if (!str1 || !str2) return false;

    let obj1 = {};
    let obj2 = {};
    for (let char of str1) {
        obj1[char] = (obj1[char] || 0) + 1;
    }
    for (let char of str2) {
        obj2[char] = (obj2[char] || 0) + 1;
    }

    for (let key in obj1) {
        if (!(key in obj2)) return false;
        if (obj1[key] !== obj2[key]) return false;
    }

    return true;
}

console.log(anagrams('aaz twww', 'zaa wtww'));
