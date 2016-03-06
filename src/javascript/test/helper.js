exports.generateData = function (size) {
	var arr = Array.from(new Array(size), (val, index) => index);

	for (var i = arr.length - 1; i > 0; i--) {
		var j = ~~(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}