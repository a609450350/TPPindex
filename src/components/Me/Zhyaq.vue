<template>
    <div>
        <van-nav-bar
            title="账户与安全"
            left-arrow
            @click-left="onClickLeft"
        />
        <div style="padding:0 10px">
           <van-cell class="aa" is-link title="修改密码" @click="goXg"/>
            <van-cell class="aa" is-link title="注销账户" @click="goZx"/> 
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            goXg(){
                this.$router.push('/xg')
            },
            goZx(){
                this.$router.push('/zx')
            }
        },
    }
</script>

<style lang="scss" scoped>
.aa{
    margin-top:8px;
    border-radius: 10px;
    font-size: 1.2rem;
}
</style>