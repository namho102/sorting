/*
Array.prototype.bubblesort = function () {
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < this.length; i++) {
            if (this[i - 1] > this[i]) {
                done = false;
                [this[i - 1], this[i]] = [this[i], this[i - 1]];
                return this;
            }
        }
    }
    return this;
}
*/

import d3 from 'd3';
import d3Chart from './d3Chart';

const bars = new d3Chart();

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

export default class Sorting {
  constructor(arr) {
    this.arr = arr;
  }

  bubblesort() {
    var done = false;

    var self = this;
    let arr = self.arr;
    console.log(arr);

    while (!done) {
        done = true;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {
                done = false;
                this.swap(i - 1, i);
                sleep(500);
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
            }
        }
    }

    return arr;
  }

  swap(i , j) {
    let bars = d3.selectAll('.bar');
    /*
    $(document).ready(function() {
      var firstChild = $('.bar:nth-child('+ i +')');
      var secondChild = $('.bar:nth-child('+ j +')');
      console.log('wtf');
      $('.bar:nth-child(2)').css('background-color', '#aaa');
      $(".bar:nth-child(5)").width('500px');
      secondChild.css('background-color', '#aaa');
      console.log('wtf2');
      var tempWidth = firstChild.width();
      firstChild.width(secondChild.width() + 'px') ;
      secondChild.width(tempWidth + 'px');

      firstChild.css('background-color', '#aaa');
    })
    */
    // firstChild.attr('fill', 'red');
    // console.log(firstChild.width(), secondChild.width());
    // let firstChild = d3.select(bars[i])[0];
    // let secondChild = d3.select(bars[j])[0];
    // firstChild.attr('width', '100px');

  }

  // swap(i, j) {
  //   var arr= this.arr;
  //   (function() {
  //     setTimeout(() => {
  //       [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
  //     }, 1000);
  //   })()
  // }
}
