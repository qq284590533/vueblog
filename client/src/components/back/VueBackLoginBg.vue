<template>
	<div class="login-bg">
		<img class="bg-img" :src="bgPath" alt="">
	</div>
</template>


<script>
export default {
	data(){
		return{
			bgPath: "/static/loginbg/login-bg.jpg",
		}
	}
};

</script>


<style>
.login-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #262b2e;
}

.bg-img{
	display: block;
	position: absolute;
	width: 1920px;
	left: 50%;
	margin-left: -960px;
	bottom: 0;
}

</style>



