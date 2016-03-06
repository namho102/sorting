var fs = require('fs');
var os = require("os");
var helper = require('./helper');

function bubbleSort(a) {

	//main
	var swapped;
	do {
		swapped = false;
		for (var i = 0; i < a.length - 1; i++) {
			if (a[i] > a[i + 1]) {
				var temp = a[i];
				a[i] = a[i + 1];
				a[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
	//end main

}

var size = +process.argv[2];
var array = helper.generateData(size);
var date1 = new Date();
// console.log(array);
bubbleSort(array);
// console.log(array);
var date2 = new Date();
var diff = date2 - date1;
fs.appendFile('bubble_' + size + '.txt', diff + os.EOL, 'utf8', (err) => {
	if (err) throw err;
	console.log('It\'s saved!');
});