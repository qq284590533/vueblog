<template>
  <div>
    <div class="category-list">
      <router-link class="categ-itme" tag="span" v-for="(categ,index) in categoryList" :key="index" :to="{ name:'categoryItem', params:{'categ':categ.name}}">{{categ.name}}
        <div class="tool-box">
          <i class="edit icon iconfont" title="修改" @click.stop="editCategory(index)" >&#xe611;</i>
          <i class="delete icon iconfont" title="删除" @click.stop="deleteCategory(index)" >&#xe604;</i>
        </div>
      </router-link>
      <i class="add icon iconfont" title="新增" @click="addCategory">&#xe6bb;</i>
    </div>
    <VueBackPop v-show="popConf.show" :popConf="popConf">
      <div v-if="edit" class="edit-box">
        <span>{{itemTit}}</span><input type="text" v-model="categoryName" @keydown.enter="popConf.ok">
      </div>
      <div v-else>
        <p class="tip-text"><i class="icon iconfont">&#xe61b;</i>删除后已设置分类将设置为“其他”，确定删除吗？</p>
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
      categoryList: [],
      categoryName: "",
      itemTit: "分类名称：",
    };
  },

  methods: {
    extend(obj1, obj2) {
      for (var attr in obj2) {
        obj1[attr] = obj2[attr];
      }
    },

    // 新增分类弹窗
    addCategory() {
      let _this = this;
      this.categoryName = "";
      this.extend(this.popConf, {
        show: true,
        title: "新增分类",
        ok: function() {
          _this.addCategoryPost();
        },
        cancel: function() {}
      });
      this.edit = true;
    },

    // 修改分类弹窗
    editCategory(index) {
      let _this = this;
      this.categoryName = this.categoryList[index].name;
      this.extend(this.popConf, {
        show: true,
        title: "修改分类",
        ok: function() {
          _this.editCategoryPost(index);
        },
        cancel: function() {}
      });
      this.edit = true;
    },

    // 删除分类弹窗
    deleteCategory(index) {
      let _this = this;
      this.extend(this.popConf, {
        show: true,
        title: "删除分类",
        ok: function() {
          _this.deleteCategoryPost(index);
        },
        cancel: function() {}
      });
      this.edit = false;
    },

    // 新增分类提交
    addCategoryPost() {
      let _this = this;
      if (_this.categoryName == "") {
        alert("类名不能为空！");
      } else {
        axios
          .post("admin/addCategory", {
            categoryName: _this.categoryName
          })
          .then(function(response) {
            if (response.data.succeed) {
              let categ = {
                _id: response.data.category._id,
                name: response.data.category.name
              };
              _this.categoryList.push(categ);
              _this.categoryName = "";
              _this.popConf.show = false;
            } else {
              _this.categoryName = "";
              alert(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //修改分类提交
    editCategoryPost(i) {
      let _this = this;
      if (_this.categoryName == "") {
        alert("类名不能为空！");
      } else if (_this.categoryName == _this.categoryList[i].name) {
        _this.popConf.show = false;
      } else {
        axios
          .post("admin/editCategory", {
            categoryName: _this.categoryName,
            _id: _this.categoryList[i]._id
          })
          .then(function(response) {
            if (response.data.succeed) {
              _this.categoryList[i].name = _this.categoryName;
              _this.categoryName = "";
              _this.popConf.show = false;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //删除分类提交
    deleteCategoryPost(i) {
      let _this = this;
      axios
        .post("admin/deleteCategory", {
          _id: _this.categoryList[i]._id
        })
        .then(function(response) {
          if (response.data.succeed) {
            _this.categoryList.splice(i,1);
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
    axios.get("admin/getCategory").then((response)=>{
      let categoryList = response.data.categoryList,
          code = response.data.code;
      if (code) {
        _this.categoryList = categoryList;
      } else {
        return false;
      }
    });
  }
};
</script>



<style>

.category-list .categ-itme {
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
.night .category-list .categ-itme{
  border-color: #ececec;
}

.category-list .categ-itme .tool-box {
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

.night .category-list .categ-itme .tool-box{
  background: #333;
  border-color: #ececec;
}
.night .category-list .categ-itme .tool-box i{
  color:#cccccc;
}

.category-list .categ-itme:hover .tool-box {
  right: -40px;
  visibility: visible;
  opacity: 1;
}

.category-list .categ-itme:hover {
  z-index: 1;
}

.category-list .categ-itme .tool-box i {
  font-size: 22px;
  cursor: pointer;
  color: #515151;
  transition: color 0.2s ease;
}

.category-list .categ-itme .tool-box .edit:hover {
  color: #ec8b4a;
}

.category-list .categ-itme .tool-box .delete:hover {
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

