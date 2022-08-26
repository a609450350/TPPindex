<template>
    <div style="padding:0 10px">
        <van-nav-bar
            title="用户反馈"
            left-arrow
            @click-left="onClickLeft"
        />
        <p style="font-size:1.5rem;font-weight: bold;color:orange">用户反馈</p>
<van-field v-model="message" clickable autosize type="textarea" style="font-size:1.2rem" placeholder="来说说您的问题或建议吧~对于您所提供的信息，我们将严格保密仅用于研究" show-word-limit/>
        <button @click="go">提交</button>
    </div>
</template>

<script>
import { Toast } from 'vant';
    export default {
        data() {
            return {
                message: '',
            }
        },
        methods: {
            onClickLeft() {
                history.go(-1)
            },
            go(){
                Toast('提交成功');
                history.go(-1)
            }
        },
    }
</script>

<style lang="scss" scoped>
button{
    width:80%;
    margin-left: 10%;
    margin-top:70vh;
    height: 40px;
    border-radius: 10px;
    border: 0;
    background-color: orange;
}
</style>