<template>
  <div>
      <van-nav-bar title="演出" fixed />
      <div class="top">
      <div class="top-left">
        <router-link to="city" class="animate__animated">{{$store.state.cityName}}</router-link>
        <van-icon name="arrow-down" size="0.5rem" />
      </div>
      <router-link to="search">
        <van-search shape="round" placeholder="搜影片、综艺、艺人、咨询..." />
      </router-link>
      <img :src="weather" style="width:1.6rem"/>
    </div>

      <van-tabs  sticky animated offset-top="3.4rem">
        <van-tab title="首页" style="margin:50px 0 100px 0"><index/></van-tab>
        <van-tab title="脱口秀" style="margin:50px 0 100px 0"><ych /></van-tab>
        <van-tab title="话剧歌剧" style="margin:50px 0 100px 0"><hjgq /></van-tab>
        <van-tab title="音乐会" style="margin:50px 0 100px 0"><yyh /></van-tab>
        <van-tab title="戏曲艺术" style="margin:50px 0 100px 0"><tyss /></van-tab>
      </van-tabs>
    <tabbar/>
  </div>
</template>

<script>
import Ych from '@/components/yanchu/ych.vue';
import Index from '../components/yanchu/index.vue';
import Hjgq from '@/components/yanchu/hjgq.vue';
import Yyh from '@/components/yanchu/yyh.vue';
import Tyss from '@/components/yanchu/tyss.vue';
import Tabbar from '@/components/Tabbar.vue';

export default {
  components: { Index, Ych, Hjgq,Yyh,Tyss,Tabbar },
    data() {
    return {
      active: 0,
      value:'',
      cityid: '',
      today:'',
      weather:'@/assets/weather/太阳.gif',
    };
  },
  created() {
      this.cityid = this.$store.state.cityId;
  },
  async mounted(){
          let url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${this.cityid}&key=2eab3ee939e9127f94f34334c9971d58&extensions=all&output=json`
          const res = await this.axios.get(url);
          this.today = res.data.forecasts[0].casts[0].dayweather;
          // this.today = this.$store.state.today
        console.log(this.today);
        if(this.today === '晴'){
          this.weather = require('@/assets/weather/太阳.gif')
        }if(this.today === '多云' || this.today === '晴间多云' || this.today === '阴'){
          this.weather = require('@/assets/weather/白天晴间多云.gif')
        }if(this.today === '小雨' || this.today === '阵雨' || this.today === '小雨-中雨' || this.today === '雨'){
          this.weather = require('@/assets/weather/多云兼雨.gif')
        }if(this.today === '雷阵雨'){
          this.weather = require('@/assets/weather/云闪电.gif')
        }if(this.today === '雷阵雨并伴有冰雹' || this.today === '强雷阵雨' || this.today === '强阵雨'){
          this.weather = require('@/assets/weather/闪电箭.gif')
        }if(this.today === '中雨' || this.today === '中雨-大雨'){
          this.weather = require('@/assets/weather/雨.gif')
        }if(this.today === '大雨' || this.today === '暴雨' || this.today === '大暴雨' || this.today === '特大暴雨' || this.today === '大雨-暴雨' || this.today === '暴雨-大暴雨'|| this.today === '大暴雨-特大暴雨'){
          this.weather = require('@/assets/weather/雨.gif')
        }if(this.today === '雨雪天气' || this.today === '雨夹雪' || this.today === '阵雨夹雪' || this.today === '雪' || this.today === '阵雪' || this.today === '小雪'){
          this.weather = require('@/assets/weather/小雪.gif')
        }if(this.weather === '中雪' || this.today === '大雪' || this.today === '暴雪' || this.today === '大雪-暴雪' || this.today === '小雪-中雪' || this.today === '中雪-大雪'){
          this.today = require('@/assets/weather/雪.gif')
        }else{
          this.today = require('@/assets/weather/注意.gif')
        }
  }, 
};
</script>

<style lang="scss" scoped>

// .top{
//  display: flex;
//  width:100%;
// justify-content: space-between;
// align-items: center;
//  padding: 1rem 0rem 0rem 0rem;
//  background-color: white;
// position: fixed; z-index:999999;
// }
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: white;
  position: fixed;
  z-index:999999;
  width:92%;
}
a{
  color: black;
}
</style>