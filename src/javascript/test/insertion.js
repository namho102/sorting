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

var array = generateData(100000);
var date1 = new Date();

insertionSort(array);

var date2 = new Date();
var diff = date2 - date1; 
fs.appendFile('insetion_100000.txt',  diff + os.EOL, 'utf8', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
