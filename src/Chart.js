import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import d3Chart from './d3Chart';
import * as lib from './lib';

const bars = new d3Chart();

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: lib.generateData(30)
    };
  }

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    bars.create(el, this.props.data);
  }

  componentDidUpdate() {
    console.log('updated');
    var el = ReactDOM.findDOMNode(this);
    bars.update(el, this.props.data);
  }

  componentWillUnmount() {
    var el = ReactDOM.findDOMNode(this);

  }

  render() {
    return (
      <div className='chart'>
      </div>
    )
  }
}
