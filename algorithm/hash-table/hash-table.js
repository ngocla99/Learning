class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        let WEIRD_TIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            // map "a" to 1, "b" to 2, "c" to 3, etc
            let char = key[i];
            let value = char.charCodeAt(key) - 96;
            total = (total * WEIRD_TIME + value) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        let idx = this._hash(key);
        if (!this.keyMap[idx]) this.keyMap[idx] = [];
        this.keyMap[idx].push([key, value]);
    }

    get(key) {
        let idx = this._hash(key);
        if (this.keyMap[idx]) {
            for (let i = 0; i < this.keyMap[idx].length; i++) {
                if (this.keyMap[idx][i][0] === key) {
                    return this.keyMap[idx][i];
                }
            }
        }
        return undefined;
    }

    values() {
        let valuesArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) valuesArr.push(this.keyMap[i][j][1]);
                }
            }
        }

        return valuesArr;
    }

    keys() {
        let keysArr = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!keysArr.includes(this.keyMap[i][j][0])) keysArr.push(this.keyMap[i][j][0]);
                }
            }
        }

        return keysArr;
    }
}

const data = new HashTable();
data.set('pink', '#000');
data.set('pink', '#000s');
data.set('pinkss', '#000');
data.set('yellow', '#0dc');
data.set('white', '#ddc');
data.set('red', '#ecc');
data.set('are you done?', 'yes');
console.log(data.get('pink'));
console.log(data.get('pink'));
console.log(data.get('red'));
console.log(data.get('are you done?1'));
console.log(data.values());
console.log(data.keys());
