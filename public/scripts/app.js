"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var algsList = ["Bubble", "Selection", "Insertion", "Quick", "Merge", "Heap"];
var size = [5, 10, 20, 30, 50, 70, 100];
var speed = ['1x', '2x', '3x'];

var Controller = function () {
	function Controller() {
		_classCallCheck(this, Controller);

		this.size = 20;
		this.speed = '1x';

		this.createElements();
		this.setEvents();
	}

	_createClass(Controller, [{
		key: "createElements",
		value: function createElements() {
			//MENU BUTTONSET
			algsList.forEach(function (el, i) {
				d3.select("#algs").append("li").append("a").attr('data-pos', i).attr('class', 'option').text(el);
			});

			size.forEach(function (el) {
				d3.select("#size").append("li").append("a").attr('class', 'option').text(el);
			});

			speed.forEach(function (el) {
				d3.select("#speed").append("li").append("a").attr('class', 'option').text(el);
			});

			$("a:contains(" + this.size + ")").addClass('selected');
			$("a:contains(" + this.speed + ")").addClass('selected');
			$("#algs").find('a').first().addClass('selected');
		}
	}, {
		key: "setEvents",
		value: function setEvents() {
			var _this = this;

			$('#size a').click(function (evt) {
				_this.size = $(evt.target).text();
				$('#size a').removeClass('selected');
				$(evt.target).addClass('selected');
			});
		}
	}, {
		key: "getSize",
		value: function getSize() {
			return $('#size').find(".selected").text();
		}
	}]);

	return Controller;
}();

var Bars = function () {
	function Bars(size, root) {
		_classCallCheck(this, Bars);

		console.log('wtf');
		this.size = size;
		this.root = root;
		this.bars = shuffle(generateArray(this.size));

		//initial state
		this.selector = d3.select(root).append("svg");
		// this.selector.append("svg").attr('width', '100%');
		this.renderData(this.bars);
	}

	_createClass(Bars, [{
		key: "getMax",
		value: function getMax() {
			var _Math;

			return (_Math = Math).max.apply(_Math, _toConsumableArray(this.bars));
		}
	}, {
		key: "renderData",
		value: function renderData(data) {
			var _Math2;

			console.log('rendering. . .');
			// console.log(data);
			this.bars = data;
			var size = this.size;
			// console.log(data);
			// var data = this.bars;

			// var svg = this.selector.append("svg").attr('width', '100%');
			// var svg = d3.select('#bars').append("svg").attr('width', '100%');
			var svg = this.selector;
			svg.selectAll("*").remove();

			var width, height, rectHeight, rectMargin, max;
			// width = d3.select(iElement[0])[0][0].offsetWidth - 5;
			width = 450;
			height = 450;
			// rectHeight = 13;
			rectMargin = 1;
			// height = size * (rectHeight + rectMargin);
			rectHeight = height / size - rectMargin;

			max = (_Math2 = Math).max.apply(_Math2, _toConsumableArray(data));

			svg.attr('height', height);

			//create the rectangles for the bar chart
			var rects = svg.selectAll("rect").data(data);

			// svg.selectAll("rect")
			//     .data(data)
			rects.enter().append("rect").attr("class", 'bar').attr("width", 0) // initial width of 0 for transition
			.attr("height", rectHeight)
			// .attr("fill", getRandomColor())
			// .attr("x", 2)
			.attr("y", function (d, i) {
				return i * (rectHeight + rectMargin);
			})
			// .transition()
			// .duration(500)
			.attr("width", function (d) {
				return d / (max / width); // width based on scale
			});

			rects.exit().remove();
			// this.selector.selectAll().exit().remove();
		}
	}, {
		key: "update",
		value: function update(size, data) {
			this.size = size;
			this.bars = data;
		}
	}, {
		key: "destroy",
		value: function destroy() {}
	}]);

	return Bars;
}();

