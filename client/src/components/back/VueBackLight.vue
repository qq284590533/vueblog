<template>
<div class="btn-box">
  <mu-icon-button title="退出" @click="exitAdmin">
    <i class="iconfont">&#xe602;</i>
  </mu-icon-button>
  <mu-icon-button :title="night?'开灯':'关灯'" @click="switchLight" href="">
    <i v-if="!night" class="iconfont">&#xe6c8;</i>
    <i v-if="night" class="iconfont">&#xe668;</i>
  </mu-icon-button>
</div>
</template>

<script>
import axios from 'axios'

export default {

  data (){
    return{
      night: this.$store.state.night
    }
  },

  methods:{

    switchLight(){
      this.$store.commit("changeNight")
      this.night=this.$store.state.night
    },

    exitAdmin(){
      let _this = this;
      axios.post('login_out/logout')
			.then(function (response) {
        if(response.data.status){
          _this.$store.commit('changeLogin');
          _this.$router.push({path: '/home'});
          console.log(response.data.msg);
        }else{
          return false;
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




