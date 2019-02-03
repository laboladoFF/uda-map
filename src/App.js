import React, { Component } from 'react';
import './App.css';
import BaiduMap from './BaiduMap';
import Option from './Option'
import { locations } from './data'

class App extends Component {
  state = {
    locations: locations,
    locationsNow: locations,
  }


  filterLocation = (type)=>{
    if(type === '全部'){
      this.setState({
        locationsNow: this.state.locations
      })
    }else{
      this.setState({
        locationsNow: this.state.locations.filter((result)=>(result.type === type))
      })
    }
  }

  //老师，这个为什么报错
  //TypeError: Cannot read property 'locations' of undefined
  // filterLocation(type){
  //   if(type !== '全部'){
  //     this.setState({
  //       locationsNow: this.state.locations.filter((result)=>(result.type === type))
  //     })
  //   }else{
  //     this.setState({
  //       locationsNow: this.state.locations
  //     })
  //   }
  // }


  render() {
    let { locations, locationsNow } = this.state
    return (
      <div className="app">
        <div className='left-map'>
          <Option 
            locations = {locations}
            locationsNow = {locationsNow}
            filterLocation={this.filterLocation}
          />
        </div>
        <div className='right-map'>
          <BaiduMap 
            locations = {locationsNow}
          />
        </div>
      </div>
    )
  }
}

export default App;
