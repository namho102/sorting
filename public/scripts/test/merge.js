'use strict';

var fs = require('fs');
var os = require("os");
var helper = require('./helper');

function mergeSort(alist) {

    //main
    if (alist.length > 1) {
        var mid = ~ ~(alist.length / 2);
        var lefthalf = alist.slice(0, mid),
            righthalf = alist.slice(mid);

        mergeSort(lefthalf);
        mergeSort(righthalf);

        var i = 0,
            j = 0,
            k = 0;
        while (i < lefthalf.length && j < righthalf.length) {
            if (lefthalf[i] < righthalf[j]) {
                alist[k] = lefthalf[i];
                i = i + 1;
            } else {
                alist[k] = righthalf[j];
                j = j + 1;
            }

            k = k + 1;
        }

        while (i < lefthalf.length) {
            alist[k] = lefthalf[i];
            i = i + 1;
            k = k + 1;
        }

        while (j < righthalf.length) {
            alist[k] = righthalf[j];
            j = j + 1;
            k = k + 1;
        }
    }
    //end main
}

var size = +process.argv[2];
var array = helper.generateData(size);
var date1 = new Date();
// console.log(array);
mergeSort(array);
// console.log(array);
// var diff = date2 - date1;
var diff = new Date() - date1;
fs.appendFile('merge_' + size + '.txt', diff + os.EOL, 'utf8', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});