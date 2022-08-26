<template>
  <div>
    <div class="mapSearch">
      <p class="icon-back" @click="back" style="padding:16px 0 0 15px;background-color:#fff;margin:0"></p>
      <van-search v-model="userInput" placeholder="请输入搜索关键词" id="tishikuang" />
    </div>
    <div id="container">
    </div>
  </div>
</template>
 
<script>
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  securityJsCode: '9d8c43a34150f9b7328a934507c9720b'//在这里填写你的安全密钥
}
export default {
  data() {
    return {
      map: null,
      autoOptions: {
        input: 'tishikuang' //绑定的搜索关键字的input标签ID，用这个注册
      },
      auto: null,
      userInput: '', //绑定的搜索关键字的的内容
      placeSearch: null,
      searchHere: null, //根据搜索组件搜索到以后的地点信息
      addMarker:[],
    }
  },
  mounted() {
    this.initMap();
    this.axios.get('admin/getCurrentPageCinema?currentPage=1&pageSize=8&input=').then(res=>{
      // console.log(res);
    for(let i = 0;i<res.data.data.length;i++){
      this.addMarker.push(res.data.data[i].gps);
    }
    // console.log(this.addMarker)
  })

  },
  methods: {
    back(){
      this.$router.back()
    },
    ////vdata.amap.com/icons/b18/1/2.png
    // poi搜索以后 点击确认选址以后的操作
    initMap() {
      AMapLoader.load({
        key: "30f82385f0348a24c807f787d9195c57", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType',
          'AMap.Geolocation', 'AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder'
        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", { //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          zoom: 17, //初始化地图级别
          center: [114.48461, 38.043772], //初始化地图中心点位置
        });
        //引入高德地图的空间绑定使用
        this.map.addControl(new AMap.Scale())
        this.map.addControl(new AMap.ToolBar())
        this.map.addControl(new AMap.HawkEye())
        this.map.addControl(new AMap.MapType())
        this.map.addControl(new AMap.Geolocation())
        this.auto = new AMap.AutoComplete(this.autoOptions)
        //
        this.placeSearch = new AMap.PlaceSearch({
          map: this.map
        }) //构造地点查询类
        this.auto.on('select', this.select)//绑定查询事件     
      }).catch(e => {
        console.log(e);
      })
    },

    //poi搜索 这里面的这个参数 e 就是搜索以后的地址信息 你可以把它打印出来看一看经纬度什么的都有
    select(e) {
      this.placeSearch.setCity(e.poi.adcode) //依据城市ID搜索
      this.placeSearch.search(e.poi.name) //关键字查询查询
      this.map.setZoom(10, true)
      this.searchHere = e.poi
      console.log(e)
      alert(e.poi.location.lng + "," + e.poi.location.lat)
    }
  },

}
</script>
 
<style lang="scss" scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 93VH;
}

.mapSearch {
  display: flex;
  margin-bottom: 8px;

  .el-button {
    margin-left: 8px;
  }
}

.van-search__content {
  width: 83vw;
}

#tishikuang {
  margin-bottom: 200px;
  display: block;
}


</style>
<style lang="scss">
.amap-sug-result {
  border-radius: 5px !important;
  width: 82vw;
}
.auto-item{
  font-size: 15px;
  padding: 15px;
}
.amap-logo {
  display: none;
  opacity: 0 !important;
}
.amap-content-body{
  border-radius: 5px;
}
.amap-copyright {
  opacity: 0;
}
</style>