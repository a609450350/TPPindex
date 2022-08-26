<template>
    <div id="pay">
      <div class="top">
        <span class="icon-back" @click="back"></span>
        <span class="name ellipsis">支付订单</span>
      </div>
      <div class="order-info">
        <div class="time-down">
          <div class="title">支付剩余时间</div>
          <div class="time">
            <div class="minute"><span>{{countdown_m_b}}</span><span>{{countdown_m_s}}</span></div>
            <p class="maohao">:</p>
            <div class="second"><span>{{countdown_s_b}}</span><span>{{countdown_s_s}}</span></div>
          </div>
        </div>
        <div class="order-num">
          <span class="left icon-shop"></span>
          <div class="right">
            <div class="total">¥{{Number(total_price).toFixed(2)}}</div>
            <div class="num">订单编号：{{order_num}}</div>
          </div>
        </div>
      </div>
      <div class="pay-type">
        <div class="wechat type"><span class="icon icon-wechat"></span><p>微信支付</p><span :class="[{'icon-circle-selected-fill':selectPayType},{'icon-circle-unselect':!selectPayType}]" @click="selectPayType?selectPayType:selectPayType=!selectPayType"></span></div>
        <div class="alipay type"><span class="icon icon-alipay"></span><p>支付宝</p><span :class="[{'icon-circle-selected-fill':!selectPayType},{'icon-circle-unselect':selectPayType}]" @click="!selectPayType?selectPayType:selectPayType=!selectPayType"></span></div>
      </div>
      <div class="bottom">
        <div class="pay-btn" @click="handlePay">确认支付</div>
      </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { Toast } from 'vant';
    export default {
        name: "Pay",
        data(){
          return{
            scheduleInfo:{},
            seatInfo:[],
            countdown_m:'',
            countdown_s:'',
            total_price:'',
            order_num:'',
            order_phone:'',
            countdown_m_b:'',
            countdown_m_s:'',
            countdown_s_b:'',
            countdown_s_s:'',
            selectPayType:true,//微信
            timer:'',
            seat_1:'',
            seat_2:'',
            seat_3:'',
            seat_4:'',
            seat_count:'',
            uid:'',
            sid:''
          }
        },
        mounted(){
          // this.countdown_m = sessionStorage.getItem('countdown_m')
          // this.countdown_s = sessionStorage.getItem('countdown_s')
          // this.total_price = sessionStorage.getItem('total_price')
          // this.order_num = sessionStorage.getItem('order_num')
          // this.order_phone = sessionStorage.getItem('order_phone')
          // this.seat_1 = sessionStorage.getItem('seat_1');
          // this.seat_2 = sessionStorage.getItem('seat_2');
          // this.seat_3 = sessionStorage.getItem('seat_3');
          // this.seat_4 = sessionStorage.getItem('seat_4');
          // this.seat_count = sessionStorage.getItem('seat_count');
        },
        created(){
          this.sid = this.$route.params.sid
          this.uid = this.$route.params.uid
          this.countdown_m = sessionStorage.getItem('countdown_m')
          this.countdown_s = sessionStorage.getItem('countdown_s')
          this.total_price = sessionStorage.getItem('total_price')
          this.order_num = sessionStorage.getItem('order_num')
          this.order_phone = sessionStorage.getItem('order_phone')
          this.seat_1 = sessionStorage.getItem('seat_1');
          this.seat_2 = sessionStorage.getItem('seat_2');
          this.seat_3 = sessionStorage.getItem('seat_3');
          this.seat_4 = sessionStorage.getItem('seat_4');
          this.seat_count = sessionStorage.getItem('seat_count');
          this.loadInfo();
          if (this.countdown_m&&this.countdown_m){
            if (!this.countdown_m[1]) {
              this.countdown_m_s = Number(this.countdown_m)[0];
              this.countdown_m_b = 0;
            }
            if (!this.countdown_s[1]) {
              this.countdown_s_s = Number(this.countdown_s)[0];
              this.countdown_s_b = 0;
            }
            this.countdown_m_s = Number(this.countdown_m[1]);
            this.countdown_m_b = Number(this.countdown_m[0]);
            this.countdown_s_s = Number(this.countdown_s[1]);
            this.countdown_s_b = Number(this.countdown_s[0]);
          }
          this.timer = setInterval(()=>{
              if (this.countdown_s_s!==0){
                this.countdown_s_s-=1;
              } else{
                if (this.countdown_s_b!==0){
                  this.countdown_s_b -=1;
                  this.countdown_s_s-=1;
                  this.countdown_s_s = 9;
                } else{
                  if (this.countdown_m_s!==0){
                    this.countdown_m_s-=1;
                    this.countdown_s_b=5;
                    this.countdown_s_s-=1;
                    this.countdown_s_s = 9;
                  } else{
                    if (this.countdown_m_b!==0) {
                      this.countdown_m_b-=1;
                      this.countdown_m_s=1;
                      this.countdown_s_b=5;
                      this.countdown_s_s-=1;
                      this.countdown_s_s = 9;
                    } else{
                      clearInterval(this.timer);
                      this.back();
                    }
                  }
                }
              }
          },1000);
        },
        methods:{
          async loadInfo(){
            // let json = await getScheduleById(this.$route.query.schedule_id);
            this.axios.get('index/getScheduleById?scheduleId=53').then((res)=>{
              if(res.data.success_code===200){
                this.scheduleInfo = res.data.data;
                this.seatInfo = this.scheduleInfo.seat_info;
                this.seatInfo = JSON.parse(this.seatInfo);
              }
            })
          },
          async back(){
            sessionStorage.removeItem('countdown_m');
            sessionStorage.removeItem('countdown_s');
            sessionStorage.removeItem('order_num');
            sessionStorage.removeItem('total_price');
              let currentIndex;
              if (this.seat_1) {
                this.seatInfo.forEach((value,index)=>{
                  if (Number(this.seat_1)===value){
                    currentIndex = index;
                  }
                });
                this.seatInfo.splice(currentIndex,1);
              }
              if (this.seat_2) {
                this.seatInfo.forEach((value,index)=>{
                  if (Number(this.seat_2)===value){
                    currentIndex = index;
                  }
                });
                this.seatInfo.splice(currentIndex,1);
              }
              if (this.seat_3) {
                this.seatInfo.forEach((value,index)=>{
                  if (Number(this.seat_3)===value){
                    currentIndex = index;
                  }
                });
                this.seatInfo.splice(currentIndex,1);
              }
              if (this.seat_4) {
                this.seatInfo.forEach((value,index)=>{
                  if (Number(this.seat_4)===value){
                    currentIndex = index;
                  }
                });
                this.seatInfo.splice(currentIndex,1);
              }
            this.axios.post('index/updateScheduleSeat',{scheduleId:53,seatInfo:JSON.stringify(this.seatInfo)}).then((res)=>{
              if(res.data.success_code === 200){
                  sessionStorage.removeItem('seat_1');
                  sessionStorage.removeItem('seat_2');
                  sessionStorage.removeItem('seat_3');
                  sessionStorage.removeItem('seat_4');
                  sessionStorage.removeItem('seat_count');
                  clearInterval(this.timer);
                  Toast.success('取消选座成功！');
                  this.$router.go(-2);
              }
            })
          },
          async handlePay(){
            let info;
            if (this.selectPayType){
              info = '您的微信将支付￥'+(Number(this.total_price).toFixed(2))+'元';
            } else{
              info = '您的支付宝将支付￥'+(Number(this.total_price).toFixed(2))+'元';
            }
            Dialog.confirm({title:'支付提示',message:info}).then(async action =>{
              if (action==='confirm'){
                  let seatArr = [];
                  if (this.seat_1) {
                    seatArr.push(Number(this.seat_1));
                  }
                  if (this.seat_2) {
                    seatArr.push(Number(this.seat_2));
                  }
                  if (this.seat_3) {
                    seatArr.push(Number(this.seat_3));
                  }
                  if (this.seat_4) {
                    seatArr.push(Number(this.seat_4));
                  }
                  // let json = await order(
                  //   this.$cookies.get('user_id'),
                  //   this.$route.query.schedule_id,
                  //   this.$cookies.get('order_phone'),
                  //   new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate(),
                  //   seatArr.length,
                  //   this.$cookies.get('total_price'),
                  //   JSON.stringify(seatArr),
                  //   (this.selectPayType?0:1)
                  // );
                  this.axios.post('index/order',{userId:this.uid,scheduleId:this.sid,orderPhone:this.order_phone,orderDate:new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate(),
                  ticketNum:seatArr.length,totalPrice:this.total_price,orderSeatInfo:JSON.stringify(seatArr),payType:(this.selectPayType?0:1)}).then((res)=>{
                    if(res.data.success_code===200){
                      Dialog.confirm({title:'支付提示',message:'您的取票码为:'+res.data.data.phone_code})
                    }
                  })
                  sessionStorage.removeItem('seat_1');
                  sessionStorage.removeItem('seat_2');
                  sessionStorage.removeItem('seat_3');
                  sessionStorage.removeItem('seat_4');
                  sessionStorage.removeItem('seat_count');
                  sessionStorage.removeItem('order_phone');
                  sessionStorage.removeItem('countdown_m');
                  sessionStorage.removeItem('countdown_s');
                  sessionStorage.removeItem('order_num');
                  sessionStorage.removeItem('total_price');
                  clearInterval(this.timer);
                  this.$router.push('/');
              }
            });
          }
        }
    }
