
const algsList = [
    "Bubble",
    "Selection",
    "Insertion",
    "Quick",
    "Merge",
    "Heap"
];
const size = [5, 10, 20, 30, 50, 70, 100];
const speed = ['1x', '2x', '3x'];

class Controller {
    constructor() {
        this.size = 20;
        this.speed = '1x';

        this.createElements();
        this.setEvents();
    }

    createElements() {
        //MENU BUTTONSET
        algsList.forEach((el, i) => {
            d3.select("#algs").append("li").
                append("a").
                attr('data-pos', i).
                attr('class', 'option').
                text(el);
        });

        size.forEach((el) => {
            d3.select("#size").append("li").
                append("a").
                attr('class', 'option').
                text(el);
        });

        speed.forEach((el) => {
            d3.select("#speed").
                append("li").append("a").
                attr('class', 'option').
                text(el);
        });

        $("a:contains(" + this.size + ")").addClass('selected');
        $("a:contains(" + this.speed + ")").addClass('selected');
        $("#algs").find('a').first().addClass('selected');

    }

    setEvents() {
        $('#size a').click((evt) => {
            this.size = $(evt.target).text();
            $('#size a').removeClass('selected');
            $(evt.target).addClass('selected');
        });

    }

    getSize() {
        return $('#size').find(".selected").text();
    }
}

class Bars {
    constructor(size, root) {
        console.log('wtf');
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
            .attr("y", function (d, i) {
                return i * (rectHeight + rectMargin);
            }) 
        // .transition()
        // .duration(500)
            .attr("width", function (d) {
                return d / (max / width); // width based on scale
            })
        ;

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
        
        //Tasks
        this.tasks = new Task(this.bars);
        // this.size = controls.size;
        // Set default algorithms
        this.sortMenu = [bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort];
        this.pos = 0;

        this.setEvents();
    }

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

        $('#algs a').click((evt) => {
            this.algs = $(evt.target).data('pos');
            // console.log(this.algs);
            $('#algs a').removeClass('selected');
            $(evt.target).addClass('selected');
        });
    }

    getPos() {
        return $('#algs').find(".selected").data('pos');
    }

    reload() {
        console.log('reloading');
        var newSize = this.controller.getSize();
        var newData = generateData(newSize);
        console.log(newData);
        // console.log(newSize);
        this.bars.update(newSize, newData);
        this.bars.renderData(newData);

    }

    start() {
        console.log('starting');
        this.tasks.clean();
        // console.log(this.getPos());
        // bubbleSort(this.bars, this.tasks);
        this.sortMenu[this.getPos()](this.bars, this.tasks);
    }

}

class Task {
    constructor(bars) {
        this.bars = bars;
        this.tasks = [];
        this.delay = 50;
    }

    processItems(delay) {
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

    pushValues(values) {
        var tempVar = values.slice(0); //creating not copying, !IMPORTANT !FUCKING ERROR
        this.tasks.push(tempVar);
        // console.log(this.tasks);
    }

    clean() {
        this.tasks = [];
    }

}

//Sample Sort
function bubbleSort(barObj, taskObj) {
    var values = barObj.bars;
    var counter = 0;
    //main
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < values.length; i++) {
            counter++;
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
            
    console.log('count ', counter);
    console.log(taskObj.tasks.length);
    taskObj.processItems();
    console.log(values);
}


function insertionSort() {
    console.log('insertion sort starting');
}

function selectionSort(barObj, taskObj) {
    console.log('selection sort starting');
    var values = barObj.bars;
    var counter = 0;
    //main
    var minIndex, tmp;
    for (var i = 0; i < values.length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < values.length; j++) {
            taskObj.pushValues(values);
            
            counter++;
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
            
    console.log('count ', counter);
    console.log(taskObj.tasks.length);
    taskObj.processItems();
    console.log(values);
}

function quickSort() {
    console.log('quick sort starting');
}

function mergeSort() {
    console.log('merge sort starting');
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