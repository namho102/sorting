// import async from 'async';

// console.log(async);

const algsList = [
    "Bubble sort",
    "Selection sort",
    "Insertion sort",
    "Shell sort",
    "Comb sort",
    "Quicksort",
    "Merge sort",
    "Heapsort"
];
const size = [5, 10, 20, 30, 50, 70, 100];
const speed = ['5x', '4x', '3x', '2x', '1x'];

class Controller {
    constructor() {
        this.size = 30;
        this.speed = '3x';

        this.createElements();
        this.setEvents();
    }

    createElements() {
        //MENU BUTTONSET

        //Algorithm selector
        $('.select').each(function() {
            var $this = $(this),
                numberOfOptions = algsList.length;

            $this.append('<div class="select-styled"></div>');

            var styledSelect = $this.find('div.select-styled');
            var ramdomAlgs = algsList[getRandomInt(0, numberOfOptions - 1)];
            styledSelect.text(ramdomAlgs);

            var list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter(styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: algsList[i],
                    // rel: algsList[i],
                    'data-pos': i
                }).appendTo(list);
            }

            list.find("li:contains(" + styledSelect.text() + ")").addClass('pos-active');
            var listItems = list.children('li');

            styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.select-styled.active').each(function() {
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            });

            listItems.click(function(e) {
                e.stopPropagation();
                styledSelect.text($(this).text()).removeClass('active');
                list.hide();
            });

            $(document).click(function() {
                styledSelect.removeClass('active');
                list.hide();
            });

        });

        //Size selector
        size.forEach((el) => {
            d3.select("#size").append("li").
            append("a").
            attr('class', 'option').
            text(el);
        });

        //Speed selector
        speed.forEach((el, i) => {
            d3.select("#speed").
            append("li").append("a").attr('data-speed', i * 1.5).
            attr('class', 'option').
            text(el);
        });

        $("a:contains(" + this.size + ")").addClass('selected');
        $("a:contains(" + this.speed + ")").addClass('selected');
        // $("#algs").find('a').first().addClass('selected');

    }

    setEvents() {
        $('#size a').click((evt) => {
            this.size = $(evt.target).text();
            $('#size a').removeClass('selected');
            $(evt.target).addClass('selected');
        });

        $('#speed a').click((evt) => {
            this.size = $(evt.target).text();
            $('#speed a').removeClass('selected');
            $(evt.target).addClass('selected');
        });

    }

    getSize() {
        return $('#size').find(".selected").text();
    }
}

class Bars {
    constructor(size, root) {
        // console.log('wtf');
        this.size = size;
        this.root = root;
        this.bars = shuffle(generateArray(this.size));

        //initial state
        this.selector = d3.select(root).append("svg");
        // this.selector.append("svg").attr('width', '100%');
        this.renderData(this.bars);
    }

    getMax() {
        return Math.max(...this.bars);
    }

    renderData(data) {
        // console.log('rendering. . .', this.root);
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

        max = Math.max(...data);

        svg.attr('height', height);

        //create the rectangles for the bar chart
        var rects = svg.selectAll("rect").data(data);

        // svg.selectAll("rect")
        //     .data(data)
        rects.enter()
            .append("rect")
            .attr("class", 'bar')
            .attr("width", 0) // initial width of 0 for transition
            .attr("height", rectHeight)
            // .attr("fill", getRandomColor())
            // .attr("x", 2) 
            .attr("y", (d, i) => {
                return i * (rectHeight + rectMargin);
            })
            // .transition()
            // .duration(500)
            .attr("width", (d) => {
                return d / (max / width); // width based on scale
            });

        rects.exit().remove();
        // this.selector.selectAll().exit().remove(); 
    }

    update(size, data) {
        this.size = size;
        this.bars = data;
    }

    destroy() {

    }
}

class GraphicalSort {
    constructor() {
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
        this.sortMenu = [bubbleSort, selectionSort, insertionSort, shellSort, combSort, quickSort, mergeSort, heapSort];
        // this.pos = [0];

        this.setEvents();
    }

    // setDefaults() {
    // }

    setEvents() {
        $('.controls__group').click(() => {
            this.reload();
        });

        $('#reload').click(() => {
            this.reload();
        });

        $('#start').click(() => {
            this.start();
        });

        $('.select li').click((evt) => {
            $(evt.target).siblings().removeClass('pos-active');
            $(evt.target).addClass('pos-active');
            this.reload();
        });
    }

    getPos(id) {
        return $(id).find(".pos-active").data('pos');
    }

    reload() {
        console.log('reloading');
        // console.log(this.getPos('#first_algs'));
        // console.log(this.getPos('#second_algs'));

        // this.tasks.clean();
        // this.tasks2.clean();

        // this.tasks.cancel();
        // this.tasks2.cancel();

        this.tasks.clean().cancel();
        this.tasks2.clean().cancel();

        var newSize = this.controller.getSize();
        var newData = generateData(newSize);
        // var newData2 = generateData(newSize);
        var newData2 = newData.slice(0);
        console.log(newData);
        // console.log(newSize);

        this.bars.update(newSize, newData);
        this.bars2.update(newSize, newData2);
        this.bars.renderData(newData);
        this.bars2.renderData(newData2);

    }

