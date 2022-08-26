<template>
  <div v-if="data" class="quanju" style="padding:0 15px 15px 15px;">
    <div style="margin:10px 0 5px 10px;font-size:1.3rem">今日必抢</div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="x in datas" :key="x.id" 
        ><img
          :src="`${x.posterUrl}`"
          alt=""
          style="height: 8.75rem"
          @click="dianji(x.id)"
        />
        <span style="font-size:4px;color:white;background-color: orange;border: 1px solid orange;padding: 2px 4px;">套票{{x.minDiscount}}折起</span>
        <div class="wenzi">{{ x.name }}</div>

        </swiper-slide
      >
    </swiper>
    <hr style="margin-top: 20px" />
    <div style="margin:10px 0 5px 10px;font-size:1.3rem">七日精选</div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="x in qiri" :key="x.id"
        ><img
          :src="x.image"
          alt=""
          style="height: 8.75rem"
          @click="dianji()"
        />
        <div class="wenzi">{{ x.name }}</div>
        <div style="color: red">￥{{x.lowestPrice}}<span style="font-size:4px">起</span>
        </div>
        <span style="font-size: 4px; color: orange; border: 1px solid orange"
          >人气爆棚</span
        ></swiper-slide
      >
    </swiper>
    <hr style="margin-top: 20px;" />
    <div style="margin:10px 0 5px 10px;font-size:1.3rem">演员动态</div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="x in data" :key="x.id" 
        ><img
          :src="x.headUrl"
          alt=""
          style="height:100px;width:100px;border-radius:50%;overflow:hidden"
          @click="dianji()"
        />
        <div class="wenzi" id="yanyuan">{{ x.celebrityName }}</div>
        <div id="yanyuan" style="color: grey;font-size:4px">{{ x.recommendTag }}</div>
        </swiper-slide
      >
    </swiper>
    <hr style="margin-top: 20px;" />
    <div style="margin:10px 0 5px 10px;font-size:1.3rem">发现精彩</div>
    <van-grid :gutter="4" style="margin-bottom:50px;background-color: #f7f7f7;" :column-num="2" :border="false" :center="false">
      <van-grid-item v-for="x in qiri" :key="x.id">
        <div>
        <img class="imgs" :src="x.image" style="height: 250px" />
        <p class="title">[{{x.cityName}}]{{x.name}}</p>
        <span style="font-weight: bold; font-size: 20px; color:red;">￥{{x.lowestPrice}}</span> 
        <span style="font-weight: bold; font-size: 16px; color:red;">起</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import 'swiper/css/swiper.css'

export default {
  mounted() {
    this.getdata();
    this.getdatas();
    this.getData()
  },
  methods: {
    dianji(filmId){
      this.$router.push(`/xiangqing/${filmId}`)  
      // console.log('当前选中项',cinema_id);
    },
    // 今日必抢
    getdatas(){
      this.axios.get("index/maoyanWeek").then((res)=>{
        this.datas=res.data.data
      })
    },
    // 七日精选
    getData(){
      this.axios.get("/index/maoyan").then((res)=>{
        this.qiri=res.data.data
      })
    },
    // 演员动态
    getdata() {
      this.axios.get("index/celebrity").then((res) => {
        this.data = res.data.data;
      });
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      qiri:[],
      datas:[],
      data: [],
      swiperOption: {
        slidesPerView: 3.5,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.quanju{
  background-color:#f7f7f7;
}
#yanyuan{
  text-align: center;
}
.title{
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.wenzi {
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  
}
img{
  border-radius: 5px;
  width: 90%;
}
.imgs{
  width: 100%;
  
}
</style>