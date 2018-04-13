<template>
<div class="btn-box">
  <mu-icon-button @click="toAdmin">
    <i class="iconfont">&#xe601;</i>
  </mu-icon-button>
  <mu-icon-button :title="night?'开灯':'关灯'" @click="switchLight" href="">
    <i v-if="!night" class="iconfont">&#xe6c8;</i>
    <i v-else class="iconfont">&#xe668;</i>
  </mu-icon-button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: "VueLight",

  data (){
    return{
      night: this.$store.state.night,
    }
  },

  methods:{
    switchLight(){
      this.$store.commit("changeNight")
      this.night=this.$store.state.night
      // console.log(this.night);
    },

    toAdmin(){
      let _this = this;
      axios.get('login_out/login')
			.then(function (response) {
				if(response.data.status){
					_this.$router.push({path: '/admin'})//如果登录跳转到admin
				}else{
          if(Boolean(response.data.msg)){
            console.log(response.data.msg);
          }
          _this.$router.push({path: '/login'})//如果未登录跳转到login
        }
			})
			.catch(function (error) {
				console.log(error);
			});
    },

  },

  watch:{
    night: function(){
      if(this.night){
        document.getElementById("app").className = 'night';
      }else{
        document.getElementById("app").className = '';
      }
    }
  }

}

</script>
<style>
.btn-box .mu-icon-button{
  display: inline-block;
}
</style>




