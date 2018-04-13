<template>
	<div class="login-box">
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">{{message}}</mu-popup>
		<div class="table-cell">
			<div class="form-box">
				<mu-text-field label="账号" v-model="user_id" hintText="请输入账号" labelFloat/><br/>
				<mu-text-field label="密码" v-model="password" hintText="请输入密码" type="password" labelFloat/><br/>
				<mu-raised-button class="login-btn" label="登录" @click="login()" />
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	  data () {
    return {
			topPopup: false,
			user_id:'',
			password:'',
			message:''
    }
  },
  methods: {
    open (position) {
      this[position + 'Popup'] = true
    },
		login () {
			let _this = this;
			axios.post('login_out/login', {
				user_id: this.user_id,
				password:  this.password
			})
			.then(function (response) {
				_this.message = response.data.msg;
				_this.open('top');
				if(response.data.code==0){
					_this.$router.push({path: '/admin'})
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		},

		enterLogin(){
			let _this = this;
			document.onkeydown = function(e){
				e = (e) ? e : window.event
				if (e.keyCode) {
					if(e.keyCode == 13){
						_this.login()
					}
				}
			};
		}
	},
	
  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
	},
	
	mounted:function(){
		this.enterLogin()
	},
}
</script>

<style>
.login-box{
	display: table;
	width: 100%;
	height: 100%;
}
.table-cell{
	display: table-cell;
	vertical-align: middle;
}
.form-box{
	position: relative;
	width: 50%;
	max-width: 500px;
	min-width: 300px;
	margin: 0 auto;
	padding: 40px;
	background: rgba(0, 0, 0, 0.6);
	color: #dcdcdc;
	border-radius: 5px;
}

.form-box .mu-text-field {
	width: 100%;
}

.form-box .mu-text-field-line{
	background-color: rgba(255, 255, 255, 0.6);
}

.form-box .mu-text-field-hint,.form-box .mu-text-field.has-label .mu-text-field-label.float{
	color: rgba(255, 255, 255, 0.5);
}
.form-box .mu-text-field-input,.form-box .mu-text-field.has-label .mu-text-field-label{
	color: rgba(255, 255, 255, 0.8);
}

.mu-text-field-focus-line{
	background-color: rgba(255, 255, 255, 0.8);
}

.form-box .login-btn{
	display: block;
	margin: 20px auto 0;
	background-color: rgba(255, 255, 255, 0.6);
}


</style>


