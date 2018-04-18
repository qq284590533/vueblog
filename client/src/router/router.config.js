import Vue from 'vue'
import Router from 'vue-router'

//前端
const VueFront = resolve => require(['@/components/front/VueFront'],resolve)
const VueIndex = resolve => require(['@/components/front/VueIndex'],resolve)
const VueCategories = resolve => require(['@/components/front/VueCategories'],resolve)
const VueTags = resolve => require(['@/components/front/VueTags'],resolve)
const VueArchives = resolve => require(['@/components/front/VueArchives'],resolve)
const VueAbout = resolve => require(['@/components/front/VueAbout'],resolve)
const VueCategoryItem = resolve => require(['@/components/front/VueCategoryItem'],resolve)
const VueTagItem = resolve => require(['@/components/front/VueTagItem'],resolve)
const VueArticle = resolve => require(['@/components/front/VueArticle'],resolve)


//后台
const VueBack = resolve => require(['@/components/back/VueBack'],resolve)
const VueBackLogin = resolve => require(['@/components/back/VueBackLogin'],resolve)
const VueBackOverview = resolve => require(['@/components/back/VueBackOverview'],resolve)
const VueBackNewBlog = resolve => require(['@/components/back/VueBackNewBlog'],resolve)
const VueBackArticleSet = resolve => require(['@/components/back/VueBackArticleSet'],resolve)
const VueBackCategoriesSet = resolve => require(['@/components/back/VueBackCategoriesSet'],resolve)
const VueBackTagsSet = resolve => require(['@/components/back/VueBackTagsSet'],resolve)

Vue.use(Router)
export default new Router({
    mode: 'history', //使用HTML5 History模式服务端需要使用 "connect-history-api-fallback"中间件，否则访问二级路由刷新页面会报错404
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: VueFront,
            meta: {code:1},
            children: [{
                    path: '/',
                    meta: {code:1},
                    component: VueIndex
                },
                {
                    path: '/home',
                    meta: {code:1},
                    name: 'homePage',
                    component: VueIndex
                },
                {
                    path: '/categories',
                    meta: {code:1},
                    name: 'categories',
                    component: VueCategories
                },
                {
                    path: '/categories/:categ',
                    meta: {code:1},
                    name: 'categoryItem',
                    component: VueCategoryItem
                },
                {
                    path: '/tags',
                    meta: {code:1},
                    name: 'tags',
                    component: VueTags
                },
                {
                    path: '/tags/:tag',
                    meta: {code:1},
                    name: 'tagItem',
                    component: VueTagItem
                },
                {
                    path: '/archives',
                    meta: {code:1},
                    name: 'archives',
                    component: VueArchives
                },
                {
                    path: '/about',
                    meta: {code:1},
                    name: 'about',
                    component: VueAbout
                },
                {
                    path: '/article/:id',
                    meta: {code:1},
                    name: 'article',
                    component: VueArticle
                },
            ]
        },
        {
            path: '/admin',
            component: VueBack,
            meta: {code:2,requiresAuth:true},
            children: [
                {
                    path: '/',
                    meta: {code:2,requiresAuth:true},
                    component: VueBackOverview
                },
                {
                    path: '/admin/overview',
                    meta: {code:2,requiresAuth:true},
                    name: 'overview',
                    component: VueBackOverview
                },
                {
                    path: '/admin/blogging',
                    meta: {code:2,requiresAuth:true},
                    name: 'blogging',
                    component: VueBackNewBlog
                },
                {
                    path: '/admin/blogging/:id',
                    meta: {code:2,requiresAuth:true},
                    name: 'editblog',
                    component: VueBackNewBlog
                },
                {
                    path: '/admin/article',
                    meta: {code:2,requiresAuth:true},
                    name: 'articleset',
                    component: VueBackArticleSet
                },
                {
                    path: '/admin/categories',
                    meta: {code:2,requiresAuth:true},
                    name: 'categoriesset',
                    component: VueBackCategoriesSet
                },
                {
                    path: '/admin/tags',
                    meta: {code:2,requiresAuth:true},
                    name: 'tagsset',
                    component: VueBackTagsSet
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: VueBackLogin,
            meta: {code:3},
        }
    ]
})