var GraphicalSort = function () {
	function GraphicalSort() {
		_classCallCheck(this, GraphicalSort);

		//Controller
		this.controller = new Controller();

		//Bars
		this.bars = new Bars(this.controller.size, '#bars');

		//Tasks
		this.tasks = new Task(this.bars);
		// this.size = controls.size;
		// Set default algorithms
		this.sortMenu = [bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort];
		this.pos = 0;

		this.setEvents();
	}

	_createClass(GraphicalSort, [{
		key: "setEvents",
		value: function setEvents() {
			var _this2 = this;

			$('.controls__group').click(function () {
				_this2.reload();
			});

			$('#reload').click(function () {
				_this2.reload();
			});

			$('#start').click(function () {
				_this2.start();
			});

			$('#algs a').click(function (evt) {
				_this2.algs = $(evt.target).data('pos');
				// console.log(this.algs);
				$('#algs a').removeClass('selected');
				$(evt.target).addClass('selected');

				_this2.reload();
			});
		}
	}, {
		key: "getPos",
		value: function getPos() {
			return $('#algs').find(".selected").data('pos');
		}
	}, {
		key: "reload",
		value: function reload() {
			console.log('reloading');
			var newSize = this.controller.getSize();
			var newData = generateData(newSize);
			console.log(newData);
			// console.log(newSize);
			this.bars.update(newSize, newData);
			this.bars.renderData(newData);
		}
	}, {
		key: "start",
		value: function start() {
			console.log('starting');
			this.tasks.clean();
			// console.log(this.getPos());
			// bubbleSort(this.bars, this.tasks);
			this.sortMenu[this.getPos()](this.bars, this.tasks);
		}
	}]);

	return GraphicalSort;
}();

var Task = function () {
	function Task(bars) {
		_classCallCheck(this, Task);

		this.bars = bars;
		this.tasks = [];
		this.delay = 40;
	}

	_createClass(Task, [{
		key: "processItems",
		value: function processItems(delay) {
			delay = delay || this.delay;
			var bars = this.bars;
			var queue = this.tasks;
			var self = this;

			function processNextBatch() {
				var nextItem;
				nextItem = queue.shift();
				if (!nextItem) return;
				// console.log(nextItem);
				bars.renderData(nextItem);
				// processItem(nextItem);
				setTimeout(processNextBatch, self.delay);
				// setTimeout(processNextBatch, delay);
			}
			processNextBatch();
		}
	}, {
		key: "pushValues",
		value: function pushValues(values) {
			var tempVar = values.slice(0); //creating not copying, !IMPORTANT !FUCKING ERROR
			this.tasks.push(tempVar);
			// console.log(this.tasks);
		}
	}, {
		key: "clean",
		value: function clean() {
			this.tasks = [];
		}
	}]);

	return Task;
}();

//Sample Sort


function bubbleSort(barObj, taskObj) {
	var values = barObj.bars;

	//main
	var done = false;
	while (!done) {
		done = true;
		for (var i = 1; i < values.length; i++) {
			taskObj.pushValues(values);

			if (values[i - 1] > values[i]) {
				done = false;
				// [values[i - 1], values[i]] = [values[i], values[i - 1]];
				var _ref = [values[i], values[i - 1]];
				values[i - 1] = _ref[0];
				// var tempValues = values.slice(0);

				values[i] = _ref[1];

				// taskObj.pushValues(tempValues);
				// taskObj.pushValues(values);
			}
		}
	}
	//end main

	taskObj.pushValues(values);
	console.log(taskObj.tasks.length);
	taskObj.processItems();
	console.log(values);
}

function selectionSort(barObj, taskObj) {
	console.log('selection sort starting');
	var values = barObj.bars;

	//main
	var minIndex, tmp;
	for (var i = 0; i < values.length - 1; i++) {
		minIndex = i;
		for (var j = i + 1; j < values.length; j++) {
			taskObj.pushValues(values);

			if (values[j] < values[minIndex]) {
				minIndex = j;
			}
			// taskObj.pushValues(values);  
		}

		if (minIndex != i) {
			tmp = values[i];
			values[i] = values[minIndex];
			values[minIndex] = tmp;
			// taskObj.pushValues(values);
		}
	}
	//end main

	taskObj.pushValues(values);
	console.log(taskObj.tasks.length);
	taskObj.processItems();
	console.log(values);
}

