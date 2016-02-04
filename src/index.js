import React from 'react';
import ReactDOM from 'react-dom';

//Components
import App from './App';
import Controls from './Controls';
import Chart from './Chart';

const SIZES = [10, 20, 30, 50, 100];
const ALGORITHM_LIST = [
  'Bubble sort',
  'Insertion sort',
  'Selection sort',
  'Merge sort',
  'Heapsort',
  'Quicksort',
  'Shell sort',
  'Comb sort'
]

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Controls sizes={SIZES} algorithmList={ALGORITHM_LIST} />, document.getElementById('controls'));
// ReactDOM.render(<Chart />, document.getElementById('chart'));
