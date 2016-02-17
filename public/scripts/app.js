"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var algsList = ["Bubble", "Selection", "Shaker", "Insertion", "Shell", "Quick", "Merge", "Heap", "Bogo"];
var size = [5, 10, 20, 30, 70, 100];
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
            algsList.forEach(function (el) {
                d3.select("#algs").append("li").append("a").attr('class', 'option').text(el);
            });

            size.forEach(function (el) {
                d3.select("#size").append("li").append("a").attr('class', 'option').text(el);
            });

            speed.forEach(function (el) {
                d3.select("#speed").append("li").append("a").attr('class', 'option').text(el);
            });

            $("a:contains(" + this.size + ")").addClass('selected');
            $("a:contains(" + this.speed + ")").addClass('selected');
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
        //Set default algorithms
        // var sortMenu = {
        //     "Bubble": bubbleSort,
        //     "Selection": selectionSort,
        //     "Shaker": shakerSort,
        //     "Insertion": insertionSort,
        //     "Shell": shellSort,
        //     "Quick": quickSort,
        //     "Merge": mergeSort,
        //     "Heap": heapSort
        // }

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
            bubbleSort(this.bars, this.tasks);
        }
    }]);

    return GraphicalSort;
}();

var Task = function () {
    function Task(bars) {
        _classCallCheck(this, Task);

        this.bars = bars;
        this.tasks = [];
    }

    _createClass(Task, [{
        key: "processItems",
        value: function processItems(delay) {
            delay = delay || this.delay;
            var bars = this.bars;
            var queue = this.tasks;
            function processNextBatch() {
                console.log(delay);
                var nextItem;

                nextItem = queue.shift();
                if (!nextItem) return;
                // console.log(nextItem);
                bars.renderData(nextItem);
                // processItem(nextItem);
                setTimeout(processNextBatch, 50);
                // setTimeout(processNextBatch, delay);
            }
            processNextBatch();
        }
    }, {
        key: "pushValues",
        value: function pushValues(values) {
            // console.log(this.tasks)
            this.tasks.push(values);
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

    var done = false;
    // var counter = 0;
    while (!done) {
        done = true;
        for (var i = 1; i < values.length; i++) {
            if (values[i - 1] > values[i]) {
                done = false;
                var _ref = [values[i], values[i - 1]];
                values[i - 1] = _ref[0];
                values[i] = _ref[1];

                var tempVar = values.slice(0);
                taskObj.pushValues(tempVar);
                // console.log(values);
                // sleepFor(100);
                // console.log(values);
                // barObj.renderData(values);
                // (function () {
                //     setTimeout(() => {
                //         console.log(values);
                //         barObj.renderData(values);
                //     }, 1000 * counter++);
                // })();
            }
        }
    }
    console.log(taskObj.tasks);
    // barObj.renderData(values);
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