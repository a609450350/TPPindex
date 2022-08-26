<template>
  <div>
        <van-nav-bar
            title="用户评分"
            left-arrow
            @click-left="onClickLeft"
        />
        <p style="font-size:1.5rem;font-weight: bold;color:orange">用户评分</p>
    <span style="font-size:1.3rem;margin:0 10px">评分</span>
    <van-rate v-model="value" :size="30" gutter="10px" color="#ffd21e" void-icon="star" void-color="#eee"/>
    <span style="color:orange;font-size:1.3rem;margin:0 10px">{{this.value*2}}分</span>
    <span v-if="this.value==1" style="font-size:1.2rem">超烂</span>
    <span v-if="this.value==2" style="font-size:1.2rem">踩雷</span>
    <span v-if="this.value==3" style="font-size:1.2rem">凑合</span>
    <span v-if="this.value==4" style="font-size:1.2rem">不错</span>
    <span v-if="this.value==5" style="font-size:1.2rem">推荐</span>
    <van-field v-model="message1" clickable autosize type="textarea" style="font-size:1.2rem" 
        placeholder="您的建议是我们进步的动力~"/>
        <button @click="go">提交</button>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  props: ["name"],
  data() {
    return {
        value: 4,
        message:'',
        message1:'',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    go(){
                Toast('提交成功');
                history.go(-1)
            }
  },
};
</script>

<style lang="scss" scoped>
button{
    width:80%;
    margin-left: 10%;
    margin-top:65vh;
    height: 40px;
    border-radius: 10px;
    border: 0;
    background-color: orange;
}
</style>