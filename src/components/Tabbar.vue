<template>
  <div class="tabbar">
    <ul>
      <router-link to="/index" custom v-slot="{navigate,isActive}">
        <li>
          <i class="iconfont icon-shouye"  @click="navigate" :class="isActive?'iconfont icon-shouye1':''"></i>
          <span>首页</span>
        </li>
      </router-link>
      <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
        <li>
          <i class="iconfont icon-dianying" @click="navigate" :class="isActive?'iconfont icon-dianying1':''"></i>
          <span>电影</span>
        </li>
      </router-link>
      <router-link to="/video" custom v-slot="{navigate,isActive}">
        <li>
          <i class="iconfont icon-faxian" @click="navigate" :class="isActive?'iconfont icon-faxian1':''"></i>
          <span>发现</span>
        </li>
      </router-link>
          <router-link to="/yanchu" custom v-slot="{navigate,isActive}">
        <li>
          <i class="iconfont icon-yanchu" @click="navigate" :class="isActive?'iconfont icon-yanchu1':''"></i>
          <span>演出</span>
        </li>
      </router-link>
          <router-link to="/me" custom v-slot="{navigate,isActive}">
        <li>
          <i class="iconfont icon-wode" @click="navigate" :class="isActive?'iconfont icon-wode1':''"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .tabbar{
        position: fixed;
        bottom: 0;
        left:0;
        width: 100%;
        height: 2.722222rem;
        background: #fff;
        border-top: 1px solid #e5e5e5;
        padding-top: 4px;
        z-index: 100;

        ul{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            li{
                flex: 1;
                line-height: 1.4rem;
                text-align: center;
                display: flex;
                flex-direction: column;
                i{
                    font-size: 1.5rem;
                }
                span{
                    font-size: 0.5rem;
                }

            }
        }
    }
</style>