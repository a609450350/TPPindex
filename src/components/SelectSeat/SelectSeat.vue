<template>
  <div id="select-seat">
    <div class="top">
      <span class="icon-back" @click="$router.go(-1)"></span>
      <span class="name ellipsis">{{movieInfo.name}}</span>
      <img src="@/assets/icon/分享.png" alt="">
    </div>
    <div class="seat-example">
      <div class="example empty-example"><span class="icon icon-empty-seat"></span>可选</div>
      <div class="example sold-example"><span class="icon icon-sold-seat"></span>不可选</div>
      <div class="example selected-example"><span class="icon icon-selected-seat"></span>已选</div>
    </div>
    <div class="seat-block">
      <div class="screen">{{scheduleInfo.hall_name}}银幕</div>
      <div class="center">银幕中央</div>
      <div class="screen-line"></div>
      <div class="row-container">
        <span class="num">1</span>
        <span class="num">2</span>
        <span class="num">3</span>
        <span class="num">4</span>
        <span class="num">5</span>
        <span class="num">6</span>
        <span class="num">7</span>
        <span class="num">8</span>
        <span class="num">9</span>
      </div>
      <div class="seat-container">
        <div class="row" v-if="hackReset" v-for="(itemI, indexI) in seatIJ" :key="indexI">
          <span class="seat" v-for="(itemJ, indexJ) in itemI" :key="indexJ"
            :class="{ 'icon-sold-seat': itemJ === 1, 'icon-empty-seat': itemJ === 0, 'icon-selected-seat': itemJ === 2 }"
            @click.prevent="handleSelectSeat(indexI, indexJ)"></span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        <p>{{movieInfo.name}}</p>
        <p>{{scheduleInfo.show_date}} {{scheduleInfo.show_time}} 国语2D</p>
      </div>
      <div class="solid"></div>
      <div class="bottom-bottom" v-if="selectedSeat">
        <div class="seat-item" v-for="(item,index) in selectedSeatInfo" :key="index">
          <div class="left">
            <span class="seat">{{item[0]+1}}排{{item[1]+1}}座</span>
            <span class="price">￥{{(scheduleInfo.price).toFixed(2)}}元</span>
          </div>
          <span class="right icon-close" @click="cancelSelectedSeat(item[0],item[1])"></span>
        </div>
      </div>
    </div>
    <span class="btn" v-if="!selectedSeat">请先选座</span>
    <span class="btn active" v-else @click="ensureSeatBtn">确认选座</span>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      cid:'',
      mid:'',
      sid:'',
      uid:'',
      cinemaInfo: {},
      movieInfo: {},
      scheduleInfo: {},
      seatInfo: '',
      seatCount: 0,
      selectedSeat: false,
      hackReset: true,
      selectedSeatInfo: [],
      seatIJ: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
    }
  },
  created() {
    // Indicator.open('Loading...');
    this.cid=this.$route.params.cid
    this.mid=this.$route.params.mid
    this.sid=this.$route.params.sid
  },
  methods: {
    //加载信息 getCurrentCinemaDetail 影院id  getMovieDetail
//电影id getScheduleById 排片id
    async loadInfo(){
      this.axios.get(`index/getCurrentCinemaDetail?cinemaId=${this.cid}`).then((res)=>{
        if (res.data.success_code === 200) {
          this.cinemaInfo = res.data.data;
          console.log('影院：',this.cinemaInfo);
        }
      })
      this.axios.get(`index/getMovieDetail?movieId=${this.mid}`).then((res)=>{
        if (res.data.success_code === 200) {
          this.movieInfo = res.data.data[0];
          console.log('电影：',this.movieInfo);
        }
      })
      this.axios.get(`index/getScheduleById?scheduleId=${this.sid}`).then((res)=>{
        if (res.data.success_code === 200) {
          this.scheduleInfo = res.data.data;
          console.log('排片：',this.scheduleInfo);
          this.seatInfo = this.scheduleInfo.seat_info;
                if (this.seatInfo){
                  this.seatInfo = JSON.parse(this.seatInfo);
                  this.seatInfo.forEach((value)=>{
                  if (value%10!==0){
                    this.seatIJ[parseInt(value/10)][value%10-1] = 1;
                  } else{
                    this.seatIJ[parseInt(value/10)-1][9] = 1;
                  }
                });
              }
            }
      })
    },
    //选择座位
    handleSelectSeat(indexI,indexJ){
      if (this.seatCount===4&&this.seatIJ[indexI][indexJ]===0){
        Toast.fail('一次最多选择4个座位哦！');
      } else{
        if (this.seatIJ[indexI][indexJ]===0){
          this.seatIJ[indexI][indexJ]=2;
          this.selectedSeatInfo.push([indexI,indexJ]);
          this.seatCount+=1;
          if (!this.selectedSeat){
            this.selectedSeat = true;
          }
          console.log(this.selectedSeatInfo)
        }
        else if (this.seatIJ[indexI][indexJ]===2){
          this.seatIJ[indexI][indexJ]=0;
          this.seatCount-=1;
          let currentIndex;
          this.selectedSeatInfo.forEach((value,index)=>{
            if (indexI===value[0]&&indexJ===value[1]){
              currentIndex = index;
            }
          });
          this.selectedSeatInfo.splice(currentIndex,1);
          if (this.seatCount===0){
            this.selectedSeat = false;
          }
        }
        this.hackReset = false;
        this.$nextTick(() => {
          this.hackReset = true;
        });
      }
    },
    //取消选座
    cancelSelectedSeat(indexI,indexJ){
      this.seatIJ[indexI][indexJ]=0;
      this.seatCount-=1;
      let currentIndex;
      this.selectedSeatInfo.forEach((value,index)=>{
        if (indexI===value[0]&&indexJ===value[1]){
          currentIndex = index;
        }
      });
      this.selectedSeatInfo.splice(currentIndex,1);
      if (this.seatCount===0){
        this.selectedSeat = false;
      }
    },
    //确认选座
    async ensureSeatBtn(){
      if(!this.uid){
        Toast.fail('请先登录！');
        this.$router.push('/login');
      } else {
        if (!this.seatInfo) {
          this.seatInfo = [];
        }
        this.selectedSeatInfo.forEach((value, index) => {
          this.seatInfo.push(value[0] * 10 + value[1]);
          sessionStorage.setItem('seat_' + (index + 1), value[0] * 10 + value[1] + 1);
        });
        sessionStorage.setItem('seat_count', this.selectedSeatInfo.length);
        this.seatInfo = JSON.stringify(this.seatInfo);
        this.axios.post('index/updateScheduleSeat', { scheduleId: this.sid, seatInfo: this.seatInfo }).then((res) => {
          if (res.data.success_code === 200) {
            Toast.success('选座成功！');
            this.$router.push(`/submitorder/${this.cid}/${this.mid}/${this.sid}/${this.uid}`);
          }
        })
      }

    },
    //确认选座
    //   async ensureSeatBtn(){
    //     if (this.$cookies.get('user_id')){
    //       if (!this.seatInfo) {
    //         this.seatInfo = [];
    //       }
    //       this.selectedSeatInfo.forEach((value,index)=>{
    //         this.seatInfo.push(value[0]*10+value[1]+1);
    //         this.$cookies.set('seat_'+(index+1),value[0]*10+value[1]+1);
    //       });
    //       this.$cookies.set('seat_count',this.selectedSeatInfo.length);
    //       this.seatInfo = JSON.stringify(this.seatInfo);
    //       let json = await updateScheduleSeat(this.$route.query.schedule_id,this.seatInfo);
    //       if (json.success_code===200){
    //         Toast({
    //           message: '锁定座位成功',
    //           position: 'middle',
    //           duration: 2000
    //         });
    //         this.$router.push({path:'/submit_order',query:{cinema_id:this.$route.query.cinema_id,movie_id:this.$route.query.movie_id,schedule_id:this.$route.query.schedule_id,}});
    //       }
    //     } else{
    //       this.$router.push('./login');
    //     }
    //   }
    // },
    // filters:{
    //   dateFilter(props){
    //     props = props+'';
    //     return props.split('-')[0]+'年'+props.split('-')[1]+'月'+props.split('-')[2]+'日';
    //   }
    // }
  },
  mounted(){
        this.loadInfo();
        if(JSON.parse(sessionStorage.getItem('user'))){
          this.uid=JSON.parse(sessionStorage.getItem('user'))[0].user_id
        }else{
          this.uid=''
        }
  }
}
</script>

