import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage:window.sessionStorage,
      reducer(val){
        return{
          cityId:val.cityId,
          cityName:val.cityName,
          today:val.today,
        }
      }
    })
  ],
  actions: {
    getWeatherDay({commit},cityId) {
      console.log("hello world");
      axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${cityId}&key=2eab3ee939e9127f94f34334c9971d58&extensions=all&output=json`).then((res)=>{
        console.log(res.data);
        commit('getWeatherDay', res.data.forecasts[0].casts[0].dayweather)
      })
    }
  },
  state: {
    cityId: '130100',
    cityName: '石家庄',
    today: '晴',
  },
  getters: {
  },
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    getWeatherDay (state, data) {
      state.today = data
    },
  },

  modules: {
  }
})
