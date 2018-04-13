<template>
	<div class="top-bar">
    <div class="light-switch">
      <VueBackLight></VueBackLight>
    </div>
  </div>
</template>

<script>
import VueBackLight from './VueBackLight'
export default {
  components:{
    VueBackLight,
  }
}
</script>
<style>
.top-bar{
    position: fixed;
    width: 100%;
    padding: 0 20px;
    top: 0;
    padding-left: 460px;
    height: 45px;
    background: #424242;
    transition: margin-left .2s ease;
    overflow: hidden;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
    z-index: 1; 
}

.light-switch{
  float: right;
  margin-right: -20px;
  height: 45px;
}

.light-switch button{
  width: 45px;
  height: 45px;
  color: #dcdcdc;
  font-size: 24px;
  padding: 0
}

.light-switch button .iconfont{
  font-size: 20px;
}

.light-switch button:hover{
  color: #2196f3;
}


@media screen and (max-width: 1024px){
  .top-bar{
    padding-left: 405px;
  }
}
@media screen and (max-width: 900px){
  .top-bar{
    padding-left: 120px;
  }
}

@media screen and (max-width: 667px){
  .top-bar{
    padding-left: 65px;
  }
}
</style>


