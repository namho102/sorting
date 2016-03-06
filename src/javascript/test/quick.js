var fs = require('fs');
var os = require("os");
var helper = require('./helper');

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

var size = +process.argv[2];
var array = helper.generateData(size);
var date1 = new Date();
// console.log(array);
quickSort(array);
// console.log(array);
// var diff = date2 - date1;
var diff = new Date() - date1;
fs.appendFile('quick_' + size + '.txt', diff + os.EOL, 'utf8', (err) => {
	if (err) throw err;
	console.log('It\'s saved!');
});
