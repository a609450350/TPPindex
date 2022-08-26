<template>
  <div class="cinema">
    <img src="@/assets/dxyq.jpg" style="width:98%;padding:4px;border-radius: 10px;" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check="false">
        <div class="content" v-for="item in data" :key="item.cinema_id" @click="goshop(item.cinema_name,item.cinema_id)">
          <div class="left">
            <h3>{{ item.cinema_name }}</h3>
            <span>好评率82%</span>
            <p class="address">{{ item.specified_address }}</p>
          </div>
          <div class="right">
            <span class="money">￥{{ item.lowPrice | bai }}</span><span> 起</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      isLoading: false,
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  filters: {
    bai(val) {
      return (val / 100)
    }
  },
  mounted() {
    this.axios('admin/getCurrentPageCinema?currentPage=1&pageSize=8&input=').then(res => {
      console.log(res)
      this.data = res.data.data
    })
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
      this.axios.get(`admin/getCurrentPageCinema?currentPage=${this.current}&pageSize=8&input=`).then((res) => {
        this.data = [...this.data, ...res.data.data]
        this.loading = false
        console.log(this.data.length)
        console.log(res.data.total)
        if (this.data.length >= res.data.total) {
          this.finished = true
        }
      })
    },
    goshop(name,id){
      this.$router.push(`/shopping/${name}/${id}`)
    },  
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  background: white;
  border-radius: 8px;
  margin: 8px;
}
.cinema{
  margin-bottom: 2.5rem;
}
.money {
  color: red;
}

.left {
  width: 80%;
}

h3 {
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
}
</style>