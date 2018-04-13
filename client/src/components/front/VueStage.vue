<template>
  <div class="stage">
      <VueUserInfo></VueUserInfo>
      <VueCanvas></VueCanvas>
  </div>
</template>

<script>
import VueUserInfo from "./VueUserInfo"
import VueCanvas from "./VueCanvas"

export default {
  components:{
      VueUserInfo,
      VueCanvas
  }
}
</script>

<style>
.stage{
    position: relative;
    width: 340px;
    height: 100%;
    margin-left: 100px;
    background-color: #6a6a6a;
    background-image: url('../../../static/stagebg/stage-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transition: all .2s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, .5);
    opacity: 1;
    overflow: hidden;
}

@media screen and (max-width: 1024px){
  .stage{
    margin-left: 45px;
  }
}

@media screen and (max-width: 900px){
  .stage{
    width: 0;
    opacity: 0;
  }
}


</style>

