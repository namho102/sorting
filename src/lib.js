export function generateArray(size) {
    let arr = [];
    for(let i = 0; i < size; i++)
        arr.push(i + 1);

    return arr;
}

export function generateData(size) {
    let arr = generateArray(size);
    arr = shuffle(arr);
    return arr;
}

export function shuffle(arr) {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}