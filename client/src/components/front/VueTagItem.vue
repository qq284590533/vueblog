<template>
	<div class="categoy-item item-content">
		<h3 class="item-name animated fadeInDown">{{tagname}} <span>标签</span></h3>
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
			tagname:'',
			blogList:[],
			lineType:'dashed',
			iconType:'dotted',
			width:1,
			color:'#9e9e9e'
		}
	},

  mounted(){
		this.tagname = this.$route.params.tagname
		let _this = this;
		let tagname = this.tagname;
		axios.get('front/getTagArticles/'+tagname).then((res) => {
			// console.log(res.data.blogList);
			_this.blogList = res.data.blogList;
		})
  },
}

</script>



