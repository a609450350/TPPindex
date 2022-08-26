<template>
  <div>
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-form @submit="onSubmit" style="margin-top: 20px">
      <van-field
        v-model="username"
        :rules="[{ required: true }]"
        label="账号"
        placeholder="请输入账号"
      />
      <van-field
        :rules="[{ required: true }]"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        label="密码"
      />
      <van-field
        v-model="sms"
        :rules="[{ required: true }]"
        placeholder="请输入验证码"
        label="验证码"
        clearable
      > <template #extra> <img style="height:35px" :src="data" alt="" /></template> </van-field>
     
     
      <div style="margin: 20px">
        <van-button type="info" block round native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      data: "",
      sms: "",
    };
  },
  methods: {
    onSubmit() {
      let parpms = `username=${this.username}&password=${this.password}&captcha=${this.sms}`;
      this.axios.post("pwdLogin", parpms).then((res) => {
        console.log(res);
        if (res.data.code == 400 || res.data.code==401) {
          Toast(res.data.msg);
        } else{
          Toast(res.data.msg);
          sessionStorage.setItem('user',JSON.stringify(res.data.data))
          this.$router.push('/')
        }
      });
    },
    onClickLeft() {
      this.$router.push("me");
    },
    onClickRight() {
      this.$router.push("logon");
    },
  },
  mounted() {
    this.data = "http://xbvuestudy.top/captcha";
  },
};
</script>

<style lang="scss" scoped>
.van-button {
  margin-top: 20px;
  width: 100%;
}
</style>