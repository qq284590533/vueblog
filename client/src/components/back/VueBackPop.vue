<template>
  <div id="pop" class="pop-box">
    <div class="table-call">
      <div class="pop-cont animated fadeInUp" v-show="popConf.show" :style="{ width: popConf.contWidth+'px', height: popConf.contHeight+'px' }">
        <h3 class="pop-title">{{popConf.title}} <i class="pop-close icon iconfont" @click="popConf.show=false">&#xe6fa;</i></h3>
        <div class="pop-body">
          <slot></slot>
        </div>
        <div class="pop-foot">
          <button v-show="popConf.isCancel" class="cancel" @click="popConf.show=false" >{{popConf.cancelValue}}</button>
          <button v-show="popConf.isOk" class="ok" @click="popConf.ok">{{popConf.okValue}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['popConf'],
  data(){
    return {

    }
  },
  methods:{
  },
  mounted(){
    var pop = document.getElementById('pop');
    document.body.appendChild(pop)
  }
}
</script>

<style>
.pop-box{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 100000;
  display: table;
}

.pop-box>div{
  display: table-cell;
  vertical-align: middle;
}

.pop-box .pop-cont{
  width: 30%;
  max-width: 500px;
  min-width: 300px;
  margin:0 auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, .7);
  overflow: hidden;
  animation-duration: 0.5s;
}

.pop-cont .pop-title{
  position: relative;
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 16px;
  color: #414141;
  padding: 0 20px;
  padding-right: 60px;
  border-bottom: 1px solid #ccc;
}

.pop-cont .pop-body{
  padding: 20px;
}

.pop-cont .pop-foot{
  text-align: center;
  height: 74px;
  padding: 20px 20px 0;
  border-top: 1px solid #ccc;
}

.pop-cont .pop-foot button{
  display: inline-block;
  height: 34px;
  margin: 0 20px;
  padding: 0 25px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  background: #ccc;
  cursor: pointer;
}

.pop-cont .pop-foot button:hover{
  background: #aaa;
}

.pop-cont .pop-close{
  position: absolute;
  right: 0;
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  cursor: pointer;
}

.pop-cont .pop-close:hover{
  color: #d64f4f
}

</style>




