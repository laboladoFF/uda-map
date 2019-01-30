import React, { Component } from 'react';
import './map.css'

class BaiduMap extends Component {

  componentDidMount () {
    const script = document.createElement("script");
    window.initMap = this.initMap.bind(this);
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=Z3MSOFwaG7lGWnkhhgIRC3LOo3akMAxg&callback=initMap";
    script.async = true;
    document.head.appendChild(script);
  }

  initMap(){
    const { locations } = this.props
    const BMap = window.BMap;
    window.map = new BMap.Map("mapContainer");// 创建地图实例  
    const map = window.map;
    map.centerAndZoom('北京', 15); 
    map.enableScrollWheelZoom();
    
    //console.log(locations)
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    const { locations } = this.props;
    const BMap = window.BMap;
    const map = window.map;
    map.clearOverlays();
    this.getMarker(BMap,locations, map)
  }

  getMarker(BMap, locations, map){
    
    for (let i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var point = new BMap.Point(position.lat,position.lng)   
      var content = locations[i].title;
      var marker = new BMap.Marker(point); 
      map.addOverlay(marker);//清除之前的Marker
      console.log(marker);
      this.addClickHandler(content,marker);
    }
  }

  addClickHandler(content,marker){
    var opts = {
        width : 200,     // 信息窗口宽度
        height: 100,     // 信息窗口高度
        title : "信息窗口" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
    }
		marker.addEventListener("click",function(e){
      var p = e.target;
      const BMap = window.BMap;
      const map = window.map;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
      map.openInfoWindow(infoWindow,point); //开启信息窗口
      console.log(infoWindow)
    });
	}


  render() {
    return (
      <div>
        <div className="mapContainer" id="mapContainer"></div>
      </div> 
    );
  }
}

export default BaiduMap;