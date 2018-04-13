<template>
  <div>
      <div class="top animated fadeInDown">
        <h3 class="tit">Categories</h3>
        <p>目前共有 {{cateList.length}} 个分类</p>
      </div>
      <div class="tagBox">
        <p class="cateItem animated fadeInDown" v-for="(categ,index) in cateList" :key="index">
          <router-link v-if="categ.count>0" class="categLink" tag="span" :to="{ name:'categoryItem', params:{'categ':categ.name,'id':categ._id}}">{{categ.name}}</router-link>
          <span v-else class="categLink disLink">{{categ.name}}</span>
          <span class="count">({{categ.count}})</span>
        </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      cateList:[]
    }
  },
  mounted(){
    let _this = this;
    axios.get('front/getCate').then((res) => {
      _this.cateList = res.data.cateList;
		})
  }

};
</script>

<style scoped>

.top{
  margin-top: 30px;
  color: #555;
  text-align: center;
}

.night .top {
  color: #bbbbbb;
}

.top h3 {
  font-size: 24px;
  line-height: 50px;
}
.top p {
  font-size: 14px;
}

.tagBox{
  margin-top: 30px;
  text-align: center;
}

.cateItem{
  display: inline-block;
  margin: 10px;
  font-size: 16px;
}

.cateItem .categLink{
  display: inline-block;
  line-height: 22px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.cateItem .categLink:hover{
  border-color: #666;
}
.cateItem .categLink.disLink{
  cursor: default;
}
.cateItem .count{
  color: #bbb;
}
</style>


