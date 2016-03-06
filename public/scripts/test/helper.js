"use strict";

exports.generateData = function (size) {
	var arr = Array.from(new Array(size), function (val, index) {
		return index;
	});

	for (var i = arr.length - 1; i > 0; i--) {
		var j = ~ ~(Math.random() * (i + 1));
		var _ref = [arr[j], arr[i]];
		arr[i] = _ref[0];
		arr[j] = _ref[1];
	}

	return arr;
};