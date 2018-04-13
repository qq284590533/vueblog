<template>
  <div class="front">
    <VueAside></VueAside>
    <VueTopBar></VueTopBar>
    <router-view class="main-content"></router-view>
    <VueFooter></VueFooter>
  </div>
</template>
<script>
import VueAside from './VueAside'
import VueTopBar from './VueTopBar'
import VueFooter from './VueFooter'
export default {
  components:{
    VueAside,
    VueTopBar,
    VueFooter
  },
}
</script>
<style>

.front .main-content{
  min-height: 100%;
  margin-left: 440px;
  padding: 45px 20px;
  transition: margin-left .2s ease;
}

.night .main-content{
  color: #bfbfbf;
}

@media screen and (max-width: 1024px){
  .front .main-content{
    margin-left: 385px;
  }
}
@media screen and (max-width: 900px){
  .front .main-content{
    margin-left: 100px;
  }
}

@media screen and (max-width: 667px){
  .front .main-content{
    margin-left: 45px;
  }
}

@media screen and (max-width: 414px){
  .front .main-content{
    margin-left: 0;
  }
}
</style>

