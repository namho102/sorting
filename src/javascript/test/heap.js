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
    var i;
    i = arr.length / 2 - 1;
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
        [heap[i], heap[i_big]] = [heap[i_big], heap[i]];
        i = i_big;
    }
}


var array = generateData(1000000);
var date1 = new Date();

// console.log(array);
heapSort(array);
// console.log(array);

var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('heap_1000000.txt', diff + os.EOL, 'utf8', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
});