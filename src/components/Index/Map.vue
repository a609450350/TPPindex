<template>
  <div id="index">
    <div id="map_wrap">
      <Mapconponent></Mapconponent>
    </div>
  </div>
</template>
<script>
import Mapconponent from '@/components/Mapconponent.vue';
export default {
    components: { Mapconponent }
}
</script>
<style scoped lang="less"> 
#index{
  height: 100%;
  width: 100%;
  position: relative;
  #map_wrap{
    height: 100%;
    width: 100%;
  }

}
</style>