
const algsList = [
    "Bubble",
    "Selection",
    "Shaker",
    "Insertion",
    "Shell",
    "Quick",
    "Merge",
    "Heap",
    "Bogo"
];
const size = [5, 10, 20, 30, 70, 100];
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
        algsList.forEach((el) => {
            d3.select("#algs").append("li").
                append("a").
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


    }

    setEvents() {
        $('#size a').click((evt) => {
            this.size = $(evt.target).text();
            $('#size a').removeClass('selected');
            $(evt.target).addClass('selected');
        })
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
        bubbleSort(this.bars);
    }

}

var gs = new GraphicalSort();

//Sample Sort

function bubbleSort(barObj) {
    var values = barObj.bars;
    var done = false;
    var counter = 0;
    while (!done) {
        done = true;
        for (var i = 1; i< values.length; i++) {
            if (values[i-1] > values[i]) {
                done = false;
                [values[i-1], values[i]] = [values[i], values[i-1]];
                // sleepFor(100);
                // console.log(values);
                // barObj.renderData(values);
                (function () {
                    setTimeout(() => {
                        console.log(values);
                        barObj.renderData(values);
                    }, 1000 * counter++);
                })();
                
            }
        }
    }
    // barObj.renderData(values);
    console.log(values);
}



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