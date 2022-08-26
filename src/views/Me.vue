<template>
  <div>
    <div id="box">
      <img
        :src="`http://xbvuestudy.top/`+src"
        alt=""
        style="
          width: 80px;
          height: 80px;
          margin: 30px 10px -30px;
          border-radius: 50%;
          border: 3px solid #fff;
        "
      />
      <span @click="goLogin" style=" color: #000;
  font-size: 22px; font-weight: bold">{{name}}</span>
      <!-- <a href="#" style="color: #000; font-size: 22px; font-weight: bold"
        >立即登录</a
      > -->
      <router-link to="/shezhi"><i style="font-size:2rem;margin-right:10px" class="iconfont icon-shezhi c1"></i></router-link>     
    </div>
    <div style="padding:0 10px">
        <div id="dh">
      <p
        class="p"
        style="color: #714a49; padding: 8px 15px 0; font-weight: bold;font-size:1.5rem;margin-bottom:0"
      >
        淘麦VIP|会员中心
      </p>
      <p style="font-size: 16px; padding-left: 15px;">
        会员可享更多权益,成为会员>
      </p>
    </div>
    <p style="font-weight: bold; margin-left: 8px; font-size: 18px">我的服务</p>
    <div id="fuwu">
      <router-link to="/dyp" class="c3" style="color:#000">
        <img src="@/assets/me/movie.png" style="width:50%" alt="">
        <p style="font-size: 18px; margin-top:0">电影票</p>
      </router-link>
      <router-link to="/yhq" class="c3" style="color:#000">
        <img src="@/assets/me/yhq.png" style="width:50%" alt="">
        <p style="font-size: 18px; margin-top:0">优惠券</p>
      </router-link>
      <router-link to="/me" class="c3" style="color:#000">
        <img src="@/assets/me/vip.png" style="width:50%" alt="">
        <p style="font-size: 18px; margin-top:0">权益卡</p>
      </router-link>
      <router-link to="/me" class="c3" style="color:#000">
        <img src="@/assets/me/th.png" style="width:50%;" alt="">
        <p style="font-size: 18px; margin-top:0">特惠</p>
      </router-link>
    </div>
    <div id="fuwu">
      <router-link to="/kf" class="c3" style="color:#000">
        <img src="@/assets/me/kf.png" style="width:50%" alt="">
        <p style="font-size: 18px; margin-top:0">客服</p>
      </router-link>
      <router-link to="/fk" class="c3" style="color:#000">
        <img src="@/assets/me/fk.png" style="width:50%" alt="">
        <p style="font-size: 18px; margin-top:0">反馈</p>
      </router-link>
      <router-link to="/me" class="c3" style="color:#000">
        <img src="@/assets/me/ybc.png" style="width:50%" alt="">
        <p style="font-size: 18px; margin-top:0">云包场</p>
      </router-link>
      <router-link to="/me" class="c3" style="color:#000">
        <img src="@/assets/me/vipcard.png" style="width:50%;" alt="">
        <p style="font-size: 18px; margin-top:0">乐影卡</p>
      </router-link>
    </div>
    <swiper class="swiper" :options="swiperOption" style="margin:5px">
      <swiper-slide v-for="x in data" :key="x.id"><img :src="`http://101.43.252.14:3000${x.poster}`" style="width:100%;border-radius: 10px;"></swiper-slide>
    </swiper>
    </div>
    
    <tabbar/>
  </div>
</template>
<script>
import Tabbar from '../components/Tabbar.vue'
export default{
  components: {Tabbar },
  data() {
    return {
      data: null,
      user:'',
      name:'',
      src:'',
      uid:'',
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
    }
  },
  methods: {
    goLogin() {
      if(JSON.parse(sessionStorage.getItem('user'))){
        this.$router.push('/grxx')
      }else{
        this.$router.push('/login')
      }  
    }
  },
  mounted() {
    this.axios.get("index/swiper").then((res) => {
      this.data = res.data.data
    });
    if(JSON.parse(sessionStorage.getItem('user'))){
      this.name=JSON.parse(sessionStorage.getItem('user'))[0].user_name
      this.uid=JSON.parse(sessionStorage.getItem('user'))[0].user_id 
      this.src=JSON.parse(sessionStorage.getItem('user'))[0].avatar
    }else{
      this.name='立即登录'
      this.src='/images/admin/admin.gif'
    }
    this.axios.get(`index/getUserInfo?userId=${this.uid}`).then((res=>{
      this.name = res.data.data.user_name
    }))
    
  }
}
  
</script>

<style scoped>
body {
  background-color: rgb(245, 246, 248);
}
#box {
  background: linear-gradient(
    to right,
    #fdeed5,
    #fcf0f4,
    #ffd6e6
  );
  vertical-align: center;
  /* margin-top: 3px; */
  box-sizing: border-box;
  height: 150px;
  padding-top: 25px;
}
.c1 {
  float: right;
  padding: 60px 10px;
  font-size: 20px;
  color: #000;
}
#dh {
  background: linear-gradient(to bottom, #f4e4ef, #fcdfd8, #F2BEC2);
  border-radius: 8px;
  margin: 0 5px;
  box-sizing: border-box;
  height: 90px;
}
.icon-dianying {
  display: inline-block;
}
#box3 {
  display: flex;
  margin: 13px 5px;
  height: 80px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 8px;
  text-align: center;
  justify-content: space-evenly;
}
.c2 {
  padding-top: 10px;
  margin: 4px 0;
}
#fuwu {
  height: 100px;
  display:flex;
  background: #fff;
  text-align: center;
  border-radius: 8px;
  margin: 3px 5px;
  /* 平均分配元素周围空间 */
  justify-content: space-between;
  margin-bottom: 10px;
}
.c3 {
  font-size: 24px;
  padding: 15px 10px;
}
</style>