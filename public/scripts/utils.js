"use strict";

//Helper

function generateArray(size) {
  var arr = [];
  for (var i = 0; i < size; i++) {
    arr.push(i + 1);
  }return arr;
}

function shuffle(arr) {
  var currentIndex = arr.length,
      temporaryValue,
      randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}