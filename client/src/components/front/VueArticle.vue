<template>
	<div v-if="article" class="article animated fadeInUp">
		<h2 class="article-tit">{{article.title}}</h2>
    <span class="created-time">{{article.createdTime}}</span>
    <VueCategoryTagsBar :categs = "article.aCategory" :tags = "article.aTag"></VueCategoryTagsBar>
    <span class="time">{{article.publish_time | getTime}}</span>
    <hr>
    <div id="editor" class="article-cont">
        <mavonEditor	class="md-view"
        :editable=false 
        :toolbarsFlag="props.toolbarsFlag" 
        :subfield="props.subfield" 
        :defaultOpen="props.default_open" 
        :code_style="props.code_style" 
        :value="article.content" 
        style="min-height:400px"
        ></mavonEditor>
    </div>
    <hr>
    
	</div>
</template>

<script>
import axios from 'axios'
import VueCategoryTagsBar from './VueCategoryTagsBar'
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data(){
    return {
      props: {
        toolbarsFlag: false,
        subfield: false,
        default_open: "preview",
				code_style: "monokai-sublime"
      },
      article:null
    }
  },

  components: {
    VueCategoryTagsBar,
    mavonEditor,
    //VueMdEdit,
  },

  mounted: function () {
    let _this = this;
    let id = this.$route.params.id
    axios.get("front/getArticle/"+id).then(function(response){
      _this.article = response.data.Article
    })
  },

}
</script>

<style>
.article {
  position: relative;
  height: 100%;
  z-index: 0;
}
.article .time{
  font-size: 12px;
  line-height: 30px;
  color: #7a7a7a;
}
.article hr{
  height: 1px;
  background: #7a7a7a;
  margin-bottom: 20px;
}

#editor .v-note-wrapper .v-note-panel{
  box-shadow: none;
}

.article-tit{
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  margin-top: 20px;
}

.article-cont{
  min-height: 400px;
  margin-bottom: 45px;
}

</style>


