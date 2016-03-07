var fs = require('fs');
var os = require("os");
var helper = require('./helper');

function heapSort(arr) {
    putArrayInHeapOrder(arr);
    var end = arr.length - 1;
    while (end > 0) {
        [arr[0], arr[end]] = [arr[end], arr[0]];
        siftElementDownHeap(arr, 0, end);
        end -= 1
    }
}

function putArrayInHeapOrder(arr) {
    var i = arr.length / 2 - 1;
    i = ~~i;
    while (i >= 0) {
        siftElementDownHeap(arr, i, arr.length);
        i -= 1;
    }
}

function siftElementDownHeap(heap, i, max) {
    var i_big, c1, c2;
    while (i < max) {
        i_big = i;
        c1 = 2 * i + 1;
        c2 = c1 + 1;
        if (c1 < max && heap[c1] > heap[i_big])
            i_big = c1;
        if (c2 < max && heap[c2] > heap[i_big])
            i_big = c2;
        if (i_big == i) return;
        var temp = heap[i];
        heap[i] = heap[i_big];
        heap[i_big] = temp;
        i = i_big;
    }
}

var size = +process.argv[2];
var array = helper.generateData(size);
var date1 = new Date();
// console.log(array);
heapSort(array);
// console.log(array);
// var diff = date2 - date1;
var diff = new Date() - date1;

fs.appendFile('heap_' + size + '.txt', diff + os.EOL, 'utf8', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
});
