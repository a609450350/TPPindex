<template>
  <div>
    <van-nav-bar
      title="注册"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-form  @submit="onSubmit" style=" margin-top: 20px;">
      <van-field
        v-model="username"
        :rules="[{required:true}]"
        label="账号"
        placeholder="请输入账号"
      />
      <van-field
        v-model="password"
        :rules="[{required:true, pattern,message:'密码长度6位'}]"
        type="password"
        placeholder="请输入密码"
        label="密码"
      />
      <van-field
        v-model="passwords"
        type="password"
       :rules="[{required:true,validator,pattern}]"
        placeholder="请确认密码"
        label="确认密码"
      />
        <van-field
        v-model="phone"
        :rules="[{required:true,pattern:/^1[3-9]\d{9}$/}]"
        placeholder="请输入手机号"
        label="手机号"
      />
      <div style="margin: 20px;">
      <van-button type="info" block round native-type="submit">注册</van-button>
      </div> 
    </van-form>
   
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      username: "",
      password: "",
      passwords:'',
      phone:"",
      pattern:/^[0-9]{6}$/
    };
  },
  methods:{
       onSubmit() {
       let parpms=`userName=${this.username}&password=${this.password}&phone=${this.phone}`
       this.axios.post('register',parpms).then(res=>{
        console.log(res);
        if(res.data.code==200){
          Toast('注册成功')
          this.$router.push('register')
        }else{
          Toast('注册失败')
        }
       })
    },
    validator(){
      if(this.password!=this.passwords){
        return Toast('密码不一致')
      }
    },
  onClickLeft(){
      this.$router.push('me')
    },
    onClickRight(){
      this.$router.push('register')
    },

      
  },
};
</script>

<style lang="scss" scoped>

</style>