<template>
  <div class="video-views">
    <Content></Content>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Content from '@/components/Video/Content.vue';
import Tabbar from '@/components/Tabbar.vue';
  export default {
    components: { Content, Tabbar }
}
</script>

<style lang="scss" scoped>

</style>