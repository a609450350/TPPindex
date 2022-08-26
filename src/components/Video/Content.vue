<template>
    <div class="main">
      <van-swipe class="my-swipe" :show-indicators="false" :loop="false" @change="onChange" style="height: 100vh"
        vertical indicator-color="white">
        <van-swipe-item v-for="(item,index) in swiperList" :key="index">
          <div class="right_menus">
            <div class="menuClick">
              <img class="avatar" :src="`http://101.43.252.14:3000/${item.img}`" alt="" />
              <div class="follow"></div>
            </div>
            <div class="click-info">
              <img class="icon" src="@/assets/icon/icon_01.png" alt="" />
              <div class="text">{{ item.like | wan}}W</div>
            </div>
            <div class="click-info">
              <img class="icon" src="@/assets/icon/icon_02.png" alt="" />
              <div class="text">2.3W</div>
            </div>
            <div class="click-info">
              <img class="icon" src="@/assets/icon/icon_03.png" alt="" />
              <div class="fenxiang">分享</div>
            </div>
          </div>
          <div class="text-container">
            <div class="nickname">@{{ item.userName }}</div>
            <div class="msg">{{ item.title }}</div>
          </div>
          <video class="video-content" :id="`player${index}`" :src="`http://101.43.252.14:3000/${item.urls}`"></video>
        </van-swipe-item>
      </van-swipe>
    </div>
</template>

<script>
export default {
    data(){
      return{
        playing: false,
        swiperList:null,
      }
    },
    mounted(){
      this.axios.get('/index/smallvideoAll').then((res)=>{
            this.swiperList = res.data.data
      })
    },
    methods: {
    onChange(index) {
      console.log(index);
      var player = document.getElementById(`player${index}`);
      if (player.paused) {
        this.swiperList.forEach((item, s_index) => {
          if (s_index == index) {
            document.getElementById(`player${s_index}`).play();
            item.play = true;
          } else {
            document.getElementById(`player${s_index}`).pause();
            item.play = false;
          }
        });
      } else {
        this.swiperList.forEach((item, s_index) => {
          document.getElementById(`player${s_index}`).pause();
          item.play = false;
        });
      }
    },
  },
    filters: {
    wan(val) {
      return (val / 10000).toFixed(1)
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: #fff;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 0.2rem;
    text-align: center;
    background-color: white;
    position: relative;
    .video-content {
      width: 100%;
      height: 100%;
    }
    .right_menus {
      position: absolute;
      width: 1.2rem;
      padding: 0.02rem;
      box-sizing: border-box;
      bottom:8.2rem;
      right: 35px;
      .menuClick {
        position: relative;
        width: 100%;
        margin-bottom: 0.2rem;
        .avatar {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: #fff 0.02rem solid;

        }
      }
      .click-info {
        position: relative;
        width: 1.2rem;
        img {
          width: 2rem;
        }
        .text {
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #fff;
          font-size: 0.16rem;
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .text-container {
      position: absolute;
      width: 6rem;
      left: 15px;
      bottom: 10%;
      padding: 0.2rem 0.1rem;
      box-sizing: border-box;
      .nickname {
        width: 200px;
        font-size: 1.1rem;
        color: #fff;
        height: 1.42rem;
        line-height: 0.82rem;
        text-align: left;
      }
      .msg {
        position: relative;
        width: 170px;
        padding: 0.1rem 0;
        box-sizing: border-box;
        line-height: 1.7rem;
        font-size: 0.28rem;
        text-align: left;
      }
    }
  }
  .fenxiang{
    width:40px;
    margin-left: -5px;
  }
}
</style>