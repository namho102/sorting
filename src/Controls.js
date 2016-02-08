import React, { Component } from 'react';
import Chart from './Chart';

import * as lib from './lib';
import Sorting from './sorting';


export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 20,
      algorithm: [],
      data: lib.generateData(20)
    };
  }

  tickAlgo(evt) {
    this.setState({algorithm: evt.target.text});
    // this.state.algorithm.push(evt.target.text);
    let data = this.state.data;
    var sorting = new Sorting(data);
    sorting.bubblesort();

    // console.log(this.state.algorithm);
  }

  tickSize(evt) {
    var newSize = evt.target.text;
    this.setState({size: newSize});
    this.setState({data: lib.generateData(newSize)});
    console.log(this.state.size);
  }


  render() {
    return (
      <div className="main">
        <div className="controls">
             <div className="controls__select">
               {
                 this.props.algorithmList.map((algo, index) => {
                   return (
                      <a className='option' key={index}  onClick={this.tickAlgo.bind(this)}>{algo}</a>
                     )
                 })
               }
             </div>
            <div className="controls__size">
              <span className="label">Size: </span>
              <div className="controls__option">
                {
                  this.props.sizes.map((size, index) => {
                    return (
                        <a className="option" key={index} onClick={this.tickSize.bind(this)}>{size}</a>
                      )
                  })
                }
              </div>
            </div>

              <a className='option'>Start</a>
        </div>
        <Chart data={this.state.data}/>
      </div>

      )
  }
}
