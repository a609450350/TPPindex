<template>
  <div class="movie-views">
    <Header></Header>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import Header from '../components/Movie/Header.vue'
  export default {
    components: {Header, Tabbar}
  }
</script>

<style lang="scss" scoped>
.movie-views{
  background: rgb(240, 239, 239);
  height: 100%;
}
</style>