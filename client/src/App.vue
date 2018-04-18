<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="view-box"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data () {
    return{
      transitionName:'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toMeta = to.matched[0].meta.code
      if(from.matched.length){
        const fromMeta = from.matched[0].meta.code
        this.transitionName = toMeta < fromMeta ? 'slide-up' : 'slide-down';
      }

      // 切换路由时移除弹框
      const isPop = Boolean(document.getElementById('pop'));
      if(isPop){
        document.body.removeChild(document.getElementById('pop'));
      }

    }
  },
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  transition: background-color .3s ease;
  overflow: hidden;
}

.night{
  background-color: #333333;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.view-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  transition: all .5s ease-in-out;
}
.main-content{
  height: 100%;
  overflow-y: auto;
}
.slide-down-enter, .slide-up-leave-active {
  opacity: 0;
  -webkit-transform: translate(0, -80%);
  transform: translate(0, -80%);
}
.slide-down-leave-active, .slide-up-enter {
  opacity: 0;
  -webkit-transform: translate(0,80%);
  transform: translate(0,80%);
}

</style>
