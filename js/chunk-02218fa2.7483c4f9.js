(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02218fa2"],{"9bbb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("amap",{attrs:{adcode:"341500"}})},r=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:!e.mapComplete,expression:"!mapComplete"}],staticClass:"mapBox",attrs:{"element-loading-text":"地图绘制中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(1,6,29, 0.5)"}},[a("div",{attrs:{id:"amap"}})])},i=[],p=a("1da1"),s=(a("d81d"),a("b0c0"),a("96cf"),a("024c")),c=a.n(s),l={name:"amap",props:{adcode:String},data:function(){return{map:{},mapComplete:!1,currentArea:{},polylines:[],levels:["country","province","city","district","biz_area"]}},mounted:function(){this.getMapData()},watch:{},methods:{getMapData:function(){var e=this;return Object(p["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$svc.api_map_get();case 2:if(a=t.sent,a){t.next=5;break}return t.abrupt("return");case 5:e.mapdata=a.data.data.features[0],e.drawMap();case 7:case"end":return t.stop()}}),t)})))()},drawMap:function(){var e=this,t=this.mapdata.properties.center,a=7+this.levels.indexOf(this.mapdata.properties.level),n=this.mapdata.geometry.coordinates[0][0];this.map=new c.a.Map("amap",{center:t,mask:n,resizeEnable:!0,rotateEnable:!0,pitchEnable:!0,buildingAnimation:!0,expandZoomRange:!0,viewMode:"3D",labelzIndex:130,pitch:55,zoom:a,mapStyle:"amap://styles/darkblue"}),c.a.plugin(["AMap.ControlBar"],(function(){e.map.addControl(new c.a.ControlBar({position:{right:"0",bottom:"0"},showZoomBar:!1}))})),this.map.on("complete",(function(){e.mapComplete=!0,e.draw3D([n])}))},draw3D:function(e){var t=this.object3Dlayer=new c.a.Object3DLayer({zIndex:1});this.map.add(t);var a=-8e3,n="#0088ffcc",r=new c.a.Object3D.Wall({path:e,height:a,color:n});r.transparent=!0,t.add(r);for(var o=0;o<e.length;o+=1)new c.a.Polyline({path:e[o],strokeColor:"#57cbff",strokeWeight:4,map:this.map})},drawTitle:function(){var e=this;this.mapdata.features.map((function(t){var a=new c.a.Text({text:t.properties.name,position:t.properties.center,offset:new c.a.Pixel(0,-50),style:{"background-color":"transparent","-webkit-text-stroke":"red","-webkit-text-stroke-width":"0.5px","text-align":"center",border:"none",color:"white","font-size":"24px","font-weight":600}});return a.setMap(e.map),!1}))}}},d=l,m=(a("a857"),a("2877")),u=Object(m["a"])(d,o,i,!1,null,"11b4165a",null),f=u.exports,h={components:{amap:f},data:function(){return{}},mounted:function(){},methods:{}},b=h,w=Object(m["a"])(b,n,r,!1,null,null,null);t["default"]=w.exports},a857:function(e,t,a){"use strict";a("f00a")},f00a:function(e,t,a){}}]);
//# sourceMappingURL=chunk-02218fa2.7483c4f9.js.map