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
            tmp = values[i];
            values[i] = values[minIndex];
            values[minIndex] = tmp;
        }
    }
    //end main

}

var array = generateData(100000);
var date1 = new Date();

selectionSort(array);

var date2 = new Date();
var diff = date2 - date1; 
fs.appendFile('selection_100000.txt',  diff + os.EOL, 'utf8', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
