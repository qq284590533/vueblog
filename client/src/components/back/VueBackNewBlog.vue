<template>
  <div>
    <ul class="form">
      <li>
        <div class="li-box">
          <span class="form-tit">标题：</span>
          <input type="text" v-model="blog_tit" placeholder="博客标题">
        </div>
      </li>
      <li>
        <div class="li-box">
          <span class="form-tit">分类：</span>
          <div class="tags-container">
            <span v-for="(cate,index) in blog_cate" :key="index" @click="addTag(blog_cate,cate_list,index)" >
              {{cate.name}}
              <i class="delete icon iconfont" title="删除">&#xe604;</i>
              </span>
          </div>
        </div>
        <div class="tags-box">
          <span v-for="(cate,index) in cate_list" :key="index" @click="addTag(cate_list,blog_cate,index)" >{{cate.name}} +</span>
        </div>
      </li>
      <li>
        <div class="li-box">
          <span class="form-tit">标签：</span>
          <div class="tags-container">
            <span v-for="(tag,index) in blog_tag" :key="index" @click="addTag(blog_tag,tag_list,index)" >
              {{tag.name}}
              <i class="delete icon iconfont" title="删除">&#xe604;</i>
              </span>
          </div>
        </div>
        <div class="tags-box">
          <span v-for="(tag,index) in tag_list" :key="index" @click="addTag(tag_list,blog_tag,index)" >{{tag.name}} +</span>
        </div>
      </li>
      <li>
        <div class="li-box">
          <span class="form-tit">摘要：</span>
          <textarea class="abstract-box" v-model="abstract" >
          </textarea>
        </div>
      </li>
    </ul>
    <mavonEditor class="md-edit" 
    :code_style="props.code_style"
    v-model="content"
    :toolbars="toolbars"
    @imgAdd="imgAdd"
    @fullScreen="fullScreen"
    @save="saveBlog"
    ></mavonEditor>
    <div class="btn-box">
      <mu-raised-button label="发表" @click="sendBlog">
        <i class="icon iconfont" style="font-size:20px;">&#xe62c;</i>
      </mu-raised-button>
      <mu-raised-button label="保存" @click="saveBlog">
        <i class="icon iconfont" style="font-size:20px;">&#xe691;</i>
      </mu-raised-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  components:{
    mavonEditor,
  },

  data(){
    return{
      blog_tit: '',
      blog_cate: [],
      blog_tag: [],
      abstract: '',
      content: '',
      cate_list: [],
      tag_list: [],
      pos_index:0,      
      props: {
				code_style: "atelier-savanna-light"
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  
  methods:{
    //切换到全屏编辑
    fullScreen(){
      this.$store.commit("fullScreen");
      let mainContent = document.querySelector('.main-content');
      if(this.$store.state.fullScreen){
        mainContent.className = "main-content zIndex2"
      }else{
        mainContent.className = "main-content"
      }
    },

    addTag(arrfrom,arrto,i,tf){
      // arrto.push(arrfrom[i]);
      arrto.splice(this.pos_index,0,arrfrom[i]);
      this.pos_index = i;
      arrfrom.splice(i,1);
    },

    imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      let _this = this;
      let formdata = new FormData();
      formdata.append('image', $file);
      axios({
          url:"admin/imgAdd",
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then(
        function(response){
          let path = response.data.path;
          _this.$children[0].$img2Url(pos, path);
          _this.haveUploadImg = true;//标识是否上传过图片
        }
      )
    },

    Blog(){
      let blog = {       
        title : this.blog_tit,
        abstract : this.abstract,
        aCategory : this.blog_cate,
        aTag : this.blog_tag,
        content : this.content
      };
      if(blog.title==''||blog.abstract==''){
        alert('标题和摘要不能为空！')
        return false;
      }else{
        return blog;
      }
    },


    axiosFun(url,id){
      let _this = this;
      let blog = this.Blog();
      if(blog){
        axios.post(url,{
          newblog:blog,
          id:id 
        }).then(function(response){
          let msg = response.data.msg;
          _this.blog_id = response.data.id;
          if(!_this.blog_id){
            Array.prototype.push.apply(_this.cate_list,_this.blog_cate);
            Array.prototype.push.apply(_this.tag_list,_this.blog_tag);
            _this.blog_tit= '',
            _this.blog_cate= [],
            _this.blog_tag= [],
            _this.abstract= '',
            _this.content= '',
            _this.haveUploadImg = false //发表成功后切换标识
          }
        })
      }
    },

    //发表
    sendBlog(){
      this.axiosFun("admin/sendBlog",this.blog_id);
    },

    //保存
    saveBlog(){
      this.axiosFun("admin/saveBlog",this.blog_id);
    },

    //返回两个对象数组差集(从第一个数组中去除第二个数组中改包含的成员)
    //difference([数组1],[数组2],[进行比较的唯一属性，一般是id])
    difference(a1,a2,p){
      a2.forEach(item => {
        a1.forEach(_item => {
          let i = a1.indexOf(_item)
          if(_item[p]==item[p]){
            a1.splice(i,1)
          }
        })
      });
      return a1;
    }

  },

  mounted() {
    let _this = this;
    axios.get("admin/getCategory").then(function(response) {
      let categoryList = response.data.categoryList,
        code = response.data.code;
      if (code) {
        _this.cate_list = categoryList;
      } else {
        return false;
      }
    });

    axios.get("admin/getTag").then(function(response) {
      let tagList = response.data.tagList,
        code = response.data.code;
      if (code) {
        _this.tag_list = tagList;
      } else {
        return false;
      }
    });

    let id = this.$route.params.id
    if(id){
      axios.get("front/getArticle/"+id).then(function(response){
        _this.article = response.data.Article
        _this.blog_cate = response.data.Article.aCategory;
        _this.blog_tag = response.data.Article.aTag;
        _this.blog_tit = response.data.Article.title;
        _this.abstract = response.data.Article.abstract;
        _this.content = response.data.Article.content;
        _this.blog_id = response.data.Article._id;
        _this.cate_list = _this.difference(_this.cate_list,_this.blog_cate,'_id')
        _this.tag_list = _this.difference(_this.tag_list,_this.blog_tag,'_id')
      })
    }

  },
  
  //离开新建博客页面时判断是否上传过图片
  beforeDestroy(){
    if(this.haveUploadImg){
      axios.post("admin/deleteTransferImg")
    }
  }


}
</script>

<style>
.form li {
  margin-bottom: 20px;
}

.form .li-box {
  min-height: 36px;
}

.form input,
.tags-container,
.abstract-box {
  width: 50%;
  max-width: 560px;
  min-width: 260px;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  background: none;
  border: 1px solid #dedede;
  border-radius: 3px;
}

.form .abstract-box {
  line-height: 20px;
  height: 120px;
  padding: 8px 10px;
  resize: none;
}

.form input:focus {
  border-color: #aaa;
}

.form li .form-tit {
  display: block;
  float: left;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  color: #888888;
}

.night .form input {
  color: #bfbfbf;
  border-color: #8f8f8f;
}

.night .form input:focus {
  border-color: #c2c2c2;
}

.tags-container {
  display: inline-block;
  min-height: 36px;
  height: auto;
}

.tags-box {
  margin-left: 48px;
  margin-top: 10px;
}

.tags-container span {
  display: inline-block;
  height: 22px;
  line-height: 20px;
  position: relative;
  padding: 0 6px;
  border-radius: 22px;
  margin-right: 5px;
  border: 1px solid #888888;
  cursor: pointer;
}

.tags-container span i {
  font-size: 12px;
}

.tags-box span {
  display: inline-block;
  padding: 0 6px;
  height: 22px;
  line-height: 20px;
  border: 1px solid #888888;
  border-radius: 22px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}

.main-content .btn-box {
  text-align: right;
  margin: 20px 0;
}

.main-content .btn-box button {
  margin: 0 5px;
  color: #414141;
  background: #b9b9b9;
}

.main-content .btn-box .mu-raised-button-label {
  padding: 0 10px;
}
.md-edit{ height: 400px; }
.md-edit [type="button"] {
  -webkit-appearance: none;
}

.v-note-wrapper.fullscreen {
  background: #fff !important;
}
</style>


