
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
        this.size = 10;
        this.speed = '1x';
    }

    createElements() {
        //MENU BUTTONSET
        algsList.forEach((el) => {
            d3.select("#algs").append("li").append("a").attr('class', 'option').text(el);
        });

        size.forEach((el) => {
            d3.select("#size").append("li").append("a").attr('class', 'option').text(el);
        });

        speed.forEach((el) => {
            d3.select("#speed").append("li").append("a").attr('class', 'option').text(el);
        });
        //ACTION   
    }

    getSize() {

    }

    getSpeed() {

    }

    setEvents() {
        $('#size a').click((evt) => {
            this.size = $(evt.target).text();
            $('#size a').removeClass('selected');
            $(evt.target).addClass('selected');
        })
    }
}


class Bar {
    constructor(value) {
        this.value = value;
    }

    createBar() {

    }
}

class Bars {
    constructor(size) {
        console.log('wtf');
        this.size = size;
        this.bars = shuffle(generateArray(this.size));
        console.log(this.bars);
        
        this.createBars();
    }

    createBars() {
        // console.log('wtf2');
        
        var size = this.size;
        var data = this.bars;

        var svg = d3.select('#bars').append("svg").attr('width', '100%');
        svg.selectAll("*").remove();

        var width, height, max;
        // width = d3.select(iElement[0])[0][0].offsetWidth - 5;
        width = 400;
        height = size * 15;
        // 12 = 10(bar height) + 2(margin between bars)

        max = Math.max(...data);

        svg.attr('height', height);

        //create the rectangles for the bar chart
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("fill", "#20ADEE")
            .attr("height", 13) 
            .attr("width", 0) // initial width of 0 for transition
            // .attr("x", 2) 
            .attr("y", function (d, i) {
                return i * 15;
            }) // height + margin between bars
            .transition()
            .duration(500)
            .attr("width", function (d) {
                return d / (max / width);
            })

        ; // width based on scale
    }
}

var C = new Controller();
C.createElements();
C.setEvents();


// var Bs = new Bars(C.size);
var Bs = new Bars(20);

// Bs.createBars();