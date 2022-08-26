<template>
  <div style="margin: 75px 0 100px 0">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-grid :column-num="2"  :border="false">
        <van-grid-item v-for="y in data1" :key="y.id">
          <div class="tuijian">
            <img :src="`http://101.43.252.14:3000${y.poster}`" style="width:100%;">
            <p style="margin:0">《{{y.name}}》</p>
            <p class="name1">{{y.intro}}</p>
          </div>
        </van-grid-item>
      </van-grid>
      </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: [],
      loading:false,
      finished:false,
      current:1,
    };
  },
  mounted() {
    this.axios.get("admin/getCurrentPageMovie?currentPage=1&pageSize=8&input=").then((res) => {
      this.data1= res.data.data;
      console.log(res)
      });
  },
  methods: {
    onLoad() {
      this.current++
      this.axios.get(`admin/getCurrentPageMovie?currentPage=${this.current}&pageSize=8&input=`).then((res) => {
        this.data1 = [...this.data1, ...res.data.data]
        this.loading = false
        if (this.data1.length >= res.data.total) {
          this.finished = true
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.name1{
  width: 9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  margin: 0;
}
img{
    border-radius: 5px;
}
</style>