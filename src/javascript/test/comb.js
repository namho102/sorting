var fs = require('fs');
var os = require("os");

function generateData(size) {
    return shuffle(generateArray(size));
}

function generateArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++)
    // arr.push(i + 1);
        arr[arr.length] = i + 1; //43% faster

    return arr;
}

function shuffle(arr) {
    var currentIndex = arr.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}


function combSort(values) {
    var gap = values.length, i, j;
    while (gap > 1) {
        gap = gap / 1.247340350103979 | 0;
        if (gap == 9 || gap == 10) {
            gap = 11;
        }

        for (i = 0; i < values.length - gap + 1; i++) {
            j = i + gap;
            if (values[i] > values[j]) {
                [values[i], values[j]] = [values[j], values[i]];

            }
        }
    }
}

var array = generateData(1000000);
var date1 = new Date();

// console.log(array);
combSort(array);
// console.log(array);

var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('comb_1000000.txt', diff + os.EOL, 'utf8', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
});