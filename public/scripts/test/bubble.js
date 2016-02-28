'use strict';

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

var fs = require('fs');
var os = require("os");

function bubbleSort(a) {

    //main
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    //end main
}

var array = generateData(100000);
var date1 = new Date();

bubbleSort(array);

var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('bubble_100000.txt', diff + os.EOL, 'utf8', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});