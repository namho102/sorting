import React, { Component } from 'react';
import classNames from 'classnames';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 20,
      algorithm: [],
    };
  }

  tickAlgo(evt) {
    this.state.algorithm.push(evt.target.text);
    console.log(this.state.algorithm);
  }

  tickSize(evt) {
    this.setState({size: evt.target.text})
    console.log(this.state.size)
  }
  // 
  // componentDidUpdate () {
  //     console.log('update. . .');
  // }

  render() {
    return (
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
         </div>
      )
  }
}
