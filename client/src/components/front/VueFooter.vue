<template>
	<div class="footer">
		<div class="black">
			<p>&copy; {{year}}&ensp;&hearts;&ensp;Forest</p>
			<p><a class="icp" href="http://www.miitbeian.gov.cn/">皖ICP备18017034号</a>&ensp;&ensp;作者：<router-link to='/about'>{{userName}}</router-link></p>
		</div>
		<mu-icon-button class="backtop" @click="backTop">
			<i class="iconfont">&#xe683;</i>
		</mu-icon-button>
	</div>
</template>

<script>
export default {
	
	data(){
		return{
			userName:"Lin",
			year:''
		}
	},

	methods:{
		backTop(){
			let mainContent = document.querySelector('.main-content');
			let run = null;
			const fun = ()=>{
				let top = mainContent.scrollTop;
				if(top>0){
					top-=300;
				}else{
					clearInterval(run);
				}
				mainContent.scrollTop = top;
			}
			run = setInterval(fun,10)
		}
	},

	mounted(){
		this.year = new Date().getFullYear();
	}
}
</script>

<style>
.footer{
    position: fixed;
    width: 100%;
    padding: 0 20px;
    bottom: 0;
    padding-left: 460px;
    height: 45px;
    background: #424242;
    transition: margin-left .2s ease;
    overflow: hidden;
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.7);
    z-index: 1; 
}

.footer .black{
	width: 100%;
	float: left;
	font-size: 12px;
	color: #acacac;
	line-height: 18px;
	margin-top: 4.5px;
	text-align: center;
}

.footer .black a{
	color: #acacac;
	text-decoration: underline;
}

.footer .black a:hover{
	color: #dcdcdc;
}

.footer .backtop{
	position: absolute;
	right: 0;
	padding: 0;
	width: 45px;
	height: 45px;
	font-size: 20px;
	color: #dcdcdc;
}

.footer .black .icp{
	text-decoration: none;
}

.backtop:hover{
	color: #2196f3;
}

.backtop i{
	font-size: 20px;
}

@media screen and (max-width: 1024px){
  .footer{
    padding-left: 405px;
  }
}
@media screen and (max-width: 900px){
  .footer{
    padding-left: 120px;
  }
}

@media screen and (max-width: 667px){
  .footer{
    padding-left: 65px;
  }
}

@media screen and (max-width: 414px){
  .footer{
    padding-left: 20px;
  }
}
</style>


