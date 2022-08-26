<template>
  <div class="shop-movie">
    <div class="header">
      <div class="header-childer">
        <van-icon name="arrow-left" size="20px" @click="goback" />
        <div class="title">{{ name }}</div>
        <div >
          <img src="@/assets/Gif/icons8-地图标记.gif" class="img1">
          <img src="@/assets/Gif/icons8-搜索.gif" @click="gosearch" class="img2">
        </div>
      </div>
      <van-tabs animated @click="onTab">
        <van-tab v-for="(item, index) in time" :key="index" :title="item">
          <p class="teday">今天有场次</p>
          <div class="cotent" v-for="(item,index) in data" :key="index">
            <div @click="Shopping(item.cinema_name,item.cinema_id)" class="left">
              <h3>{{ item.cinema_name }}</h3>
              <span>好评率82%</span>
              <p class="address">{{ item.specified_address }}</p>
            </div>
            <div class="right">
              <span class="money">￥{{ item.lowPrice | bai }}</span><span> 起</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      time: [],
      timeweek: '',
      timedate: '',
      name: '',
      id:'',
      data: null,
    }
  },
  //页面未渲染时调用
  created() {
    this.id = this.$route.params.id
    this.name = this.$route.params.name
  },
  methods: {
    Shopping(name,id){
      this.$router.push(`/shopping/${name}/${id}`)
    },
    //返回上一个页面
    goback() {
      this.$router.back()
    },
    //跳转搜索
    gosearch() {
      this.$router.push('/cinemasearch')
    },
    //切换日期获取数据
    onTab(name, title) {
      let titles = title
      // console.log(titles.substring(2))
      this.timeweek = this.timedate + "-" + titles.substring(2)
      // console.log(this.timeweek)
      this.axios.get(`/index/dateCinema?show_date=${this.timeweek}`).then(res => {
        this.data = this.unique(res.data.data)
      })
    },
    //数据去重
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.cinema_name) && res.set(arr.cinema_name, 1));
    },
  },
  filters: {
    bai(val) {
      return (val / 100)
    }
  },
  mounted() {
    
    //获取当前时间
    let timedate = moment().format('YYYY');
    this.timedate = timedate
    // console.log(this.timedate)
    moment.locale('zh-cn', {
      weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    });
    let seekTime = moment().format("MM-DD");
    let time = moment().format('ddd');;
    // console.log(seekTime)
    for (let i = 0; i <= 7; i++) {
      let seekTime = moment().add(i, 'days').format("MM-DD");
      let weekday = moment().add(i, 'days').format("ddd");
      if (i == 0) {
        this.time.push("今天" + seekTime)
      } else if (i == 1) {
        this.time.push("明天" + seekTime)
      } else if (i == 2) {
        this.time.push("后天" + seekTime)
      } else {
        this.time.push(weekday + seekTime)
      }
    };
    this.axios.get(`/index/dateCinema?show_date=${this.timedate + "-" + this.time[0].substring(2)}`).then(res => {
      this.data = res.data.data;
    });
    this.axios.get(`index/getMovieDetail?movieId=${this.id}`).then(res=>{
      this.name=res.data.data[0].name
    })
  },
}
</script>

<style lang="scss" scoped>
.img1{
  width: 25px;
}
.img2{
  width: 25px;
  padding-left: 15px;
}
.title{
  margin-left:50px;
  font-size:1.2rem;
}
.shop-movie {
  background: rgb(240, 239, 239);
  height: 100vh;
}

.header {
  background: white;
}

.header-childer {
  display: flex;
  margin: 5px;
  padding: 1.5vh;
  flex-direction: row;
  justify-content: space-between;
}

.van-tabs__track {
  flex-direction: column;
}
.van-tab__pane-wrapper{
  background: rgb(240, 239, 239);
}
.teday {
  width: 91vw;
  padding: 18px;
  background: rgb(240, 239, 239);
  color: rgb(162, 163, 163);
  margin: 0px;
  padding-bottom: 0px;
}
.cotent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  margin: 15px;
  border-radius: 8px;
  padding: 10px;
}
.left {
  width: 80%;
}
.money {
  color: red;
}
h3 {
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.address {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
}
</style>