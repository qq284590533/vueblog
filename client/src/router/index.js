import Vue from 'vue'
import Router from 'vue-router'

//前端
const VueFront = r => require.ensure([], () => r(require('@/components/front/VueFront')), 'VueFront')
const VueIndex = r => require.ensure([], () => r(require('@/components/front/VueIndex')), 'VueIndex')
const VueCategories = r => require.ensure([], () => r(require('@/components/front/VueCategories')), 'VueCategories')
const VueTags = r => require.ensure([], () => r(require('@/components/front/VueTags')), 'VueTags')
const VueArchives = r => require.ensure([], () => r(require('@/components/front/VueArchives')), 'VueArchives')
const VueAbout = r => require.ensure([], () => r(require('@/components/front/VueAbout')), 'VueAbout')
const VueCategoryItem = r => require.ensure([], () => r(require('@/components/front/VueCategoryItem')), 'VueCategoryItem')
const VueTagItem = r => require.ensure([], () => r(require('@/components/front/VueTagItem')), 'VueTagItem')
const VueArticle = r => require.ensure([], () => r(require('@/components/front/VueArticle')), 'VueArticle')

//后台
const VueBack = r => require.ensure([], () => r(require('@/components/back/VueBack')), 'VueBack')
const VueBackLogin = r => require.ensure([], () => r(require('@/components/back/VueBackLogin')), 'VueBackLogin')
const VueBackOverview = r => require.ensure([], () => r(require('@/components/back/VueBackOverview')), 'VueBackOverview')
const VueBackNewBlog = r => require.ensure([], () => r(require('@/components/back/VueBackNewBlog')), 'VueBackNewBlog')
const VueBackArticleSet = r => require.ensure([], () => r(require('@/components/back/VueBackArticleSet')), 'VueBackArticleSet')
const VueBackCategoriesSet = r => require.ensure([], () => r(require('@/components/back/VueBackCategoriesSet')), 'VueBackCategoriesSet')
const VueBackTagsSet = r => require.ensure([], () => r(require('@/components/back/VueBackTagsSet')), 'VueBackTagsSet')

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