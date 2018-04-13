<template>
	<li class="blog-item fadeInUp animated">
		<div class="item-cont">
			<router-link class="item-cont-tit" :to="{ name:'article', params:{'id':blog._id}}" tag="h3">{{blog.title}}</router-link>
			<VueCategoryTagsBar :categs="blog.aCategory" :tags="blog.aTag" ></VueCategoryTagsBar>
			<p class="content">{{blog.abstract}}</p>
			<span class="time">{{blog.publish_time | getTime}}</span>
		</div>
	</li>
</template>

<script>
import VueCategoryTagsBar from './VueCategoryTagsBar'
export default {
	props:['blog'],
  components:{
    VueCategoryTagsBar
  }
}
</script>

<style>
.blog-item .item-cont{
  display: block;
  border-radius: 4px;
  padding: 10px 20px;
  box-shadow: 0 0 1px #aaa;
  transition: box-shadow .2s ease;
  color: #4a4a4a;
  cursor: default;
}

.blog-item .item-cont:hover{
  box-shadow: 0 5px 10px rgba(0, 0, 0, .3)
}

.blog-item .item-cont-tit{
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  cursor: pointer;
}

.blog-item .item-cont-tit:hover{
  color: #2196f3;
}

.blog-item .item-cont .content{
  text-align: justify;
  line-height: 21px;
  max-height: 63px;
  overflow: hidden;
  margin-bottom: 8px;
}
.blog-item .item-cont .time{
  color: #7a7a7a;
  font-size: 12px;
}

.night .blog-item .item-cont{
	color: #bbbbbb;
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.night .blog-item  .item-cont-tit:hover{
  color: #fafafa;
}
</style>


