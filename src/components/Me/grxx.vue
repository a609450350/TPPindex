<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <div style="padding:0 10px">
      <div>
        <van-cell is-link title="头像" style="margin-bottom:8px;margin-top:8px;border-radius: 10px;padding:25px 12px" />
        <img :src="`http://xbvuestudy.top/` + src" alt="">
        <input type="file" id="file" name="file" ref="uploadImg" accept="image/png, image/jpeg, image/gif, image/jpg"
          style="position: absolute;left: 74%;top: 46px;height: 9%;width: 21%;opacity:0" @change="changeImg" />
        <van-cell is-link title="昵称" :value="name" style="margin-bottom:8px;border-radius: 10px;" @click="getname" />
        <van-cell is-link title="性别" :value="sex" style="margin-bottom:8px;border-radius: 10px;" @click="showPicker=true"/>
        <van-cell title="手机号" :value="phone" style="margin-bottom:8px;border-radius: 10px;" />
        <van-cell is-link title="个性签名" :value="sign" style="margin-bottom:8px;border-radius: 10px;" @click="gettitle" />
        <van-cell title="生日" :value="bir" style="margin-bottom:8px;border-radius: 10px;" />
      </div>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      img: '',
      name: '',
      sex: '',
      phone: '',
      sign: '',
      bir: '',
      src: '',
      uid: '',
      srcc: '',
      data:'',
      value: '',
      showPicker: false,
      columns: ['男', '女'],
    }
  },
  created(){
    this.updateInfo(); 
  },
  mounted() {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      this.name = JSON.parse(sessionStorage.getItem('user'))[0].user_name
      this.sex = JSON.parse(sessionStorage.getItem('user'))[0].sex
      this.phone = JSON.parse(sessionStorage.getItem('user'))[0].phone
      this.bir = JSON.parse(sessionStorage.getItem('user'))[0].birthday
      this.sign = JSON.parse(sessionStorage.getItem('user'))[0].sign
      this.src = JSON.parse(sessionStorage.getItem('user'))[0].avatar
      this.uid = JSON.parse(sessionStorage.getItem('user'))[0].user_id
    } else {
      this.name = ''
      this.src = '/images/admin/admin.gif'
      this.name = ''
      this.sex = ''
      this.phone = ''
      this.bir = ''
      this.sign = ''
      this.uid = ''
    }
    this.updateInfo();

  },
  methods: {
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      this.axios.post('index/updateUserSex',{userId:this.uid,sex:value}).then((res=>{
        Toast('修改成功');
        this.updateInfo();
      }))
    },
    updateInfo() {
      if (this.uid) {
        this.axios.get(`index/getUserInfo?userId=${this.uid}`).then((res => {
          if (res.data.success_code === 200) {
            this.data = res.data.data;
            this.updateUserInfo();
          } else {
            this.data = {};
          }
        }))
      } else {
        this.data = {};
      }
    },
    updateUserInfo() {
      if (this.data) {
        this.avatarSrc = this.data.avatar;
        this.avatar = "http://localhost:3000" + this.avatarSrc;
        this.data.user_name
          ? (this.name = this.data.user_name)
          : (this.name = "");
        this.data.password
          ? (this.userPwd = this.data.password)
          : (this.userPwd = "");
        this.data.sex
          ? (this.sex = this.data.sex)
          : (this.sex = "");
        this.data.birthday
          ? (this.bir = this.data.birthday)
          : (this.bir = null);
        this.data.sign
          ? (this.sign = this.data.sign)
          : (this.sign = "");
      }
    },
    exit() {
      Toast('退出成功');
      sessionStorage.clear('user')
      this.$router.push('/me')
    },
    onClickLeft() {
      // 点击后退按钮返回上一页
      history.go(-1)
    },
    goNC() {
      this.$router.push('/nc')
    },
    goPf() {
      this.$router.push('/pf')
    },
    goZhyaq() {
      this.$router.push('/zhyaq')
    },
    changeImg() {
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.uploadImg.files[0]);
      let _this = this;
      reader.onload = function () {
        _this.modifyUserAvatar();
        _this.$refs.previewImg.src = this.result;
      };
    },
    modifyUserAvatar() {
      let formDate = new FormData();
      formDate.append('file', this.$refs.uploadImg.files[0]);
      this.axios.post('admin/upLoadImg', formDate).then((res => {
        console.log(res);
        if (res.data.success_code == 200) {
          if (res.data.data.length) {
            let userNewAvatar = "/images/avatar/" + res.data.data[0].filename;
            this.axios.post('index/updateUserAvatar', { userId: this.uid, avatar: userNewAvatar }).then((res => {
              console.log(res)
              if (res.data.success_code === 200) {
                Toast('修改成功');
                this.src = userNewAvatar;
              } else {
                Toast('修改失败');
              }
            }))
          }
        }
      }))
    },
    getname(){
      this.$router.push('/nincheng')
    },
    gettitle(){
      this.$router.push('/title')
    }
  }
}
</script>
<style scoped>
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #eee;
  position: fixed;
  z-index: 999999;
  top: 60px;
  right: 40px;
}
</style>