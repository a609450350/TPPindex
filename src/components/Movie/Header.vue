<template>
  <div class="header">
    <div class="top">
      <div class="top-left">
        <router-link to="city" class="animate__animated">{{$store.state.cityName}}</router-link>
        <van-icon name="arrow-down" size="0.5rem" />
      </div>
      <transition name="one" appear>
        <van-search shape="round" placeholder="搜影片、综艺、艺人、咨询..." v-show="issearch" @focus="gosearch"/>
      </transition>
      <transition name="two" appear>
        <van-search shape="round" placeholder="搜影院名称或地址" v-show="issearchs" @focus="search"/>
      </transition>
      <!-- <van-icon clss="icon" name="scan" size="1.5rem" /> -->
      <img :src="weather" style="width:1.6rem"/>
    </div>
    <div class="bottom">
      <van-tabs class="reset" :animated="true" duration="0.5" v-model="activeName" @click="onClicktabs" sticky>
        <van-tab title="热映" name="hot"><Hot/></van-tab>
        <van-tab title="影院" name="cinema"><Cinema/></van-tab>
        <van-tab title="即将上映" name="soonmovie"><SoonMovie/></van-tab>
        <van-tab title="在线看" name="online"><Online/></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Hot from '../Movie/content/Hot.vue'
import Cinema from '../Movie/content/Cinema.vue'
import SoonMovie from '../Movie/content/SoonMovie.vue'
import Online from '../Movie/content/Online.vue';
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            activeName: "cinema",
            issearch: true,
            issearchs: false,
            cityid: '',
            today:'',
            weather:null,
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
    methods: {
        ...mapActions([
        ]),
        onClicktabs(name) {
            if (name == "hot" || name == "soonmovie" || name == "online") {
                this.issearchs = false;
                this.issearch = true;
            }
            else {
                this.issearchs = true;
                this.issearch = false;
            }
        },
        search(){
          this.$router.push('/csearch')
        },
        gosearch(){
          this.$router.push('/search')
        }
    },
    components: { SoonMovie, Online,Hot,Cinema }
}
</script>

<style lang="scss" scoped>
.header{
  display:flow-root
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background: white;
}

a {
  color: black;
}

.one-enter {
  opacity: 0;
}

.one-enter-to {
  opacity: 1;
}

.one-enter-active {
  transition: all 1.5s;
}
.two-enter {
  opacity: 0;
}
.two-enter-to {
  opacity: 1;
}
.two-enter-active {
  transition: all 1.5s;
}
</style>
<style>
.van-tab--active {
  font-weight: bold !important;
  color: black !important;
  font-size: 15px !important;
}

.icon {
  margin: 1px;
}
</style>