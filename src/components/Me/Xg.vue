<template>
  <div>
    <van-nav-bar
            title="修改密码"
            left-arrow
            @click-left="onClickLeft"
        />
    <div style="padding:0 10px">
    <van-form>
      <van-field
        v-model="v1"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        class="aa"
      />
    <van-field
        v-model="v2"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
        class="aa"
      />
      <van-field
        v-model="v3"
        label="确认密码"
        placeholder="请确认新密码"
        :rules="[{ required: true, message: '请确认新密码' }]"
        class="aa"
      />
    </van-form>
    <button @click="go">确认修改</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      v1:'',
      v2:'',
      v3:'',
      userId: "",
      userName: "",
      avatar: "",
      password: "",
      sex: "",
      sign: "",
      birthday:'',
    };
  },
  mounted () {
    if(JSON.parse(sessionStorage.getItem('user'))){
      this.userName=JSON.parse(sessionStorage.getItem('user'))[0].user_name 
      this.sex=JSON.parse(sessionStorage.getItem('user'))[0].sex
      this.userId=JSON.parse(sessionStorage.getItem('user'))[0].user_id
      this.birthday=JSON.parse(sessionStorage.getItem('user'))[0].birthday
      this.sign=JSON.parse(sessionStorage.getItem('user'))[0].sign
      this.avatar=JSON.parse(sessionStorage.getItem('user'))[0].avatar
    }else{
      this.userName=''
      this.sex=''
      this.userId=''
      this.birthday=''
      this.sign=''
      this.avatar=''
    }
    },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    go(){
        let parpms=`userId=${this.userId}&password=${this.v2}`  
        this.axios.post('index/updataUserPw',parpms).then(res=>{
          console.log(res)
          Toast('修改成功，请重新登录');
          this.$router.push('/login')
        })
          
          
        }
  },
};
</script>
<style lang="scss" scoped>
.aa{
    font-size: 1.2rem;
    border-radius: 20px;
    margin-top: 10px;
}
button{
    width:80%;
    margin-left: 10%;
    margin-top:10vh;
    height: 50px;
    border-radius: 30px;
    border: 0;
    background-color: orange;
    color: white;
}
</style>