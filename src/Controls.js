import React, { Component } from 'react';
import classNames from 'classnames';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 20,
      algorithm: this.props.algorithmList[0],

    };
  }

  tick(event) {
    console.log('clicked');

    console.log(event);
  }
  render() {
    return (
      <div className="controls">
           <div className="controls__select">
             {
               this.props.algorithmList.map((algo, index) => {
                 return (
                    <a className='option' key={index}  onClick={this.tick.bind(this)}>{algo}</a>
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
                      <a className="option" key={index}>{size}</a>
                    )
                })
              }
            </div>
          </div>

         </div>
      )
  }
}
