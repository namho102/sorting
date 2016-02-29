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

function quickSort(values) {

    //main
    function _quickSort(left, right) {
        if (left < right) {
            var pivot = values[left + ~~((right - right) / 2)],
                left_new = left,
                right_new = right;

            do {
                while (values[left_new] < pivot) {
                    left_new += 1;
                }
                while (pivot < values[right_new]) {
                    right_new -= 1;
                }
                if (left_new <= right_new) {
                    [values[left_new], values[right_new]] = [values[right_new], values[left_new]];
                    left_new += 1;
                    right_new -= 1;
                }
            } while (left_new <= right_new);

            _quickSort(left, right_new);
            _quickSort(left_new, right);

        }
    }

    _quickSort(0, values.length - 1);

    //end main

}

var array = generateData(1000000);
var date1 = new Date();

// console.log(array);
quickSort(array);
// console.log(array);

var date2 = new Date();
var diff = date2 - date1; 
fs.appendFile('quick_1000000.txt',  diff + os.EOL, 'utf8', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
