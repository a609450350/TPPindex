<template>
    <div style="padding:0 15px 15px 15px;">
        <div class="search">
            <van-search @input="sou" v-model="value" show-action shape="round" placeholder="请输入搜索关键词"  @cancel="onCancel" />
        </div>
        <div style="margin-top:70px">
        <div v-if="!data">
            <div>
                <van-divider />
                    <p style="font-size:1.1rem;margin-bottom:20px">历史记录</p>
                    <van-button @click="s" round style="height:2rem;margin-right:10px">独行月球</van-button>
                    <van-button @click="s1" round style="height:2rem;margin-right:10px">人生大事</van-button>
                    <van-button @click="s2" round style="height:2rem;margin-right:10px">张吃鱼</van-button>
                <van-divider/>  
            </div>
            <van-tabs v-model="active" sticky line-height="0" animated offset-top="3.6rem">
                <van-tab title="一周票房榜"><piao-f style="margin-top:20px"/></van-tab>
                <van-tab title="新片想看榜"><xin-p style="margin-top:20px"/></van-tab>
            </van-tabs>
        </div>
        <div v-if="data">
          <div class="box" v-for="x in data" :key="x.filmId" style="display:flex;">
            <van-divider/>
            <img :src="`http://101.43.252.14:3000${x.poster}`" alt="">
            <div style="display:flex;justify-content: space-between;width:60%">
            <div style="margin-top:50px">
              <p class="name">{{x.name}}</p>
              <p>导演：{{x.director}}</p>
              <p>类型：{{x.type}}</p>
              <p>评分：{{x.score}}分</p>
            </div>
              <van-button class="btn" round type="info" @click="GouPiao(x.movie_id)">购票</van-button>
            </div>
          </div>
        </div>
        </div>
    </div>
</template>

<script>
import PiaoF from './PiaoF.vue';
import XinP from './XinP.vue';
    export default {
  components: { PiaoF, XinP },
        data() {
    return {
      value: '',
      active:'',
      data:''
    };
  },
  methods: {
    s(){
      this.value='独行月球'
      this.axios.get(`index/selectmovie?input=${this.value}`).then(res=>{
        this.data=res.data.data
      })
    },
    s1(){
      this.value='人生大事'
      this.axios.get(`index/selectmovie?input=${this.value}`).then(res=>{
        this.data=res.data.data
      })
    },
    s2(){
      this.value='张吃鱼'
      this.axios.get(`index/selectmovie?input=${this.value}`).then(res=>{
        this.data=res.data.data
      })
    },
    GouPiao(id){
      this.$router.push(`/shopmovie/${id}`)
    },
    onSearch(val) {
      alert(val);
    },
    onCancel() {
      this.$router.back()
    },
    sou(){
      this.axios.get(`index/selectmovie?input=${this.value}`).then(res=>{
        this.data=res.data.data
      })
    }
  },
    }
</script>

<style lang="scss" scoped>
.search{
   position: fixed;
   top:0;
   z-index:999999;
   background-color: white;
   width:100%;
   padding:  1rem 0rem 0rem 0rem;
}
.van-search{
    padding:0 20px 10px 0;
}
img{
    height:150px;
    border-radius: 5px;
    margin:0 20px 15px 30px;
}
p{
  margin:0;
  font-size: 0.8rem;
}
.btn{
   border: 0;
  color: white;
  padding: 0.9rem;
  height: 1.5rem;
  background-color: #fb54a4;
  margin-top: 70px;
}
.name{
  width: 8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  font-size: 1.1rem;
}
</style>