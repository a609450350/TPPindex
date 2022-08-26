<template>
  <div class="soon-movie">
    <div class="swiper-box">
      <h3 class="xinpian">新片想看榜</h3>
      <swiper class="swiper" :options="swiperOption" style="background-color: white">
        <swiper-slide v-for="item in data" :key="item.id">
          <div style="position: relative;">
            <img :src="`${item.img}`" style="width: 100px;height:140px;border-radius: 5px;;" />
            <span><i>{{ item.wish | sum }}</i>人想看</span>
          </div>
          <p class="title">{{ item.nm }}</p>
          <p class="rt">{{ item.comingTitle }}上映</p>
          <button>想看</button>
        </swiper-slide>
      </swiper>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check="false">
      <h3 class="yugao">新片预告</h3>
      <div class="content" v-for="item in data" :key="item.id">
        <img :src="`${item.img}`" style="width: 100px;height:140px;border-radius: 5px;">
        <div class="num">
          <h4>{{ item.name }}</h4>
          <p class="content-p"><i class="i-yugao">{{ item.wish }}</i>人想看 | {{ item.comingTitle }}上映</p>
          <p class="content-p1">导演:{{ item.actor }}</p>
          <p class="content-p2">主演:{{ item.star }}</p>
        </div>
        <button>想看</button>
      </div>
    </van-list>
  </div>
</template>

<script>

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      data: null,
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    }
  },
  filters: {
    sum(val) {
      if (val >= 10000) {
        return (val / 10000).toFixed(1) + '万';
      } else {
        return val;
      }
    }
  },
  mounted() {
    this.axios.get('/index/hotMovie').then(res => {
      console.log(res)
      this.data = res.data.data
    })
  },
  methods: {
    onLoad() {
      console.log('到底了')
      this.current++
      this.axios.get(`/index/hotMoviePage?currentPage=${this.current}&pageSize=4&input=`).then((res) => {
        this.data = [...this.data, ...res.data.data]
        this.loading = false
        console.log(this.data.length)
        console.log(res.data.total)
        if (this.data.length >= res.data.total) {
          this.finished = true
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 1px;
  margin-bottom: 1px;
}

.swiper-container {
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
}

.swiper-box {
  height: 50%;
  background: white;
}

.xinpian {
  background: white;
  margin: 0;
  height: 2rem;
  color: #FCAB16;
  margin-left: 5px;
}

.yugao {
  margin-left: 5px;
  margin: 5px;
}

.rt {
  font-size: 13px;
  margin-top: 1px;
  margin-bottom: 8px;
}

button {
  color: white;
  font-size: 10px;
  width: 56px;
  height: 30px;
  background: #FCAB16;
  border: 1px solid transparent;
  border-radius: 20px;

}

i {
  font-weight: bold;
  color: white;
  font-size: 16px;
}

.i-yugao {
  font-weight: bold;
  color: #FCAB16;
  font-size: 20px;
}

span {
  color: white;
  position: absolute;
  z-index: 999999;
  left: 7px;
  bottom: 7px;
  font-size: 10px;
}

.content {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0.5rem;
  border-radius: 5px;
  justify-content: space-evenly;
  overflow-y: scroll;
  height: 100%;
}

.content-p,
.content-p1,
.content-p2 {
  width: 150px;
}

.swiper-slide {
  margin-bottom: 10px;
}
.soon-movie{
  margin-bottom: 2.4rem;
}
</style>