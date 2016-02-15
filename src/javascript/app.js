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
    
    
}

var C = new Controller();
C.createElements();