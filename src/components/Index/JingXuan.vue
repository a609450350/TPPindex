<template>
  <div style="margin:75px 0 100px 0">
    <swiper class="swiper" :options="swiperOption" style="margin:5px">
      <swiper-slide v-for="x in data" :key="x.id"><img :src="`http://101.43.252.14:3000${x.poster}`" style="width:100%;"></swiper-slide>
    </swiper>
    <!-- ------------------ -->
    <div class="sw1">
      <span style="font-size:1.3rem">热映影片<van-icon name="fire" color="#ee0a24" /></span>
      <router-link to="seach" style="font-size:0.8rem;margin-top:0.5rem;color:black">全部<van-icon name="arrow" /></router-link>
    </div>
    <swiper class="swiper" :options="swiperOption1">
      <swiper-slide v-for="y in data1" :key="y.id">
        <div style="position: relative;">
          <img :src="`http://101.43.252.14:3000${y.poster}`" @click="gp(y.filmId,y.movie_id)" style="height:140px">
          <span  class="pf">{{y.score}}分</span>
        </div>
        <p class="name">{{y.name}}</p>
        <van-button round type="info" @click="GouPiao(y.movie_id)">购票</van-button>
      </swiper-slide>
    </swiper>
    <!-- ----------------------------------- -->
    <div class="sw1">
      <span style="font-size:1.3rem">待映推荐<van-icon name="new" color="#ee0a24" /></span>
      <router-link to="seach" style="font-size:0.8rem;margin-top:0.5rem;color:black">全部<van-icon name="arrow" /></router-link>
    </div>
    <swiper class="swiper" :options="swiperOption1">
      <swiper-slide v-for="y in data1" :key="y.id">
        <div style="position: relative;">
          <img :src="`http://101.43.252.14:3000${y.poster}`" @click="gp(y.filmId,y.movie_id)" style="height:140px">
          <span  class="pf">{{y.score}}分</span>
        </div> 
        <p class="name">{{y.name}}</p>
        <van-button round type="info" @click="GouPiao(y.movie_id)">购票</van-button>
      </swiper-slide>
    </swiper>
    <!-- ---------------------------------------------- -->
    <div class="sw1">
      <span style="font-size:1.3rem">为你推荐<van-icon name="point-gift" color="#ee0a24" /></span>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-grid :column-num="2"  :border="false">
        <van-grid-item v-for="y in data2" :key="y.id">
          <div class="tuijian">
            <img :src="y.poster" style="width:100%;">
            <p class="name1" style="margin:0">《{{y.name}}》</p>
            <p class="name1">{{y.description}}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      data1: [],
      data2: [],
      loading:false,
      finished:false,
      current:1,
      swiperOption: {
          pagination: {
            dynamicBullets: true,
            autoplay:true,
            delay:1000
          },
          autoplay:true,
          speed:1000,
          loop:true
        },
        swiperOption1: {
          slidesPerView: 3.5,
          pagination: {
            clickable: true
          }
        }
    };
  },
  methods: {
    gp(fid,mid) {
      this.$router.push(`/xiangqing1/${fid}/${mid}`)
    },
    GouPiao(id){
      this.$router.push(`/shopmovie/${id}`)
    },
    onLoad() {
      this.current++
      this.axios.get(`index/bigMoviePage?currentPage=${this.current}&pageSize=10&input=&inputs=`).then((res) => {
        this.data2 = [...this.data2, ...res.data.data]
        this.loading = false
        if (this.data2.length >= res.data.total) {
          this.finished = true
        }
      });
    }
  },
  mounted() {
    this.axios.get("index/swiper").then((res) => {
      this.data = res.data.data
    });
    this.axios.get("admin/getCurrentPageMovie?currentPage=1&pageSize=100&input=").then((res) => {
      this.data1 = res.data.data
    });
    this.axios.get("index/bigMoviePage?currentPage=1&pageSize=10&input=&inputs=").then((res) => {
      this.data2 = res.data.data
    });
  },
};
</script>

<style lang="scss" scoped>
.name{
  display: block;
  white-space: nowrap;
  width: 5.5rem;
  overflow: hidden;
  text-overflow:ellipsis;
  margin: 0 0 0.5rem 0;
}
.name1{
  width: 9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  margin: 0;
}
.sw1{
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 1rem 0.6rem 0;
}
button{
  border: 0;
  color: white;
  padding: 0.9rem;
  height: 1.5rem;
  background-color: #fb54a4;
}
.pf{
  position: absolute;
  z-index:999999;
  color: white;
  left: 7px;
  bottom: 7px;
}
img{
    border-radius: 5px;
}
</style>