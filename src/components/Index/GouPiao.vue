<template>
    <div>
        <van-icon name="arrow-left" style="position:fixed;top:10px;left:10px" size="2rem" color="#fff" @click="onClickLeft" />
        <div class="top"></div>
        <div class="header">
            <span style="font-size:1.8rem">{{name}}</span><van-icon name="arrow" size="25px"/>
            <p>{{adr}}</p>
            <p>暂无好评度-儿童优惠-3D眼镜</p>
        </div>
        <!-- ---------------------------- -->
        <swiper class="swiper" :options="swiperOption1" style="margin-top:110px;" ref="swp">
            <swiper-slide :class="y.filmId" v-for="y in data1" :key="y.id">
                <img :src="`http://101.43.252.14:3000${y.poster}`" @click="gp(y.movie_id)" style="height:150px;border-radius: 5px;">
            </swiper-slide>
        </swiper>
        <div class="bottom">
            <div style="margin-top:10px;margin-left:25%">
                <div style="display:fixed">
                    <span style="font-size:1.1rem;margin-right:10px">{{name1}}</span>
                    <span>淘票评分：</span><span style="color:orange">{{grade}}</span>  
                </div>
                <span>{{time1}}分钟 | {{type}}</span>
            </div>
            <van-tabs animated @click="onTab">
        <van-tab v-for="(item, index) in time" :key="index" :title="item" style="background-color:#eee;height:60vh;">
          <p v-if="data.length==0" style="margin-left:35%">今日暂无场次~</p>
          <div class="cotent" v-for="(item,index) in data" :key="index">
            <div class="cc">
              <span style="font-size:1.2rem;margin-right:15px">{{ item.show_time}}</span>
              <span style="font-size:0.8rem">{{ item.hall_name}}</span>
            </div>
            <div class="cc">
              <span style="color:red">￥{{item.price}}</span>
              <button @click="goShopping(item.cinema_id,item.schedule_id)">购票</button>
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
        props:['name'],
        created() {
          this.id = this.$route.params.id
        },
        data() {
            return {
                movieId:'',
                adr:'',
                id:'',
                data2: null,
                time: [],
                timeweek: '',
                timedate: '',
                data:[],
                data1:[],
                name1:'独行月球',
                grade:'7.8',
                time1:'122',
                type:'喜剧|科幻',
                id1:'2',
                swiperOption1: {
                    slidesPerView: 3.5,
                    centeredSlides: true,
                    pagination: {
                        clickable: true
                    },
                    observer:true,
                    observeParents:true,
                }
            }
        },
        methods: {
          goShopping(cid,sid){
            // console.log('影院:'+cid,'电影:'+this.id1,'排片:'+sid)
            this.$router.push(`/Select/${cid}/${this.id1}/${sid}`)
          },
            gp(id) {
                this.axios.get(`index/getMovieDetail?movieId=${id}`).then(res=>{
                this.name1=res.data.data[0].name
                this.grade=res.data.data[0].score
                this.time1=res.data.data[0].movie_long
                this.type=res.data.data[0].type
                this.id1=res.data.data[0].movie_id
                  this.axios.get(`index/getMovieCiema?movieId=${this.id1}&cinemaId=${this.id}`).then(res => {
                    this.data =res.data.data
                    console.log(res)
                  })
                })
                
            },
            onClickLeft() {
                this.$router.back()
            },
            onTab(name, title) {
      let titles = title
      // console.log(titles.substring(2))
      this.timeweek = this.timedate + "-" + titles.substring(2)
      // console.log(this.timeweek)
      this.axios.get(`index/getMovieCiema?movieId=${this.id1}&cinemaId=${this.id}`).then(res => {
        this.data =res.data.data
        console.log(res)
      })
    },
        },
        mounted () {
          this.axios.get(`index/getMovieCiema?movieId=${this.id1}&cinemaId=${this.id}`).then(res => {
            this.data =res.data.data
            console.log(this.data)
          })
          this.axios.get(`index/getCurrentCinemaDetail?cinemaId=${this.id}`).then(res=>{
            this.adr=res.data.data.specified_address
          })
            this.axios.get("admin/getCurrentPageMovie?currentPage=1&pageSize=100&input=").then((res) => {
                this.data1 = res.data.data
            });
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
      this.data2 = res.data.data;
    });
        },
    }
</script>

<style lang="scss" scoped>

.header{
    width: 85%;
    margin:0 20px;
    padding: 10px 8px;
    background-color:#fff;
    border-radius: 10px;
    border: 1px solid #eee;
    margin-top:-110px;
    
}
.top{
    width:100%;
    box-sizing: border-box;
    height: 220px;
    overflow: hidden;
    background: no-repeat center top / 100% 100%;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 255), rgba(255, 255, 255, 0)),url(@/assets/img.jpg)
}
  .swiper-container{
        width:100%;
        height:100%;
    }
    .swiper-container img{
        width:100%;
        height:100%;
    }
    .swiper-slide {
        width:100%;
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
	  transition: 300ms;
	  transform: scale(0.8);
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
	}
.cotent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  margin: 10px;
  border-radius: 8px;
  padding:15px 10px;
}
.cc{
  padding:5px 10px;
}
button{
  background-color: white;
  border: 1px solid red;
  border-radius: 30px;
  padding:3px 10px;
  color: red;
  margin-left: 10px;
  font-size: 0.8rem;
}
</style>