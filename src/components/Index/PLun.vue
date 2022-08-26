<template>
  <div>
    <div class="nav">
        <van-icon name="arrow-left" @click="onClickLeft" />
        <p style="margin:0">{{name}}</p>
        <button @click="go" style="background-color:#fb54a4;padding:0px 20px;border-radius: 50px;border:0;height:30px;color:#fff;font-size:1rem">发布</button>
    </div>
    <span style="font-size:1.3rem;margin:0 10px">评分</span>
    <van-rate v-model="value" :size="30" gutter="10px" color="#ffd21e" void-icon="star" void-color="#eee"/>
    <span style="color:orange;font-size:1.3rem;margin:0 10px">{{this.value*2}}分</span>
    <span v-if="this.value==1" style="font-size:1.2rem">超烂</span>
    <span v-if="this.value==2" style="font-size:1.2rem">踩雷</span>
    <span v-if="this.value==3" style="font-size:1.2rem">凑合</span>
    <span v-if="this.value==4" style="font-size:1.2rem">不错</span>
    <span v-if="this.value==5" style="font-size:1.2rem">推荐</span>
    <van-field v-model="message" clickable autosize type="textarea" style="font-size:1.2rem" 
        placeholder="你可以分享喜欢的角色、印象深刻的片段、整体的观影感受、可以试试添加小标题呦~"/>
  </div>
</template>

<script>
import { Toast } from 'vant';
import moment from 'moment';
export default {
  props: ["name"],
  data() {
    return {
        value: 4,
        message:'',
        movieId:'',
        userId:'',
    }
  },
  created () {
    this.movieId=this.$route.params.mid
  },
  mounted () {
    if(JSON.parse(sessionStorage.getItem('user'))){
      this.userId=JSON.parse(sessionStorage.getItem('user'))[0].user_id
    }else{
      this.userId=''
    }
  },
  methods: {
    onClickLeft(){
      this.$router.back()
    },
    go(){
      let userId=this.userId
      let movieId=this.movieId
      let score=this.value*2
      let commentContent=this.message
      let commentDate=moment().format('YYYY-MM-DD hh:mm:ss');
      this.axios.post('index/updateUserComment',{userId,movieId,score,commentContent,commentDate}).then(res=>{
        console.log(res)
        Toast('发布成功');
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.nav{
    display: flex;
    justify-content: space-between;
    padding:20px 10px 40px 10px;
    font-size: 1.7rem;
}
</style>