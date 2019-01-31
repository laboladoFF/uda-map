import React, { Component } from 'react';
import './App.css';
import BaiduMap from './BaiduMap';
import Option from './Option'

class App extends Component {
  state = {
    locations: [
      {id: '0', title: '中国国家博物馆', type:'博物馆', location: {lat: 116.417854, lng: 39.921988}},
      {id: '1', title: '故宫博物院', type:'博物馆', location: {lat: 116.406605, lng: 39.921585}},
      {id: '2', title: '首都博物馆', type:'博物馆', location: {lat: 116.412222, lng: 39.912345}},
      {id: '3', title: '全聚德', type:'餐厅', location: {lat: 116.417856, lng: 39.921986}},
      {id: '4', title: '呷哺呷哺', type:'餐厅', location: {lat: 116.328852, lng: 40.057031}},
    ],
    locationsNow: [
      {id: '0', title: '中国国家博物馆', type:'博物馆', location: {lat: 116.417854, lng: 39.921988}},
      {id: '1', title: '故宫博物院', type:'博物馆', location: {lat: 116.406605, lng: 39.921585}},
      {id: '2', title: '首都博物馆', type:'博物馆', location: {lat: 116.412222, lng: 39.912345}},
      {id: '3', title: '全聚德', type:'餐厅', location: {lat: 116.417856, lng: 39.921986}},
      {id: '4', title: '呷哺呷哺', type:'餐厅', location: {lat: 116.328852, lng: 40.057031}},
    ]
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