</script>

<style scoped lang="scss">
#pay {
  width: 100%;
  height: 100%;
  color: #000;
  font-size: 0.3125rem;
  .top {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    // position: fixed;
    top: 0;
    left: 0;
    background-color: #dd2727;
    color: #fff;
    .icon-back {
      font-size: 1.4rem;
      position: absolute;
      left: 0.3rem;
    }
    .name {
      width: 60%;
      font-size: 0.345rem;
      text-align: center;
    }
  }
  .order-info {
    margin-top: 1rem;
    height: 13rem;
    border-bottom: 0.04rem dashed #f1f1f1;
    .time-down {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      padding-bottom: 0.25rem;
      border-bottom: 0.04rem dashed #ccc;
      margin: 0 0.25rem;
      .title {
        padding: 0.2rem 0;
        font-size: 1.28rem;
      }
      .time {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 1.25rem;
          display: inline-block;
          text-align: center;
          line-height: 1.36rem;
          width: 1.36rem;
          height: 1.36rem;
          background-color: #333;
          color: #fff;
          &:first-child {
            margin-right: 0.12rem;
          }
        }
        p {
          padding: 0 0.12rem;
        }
      }
    }
    .order-num {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 0.4rem;
      position: relative;
      .left {
          font-size: 5rem;
          position: absolute;
          left: 2.8rem;
          top: 0.9rem;
      }
      .right {
        position: absolute;
        left: 9.2rem;
        top: 1.7rem;
        display: flex;
        flex-flow: column;
        .total {
            font-size: 1.46rem;
            margin-bottom: 0.5rem;
        }
        .num {
          font-size: 1rem;
          letter-spacing: 0.02rem;
        }
      }
    }
  }
  .pay-type {
    border-top: 0.2rem solid #f1f1f1;
    width: 100%;
    left: 0;
    top: 4rem;
    bottom: 0;
    background-color: #f1f1f1;
    .type {
      padding: 0.25rem 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border-bottom: 0.04rem solid #f1f1f1;
      background-color: #fff;
      span {
        font-size: 2.6rem;
      }
      p {
        position: absolute;
        left: 4.2rem;
      }
    }
  }
  .bottom {
    border-top: 0.02rem solid #f1f1f1;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 0.25rem;
    box-sizing: border-box;
    z-index: 999;
    .pay-btn {
        width: 100%;
        background-color: #fe9900;
        color: #fff;
        height: 2.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.42rem;
        font-size: 0.28rem;
    }
  }
  .maohao{
    font-size:1.25rem
  }
}
</style>
