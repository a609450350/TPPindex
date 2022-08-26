<template>
  <div>
    <van-nav-bar left-arrow  @click-left="onClickLeft"/>
    <div class="box">
    <img class="img" src="@/assets/logo.png" alt="">
    <div style="width:100%">
    <img class="imgs" src="@/assets/tb.png" alt="">
    </div>
    </div>
      <van-button type="danger" url="/register">登录</van-button>
      <van-button type="info" url="/logon" >注册</van-button>
  </div>
</template>

<script>
  export default {
    methods: {
      onClickLeft() {
      this.$router.back()
    },
    },
  }
</script>

<style lang="scss" scoped>
.box{
  margin: 150px;

}
  .img{
    width: 100px;
    height: 100px;
  }
  .imgs{
    width: 100px;
  }
  .van-button {
    width: 90%;
    margin-top: 20px;
    margin-left: 19.68px;
    border-radius: 5px;
  }
</style>