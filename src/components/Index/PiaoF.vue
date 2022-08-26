<template>
    <div>
        <div class="box" v-for="x in data" :key="x.filmId" style="display:flex">
            <img :src="`http://101.43.252.14:3000${x.poster}`" alt="">
            <div>
                <p style="margin-bottom:0">{{x.name}}</p>
                <p style="font-size:0.8rem;margin-top:10px">近七日票房{{x.score}}亿</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: '',
            }
        },
        mounted () {
            this.axios.get('index/getMovieList').then(res=>{
                this.data=res.data.data
            })
        },
    }
</script>

<style lang="scss" scoped>
.box{
    display: flex;
}
img{
    height:100px;
    margin:0 20px 15px 30px;
    border-radius: 5px;
}
</style>