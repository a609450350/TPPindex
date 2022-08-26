<template>
    <div>
        <div class="top">
           <van-nav-bar title="选择城市" style="background-color:#eee" left-text="关闭" @click-left="onClickLeft"/>
            <van-search v-model="value" placeholder="请输入搜索关键词" /> 
        </div>
        <div style="padding:0 10px 15px 10px;margin-top:100px">
            <p>定位城市</p>
            <button style="padding:3px 20px;border:0.1px solid red;background-color:#fff;color:red" @click="go">石家庄</button>
            <p>热门城市</p>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">上海</button>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">北京</button>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">广州</button>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">杭州</button>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">深圳</button>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">武汉</button>
            <button style="padding:3px 30px;border:0;background-color:#fff;margin:10px">成都</button>
            <!-- <van-cell-group>
                <van-cell v-for="x in data" :key="x.cityId" :title="x.name" value="" />
            </van-cell-group> -->
            <van-index-bar :index-list="computedList" @select="handleSlect">
                <div v-for="data in cityList" :key="data.type">
                    <van-index-anchor :index="data.type" />
                    <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleclickName(item)"/>
                </div>
            </van-index-bar>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'

    export default {
        
        data() {
            return {
                value: '',
                cityList:[],
            }
        },
        computed: {
            computedList () {
                return this.cityList.map(item => item.type)
            }
        },
        methods: {
            handleclickName (item) {
      // console.log(item)
      // 传统的多页面方案
      // location.href = '#/cinemas?cityname=' + item.name
      // 单页面方案
      // 1.中间人模式 2.bus事件总线 $on $emit
        // this.$store.state.cityName = item.name
        this.$store.commit('changeCityName', item.name)
        this.$store.commit('changeCityId', item.cityId);
        this.$store.dispatch("getWeatherDay", item.cityId).then(()=>{
            this.$router.back();
        });
        
        this.value=item.name
    },
    go(){
       this.$store.commit('changeCityName', '石家庄')
        this.$store.commit('changeCityId', '130100');
        this.$store.dispatch("getWeatherDay", '130100').then(()=>{
            this.$router.back();
        });
        
        this.value='石家庄'
    },
    handleSlect (data) {
      Toast(data)
    },
            onClickLeft() {
                this.$router.push('/index')
            },
            renderCity (list) {
      //   console.log(list)
      const cityList = []
      const letterList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach((letter) => {
        const newList = list.filter(
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
        )
        // console.log(newList)
        newList.length > 0 &&
          cityList.push({
            type: letter,
            list: newList
          })
      })
      return cityList
    },
        },
        mounted () {
            this.axios.get('index/getCity').then(res=>{                 
                this.cityList = this.renderCity(res.data.data)
            })
        },
    }
</script>

<style lang="scss" scoped>
.van-search{
    padding:10px 0; 
}
.van-search__content{
    background-color:#fff
}
*{
    background-color:#eee
}
.top{
    position: fixed;
   top:0;
   z-index:999999;
   background-color: white;
   width:100%;
}
</style>