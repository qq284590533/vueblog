<template>
  <div class="block-box">    
		  <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">{{message}}</mu-popup>
    <div class="tit">
      <i class="icon iconfont">&#xe62d;</i>
      <h3>个人信息</h3>
    </div>
    <div class="block-content clearfix" :class="{edited:editing}">
      <div class="head-box">
        <mu-paper class="img-box" :zDepth="2">
          <img :src="head_img">
        </mu-paper>
        <button class="upload-headimg">
          <input type="file" id="uploadHeadimg" class="file-button">
          <label for="uploadHeadimg">上传头像</label>
        </button>
      </div>      
      <ul class="info-list">
        <li>
          <span>昵称：</span>
          <mu-text-field @blur="blurFocus" v-model.trim.lazy="name"/>
        </li>
        <li>
          <span>标题：</span>
          <mu-text-field @blur="blurFocus" v-model.trim.lazy="site_tit"/>
        </li>
        <li>
          <span>描述：</span>
          <mu-text-field @blur="blurFocus" v-model.trim.lazy="site_desc"/>
        </li>
        <li>
          <span>邮箱：</span>
          <mu-text-field @blur="blurFocus" v-model.trim.lazy="email"/>
        </li>
        <li>
          <span >注册时间：{{signup_time | getTime}}</span>
        </li>
      </ul>

      <div class="btns animated" :class="{'edited':editing}" >
          <mu-raised-button label="取消">
              <i class="icon iconfont" style="font-size:20px;">&#xe6fa;</i>
          </mu-raised-button>
          <mu-raised-button label="保存" @click="saveChanged">
              <i class="icon iconfont" style="font-size:20px;">&#xe62c;</i>
          </mu-raised-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'


export default {
  data(){
    return{
      topPopup: false,
      message:'',
      userinfo:null,
      name:null,
      head_img:null,
      site_tit:null,
      site_desc:null,
      email:null,
      signup_time:null,
      changInfo:{},
      editing:false,
    }
  },

  methods:{
    open (position) {
      this[position + 'Popup'] = true
    },

    extend(obj1, obj2) {
      for (var attr in obj2) {
        obj1[attr] = obj2[attr];
      }
    },

    getUserInfo(){
      let _this = this;
      axios.get('/admin/getuserinfo')
      .then(function(response){
        if(response.data.userinfo){
          _this.userinfo = response.data.userinfo;
          _this.name = _this.userinfo.name;
          _this.site_tit = _this.userinfo.site_tit;
          _this.site_desc = _this.userinfo.site_desc;
          _this.email = _this.userinfo.email;
          _this.signup_time = _this.userinfo.signup_time;
          _this.head_img = '/static/headimg/head-img.jpg'
          _this.userinfo.head_img;
				}else{
          _this.$router.push({path: '/login'})//如果未登录跳转到login
        }
      })
			.catch(function (error) {
				console.log(error);
			});
    },

    blurFocus(){
      if(this.name!==this.userinfo.name||
        this.site_tit!==this.userinfo.site_tit||
        this.site_desc!==this.userinfo.site_desc||
        this.email!==this.userinfo.email){
        this.editing = true;
      }else{
        this.editing = false;
      }
    },

    saveChanged(){
      let _this = this;
      axios.post('/admin/updataUserInfo',{
        _id: _this.userinfo._id,
        changInfo:_this.changInfo
      }).then((response) => {
        if(response.data.status){
          _this.message = '更新成功！'
          _this.open('top'); 
          _this.extend(_this.userinfo,_this.changInfo);
        }
      })
    }
  },

  watch:{
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false;
          this.editing = false;
        }, 2000)
      }
    },
    name(){
      this.changInfo.name = this.name;
    },
    site_tit(){
      this.changInfo.site_tit = this.site_tit;
    },
    site_desc(){
      this.changInfo.site_desc = this.site_desc;
    },
    email(){
      this.changInfo.email = this.email;
    },
    head_img(){
      this.changInfo.head_img= this.head_img;
    },
  },

  created(){
    this.getUserInfo();
  }

}
</script>

<style scoped>
.mu-text-field{
  width: auto;
  font-size: 14px;
}
</style>



