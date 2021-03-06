'use strict';

var fs = require('fs');
var os = require("os");
var helper = require('./helper');

function selectionSort(values) {
    //main
    var minIndex, tmp;
    for (var i = 0; i < values.length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < values.length; j++) {
            if (values[j] < values[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            var temp = values[i];
            values[i] = values[minIndex];
            values[minIndex] = temp;
        }
    }
    //end main
}

var size = +process.argv[2];
var array = helper.generateData(size);
var date1 = new Date();
// console.log(array);
selectionSort(array);
// console.log(array);
// var diff = date2 - date1;
var diff = new Date() - date1;
fs.appendFile('selection_' + size + '.txt', diff + os.EOL, 'utf8', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});