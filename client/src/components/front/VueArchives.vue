<template>
	<div class="categoy-item item-content">
		<h3 class="item-name animated fadeInDown">归档</h3>
    <p class="totle animated fadeInDown">目前共 <span>{{blogList.length}}</span> 篇日志，继续努力吧，骚年！</p>
		<mu-timeline :lineColor="color" :iconColor="color" :lineType="lineType" :iconType="lineType" :lineWidth="width" :iconLine="width" >
			<mu-timeline-item class="animated fadeInDown" v-for="(blog,index) in blogList" :key="index">
				<router-link class="link" :to="{name:'article', params:{'id':blog._id}}">
					<p class="date">{{blog.publish_time | getTime}}</p>
					<p class="blogTit">{{blog.title}}</p>
				</router-link>
			</mu-timeline-item>
		</mu-timeline>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return {
			cateName:'',
			blogList:[],
			lineType:'dashed',
			iconType:'dotted',
			width:1,
			color:'#9e9e9e'
		}
	},

  mounted: function () {
		this.cateName = this.$route.params.categ
		let _this = this;
		let catename = this.cateName;
    axios.get("front/getArticle").then(function(response){
      _this.blogList = response.data.blogList;
    })
  },
}

</script>

<style scoped>
.item-name{
  margin-bottom: 0;
}

.totle{
  font-size: 14px;
  line-height: 30px;
  color: #777;
  margin-bottom: 30px;
}

.totle span{
  font-size: 18px;
  color: #444;
}

.night .totle{
  color: #999;
}

.night .totle span{
  color: #bbb;
}
</style>



