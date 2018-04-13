<template>
  <div>
		<div class="block-box">
			<div class="tit">
				<i class="icon iconfont">&#xe615;</i>
				<h3>草稿箱</h3>
			</div>
			<div class="block-content">
				<mu-table v-if="draft.total" :showCheckbox='draft.showCheckbox'>
					<mu-thead>
						<mu-tr>
							<mu-th width='100'>序号</mu-th>
							<mu-th>日期</mu-th>
							<mu-th>标题</mu-th>
							<mu-th>操作</mu-th>
						</mu-tr>
					</mu-thead>
					<mu-tbody>
						<mu-tr v-for="(blog,index) in draft.blogList" :key="index">
							<mu-td>{{draft.cur*draft.pageSize+index+1}}</mu-td>
							<mu-td :title="blog.publish_time | getTime">{{blog.publish_time | getTime}}</mu-td>
							<mu-td :title="blog.title">
								<router-link class="link" 
								:to="{ name:'article', params:{'id':blog._id}}" 
								tag="a">{{blog.title}}</router-link>
							</mu-td>
							<mu-td>
								<mu-icon-button title="发表" @click="send(blog._id)"> 
									<i class="icon iconfont">&#xe61c;</i>
								</mu-icon-button>
								<mu-icon-button title="编辑" @click="edit(blog._id)"> 
									<i class="icon iconfont">&#xe719;</i>
								</mu-icon-button>
								<mu-icon-button title="删除" @click="delet(draft.blogList,index)"> 
									<i class="icon iconfont">&#xe6be;</i>
								</mu-icon-button>
							</mu-td>
						</mu-tr>
					</mu-tbody>
				</mu-table>
				<p class="tip" v-else>暂无数据!</p>
				<mu-pagination v-show="draft.total" class="page"
        :pageSize="draft.pageSize"
        :total="draft.total||1"
        :current="draft.current+1"
        @pageChange="draftPageTurn"></mu-pagination>
			</div>
		</div>
		<div class="block-box">
			<div class="tit">
				<i class="icon iconfont">&#xe616;</i>
				<h3>已发表</h3>
			</div>
			<div class="block-content">
				<mu-table v-if="published.total"  :showCheckbox="published.showCheckbox">
					<mu-thead>
						<mu-tr>
							<mu-th width='100'>序号</mu-th>
							<mu-th>日期</mu-th>
							<mu-th>标题</mu-th>
							<mu-th>操作</mu-th>
						</mu-tr>
					</mu-thead>
					<mu-tbody>
						<mu-tr v-for="(blog,index) in published.blogList" :key="index">
							<mu-td>{{published.cur*published.pageSize+index+1}}</mu-td>
							<mu-td :title="blog.publish_time | getTime">{{blog.publish_time | getTime}}</mu-td>
							<mu-td :title="blog.title">
								<router-link class="link" 
								:to="{ name:'article', params:{'id':blog._id}}" 
								tag="a">{{blog.title}}</router-link>
							</mu-td>
							<mu-td>
								<mu-icon-button title="编辑" @click="edit(blog._id)"> 
									<i class="icon iconfont">&#xe719;</i>
								</mu-icon-button>
								<mu-icon-button title="删除" @click="delet(published.blogList,index)"> 
									<i class="icon iconfont">&#xe6be;</i>
								</mu-icon-button>
							</mu-td>
						</mu-tr>
					</mu-tbody>
				</mu-table>
				<p class="tip" v-else>暂无数据!</p>
				<mu-pagination v-show="published.total" class="page"
        :pageSize="published.pageSize"
        :total="published.total||1" :current="published.current+1"
				
        @pageChange="publishedPageTurn"></mu-pagination>
			</div>
		</div>
		<VueBackPop v-show="popConf.show" :popConf="popConf">
			<p class="tip-text"><i class="icon iconfont">&#xe61b;</i>{{popConf.tiptext}}</p>
		</VueBackPop>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">{{message}}</mu-popup>
  </div>
</template>

<script>
import axios from 'axios'
import VueBackPop from "./VueBackPop";
export default {
	components: {
    VueBackPop
	},
	
  data(){
    return{
			topPopup: false,
			message:'',
      draft:{
				blogList:[],
				cur:0,
        current: 0,
        showCheckbox:false,
        pageSize:10,
        total:0
			},
			
      published:{
        blogList:[],
        cur:0,
        current:0,
        showCheckbox:false,
        pageSize:10,
        total:0
      },

      popConf: {
        show: false,
        contWidth: null,
        contHeight: null,
				title: "提示信息",
				tiptext:'',
        isOk: true,
        isCancel: true,
        okValue: "确定",
        cancelValue: "取消",
        ok: function() {},
        cancel: function() {}
      },

    }
  },

  mounted(){
    this.getArticleDraft(this.draft.current,this.draft.pageSize)
		this.getArticlePublished(this.published.current,this.published.pageSize)
  },

  watch: {
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false;
        }, 1000)
      }
    }
	},

  methods:{
    open (position) {
      this[position + 'Popup'] = true
    },

    getArticleDraft(current,pageSize){
      let _this = this;
      axios.post("admin/getArticleDraft",{
        current:current,
        pageSize:pageSize
      }).then(function(response){
        _this.draft.blogList = response.data.blogList
        _this.draft.total =  response.data.total;
        _this.draft.cur =  response.data.cur;
      })
    },

    getArticlePublished(current,pageSize){
      let _this = this;
      axios.post("admin/getArticlePublished",{
        current:current,
        pageSize:pageSize
      }).then(function(response){
        _this.published.blogList = response.data.blogList;
				_this.published.total =  response.data.total;
        _this.published.cur =  response.data.cur;
      })
    },

    draftPageTurn(current){
			this.getArticleDraft(current,this.draft.pageSize)
    },

    publishedPageTurn(current){
			console.log(current)
			this.getArticlePublished(current,this.published.pageSize)
		},

    extend(obj1, obj2) {
      for (var attr in obj2) {
        obj1[attr] = obj2[attr];
      }
		},
		
		send(id){
      let _this = this;
      this.extend(this.popConf, {
        show: true,
        title: "发表文章",
        tiptext: "  确定发表文章？",
        ok: function() {
          _this.sendPost(id);
        },
        cancel: function() {}
      });
		},

		sendPost(id){
			let _this = this;
			axios.post('/admin/sendArticle',{
				id:id
			}).then(function(response){
				if(response.data.status){
					_this.popConf.show = false;
					_this.message = response.data.msg;
					_this.open('top');
				}
			})
		},

		delet(list,index){
      let _this = this;
      this.extend(this.popConf, {
        show: true,
				title: "删除文章",
        tiptext: "  确定删除文章？",
        ok: function() {
          _this.deletPost(list,index);
        },
        cancel: function() {}
      });
		},

		deletPost(list,index){
			let _this = this;
			let id = list[index]._id;
			axios.post('/admin/deleteArticle',{
				id:id
			}).then(function(response){
				_this.popConf.show = false;
				_this.message = response.data.msg;
				list.splice(index,1);
			})
		},

		edit(id){
			this.$router.push({path: '/admin/blogging/'+id})
		},

  }
}
</script>


<style scoped>
  .block{
    padding: 10px;
    margin-bottom: 30px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
	.tip{
		font-size: 14px;
		line-height: 30px;
		text-align: center;
	}

</style>


