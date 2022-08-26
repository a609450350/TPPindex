<template>
  <div class="cinema-search">
    <form action="/" class="search">
      <van-search v-model="value" show-action placeholder="影院名称或地址" @cancel="onCancel" shape="round"
        @input="isSearch" />
    </form>
    <div class="box" v-if="data">
      <div class="content" v-for="item in data" :key="item.cinema_id">
        <div class="left">
          <h3>{{ item.cinema_name }}</h3>
          <span>好评率82%</span>
          <p class="address">{{ item.specified_address }}</p>
        </div>
        <div class="right">
          <span class="money">￥{{ item.lowPrice | bai }}</span><span> 起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      data: null,
    }
  },
  methods: {
    onCancel() {
      this.$router.back()
    },
    isSearch() {
      this.axios.get('/index/selectcinema?input=' + this.value).then(res => {
        this.data = res.data.data
      })
    }
  },
  filters: {
    bai(val) {
      return (val / 100)
    }
  },
}
</script>

<style lang="scss" scoped>
.cinema-search {
  background: rgb(240, 239, 239);
  height: 100%;
}

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

.cinema {
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

.search {
  margin-bottom: 30px;
}
</style>