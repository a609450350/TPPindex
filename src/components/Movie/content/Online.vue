<template>
  <div class="online">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in countrys" :key="item.id" :class="{ active: item.id == show }"
        @click.native="show = item.id">
        <span @click="country($event)">{{ item.name }}</span>
      </swiper-slide>
    </swiper>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="items in plots" :key="items.id" :class="{ plots: items.id == plot }"
        @click.native="plot = items.id">
        <span @click="navigate($event)">{{ items.name }}</span>
      </swiper-slide>
    </swiper>
    <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check="false">
      <div class="content">
        <van-grid :border="false" :column-num="3">
          <van-grid-item v-for="(item,i) in data" :key="i">
            <div class="span_title">
              <van-image :src="`${item.poster}`" style="width:113px;height:167px" />
              <span class="title">淘票票评分<i>{{ item.doubanRating }}</i></span>
            </div>
            <span class="name">{{ item.name }}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 15,
        preventClicksPropagation: false
      },
      show: 0,
      plot: 0,
      countrys: [
        {
          name: '全部',
          id: 0
        },
        {
          name: '中国',
          id: 1
        },
        {
          name: '美国',
          id: 2
        },
        {
          name: '加拿大',
          id: 3
        },
        {
          name: '英国',
          id: 4
        },
        {
          name: '法国',
          id: 5
        },
        {
          name: '日本',
          id: 6
        }
      ],
      plots: [
        {
          name: '全部',
          id: 0
        },
        {
          name: '剧情',
          id: 1
        },
        {
          name: '爱情',
          id: 2
        },
        {
          name: '动作',
          id: 3
        },
        {
          name: '喜剧',
          id: 4
        },
        {
          name: '惊悚',
          id: 5
        },
        {
          name: '悬疑',
          id: 6
        },
        {
          name: '犯罪',
          id: 7
        },
        {
          name: '奇幻',
          id: 8
        },
        {
          name: '冒险',
          id: 9
        },
        {
          name: '科幻',
          id: 10
        },
        {
          name: '动画',
          id: 11
        }
      ],
      data: null,
      loading: false,
      finished: false,
      current: 1,
      total: 0,
      countryName: '',
      plotName: ''
    }
  },
  methods: {
    country(event) {
      this.countryName = event.target.innerText
      console.log(this.countryName)
      if(this.countryName == '全部'){
        this.countryName = '';
      }
      if(this.plotName == '全部'){
        this.plotName = '';
      }
      this.axios.get(`/index/bigMoviePage?currentPage=1&pageSize=9&input=${this.countryName}&inputs=${this.plotName}`).then((res) => {
        this.data = res.data.data
        console.log(res)
      })
    },
    navigate(event) {
      this.plotName = event.target.innerText
      console.log(this.plotName)
      if(this.countryName == '全部'){
        this.countryName = '';
      }
      if(this.plotName == '全部'){
        this.plotName = '';
      }
      this.axios.get(`/index/bigMoviePage?currentPage=1&pageSize=9&input=${this.countryName}&inputs=${this.plotName}`).then((res) => {
        this.data = res.data.data
        console.log(res)
      })
    },
    onLoad() {
      console.log('到底了')
      this.current++
      this.axios.get(`/index/bigMoviePage?currentPage=${this.current}&pageSize=8&input=${this.countryName}&inputs=${this.plotName}`).then((res) => {
        this.data = [...this.data, ...res.data.data]
        this.loading = false
        console.log(this.data.length)
        console.log(res.data.total)
        if (this.data.length >= res.data.total) {
          this.finished = true
        }
      })
    },
  },
  mounted() {
    this.axios.get('/index/bigMoviePage?currentPage=1&pageSize=9&input=&inputs=').then((res) => {
      this.data = res.data.data
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.online {
  background: white;
  margin-bottom: 2.5rem;
}

.swiper-container {
  padding-left: 20px;
  padding-top: 15px;
}

.active {
  border: 1px solid transparent;
  border-radius: 20px;
  background: #fafafa;
  text-align: center;
  color: #FF4D64;
}

.plots {
  border: 1px solid transparent;
  border-radius: 20px;
  background: #fafafa;
  text-align: center;
  color: #FF4D64;
}

.span_title {
  position: relative;
}

.title {
  color: white;
  position: absolute;
  z-index: 999999;
  left: 7px;
  bottom: 7px;
  font-size: 13px;
}

i {
  font-weight: bold;
  font-size: 15px;
}

.name {
  margin-top: 10px;
}
</style>