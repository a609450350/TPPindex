<template>
  <div>
    <van-nav-bar  title="设置" left-arrow 
    @click-left="onClickLeft"/>
    <div style="padding:0 10px">
    <div>
      <van-cell is-link title="账号与安全" @click="goZhyaq" style="margin-bottom:8px;margin-top:8px;border-radius: 10px;"  />
      <van-cell is-link title="给我们评分" @click="goPf" style="margin-bottom:8px;border-radius: 10px;" />
      <van-cell is-link title="在线客服" @click="goKf" style="margin-bottom:8px;border-radius: 10px;"/>
      <van-cell is-link title="关于淘票票" @click="show = true" style="margin-bottom:8px;border-radius: 10px;"/>
    </div>
    <van-button @click="exit" block color="#EA6288" round size="150px">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  methods:{
    exit(){
       Toast('退出成功');
      sessionStorage.clear('user')
       this.$router.push('/me')
    },
    onClickLeft(){
      // 点击后退按钮返回上一页
      history.go(-1)
    },
    goKf(){
      this.$router.push('/kf')
    },
    goPf(){
      this.$router.push('/pf')
    },
    goZhyaq(){
      this.$router.push('/zhyaq')
    },
  }
}
</script>
<style>
body{
    background-color: rgb(245, 246, 248);
}

</style>