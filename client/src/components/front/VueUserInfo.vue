<template>
  <div class="user-info">
    <router-link to="/about">
      <img :src="headImgPath" alt="头像">
    </router-link>
    <h3 class="name">{{username}}</h3>
    <h4 class="site-tit">技术笔记，心得体会</h4>
    <p class="site-desc">一个小前端的成长之路！</p>
  </div>
</template>

<script>
export default {
  name: "VueUserInfo",
  data(){
    return{
      username: "Lin",
      headImgPath:"/static/headimg/head-img.jpg"
    }
  }
}
</script>

<style>
.user-info{
  position: absolute;
  width: 340px;
  padding: 20px;
  bottom: 0;
  color: #fff;
  overflow: hidden;
  font-family: "仿宋"
}

.user-info a{
  display: block;
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border: 2px solid #cfcfcf;
  overflow: hidden;
  border-radius: 100%;
  background: #000;
}

.user-info img{
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.user-info .name{
    font-size: 26px;
    line-height: 40px;
    text-align: center;
}

.user-info .site-tit{
    padding: 0 20px;
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
}

.user-info .site-desc{
  text-align: center;
  font-size: 14px;
  line-height: 20px;
}

</style>


