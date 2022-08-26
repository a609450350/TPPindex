<template>
    <div style="margin: 75px 0 100px 0;">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="box" v-for="x in data" :key="x.id">
                <video :src="x.url" controls style="width:100%;background-color:black;" id="video"></video>
                <p>{{x.title}}</p>
            </div>
        </van-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data:[],
                loading:false,
                finished:false,
                current:1,
            }
        },
        mounted () {
            this.axios.get('index/videoPage?currentPage=1&pageSize=5').then(res=>{
                this.data=res.data.data
            })
        },
        methods: {
            onLoad() {
                this.current++
                this.axios.get(`index/videoPage?currentPage=${this.current}&pageSize=5`).then((res) => {
                    this.data = [...this.data, ...res.data.data]
                    this.loading = false
                    if (this.data.length >= res.data.total) {
                    this.finished = true
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
video{
     border-radius: 5px 5px 0 0;
}
.box{
    margin-top: 10px;
    background-color: #eee;
    border-radius: 5px;
    margin:5px
}
p{
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
</style>