<template>
  <div>
    <div class="tag-list">
      <router-link class="tag-itme" tag="span" v-for="(tag,index) in tagList" :key="index" :to="{ name:'tagItem', params:{'tag':tag.name}}">{{tag.name}}
        <div class="tool-box">
          <i class="edit icon iconfont" title="修改" @click.stop="editTag(index)" >&#xe611;</i>
          <i class="delete icon iconfont" title="删除" @click.stop="deleteTag(index)" >&#xe604;</i>
        </div>
      </router-link>
      <i class="add icon iconfont" title="新增" @click="addTag">&#xe6bb;</i>
    </div>
    <VueBackPop v-show="popConf.show" :popConf="popConf">
      <div v-if="edit" class="edit-box">
        <span>{{itemTit}}</span><input type="text" v-model="tagName" @keydown.enter="popConf.ok">
      </div>
      <div v-else>
        <p class="tip-text"><i class="icon iconfont">&#xe61b;</i>删除后已设置标签将设置为“其他”，确定删除吗？</p>
      </div>
    </VueBackPop>
  </div>
</template>

<script>
import axios from "axios";
import VueBackPop from "./VueBackPop";

export default {
  components: {
    VueBackPop
  },
  data() {
    return {
      popConf: {
        show: false,
        contWidth: null,
        contHeight: null,
        title: "提示信息",
        isOk: true,
        isCancel: true,
        okValue: "确定",
        cancelValue: "取消",
        ok: function() {},
        cancel: function() {}
      },
      edit: false,
      tagList: [],
      tagName: "",
      itemTit: "标签名称：",
    };
  },

  methods: {
    extend(obj1, obj2) {
      for (var attr in obj2) {
        obj1[attr] = obj2[attr];
      }
    },

    // 新增标签弹窗
    addTag() {
      let _this = this;
      this.tagName = "";
      this.extend(this.popConf, {
        show: true,
        title: "新增标签",
        ok: function() {
          _this.addTagPost();
        },
        cancel: function() {}
      });
      this.edit = true;
    },

    // 修改标签弹窗
    editTag(index) {
      let _this = this;
      this.tagName = this.tagList[index].name;
      this.extend(this.popConf, {
        show: true,
        title: "修改标签",
        ok: function() {
          _this.editTagPost(index);
        },
        cancel: function() {}
      });
      this.edit = true;
    },

    // 删除标签弹窗
    deleteTag(index) {
      let _this = this;
      this.extend(this.popConf, {
        show: true,
        title: "删除标签",
        ok: function() {
          _this.deleteTagPost(index);
        },
        cancel: function() {}
      });
      this.edit = false;
    },

    // 新增标签提交
    addTagPost() {
      let _this = this;
      if (_this.tagName == "") {
        alert("类名不能为空！");
      } else {
        axios
          .post("admin/addTag", {
            tagName: _this.tagName
          })
          .then(function(response) {
            if (response.data.succeed) {
              let tag = {
                _id: response.data.tag._id,
                name: response.data.tag.name
              };
              _this.tagList.push(tag);
              _this.tagName = "";
              _this.popConf.show = false;
            } else {
              _this.tagName = "";
              alert(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //修改标签提交
    editTagPost(i) {
      let _this = this;
      if (_this.tagName == "") {
        alert("类名不能为空！");
      } else if (_this.tagName == _this.tagList[i].name) {
        _this.popConf.show = false;
      } else {
        axios
          .post("admin/editTag", {
            tagName: _this.tagName,
            _id: _this.tagList[i]._id
          })
          .then(function(response) {
            if (response.data.succeed) {
              _this.tagList[i].name = _this.tagName;
              _this.tagName = "";
              _this.popConf.show = false;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //删除标签提交
    deleteTagPost(i) {
      let _this = this;
      axios
        .post("admin/deleteTag", {
          _id: _this.tagList[i]._id
        })
        .then(function(response) {
          if (response.data.succeed) {
            _this.tagList.splice(i,1);
            _this.popConf.show = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  mounted() {
    let _this = this;
    axios.get("admin/getTag").then(function(response) {
      let tagList = response.data.tagList,
        code = response.data.code;
      if (code) {
        _this.tagList = tagList;
      } else {
        return false;
      }
    });
  }
};
</script>



<style>

.tag-list .tag-itme {
  position: relative;
  height: 30px;
  line-height: 28px;
  padding: 0 25px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 30px;
  border: 1px solid #7a7a7a;
  cursor: pointer;
  transition: all 0.3s ease;
}
.night .tag-list .tag-itme{
  border-color: #ececec;
}

.tag-list .tag-itme .tool-box {
  position: absolute;
  background: #ffffff;
  height: 30px;
  right: 0;
  top: -1px;
  border: 1px solid #7a7a7a;
  border-left: none;
  border-radius: 0 30px 30px 0;
  transition: all 0.3s ease;
  visibility: hidden;
  opacity: 0;
  padding-right: 10px;
}

.night .tag-list .tag-itme .tool-box{
  background: #333;
  border-color: #ececec;
}
.night .tag-list .tag-itme .tool-box i{
  color:#cccccc;
}

.tag-list .tag-itme:hover .tool-box {
  right: -40px;
  visibility: visible;
  opacity: 1;
}

.tag-list .tag-itme:hover {
  z-index: 1;
}

.tag-list .tag-itme .tool-box i {
  font-size: 22px;
  cursor: pointer;
  color: #515151;
  transition: color 0.2s ease;
}

.tag-list .tag-itme .tool-box .edit:hover {
  color: #ec8b4a;
}

.tag-list .tag-itme .tool-box .delete:hover {
  color: #f3635e;
}

i.add {
  margin-left: 35px;
  position: relative;
  top: 5px;
  font-size: 24px;
  color: #515151;
  cursor: pointer;
}

.night i.add {
  color: #cccccc;
}

i.add:hover {
  color: #3186db;
}

.edit-box input {
  height: 30px;
  margin: 10px 0;
  line-height: 28px;
  border-radius: 3px;
  padding: 0 10px;
  border: 1px solid #bcbcbc;
}

.tip-text{
  line-height: 24px;
}

.tip-text .icon{
  font-size: 20px;
  color: #f3635e;
  margin-right: 10px;
}

</style>

