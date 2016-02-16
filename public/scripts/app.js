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

        this.size = 10;
        this.speed = '1x';
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
            //ACTION 
        }
    }, {
        key: "getSize",
        value: function getSize() {}
    }, {
        key: "getSpeed",
        value: function getSpeed() {}
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
    }]);

    return Controller;
}();

var Bar = function () {
    function Bar(value) {
        _classCallCheck(this, Bar);

        this.value = value;
    }

    _createClass(Bar, [{
        key: "createBar",
        value: function createBar() {}
    }]);

    return Bar;
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

            // console.log('wtf2');
            this.bars = data;
            var size = this.size;
            // var data = this.bars;

            // var svg = this.selector.append("svg").attr('width', '100%');
            // var svg = d3.select('#bars').append("svg").attr('width', '100%');
            var svg = this.selector;
            svg.selectAll("*").remove();

            var width, height, max;
            // width = d3.select(iElement[0])[0][0].offsetWidth - 5;
            width = 400;
            height = size * 15;
            // 12 = 10(bar height) + 2(margin between bars)
            max = (_Math2 = Math).max.apply(_Math2, _toConsumableArray(data));

            svg.attr('height', height);

            //create the rectangles for the bar chart
            var rects = svg.selectAll("rect").data(data);

            // svg.selectAll("rect")
            //     .data(data)
            rects.enter().append("rect").attr("fill", "#20ADEE").attr("height", 13).attr("width", 0) // initial width of 0 for transition
            // .attr("x", 2)
            .attr("y", function (d, i) {
                return i * 15;
            }) // height + margin between bars
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
        value: function update(data) {
            this.bars = data;
        }
    }, {
        key: "destroy",
        value: function destroy() {}
    }]);

    return Bars;
}();

var C = new Controller();
C.createElements();
C.setEvents();

// var Bs = new Bars(C.size);
var Bs = new Bars(20, '#bars');
setInterval(function () {
    console.log('update');
    var newData = shuffle(generateArray(20));
    // console.log(newData);
    Bs.renderData(newData);
}, 1000);
// Bs.createBars();