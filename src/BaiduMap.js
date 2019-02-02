import React, { Component } from 'react';
import './App.css'

class BaiduMap extends Component {

  componentDidMount () {
    const script = document.createElement("script");
    window.initMap = this.initMap.bind(this);
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=Z3MSOFwaG7lGWnkhhgIRC3LOo3akMAxg&callback=initMap";
    script.async = true;
    document.head.appendChild(script);
    console.log(this)
  }

  initMap(){
    const { locations } = this.props
    const BMap = window.BMap;
    window.map = new BMap.Map("mapContainer");// 创建地图实例  
    const map = window.map;
    map.centerAndZoom('北京', 15); 
    map.enableScrollWheelZoom();
    this.getMarker(BMap,locations, map)
    //console.log(locations)
    window.map.onerror = function() {
      window.map.innerHTML = "无法加载。";
    };
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    const { locations } = this.props;
    var BMap = window.BMap;
    var map = window.map;
    map.clearOverlays();
    this.getMarker(BMap,locations, map)
  }

  getMarker(BMap, locations, map){
    
    for (let i = 0; i < locations.length; i++) {
      var position = locations[i].location;
      var point = new BMap.Point(position.lat,position.lng)   
      //var content = locations[i].title;
      var marker = new BMap.Marker(point); 
      map.addOverlay(marker);//清除之前的Marker
      this.addClickHandler(marker);
      console.log(this)
    }
  }

  addClickHandler(marker){
		marker.addEventListener("click",function(e){
      this.openInfo(e) 
      //console.log(this)
    }.bind(this));
	}

  openInfo(e){
    var opts = {
      width : 200,     // 信息窗口宽度
      height: 100,     // 信息窗口高度
      title : "信息窗口" , // 信息窗口标题
      enableMessage:true//设置允许信息窗发送短息
    }
    var p = e.target;
    const BMap = window.BMap;
    const map = window.map;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(opts);  // 创建信息窗口对象 
    this.populateInfoWindow(point)
    map.openInfoWindow(infoWindow,point); //开启信息窗口
   // console.log(point)
  }

  populateInfoWindow(place) {
    const map = window.map;
    var content =
      "<div id='loc-name'><strong>名称: </strong>" + place.name + "</div>";
    var errorMsg = "<div id='foursquare-error'>加载数据失败...</div>";

    //从 Foursquare 获取信息
    var clientId = "R1SPUZGHU3CWL5R1QODPGCOAFAYKVZGRW3GO1XMOCPVHLHQV";
    var clientSecret = "WWQZSXWPUYAR1CDTHUSHM4LNVE4QUHXWWO2JUQQAZ0YGAWSM";
    var url =
      "https://api.foursquare.com/v2/venues/search?client_id=" +
      clientId +
      "&client_secret=" +
      clientSecret +
      "&v=20180323&ll=" +
      place.lat +
      "," +
      place.lng +
      "&limit=1";
      console.log(this)
    
      fetch(url)
      .then(function(response) {
        if (response.status !== 200) {
          content += errorMsg;
          return;
        }

        //获取地址信息
        response.json().then(function(data) {
          var placeData = data.response.venues[0];
          var placeAddress =
            "<div><strong>地址: </strong>" +
            (placeData.location.address == undefined
              ? "从 foursquare 获取地址失败"
              : placeData.location.address) +
            "</div>";
          content += placeAddress;
          var fourSquareLink =
            '<a href="https://foursquare.com/v/' +
            placeData.id +
            '" target="_blank" style="color:red;">点击打开 Foursquare 获取更多信息</a>';
          content += fourSquareLink;
          console.log(content)
        });
      })
      .catch(function(err) {
        console.log(err);
        content += errorMsg;
      });
      map.openInfoWindow(content); //开启信息窗口
  }

  render() {
    return (
        <div className="mapContainer" id="mapContainer" aria-label="地图"></div>
    );
  }
}

export default BaiduMap;