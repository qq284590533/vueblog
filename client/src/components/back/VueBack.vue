<template>
  <div class="back">
    <VueBackAside></VueBackAside>
    <VueBackTopBar></VueBackTopBar>
    <router-view class="main-content" ></router-view>
  </div>
</template>
<script>
import axios from 'axios'
import VueBackAside from './VueBackAside'
import VueBackTopBar from './VueBackTopBar'

export default {
  components:{
    VueBackAside,
    VueBackTopBar
  },


  // created(){
  //   axios.get('/admin/test').then( response => {
  //     let res = response.data;
  //     console.log(res.message);
  //   })
  // }
}
</script>
<style>
.back .main-content{
  position: relative;
  min-height: 100%;
  margin-left: 100px;
  padding: 65px 20px 20px;
  transition: margin-left .2s ease;
  z-index: 0;
}

.back .main-content.zIndex2{
  z-index: 2;
}

.night .back .main-content{
  color: #bbbbbb;
}

@media screen and (max-width: 667px){
  .back .main-content{
    margin-left: 45px;
  }
}

@media screen and (max-width: 414px){
  .back .main-content{
    margin-left: 0;
  }
}
</style>


