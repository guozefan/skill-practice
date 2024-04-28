<template>
  <div id="myMap"></div>
  <div id="my-panel"></div>
</template>
<script setup lang="ts">
import {ref, onMounted,onUnmounted,  } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';


let map:any = null;

onMounted(() => {
  loaderMap()

})


onUnmounted(() => {
  map?.destroy();
});


// 加载地图
const loaderMap = () => {
  AMapLoader.load({
    key: "c521fd31b8d9e0153878425ed50f4ff9", //申请好的Web端开发者 Key，调用 load 时必填
    version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  })
    .then((AMap:any) => {
      map = new AMap.Map("myMap",{
        zoom:12,
        center: [116.397428, 39.90923],
      });
      setMakerInfo()
      getLine()
      // createLayer()
      createPlaceSearch()
    })
    .catch((e:any) => {
      console.error(e); //加载错误提示
    });
}

// 添加印记
const addMarker = (val:Number[]) => {
  const marker = new AMap.Marker({
    position: val, //位置
  });
  map.add(marker); //添加到地图
  console.log(window)
}

// 自定义信息印记
const setMakerInfo = ()=>{
  // 信息窗体的内容
    var content = `
    <div><img src=""/>
        <div style="padding:0px">
        "电话 : 010-84107000   邮编 : 100102"
        "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>
    `
      const infoWindow = new AMap.InfoWindow({
          //创建信息窗体
          // isCustom: true, //使用自定义窗体
          content: content, //信息窗体的内容可以是任意html片段
          offset: new AMap.Pixel(0, -35),

        });
    const onMarkerClick = function (e) {
      infoWindow.open(map, e.target.getPosition()); //打开信息窗体
      //e.target就是被点击的Marker
    };

    const marker = new AMap.Marker({
      position: [116.481181, 39.989792],
    });
    map.add(marker);
    marker.on("click", onMarkerClick); //绑定click事件
}

// 添加折线
const getLine =()=>{
    const lineArr = [
    [116.368904, 39.913423],
    [116.382122, 39.901176],
    [116.387271, 39.912501],
    [116.398258, 39.904600]
  ];
  const polyline = new AMap.Polyline({
    path: lineArr, //设置线覆盖物路径
    strokeColor: "#3366FF", //线颜色
    strokeWeight: 5, //线宽
    strokeStyle: "solid", //线样式
  });
  map.add(polyline);
}

// 创建图层
const createLayer =()=>{
  const traffic = new AMap.TileLayer.Traffic({
    autoRefresh: true, //是否自动刷新，默认为false
    interval: 180, //刷新间隔，默认180s
  });
  map.add(traffic); //通过add方法添加图层
}
// 创建搜索插件
const createPlaceSearch = ()=>{
  AMap.plugin(["AMap.PlaceSearch"], function () {
    const placeSearch = new AMap.PlaceSearch({
      pageSize: 5, //单页显示结果条数
      pageIndex: 1, //页码
      city: "010", //兴趣点城市
      citylimit: true, //是否强制限制在设置的城市内搜索
      map: map, //展现结果的地图实例
      panel: "my-panel", //结果列表将在此容器中进行展示。
      autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
    });
    placeSearch.search('北京大学');
  });
}
</script>
<style lang="scss">
#myMap {
  width: 100%;
  height: 100%;
}

#my-panel{
  position: fixed;
  right: 0;
  top: 200px;
  z-index: 999;
  width: 200px;
  height: 800px;
}
</style>
