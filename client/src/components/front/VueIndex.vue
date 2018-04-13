<template>
  <div>
    <VueBlogList :blogs="blogList"></VueBlogList>
  </div>
</template>

<script>
import VueBlogList from './VueBlogList'
import axios from 'axios'

export default {
  components:{
    VueBlogList,
  },
  data(){
    return {
      blogList: [],
    }
  },

  mounted(){
    let _this = this;
    axios.get("front/getArticle").then(function(response){
      _this.blogList = response.data.blogList;
      // console.log(_this.blogList);
    })
  }


}
</script>

<style>
  .top-bar{
    background: #424242;
    height: 45px;
  }

</style>

