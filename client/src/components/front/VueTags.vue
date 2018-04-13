<template>
  <div>
      <div class="top animated fadeInDown">
        <h3 class="tit">Tags</h3>
        <p>目前共有 {{tagList.length}}个标签</p>
      </div>
      <div class="tagBox">
        <p class="cateItem animated fadeInDown" :style="{fontSize:setStyle(percent(tag.count/total)).fontsize,color:setStyle(percent(tag.count/total)).color}" v-for="(tag,index) in tagList" :key="index">
          <router-link v-if="tag.count>0" class="categLink" tag="span" :to="{ name:'tagItem', params:{'tagname':tag.name,'id':tag._id}}">{{tag.name}}</router-link>
          <span v-else class="categLink disLink">{{tag.name}}</span>
        </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      tagList:[],
      total:0,
      night:null,
      fontSize:['12px','16.5px','21px','25.5px','30px'],
      color:['#999','#777','#555','#333','#111']
    }
  },

  methods:{
    setStyle(percent){
      return {
        fontsize:this.fontSize[percent],
        color:this.color[percent]
      }
    },

    percent(num){
      let index = 0;
      if(num<0.2){
        index = 0;
      }else if(num<0.4){
        index = 1;
      }else if(num<0.6){
        index = 2;
      }else if(num<0.8){
        index = 3;
      }else{
        index = 4;
      }
      return index;
    }

  },

  mounted(){
    let _this = this;
    axios.get('front/getTag').then((res) => {
      _this.tagList = res.data.tagList;
      _this.tagList.forEach((tag) => {
        _this.total+=tag.count;
      });
    })
  },

  computed:{
    nightChange(){
      this.night = this.$store.state.night;
      return this.night;
    }
  },

  watch:{
    nightChange:function(){
      // this.color.reverse();
      if(this.night){
        this.color = ['#666','#888','#aaa','#ccc','#eee']
      }
    }
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
  line-height:1.6;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.cateItem .categLink:hover{
  border-color: #666;
}
.cateItem .categLink.disLink{
  cursor: default;
}

</style>


