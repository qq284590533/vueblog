/**
 * 前台展示页面接口
 */

var express = require('express');
var router = express.Router();
let User = require('../models/mo_user');
let Category = require('../models/mo_category');
let Tag = require('../models/mo_tag');
let Article = require('../models/mo_article');

//统一返回格式：
var resData;
router.use(function(req, res, next) {
    resData = {
        code: 0,
        msg: ''
    }
    next();
})

router.get('/getArticle',function(req, res, next){
  Article.find({
    published:true,
    about:false
  }).sort({
    publish_time:-1
  }).then(function(result) {
      if (result) {
          let blogList = result;
          resData.code = 1;
          resData.blogList = blogList;
      } else {
          resData.code = 0;
      }
      res.json(resData);
  })
})

router.get('/getArticle/:id',function(req, res, next){
    console.log(req.params.id)
    Article.findById(req.params.id).then(function(result) {
        if (result) {
            resData.Article = result
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
})


//获取分类列表
router.get('/getCate',function(req, res, next){
    Category.find().then(function(result) {
        if (result) {
            resData.cateList = result
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
})

//获取标签列表
router.get('/getTag',function(req, res, next){
    Tag.find().then(function(result) {
        if (result) {
            resData.tagList = result
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
})

//$elemMatch 查询内嵌文档
router.get('/getCateArticles/:catename',function(req, res, next){
    let name = req.params.catename;
    console.log(name);
    let total = 0;

    Article.count({
        'aCategory':{$elemMatch: { "name": name}},
        published:true
    },(err,count)=>{
        total = count;
    })

    Article.find({
        'aCategory':{$elemMatch: { "name": name}},
        published:true
    }).then((result) => {
        if (result) {
            resData.blogList = result
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
  
  
})

//$elemMatch 查询内嵌文档
router.get('/getTagArticles/:tagname',function(req, res, next){
    let name = req.params.tagname;
    let total = 0;

    Article.count({
        'aTag':{$elemMatch: { "name": name}},
        published:true
    },(err,count)=>{
        total = count;
    })

    Article.find({
        'aTag':{$elemMatch: { "name": name}},
        published:true
    }).then((result) => {
        if (result) {
            resData.blogList = result
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
  
  
})

router.get('/getAbout',function(req, res, next){
    Article.findOne({
        about:true
    }).then((result) => {
        if (result) {
            resData.blog = result
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
  
  
})
module.exports = router;
