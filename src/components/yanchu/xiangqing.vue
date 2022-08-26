<template>
  <div>
    <van-nav-bar
      title="演出详情"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/yanchu')"
      fixed
    >
      <template #right>
        <van-icon name="ellipsis" size="20" />
      </template>
    </van-nav-bar>
    <div>
      <img :src="data.posterUrl" alt="">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lid"],
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
     this.axios.get(`index/maoyanWeek`).then(res=>{
      console.log("详情",res)
      this.data=res.data.data
     })
    },
  },
  data() {
    return {
      data: [],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>