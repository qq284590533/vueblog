<template>
  <ul class="blog-list">
    <VueBlogItem :blog="blog"  v-for="(blog,index) in blogs" :key="index"></VueBlogItem>
  </ul>
</template>
<script>

import VueBlogItem from './VueBlogItem'

export default {
  props:["blogs"],
  components:{
    VueBlogItem,
  }
};
</script>
<style>
.blog-list {
  padding: 20px 0;
}

.blog-list li{
  margin-bottom: 20px; 
}

</style>

