import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Controls from './Controls';

const sizes = [10, 20, 50, 100];

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Controls sizes={sizes}/>, document.getElementById('controls'));
