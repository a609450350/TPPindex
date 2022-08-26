<template>
    <div style="margin-bottom:70px">
        <van-icon name="arrow-left" style="position:fixed;top:10px;left:10px" size="2rem" color="#fff" @click="onClickLeft" />
        <img :src="this.data.poster" style="width:100%;border-radius:0;" alt="">
        <div class="box">
            <img :src="this.data.poster" style="width:30%;border-radius: 7px;" alt="">
            <div style="width:60%;">
               <h2>{{this.data.name}}</h2> 
               <p style="width:80%;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;">{{this.data.runtime}}分钟 / {{this.data.category}} / {{this.data.nation}}</p>
               <p>{{this.data.premiereAt}}</p>
               <div style="display:flex;">
                    <button style="background-color:#eee;border:0;border-radius: 5px;padding: 8px 20px"><van-icon name="like" color="#aaa"/> 想看 </button>
                    <button style="background-color:#eee;border:0;border-radius: 5px;padding: 8px 20px;margin-left:15px"><van-icon name="star"  color="#aaa"/> 看过 </button>
               </div> 
            </div>
        </div>
        <van-tabs v-model="active" scrollspy sticky>
            <van-tab title="简介" style="">
                <div style="margin:20px;">
                    <p style="line-height: 30px;">{{this.data.synopsis}}</p>
                    <p style="font-size:1.5rem">演职人员</p>
                    <swiper class="swiper" :options="swiperOption" style="margin:5px">
                        <swiper-slide v-for="x in data.actors" :key="x.name"><img :src="x.avatarAddress" style="height:130px">
                        <p style="margin:6px">{{x.name}}</p>
                        <p style="margin:6px">{{x.role}}</p>
                        </swiper-slide>
                    </swiper>
                    <p style="font-size:1.5rem">剧照</p>
                    <swiper class="swiper" :options="swiperOption1" style="margin:5px">
                        <swiper-slide v-for="x in data.photos" :key="x.name">
                            <div>
                               <img :src="x" alt="" style="height:130px;width:220px">
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </van-tab>
            <van-tab title="影评">
                <div style="display:flex;justify-content: space-between;padding:0 20px">
                    <p style="font-size:1.5rem;margin:0">观众热评</p>
                    <button @click="go" style="background-color:#fb54a4;padding:0px 30px;border-radius: 50px;border:0;height:30px;color:#fff">写影评</button>
                </div>
                <div v-for="x in data1" :key="x.comment_id">
                <div style="display: flex;margin:10px">
                    <img :src="`http://xbvuestudy.top/`+src" alt="" style="width:40px; height: 40px;border-radius: 50%;border: 1px solid #ccc;margin-right:10px">
                    <div>
                        <p style="margin:5px 0 0 0">{{uname}}</p>
                        <p style="margin:0;font-size:0.7rem">{{new Date(x.comment_date).toLocaleString()}}</p>
                    </div>  
                </div>
                <p style="margin-left:30px">{{x.comment_content}}</p>
                </div>
            </van-tab>
        </van-tabs>
        <div class="foot">
            <button @click="GouPiao" style="background-color:#fb54a4;padding:0px 60px;border-radius: 50px;border:0;height:58px;font-size:1.3rem;color:#fff;margin-left:42%">立即购票</button>
        </div>
    </div>
</template>

<script>
    
    export default {
        methods: {
            go() {
                let name=this.data.name
                this.$router.push(`/plun/${name}/${this.mid}`)
            },
            GouPiao(){
      this.$router.push(`/shopmovie/${this.mid}`)
    },
            onClickLeft() {
      this.$router.back()
    },
        },
        props:['fid','mid'],
        data() {
            return {
                data: '',
                data1:'',
                pl:'',
                time:'',
                active:'',
                uid:'',
                src:'',
                uname:'',
                swiperOption: {
                    slidesPerView: 3.5,
                    pagination: {
                        clickable: true
                    }
                },
                swiperOption1: {
                    slidesPerView: 1.5,
                    pagination: {
                        clickable: true
                    }
                },
            }
        },
        mounted () {
            if(JSON.parse(sessionStorage.getItem('user'))){
                this.uid=JSON.parse(sessionStorage.getItem('user'))[0].user_id
                this.uname=JSON.parse(sessionStorage.getItem('user'))[0].user_name
                this.src=JSON.parse(sessionStorage.getItem('user'))[0].avatar
            }else{
                this.uid=''
                this.uname=''
                this.src=''
            }
            this.axios.get(`index/getUserComment?userId=${this.uid}&movieId=${this.mid}`).then(res=>{
                this.pl=res.data.data.comment_content
                this.time= new Date(res.data.data.comment_date).toLocaleString();
                console.log(res.data.data)
                this.data1=res.data.data
            })
             this.axios({
     method: 'get',
     url:`https://m.maizuo.com/gateway?filmId=${this.fid}&k=1448743`,
     headers: {
     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1650332674195927818108929"}',
     'X-Host': 'mall.film-ticket.film.info'
     }
     }).then((res)=>{
            this.data=res.data.data.film
    })
    },
    }
</script>

<style lang="scss" scoped>
.box{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin:20px 0
}
img{
    border-radius: 5px;
    
}
.foot{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    border: 1px solid white;
    background-color: #fff;
}
</style>