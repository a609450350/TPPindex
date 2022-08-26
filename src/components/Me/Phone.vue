<template>
    <div>
        <van-nav-bar  title="昵称" left-arrow 
            @click-left="onClickLeft"/>
        <p style="margin-left:10px">设置我的个性签名</p>
        <van-field v-model="sign" placeholder="请输入用户名" />
        <van-button @click="xiugai" block color="#EA6288" round size="150px">确定</van-button>
    </div>
</template>

<script>
import { Toast } from 'vant';
    export default {
        mounted () {
            if(JSON.parse(sessionStorage.getItem('user'))){
                this.userId=JSON.parse(sessionStorage.getItem('user'))[0].user_id 
            }else{
                this.userName=''
                this.userId=''
            };
            this.axios.get('index/getUserInfo?userId='+this.userId).then((res=>{
                if(res.data.success_code===200){
                    this.phone = res.data.data.phone
                }
            }))
        },
        data() {
            return {
                sign: '',
                userId:''
            }
        },
        methods: {
            onClickLeft(){
                // 点击后退按钮返回上一页
                history.go(-1)
            },
            xiugai(){
                this.axios.post('index/updateUserSign',{userId:this.userId,sign:this.sign}).then(res=>{
                    console.log(res)
                    Toast('修改成功');
                    this.$router.back();

                })
            }
        },
    }
</script>

<style lang="scss" scoped>
button{
    position: fixed;
    bottom:10px;
    width: 90%;
    left:5%;
}
</style>