import React, { Component } from 'react';

export default class Controls extends Component {


  render() {
      return (
         <div className="controls">
          <div className="controls__size">
            <h3 className="label">Size: </h3>
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
