import React, { Component } from 'react';
import MyMap from './MyMap.js'

class homePage extends Component{ 
    render() {
        return (
          <div className="homepage">
            <MyMap />
          </div>
        );
      }
}
export default homePage