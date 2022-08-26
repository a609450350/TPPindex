<template>
  <div class="hot">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
    <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check="false">
      <div class="content" v-for="item in data" :key="item.cinema_id">
        <img :src="`${Image}${item.poster}`" style="width: 100px;height:140px;border-radius: 5px;">
        <div class="num">
          <h4>{{ item.name }}</h4>
          <p>淘票票评分<i>{{ item.score }}</i> | {{ item.sore | wan }}万人评论</p>
          <p>导演:{{ item.actor }}</p>
          <p>主演:{{ item.director }}</p>
        </div>
        <button @click="onShop(item.movie_id,item.name)">购票</button>
      </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      Image: 'http://101.43.252.14:3000',
      isLoading: false,
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  filters: {
    wan(val) {
      return (val / 10000).toFixed(1)
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onLoad() {
      console.log('到底了')
      this.current++
      this.axios.get(`admin/getCurrentPageMovie?currentPage=${this.current}&pageSize=8&input=`).then((res) => {
        this.data = [...this.data, ...res.data.data]
        this.loading = false
        console.log(this.data.length)
        console.log(res.data.total)
        if (this.data.length >= res.data.total) {
          this.finished = true
        }
      })
    },
    onShop(id,name){
      console.log(id)
      this.$router.push(`/shopmovie/${id}`)
    }
  },
  mounted() {
    this.axios.get('admin/getCurrentPageMovie?currentPage=1&pageSize=8&input=').then(res => {
      console.log(res)
      this.data = res.data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.content {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0.5rem;
  border-radius: 5px;
  justify-content: space-evenly;
  overflow-y: scroll;
  height: 100%;
}
.num{
  width: 300px;
  margin-left: 10px;
}
.hot{
  margin-bottom: 2.5rem;
}
img {
  height: 10rem;
  border-radius: 5px;
}

button {
  color: white;
  font-weight: bold;
  font-size: 10px;
  width: 56px;
  height: 30px;
  background: #FB54A4;
  border: 1px solid transparent;
  border-radius: 20px
}

P {
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.num {
  display: flex;
  flex-direction: column;
}

h4 {
  margin-bottom: 20px;
  margin-top: 0px;
}

i {
  font-weight: bold;
  color: orange;
  font-size: 15px;
}
</style>