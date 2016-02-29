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

function mergeSort(alist) {

    //main
    if (alist.length > 1) {
        var mid = ~~(alist.length / 2);
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



var array = generateData(1000000);
var date1 = new Date();

// console.log(array);
mergeSort(array);
// console.log(array);

var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('merge_1000000.txt', diff + os.EOL, 'utf8', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
});