'use strict';

var fs = require('fs');
var os = require("os");
var helper = require('./helper');

function insertionSort(values) {

    //main
    for (var i = 0; i < values.length; i++) {
        var k = values[i];
        for (var j = i; j > 0 && k < values[j - 1]; j--) {
            values[j] = values[j - 1];
        }
        values[j] = k;
    }
    //end main
}

var size = +process.argv[2];
var array = helper.generateData(size);
var date1 = new Date();
// console.log(array);
insertionSort(array);
// console.log(array);
var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('insertion_' + size + '.txt', diff + os.EOL, 'utf8', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});