function insertionSort(barObj, taskObj) {
	console.log('insertion sort starting');
	var values = barObj.bars;

	//main
	for (var i = 0; i < values.length; i++) {
		var k = values[i];
		for (var j = i; j > 0 && k < values[j - 1]; j--) {
			taskObj.pushValues(values);
			values[j] = values[j - 1];
		}

		values[j] = k;
	}
	//end main

	taskObj.pushValues(values);
	console.log(taskObj.tasks.length);
	taskObj.processItems();
	console.log(values);
}

function quickSort(barObj, taskObj) {
	console.log('quick sort starting');
	var values = barObj.bars;
	// var count = 0;
	//main
	function _quickSort(left, right) {
		// count++;
		taskObj.pushValues(values);
		if (left < right) {
			var pivot = values[left + Math.floor((right - right) / 2)],
			    left_new = left,
			    right_new = right;

			do {
				// count++;
				taskObj.pushValues(values);
				while (values[left_new] < pivot) {
					// count++;
					taskObj.pushValues(values);
					left_new += 1;
				}
				while (pivot < values[right_new]) {
					// count++;
					taskObj.pushValues(values);
					right_new -= 1;
				}
				if (left_new <= right_new) {
					// swap(left_new, right_new);
					var _ref2 = [values[right_new], values[left_new]];
					values[left_new] = _ref2[0];
					values[right_new] = _ref2[1];
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

	// console.log(count);
	taskObj.pushValues(values);
	console.log(taskObj.tasks.length);
	taskObj.processItems();
	console.log(values);
}

function mergeSort(barObj, taskObj) {
	console.log('merge sort starting');
	var values = barObj.bars;

	//main
	/*    function merge(left, right, arr) {
         // console.log(arr);
         console.log(left, right, arr);
         var a = 0;
 
         while (left.length && right.length) {
             // taskObj.pushValues(arr);
             arr[a++] = (right[0] < left[0]) ? right.shift() : left.shift();
         }
         while (left.length) {
             // taskObj.pushValues(arr);
             arr[a++] = left.shift();
         }
         while (right.length) {
             // taskObj.pushValues(arr);
             arr[a++] = right.shift();
         }
     }
 
     function _mergeSort(arr, tmp, len) {
         // console.log(arr, tmp);
         taskObj.pushValues(arr);
         if (len === 1) { return; }
 
         var m = Math.floor(len / 2),
             tmp_l = tmp.slice(0, m),
             tmp_r = tmp.slice(m);
 
         _mergeSort(tmp_l, arr.slice(0, m), m);
         _mergeSort(tmp_r, arr.slice(m), len - m);
         merge(tmp_l, tmp_r, arr);
     }
 
     _mergeSort(values, values.slice(), values.length);*/
	//end main

	//test

	function _mergeSort(array, first, last) {
		// var array = values;
		// console.log(array);
		taskObj.pushValues(values);

		first = first === undefined ? 0 : first;
		last = last === undefined ? array.length - 1 : last;
		if (last - first < 1) {
			return;
		}
		var middle = Math.floor((first + last) / 2);
		_mergeSort(array, first, middle);
		_mergeSort(array, middle + 1, last);

		var f = first;
		var m = middle;

		while (f <= m && m + 1 <= last) {
			taskObj.pushValues(values);
			if (array[f] >= array[m + 1]) {
				// array.insertBefore(m + 1, f);

				var from = m + 1,
				    to = f;
				// var temp = array[from];
				array.insert(array[from], to);
				// for (var i = array.length - 1; to <= i; i--) {
				// 	// taskObj.pushValues(values);
				// 	array[i + 1] = array[i];
				// }
				// array[to] = temp;
				if (to < from) {
					array.splice(from + 1, 1);
				}

				m++;
			}
			f++;
		}
	}

	_mergeSort(values);
	//end test

	// console.log(count);
	taskObj.pushValues(values);
	console.log(taskObj.tasks.length);
	taskObj.processItems();
	console.log(values);
}

function heapSort() {
	console.log('heap sort starting');
}

var gs = new GraphicalSort();

// var Bs = new Bars(C.size);
// var Bs = new Bars(20, '#bars');
// var Bs2 = new Bars(20, '#bars2');
//sample data-binding
// setInterval(() => {
//     console.log('update');
//     var newData = shuffle(generateArray(20));
//     // console.log(newData);
//     Bs.renderData(newData);
// }, 1000)
// // // Bs.createBars();