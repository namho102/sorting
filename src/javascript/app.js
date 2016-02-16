
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
        // console.log('wtf2');
        this.bars = data;
        var size = this.size;
        // var data = this.bars;
        
        // var svg = this.selector.append("svg").attr('width', '100%');
        // var svg = d3.select('#bars').append("svg").attr('width', '100%');
        var svg = this.selector;
        svg.selectAll("*").remove();

        var width, height, rectHeight, rectMargin, max;
        // width = d3.select(iElement[0])[0][0].offsetWidth - 5;
        width = 400;
        rectHeight = 13;
        rectMargin = 2;
        height = size * (rectHeight + rectMargin);
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

    update(data) {
        this.bars = data;
    }

    destroy() {

    }
}

class GraphicalSort {
    constructor() {
        //Controller
        this.controller = new Controller();
        var controls = this.controller;
        controls.createElements();
        controls.setEvents();
        //Bars
        this.bars = new Bars(controls.size, '#bars');
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
    }


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