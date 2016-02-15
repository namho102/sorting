"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var algsList = ["Bubble", "Selection", "Shaker", "Insertion", "Shell", "Quick", "Merge", "Heap", "Bogo"];
var size = [5, 10, 20, 30, 70, 100];
var speed = ['1x', '2x', '3x'];

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
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
    }]);

    return Controller;
}();

var C = new Controller();
C.createElements();