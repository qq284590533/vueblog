<template>
  <div class="nav-box">
    <ul class="nav-list" :class="{opened:open}">
      <li class="nav-switch animated fadeInUp" @click="openList"><i></i></li>
      <li class="animated fadeInUp" @click="closeList"><router-link to="/home" data-index="1"><i class="icon iconfont">&#xe83d;</i><span>首页</span></router-link></li>
      <li class="animated fadeInUp" @click="closeList"><router-link to="/categories" data-index="2"><i class="icon iconfont">&#xe612;</i><span>分类</span></router-link></li>
      <li class="animated fadeInUp" @click="closeList"><router-link to="/tags" data-index="3"><i class="icon iconfont">&#xe647;</i><span>标签</span></router-link></li>
      <li class="animated fadeInUp" @click="closeList"><router-link to="/archives" data-index="4"><i class="icon iconfont">&#xe628;</i><span>归档</span></router-link></li>
      <li class="animated fadeInUp" @click="closeList"><router-link to="/about" data-index="5"><i class="icon iconfont">&#xe60a;</i><span>关于</span></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  
  name:"VueNav",
  data(){
    return {
      open:false,
    }
  },

  methods:{
    openList (){
      this.open=!this.open;
    },

    closeList (){
      this.open=false;
    },
  }

}
</script>

<style>

.nav-box .icon{
  margin-right: 15px
}

.nav-box{
  float: left;
  width: 100px;
  height: 100%;
  background: #292929;
  transition: width .2s ease;
  overflow: hidden;
}
.nav-list{
  width: 100%;
  overflow: hidden;
  transition: height .3s ease;
}

.nav-list li{
  width: 100%;
  height: 45px;
  line-height: 45px;
}

.nav-list li a{
  display: block;
  width: 100px;
  padding-left: 15px;
  height: 45px;
  line-height: 45px;
  color: #dcdcdc;
  transition: background-color .3s ease,padding-left .3s ease;
}

.nav-list li:hover a{
  background: #1976d2;
}

.nav-list li a.active{
  background: #025db7;
  padding-left: 25px;
}

.nav-list span{
  display: inline-block;
}


.nav-box .nav-switch{
  position: relative;
  display: none;
  width: 100%;
  cursor: pointer;
}

.nav-box .nav-switch i,.nav-box .nav-switch i::before,.nav-box .nav-switch i::after{
  position: absolute;
  display: block;
  height: 2px;
  width: 60%;
  left: 50%;
  margin-left: -30%;
  top: 47%;
  background: #dcdcdc;
}

.nav-box .nav-switch i::before,.nav-box .nav-switch i::after{
  content: '';
  width: 100%;
  margin-left: -50%;
  top: -9px;
}

.nav-box .nav-switch i::after{
  top: 9px;
}

@media screen and (max-width: 1024px){
  .front .nav-box{
    width: 45px;
  }
  .front .nav-list li a.active{
    padding-left: 15px;
  } 
}

@media screen and (max-width: 900px){
  .front .nav-box{
    width: 100px;
  }
  .front .nav-list li a.active{
    padding-left: 25px;
  } 
}

@media screen and (max-width: 667px){
  .front .nav-box{
    width: 45px;
  }
  .front .nav-list li a.active{
    padding-left: 15px;
  } 
}

@media screen and (max-width: 414px){
  .nav-box{
    height: auto;
  }
  .nav-box .nav-list{
    height: 45px;
  }

  .nav-list li a.active{
    padding-left: 15px;
  } 

  .nav-box .nav-list.opened{
    height: 270px;
  }

  .nav-box .nav-switch{
    display: block;
  }
}
</style>
