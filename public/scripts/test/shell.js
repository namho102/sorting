'use strict';

var fs = require('fs');
var os = require("os");

function generateData(size) {
    return shuffle(generateArray(size));
}

function generateArray(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        // arr.push(i + 1);
        arr[arr.length] = i + 1;
    } //43% faster

    return arr;
}

function shuffle(arr) {
    var currentIndex = arr.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

function shellSort(values) {
    //main

    for (var h = values.length; h = parseInt(h / 2);) {
        for (var i = h; i < values.length; i++) {
            var k = values[i];
            for (var j = i; j >= h && k < values[j - h]; j -= h) {
                values[j] = values[j - h];
            }

            values[j] = k;
        }
    }

    //end main
}

var array = generateData(10000000);
var date1 = new Date();

// console.log(array);
shellSort(array);
// console.log(array);

var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('shell_10000000.txt', diff + os.EOL, 'utf8', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});