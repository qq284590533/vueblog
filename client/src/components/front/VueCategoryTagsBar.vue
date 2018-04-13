<template>
	<div class="category-tags">
		<div v-show="categs.length>0">
      <i class="iconfont">&#xe612;</i>:
			<router-link class="categ" tag="span" v-for="(categ,index) in categs" :key="index" :to="{ name:'categoryItem', params:{'categ':categ.name,'id':categ._id}}">{{categ.name}}</router-link>
		</div>
		<div v-show="tags.length>0">
      <i class="iconfont">&#xe647;</i>:
			<router-link class="tag" tag="span" :to="{ name:'tagItem', params:{'tagname':tag.name,'id':tag._id}}"  v-for="(tag,index) in tags" :key="index">{{tag.name}}</router-link>
		</div>
	</div>	
</template>

<script>
export default {
	props:['categs','tags']
}
</script>


<style>

.night .category-tags div{
  color: #aaa;
}

.category-tags {
  text-align: left;
  margin: 5px 0;
}

.category-tags div {
  display: inline-block;
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  color: #7a7a7a;
}

.category-tags div span{
  position: relative;
  top: -1px;
  display: inline-block;
  height: 20px;
  line-height: 17px;
  margin: 0 3px;
  padding: 0 8px;
  border: 1px solid #7a7a7a;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  transition: all .2s ease;
}

.category-tags div span:hover{
  color: #dddddd;
  background: #6a6a6a;
}

</style>


