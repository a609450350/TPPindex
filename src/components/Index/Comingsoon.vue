<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check="false">
      <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
        <img :src="data.poster" />
        <div>
          <div class="title">{{ data.name }}</div>
          <div>
            <span class="label">观众评分：</span>
            <span class="grade">{{ data.grade }}</span>
            <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
            <div class="nation">{{ data.nation }} | {{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import http from '@/ubil/http'
Vue.filter('actorsFilter', (data) => {
  return data.map((item) => item.name).join('  ')
})
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  methods: {
    onLoad() {
      console.log('到底了')
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=9574049`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
        if (this.datalist.length >= res.data.data.total) {
          this.finished = true
        }
      })
    },
    handleChangePage(id) {
      // console.log(id)
      // this.$router.push(`/detail/${id}`)
      // 2-通过命名路由
      this.$router.push({
        name: 'kerwinDetail',
        params: {
          myid: id
        }
      })
    }
  },
  mounted() {
    // axios.get('/maizuo.json').then((res) => {
    //   console.log((this.datalist = res.data.data))
    //   this.datalist = res.data.data.films
    // })
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=530161
`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      this.datalist = res.data.data.films
    })
  }
}
</script>
<style lang="scss" scoped>
.van-list {
  padding: 1px;
  margin: 1px;

  .van-cell {
    overflow: hidden;
    padding: 15px;

    img {
      width: 3.75rem;
      float: left;
      padding-right: 10px;
    }

    .title {
      font-size: 1rem;
    }

    .label {
      font-size: 0.75rem;
      color: #999;
    }

    .grade {
      font-size: 0.75rem;
      color: #ff6700;
    }

    .nation {
      font-size: 0.625rem;
      color: #999;
    }

    .actors {
      font-size: 0.625rem;
      color: #999;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 200px;
    }
  }
}
</style>
