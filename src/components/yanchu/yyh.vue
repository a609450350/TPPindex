<template>
  <div>
    <van-grid :gutter="4" style="margin-bottom:50px;background-color: #f7f7f7;" :column-num="2" :border="false" :center="false">
      <van-grid-item v-for="x in data" :key="x.id">
        <div>
        <img class="imgs" :src="x.image" style="height: 250px" />
        <p class="title">[{{x.cityName}}]{{x.name}}</p>
        <span style="font-weight: bold; font-size: 20px; color:red;">￥{{x.lowestPrice}}</span> 
        <span style="font-weight: bold; font-size: 16px; color:red;">起</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  export default {
    mounted() {
    this.getData();
  },
    methods:{
      getData(){
        this.axios.get("/index/maoyan").then((res) => {
        this.data = res.data.data;
      });
      }
    },
    data() {
      return {
        data: null
      }
    },
  }
</script>

<style lang="scss" scoped>
.title{
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.imgs{
  height: 240px;
  width: 100%;
  border-radius: 5px;
}
</style>