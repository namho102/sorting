"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import async from 'async';

// console.log(async);

var algsList = ["Bubble", "Selection", "Insertion", "Quick", "Merge", "Heap"];
var size = [5, 10, 20, 30, 50, 70, 100];
var speed = ['1x', '2x', '3x', '4x', '5x'];

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.size = 100;
        this.speed = '3x';

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

            speed.forEach(function (el, i) {
                d3.select("#speed").append("li").append("a").attr('data-speed', i * 1.5).attr('class', 'option').text(el);
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

            $('#speed a').click(function (evt) {
                _this.size = $(evt.target).text();
                $('#speed a').removeClass('selected');
                $(evt.target).addClass('selected');
            });

            /*
            Reference: http://jsfiddle.net/BB3JK/47/
            */

            $('select').each(function () {

                var $this = $(this),
                    numberOfOptions = $(this).children('option').length;
                // console.log($this);
                $this.addClass('select-hidden');
                $this.wrap('<div class="select"></div>');
                $this.after('<div class="select-styled"></div>');

                var $styledSelect = $this.next('div.select-styled');
                $styledSelect.text($this.children('option').eq(0).text());

                var $list = $('<ul />', {
                    'class': 'select-options'
                }).insertAfter($styledSelect);

                for (var i = 0; i < numberOfOptions; i++) {
                    $('<li />', {
                        text: $this.children('option').eq(i).text(),
                        rel: $this.children('option').eq(i).val()
                    }).appendTo($list);
                }

                var $listItems = $list.children('li');

                $styledSelect.click(function (e) {
                    e.stopPropagation();
                    $('div.select-styled.active').each(function () {
                        $(this).removeClass('active').next('ul.select-options').hide();
                    });
                    $(this).toggleClass('active').next('ul.select-options').toggle();
                });

                $listItems.click(function (e) {
                    e.stopPropagation();
                    $styledSelect.text($(this).text()).removeClass('active');
                    $this.val($(this).attr('rel'));
                    $list.hide();
                    //console.log($this.val());
                });

                $(document).click(function () {
                    $styledSelect.removeClass('active');
                    $list.hide();
                });
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

        // console.log('wtf');
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

            console.log('rendering. . .', this.root);
            // console.log(data);
            this.bars = data;
            var size = this.size;
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
        this.bars2 = new Bars(this.controller.size, '#bars2');

        //Tasks
        this.tasks = new Task(this.bars);
        this.tasks2 = new Task(this.bars2);
        // this.size = controls.size;

        // Set default algorithms
        this.sortMenu = [bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort];
        this.pos = [0];

        this.setEvents();
    }

    _createClass(GraphicalSort, [{
        key: "setDefaults",
        value: function setDefaults() {}
    }, {
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
                _this2.pos[_this2.pos.length] = $(evt.target).data('pos');
                console.log(_this2.pos);
                // $('#algs a').removeClass('selected');
                $(evt.target).toggleClass('selected');

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

            this.tasks.clean();
            this.tasks2.clean();

            this.tasks.cancel();
            this.tasks2.cancel();

            var newSize = this.controller.getSize();
            var newData = generateData(newSize);
            var newData2 = generateData(newSize);
            console.log(newData);
            // console.log(newSize);

            this.bars.update(newSize, newData);
            this.bars2.update(newSize, newData2);
            this.bars.renderData(newData);
            this.bars2.renderData(newData2);
        }
    }, {
        key: "start",
        value: function start() {
            var _this3 = this;

            console.log('starting');
            // this.tasks.clean();
            // this.tasks2.clean();

            // this.tasks.cancel();
            // this.tasks2.cancel();

            var arr = [0, 1, 2, 3, 4, 5];
            var random = shuffle(arr);

            async.parallel([function () {
                _this3.sortMenu[random[2]](_this3.bars, _this3.tasks);
                // this.sortMenu[3](this.bars2, this.tasks2);
            }, function () {
                _this3.sortMenu[random[1]](_this3.bars2, _this3.tasks2);
            }]);

            // console.log(this.getPos());
            // bubbleSort(this.bars, this.tasks);
            // this.sortMenu[this.getPos()](this.bars, this.tasks);

            // this.sortMenu[5](this.bars2, this.tasks2);
            // setTimeout(() => {
            // 	this.sortMenu[3](this.bars2, this.tasks2);
            // }, 0);
            // this.sortMenu[random[2]](this.bars, this.tasks);

            // this.sortMenu[random[1]](this.bars2, this.tasks2);

            //hot test
            // var arr = [1, 2];
            // arr.forEach((el) => {
            //     this.sortMenu[el](this.bars, this.tasks);
            // })
            /*		setTimeout(() => {
            			this.sortMenu[3](this.bars2, this.tasks2);
            		}, 0);
            				setTimeout(() => {
            			this.sortMenu[2](this.bars, this.tasks);
            		}, 0);*/

            // setTimeout(() => {
            // 	this.sortMenu[2](this.bars, this.tasks);
            // 	setTimeout(() => {
            // 		this.sortMenu[3](this.bars2, this.tasks2);
            // 	}, 0);
            // }, 0);

            // this.sortMenu[2](this.bars2, this.tasks2);
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

        this.timeoutID = undefined;
    }

    _createClass(Task, [{
        key: "processItems",
        value: function processItems() {
            // var delay = this.delay;
            var bars = this.bars;
            var queue = this.tasks;
            var self = this;
            // console.log(queue);

            function processNextBatch() {
                var nextItem;
                nextItem = queue.shift();
                if (!nextItem) return;

                bars.renderData(nextItem);

                self.timeoutID = setTimeout(processNextBatch, self.getDelay());

                // setTimeout(processNextBatch, self.getDelay());
                // setTimeout(processNextBatch, delay);
            }
            processNextBatch();
        }

        // _setTimeout(func) {
        //     setTimeout(func, this.getDelay());
        // }

    }, {
        key: "cancel",
        value: function cancel(func) {
            clearTimeout(this.timeoutID);
        }
    }, {
        key: "pushValues",
        value: function pushValues(values) {
            var tempVar = values.slice(0); //creating not copying, !IMPORTANT !FUCKING ERROR
            this.tasks.push(tempVar);
            // console.log(this.tasks);
        }
    }, {
        key: "getDelay",
        value: function getDelay() {
            var speed = $('#speed').find(".selected").data('speed');
            return speed * 10;
        }
    }, {
        key: "clean",
        value: function clean() {
            this.tasks = [];
        }
    }]);

    return Task;
}();

//Sorting Functions

function bubbleSort(barObj, taskObj) {
    console.log('bubble sort starting', barObj.bars);
    var values = barObj.bars;

    //main
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < values.length; i++) {
            taskObj.pushValues(values);

            if (values[i - 1] > values[i]) {
                done = false;


                // var tempValues = values.slice(0);
                // taskObj.pushValues(tempValues);
                // taskObj.pushValues(values);
                var _ref = [values[i], values[i - 1]];
                values[i - 1] = _ref[0];
                values[i] = _ref[1];
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
    console.log('selection sort starting', barObj.bars);
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
    console.log('insertion sort starting', barObj.bars);
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
    console.log('quick sort starting', barObj.bars);
    var values = barObj.bars;

    //main
    function _quickSort(left, right) {
        taskObj.pushValues(values);

        if (left < right) {
            var pivot = values[left + Math.floor((right - right) / 2)],
                left_new = left,
                right_new = right;

            do {
                taskObj.pushValues(values);

                while (values[left_new] < pivot) {
                    taskObj.pushValues(values);
                    left_new += 1;
                }
                while (pivot < values[right_new]) {
                    taskObj.pushValues(values);
                    right_new -= 1;
                }
                if (left_new <= right_new) {
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
    console.log('merge sort starting', barObj.bars);
    var values = barObj.bars;

    //main

    function _mergeSort(alist) {
        taskObj.pushValues(alist);

        if (alist.length > 1) {
            var mid = Math.floor(alist.length / 2);
            var lefthalf = alist.slice(0, mid),
                righthalf = alist.slice(mid);

            _mergeSort(lefthalf);
            _mergeSort(righthalf);

            var i = 0,
                j = 0,
                k = 0;
            while (i < lefthalf.length && j < righthalf.length) {
                taskObj.pushValues(alist);
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
                taskObj.pushValues(alist);
                alist[k] = lefthalf[i];
                i = i + 1;
                k = k + 1;
            }

            while (j < righthalf.length) {
                taskObj.pushValues(alist);
                alist[k] = righthalf[j];
                j = j + 1;
                k = k + 1;
            }
        }
    }

    //end main

    //test

    /*	function _mergeSort(array, first, last) {
    		// var array = values;
    		// console.log(array);
    		taskObj.pushValues(values);
    
    		first = (first === undefined) ? 0 : first;
    		last = (last === undefined) ? array.length - 1 : last;
    		if (last - first < 1) {
    			return
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
    
    				var from = m + 1, to = f;
    				// var temp = array[from];
    				array.insert(array[from], to)
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
    	}*/

    _mergeSort(values);
    //end test

    // console.log(count);
    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    taskObj.processItems();
    console.log(values);
}

function heapSort(barObj, taskObj) {
    console.log('heap sort starting', barObj.bars);
    var values = barObj.bars;

    //main

    function _heapSort(arr) {
        putArrayInHeapOrder(arr);
        var end = arr.length - 1;
        while (end > 0) {
            taskObj.pushValues(values);
            var _ref3 = [arr[end], arr[0]];
            arr[0] = _ref3[0];
            arr[end] = _ref3[1];

            siftElementDownHeap(arr, 0, end);
            end -= 1;
        }
    }

    function putArrayInHeapOrder(arr) {
        var i;
        i = arr.length / 2 - 1;
        i = Math.floor(i);
        while (i >= 0) {
            taskObj.pushValues(values);
            siftElementDownHeap(arr, i, arr.length);
            i -= 1;
        }
    }

    function siftElementDownHeap(heap, i, max) {
        var i_big, c1, c2;
        while (i < max) {
            taskObj.pushValues(values);
            i_big = i;
            c1 = 2 * i + 1;
            c2 = c1 + 1;
            if (c1 < max && heap[c1] > heap[i_big]) i_big = c1;
            if (c2 < max && heap[c2] > heap[i_big]) i_big = c2;
            if (i_big == i) return;
            var _ref4 = [heap[i_big], heap[i]];
            heap[i] = _ref4[0];
            heap[i_big] = _ref4[1];

            i = i_big;
        }
    }

    _heapSort(values);
    //end main

    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    taskObj.processItems();
    console.log(values);
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