    start() {
        console.log('starting');

        // var arr = [0, 1, 2, 3, 4, 5];
        // var random = shuffle(arr);

        async.parallel([
            () => {
                this.sortMenu[this.getPos('#first_algs')](this.bars, this.tasks);
                // this.sortMenu[3](this.bars2, this.tasks2);
            }, () => {
                this.sortMenu[this.getPos('#second_algs')](this.bars2, this.tasks2);
            }
        ]);

        /* 
         setTimeout(() => {
             this.sortMenu[this.getPos('#first_algs')](this.bars, this.tasks);
         }, 0);
       
         setTimeout(() => {
             this.sortMenu[this.getPos('#second_algs')](this.bars2, this.tasks2);
         }, 0);
         */

    }

}

class Task {
    constructor(bars) {
        this.bars = bars;
        this.tasks = [];
        this.delay = 40;

        this.timeoutID = undefined;
    }

    processItems() {
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

    cancel() {
        clearTimeout(this.timeoutID);
        return this;
    }

    pushValues(values) {
        var tempVar = values.slice(0); //creating not copying, !IMPORTANT !FUCKING ERROR
        this.tasks.push(tempVar);
        // console.log(this.tasks);
    }

    getDelay() {
        var speed = $('#speed').find(".selected").data('speed');
        return speed * 10;
    }

    clean() {
        this.tasks = [];
        return this;
    }

}

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
                [values[i - 1], values[i]] = [values[i], values[i - 1]];

                // var tempValues = values.slice(0);
                // taskObj.pushValues(tempValues);
                // taskObj.pushValues(values);
            }
        }
    }
    //end main

    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();

}

function selectionSort(barObj, taskObj) {
    console.log('selection sort starting', barObj.bars);
    var values = barObj.bars;

    //main
    var minIndex, tmp;
    for (var i = 0; i < values.length - 1; i++) {
        taskObj.pushValues(values);
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

    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();
}

function insertionSort(barObj, taskObj) {
    console.log('insertion sort starting', barObj.bars);
    var values = barObj.bars;

    //main
    for (var i = 0; i < values.length; i++) {
        taskObj.pushValues(values);
        var k = values[i];
        for (var j = i; j > 0 && k < values[j - 1]; j--) {
            taskObj.pushValues(values);
            values[j] = values[j - 1];
        }

        values[j] = k;
    }
    //end main

    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();
}

function quickSort(barObj, taskObj) {
    console.log('quick sort starting', barObj.bars);
    var values = barObj.bars;

    //main
    function _quickSort(left, right) {
        taskObj.pushValues(values);

        if (left < right) {
            var pivot = values[left + ~~((right - right) / 2)],
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

    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();

}

function mergeSort(barObj, taskObj) {
    console.log('merge sort starting', barObj.bars);
    var values = barObj.bars;

    //main

    function _mergeSort(alist) {
        taskObj.pushValues(alist);

        if (alist.length > 1) {
            var mid = ~~(alist.length / 2);
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

    _mergeSort(values);

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
    //end test


    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();
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
            [arr[0], arr[end]] = [arr[end], arr[0]];
            siftElementDownHeap(arr, 0, end);
            end -= 1
        }
    }

    function putArrayInHeapOrder(arr) {
        var i;
        i = arr.length / 2 - 1;
        i = ~~i;
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
            if (c1 < max && heap[c1] > heap[i_big])
                i_big = c1;
            if (c2 < max && heap[c2] > heap[i_big])
                i_big = c2;
            if (i_big == i) return;
            [heap[i], heap[i_big]] = [heap[i_big], heap[i]];
            i = i_big;
        }
    }

    _heapSort(values);
    //end main

    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();

}

function shellSort(barObj, taskObj) {
    console.log('shell sort starting', barObj.bars);
    var values = barObj.bars;

    //main

    for (var h = values.length; h = parseInt(h / 2);) {
        taskObj.pushValues(values);
        for (var i = h; i < values.length; i++) {
            taskObj.pushValues(values);
            var k = values[i];
            for (var j = i; j >= h && k < values[j - h]; j -= h) {
                taskObj.pushValues(values);
                values[j] = values[j - h];
            }

            values[j] = k;
        }
    }

    //end main

    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();

}

function combSort(barObj, taskObj) {
    console.log('comb sort starting', barObj.bars);
    var values = barObj.bars;

    //main

    /*    var interval = Math.floor(values.length / 1.3);
        while (interval > 0) {
            // taskObj.pushValues(values);
            for (var i = 0; i + interval < values.length; i += 1) {
                // taskObj.pushValues(values);
                if (values[i] > values[i + interval]) {
                    var small = values[i + interval];
                    values[i + interval] = values[i];
                    values[i] = small;
                }
            }
            interval = Math.floor(interval / 1.3);
        }*/

    //end main

    //test
    var gap = values.length, i, j;
    while (gap > 1) {
        taskObj.pushValues(values);
        gap = gap / 1.247340350103979 | 0; // Trial and error
        if (gap == 9 || gap == 10) {
            gap = 11;
        }

        for (i = 0; i < values.length - gap + 1; i++) {
            taskObj.pushValues(values);
            j = i + gap;
            if (values[i] > values[j]) {
                [values[i], values[j]] = [values[j], values[i]];
                // swap(a, i, j);
            }
        }
    }
    //end test
    console.log(taskObj.tasks.length);
    console.log(values);
    taskObj.pushValues(values);
    taskObj.processItems();

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