<style scoped lang="scss">
#select-seat {
  background: #F5F5F5;
  height: 100vh;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;

    .icon-back {
      padding-left: 10px;
      font-size: 1.7rem;
    }

    .name {
      font-size: 1.5rem;
    }

    img {
      width: 1.9rem;
      padding-right: 10px;
    }
  }

  .seat-example {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .example {
      padding: 1rem;
    }
  }

  .seat-block {
    padding: 1.12rem 0;

    // top: 1.8rem;
    // left: .8rem;
    .screen-line {
      width: 0;
      height: 20.8rem;
      border: 0.02rem dashed #dcdcdc;
      position: absolute;
      top: 10.6rem;
      left: 50%;
      margin-left: 0.28rem;
    }

    .seat-container {
      padding: .12rem 0;
      top: 1.8rem;
      left: .8rem;
      text-align: center;

      .row {
        margin-bottom: .25rem;

        .seat {
          font-size: 1.7rem;
          margin-left: .134rem
        }
      }
    }

    .screen {
      text-align: center;
    }

    .center {
      margin: 1rem;
      text-align: center;
    }

    .row {
      margin-bottom: .25rem;

      .seat {
        font-size: .5rem;
        margin-left: .134rem;
      }
    }

    .row-container {
      position: absolute;
      top: 11.4rem;
      left: .25rem;
      width: 0.8rem;
      height: 18rem;
      padding: .6rem 0;
      background-color: rgba(168, 168, 168, .8);
      display: flex;
      flex-flow: column;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      border-radius: 2.2rem;
      ;
      font-size: 1.25rem;
    }
  }

  .bottom {
    background: white;
    border-radius: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 8rem;

    .title {
      display: flex;
      flex-direction: column;
      padding-left: 10px;

      p {
        margin: 5px;
      }
    }

    .solid {
      border: 1px solid #eeecec;
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }

    .bottom-bottom {
      display: flex;
      flex-direction: row;
      font-size: .25rem;
      .seat-item{
        display: flex;
        flex-direction: row;
        margin: 1rem;
        margin-right: 0.4rem;
        border: 1px solid #eeecec;

        .left{
            display: flex;
            flex-direction: column;;
        }
      }
      .seat {
        font-size: .85rem;
        color: #666;
        margin-bottom: .12rem;
      }

      .price {
        color: #dd2727;
        font-size: .24rem;
      }
    }
  }
  .btn{
    position: fixed;
    bottom: 1rem;
    height: 2.8rem;
    width: 90%;
    line-height: 2.8rem;
    background-color: #EA6288;
    color: #FF80AC;
    text-align: center;
    font-size: 0.28rem;
    display: inline-block;
    margin-left: 5%;
    border-radius: 20px;
    margin-top: 20px;
        &.active{
            color:white;
        }
    }
}
</style>
