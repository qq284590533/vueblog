/**
 * 后台管理页面接口
 */

let express = require('express');
let router = express.Router();
let User = require('../models/mo_user');
let Category = require('../models/mo_category');
let Tag = require('../models/mo_tag');
let Article = require('../models/mo_article');
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');

//统一返回格式：
var resData;
router.use(function(req, res, next) {
    resData = {
        code: 0,
        msg: ''
    }
    next();
})

// test
/*
router.get('/', function(req, res, next) {
    console.log('admin有请求')
    res.send({ message: 'admin连接成功！' })
});
*/


//获取用户信息
router.get('/getuserinfo', function(req, res, next) {
    if (_cookie) {
        User.findOne({
            _id: cookieJson.id
        }).then(function(userInfo) {
            if (userInfo) {
                resData.userinfo = userInfo;
            } else {
                resData.status = false;
            }
            res.json(resData);
        })
    } else {
        resData.status = false;
        res.json(resData);
    }
});

//保存用户信息
router.post('/updataUserInfo', function(req, res, next) {
    let _id =  req.body._id,
        changInfo = req.body.changInfo;
    for(key in changInfo){
        console.log(key)
    }
    User.update({
        _id: _id
    },changInfo).then(function() {
        resData.status = true;
        res.json(resData);
    })
});



//获取分类列表
router.get('/getCategory', function(req, res, next) {
    Category.find().then(function(result) {
        if (result) {
            let categoryList = result;
            resData.code = 1;
            resData.categoryList = categoryList;
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
});

//新增分类
router.post('/addCategory', function(req, res, next) {
    Category.findOne({
        name: req.body.categoryName,
    }).then(function(result) {
        if (result) {
            resData.succeed = false;
            resData.msg = "同名分类已存在！";
        } else {
            let category = new Category({
                name: req.body.categoryName
            })
            resData.category = category;
            resData.succeed = true;
            return category.save();
        }
    }).then(function() {
        res.json(resData);
    })

});

//修改分类
router.post('/editCategory', function(req, res, next) {
    let name = req.body.categoryName,
        _id = req.body._id;
    Category.update({
        _id: _id
    }, {
        name: name
    }).then(function() {
        resData.succeed = true;
        res.json(resData);
    })
});

//删除分类
router.post('/deleteCategory', function(req, res, next) {
    let _id = req.body._id;
    Category.remove({
        _id: _id
    }, function(err) {
        if (err) {
            return handleError(err)
        } else {
            resData.succeed = true;
            res.json(resData);
        }
    })
});

//获取标签列表
router.get('/getTag', function(req, res, next) {
    Tag.find().then(function(result) {
        if (result) {
            let tagList = result;
            resData.code = 1;
            resData.tagList = tagList;
        } else {
            resData.code = 0;
        }
        res.json(resData);
    })
});

//增加标签
router.post('/addTag', function(req, res, next) {
    Tag.findOne({
        name: req.body.tagName,
    }).then(function(result) {
        if (result) {
            resData.succeed = false;
            resData.msg = "同名标签已存在！";
        } else {
            let tag = new Tag({
                name: req.body.tagName
            })
            resData.tag = tag;
            resData.succeed = true;
            return tag.save();
        }
    }).then(function() {
        res.json(resData);
    })

});

//修改标签
router.post('/editTag', function(req, res, next) {
    let name = req.body.tagName,
        _id = req.body._id;
    Tag.update({
        _id: _id
    }, {
        name: name
    }).then(function() {
        resData.succeed = true;
        res.json(resData);
    })
});

//删除标签
router.post('/deleteTag', function(req, res, next){
    let _id = req.body._id;
    Tag.remove({
        _id: _id
    }, function(err) {
        if (err) {
            return handleError(err)
        } else {
            resData.succeed = true;
            res.json(resData);
        }
    })
});

// let transferPath = '../dist/static/blogimg/transfer';
let transferPath = '../../client/static/blogimg/transfer';
//markdown 上传图片
router.post('/imgAdd',function(req, res, next){
    let imgdata = req.body.data;
    if (!fs.existsSync(path.join(__dirname, transferPath))) {
        fs.mkdirSync(path.join(__dirname, transferPath));
    }

    let form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = path.join(__dirname, transferPath); //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 *1024; //文件大小
    form.type = true;
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.send(err);
        return;
      }
      let extName = ''; //后缀名
      switch (files.image.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
        case 'image/gif':
          extName = 'gif';
          break;
      }
      //console.log(extName);
      if (extName.length === 0) {
        return;
      } else {
        let avatarName = Date.now() + '.' + extName;
        let newPath = form.uploadDir+'/'+ avatarName;
        let url = '/static/blogimg/transfer/'+avatarName
        fs.renameSync(files.image.path, newPath); //重命名
        resData.path = url;
        res.json(resData); 
      }
    });
})

//图片重命名

reName = (f,p) => {
    let oldname = path.join(__dirname, transferPath)+'/'+f;
    let newname = path.join(__dirname, p)+'/'+f;
    fs.rename(oldname,newname, function (err) {
        if(err) {
            console.error(err);
            return;
        }
    });
}

moveImg = (id) => {
    console.log('debuger_8');
    console.log(id)
    //将中转文件夹图片移动到当前博客文件夹
    //读取文件目录
    fs.readdir(path.join(__dirname, transferPath),function(err,files){
        if(files){
            // let blogImgPath = '../dist/static/blogimg/'+id;
            let blogImgPath = '../../client/static/blogimg/'+id;

            //根据blog id创建博客图片文件夹
            if (!fs.existsSync(path.join(__dirname, blogImgPath))) {
                fs.mkdirSync(path.join(__dirname, blogImgPath));
            }
            //替换图片路径
            files.forEach(function(file){
                reName(file,blogImgPath)
            })
        }
    })
}

//新增博客时更新分类和标签数量
updateCateATagCount = (cate,tag,status)=>{
    let num = status?1:-1;
    console.log(num);
    cate.forEach((item)=>{
        Category.update({_id:item._id},{$inc:{count:num}}).then((err)=>{
            return
        });
    })
    tag.forEach((item)=>{
        Tag.update({_id:item._id},{$inc:{count:num}}).then(()=>{
            return
        });
    })
}

returnArr = (arr)=>{
    let idArr = [];
    arr.forEach((item)=>{
        idArr.push(item._id);
    })
    return idArr;
}

forEachContrast = (arr1,arr2,fn)=>{
    arr1.forEach((item)=>{
        fn(item,arr2.indexOf(item)>=0?1:0);
    })
}

//当分类被去除时
cateWipe = (id,tf)=>{
    if(!tf){
        Category.update({_id:id},{$inc:{count:-1}}).then((err)=>{
            return
        })  
    }
}

//当分类新增
cateAdd = (id,tf)=>{
    if(!tf){
        console.log(id+'   被删除了------'+tf);
        Category.update({_id:id},{$inc:{count:1}}).then((err)=>{
            return
        })
    }
}
//当分类被去除时
cateWipe = (id,tf)=>{
    if(!tf){
        Category.update({_id:id},{$inc:{count:-1}}).then((err)=>{
            return
        })  
    }
}

cateAdd = (id,tf)=>{
    if(!tf){
        Category.update({_id:id},{$inc:{count:1}}).then((err)=>{
            return
        })
    }
}

tagWipe = (id,tf)=>{
    if(!tf){
        Tag.update({_id:id},{$inc:{count:-1}}).then((err)=>{
            if(err){
                console.log(err)
            }
        })  
    }
}

tagAdd = (id,tf)=>{
    if(!tf){
        Tag.update({_id:id},{$inc:{count:1}}).then((err)=>{
            if(err){
                console.log(err)
            }
        })
    }
}

//修改文章分类时跟新分类和标签数量
contrastCateATag = (cate,_cate,tag,_tag) => {
    let cateArr = returnArr(cate);
    let _cateArr = returnArr(_cate);
    let tagArr = returnArr(tag);
    let _tagArr = returnArr(_tag);
    forEachContrast(cateArr,_cateArr,cateWipe);
    forEachContrast(_cateArr,cateArr,cateAdd);
    forEachContrast(tagArr,_tagArr,tagWipe);
    forEachContrast(_tagArr,tagArr,tagAdd);
}

//生成博客
createBlog = (res,blog,id,status) => {
    let _id = id;
    let _blog = blog;

    if(_id){
        let _published = _blog.published;
        Article.findById(_id).then((res)=>{
            _published = res.published;
            if(_published){
                _blog.published = _published;
            }
        }).then(()=>{
            Article.findOneAndUpdate({
                _id: _id
            }, {
                title: _blog.title,
                abstract: _blog.abstract,
                aCategory: _blog.aCategory,
                aTag: _blog.aTag,
                content: _blog.content.replace(/transfer\//g, id+'/'),
                published:_blog.published
            }).then(function(res){
                if(_published){
                    contrastCateATag(res.aCategory,_blog.aCategory,res.aTag,_blog.aTag)
                }else if(status){
                    if(_blog.published){
                        updateCateATagCount(_blog.aCategory,_blog.aTag,true);
                    }
                }
            })
        });
    }else{
        _blog = new Article(_blog);
        _blog.publish_time = getTime(new Date);
        _id = _blog._id;
        _blog.content = _blog.content.replace(/transfer\//g, _id+'/');
        if(_blog.title=='关于'){
            _blog.about = true;
        }else if(_blog.published){
            updateCateATagCount(_blog.aCategory,_blog.aTag,true);
        }
        console.log('debuger_1')
        _blog.save()
    }
    moveImg(_id);

    if(status){
        resData.id = null;
        resData.msg = '发表成功！';
    }else{
        resData.id = _id;
        resData.msg = '保存成功！';
    }
    res.json(resData);
}

//发表博客
router.post('/sendBlog',function(req, res, next){
    let id = req.body.id;
    let blog = req.body.newblog;
    blog.published = true;
    createBlog(res,blog,id,true);
})

//保存博客
router.post('/saveBlog',function(req, res, next){    
    let id = req.body.id;
    let blog = req.body.newblog;
    createBlog(res,blog,id,false);
})


//意外关闭新建博客页面时，删除中转站中的图片
router.post('/deleteTransferImg', function(req, res, next){
    fs.readdir(path.join(__dirname, transferPath), function (err, files) {
        if (err) {
            console.log('error:\n' + err);
            return;
        }
        files.forEach(function(file){
            fs.unlinkSync(path.join(__dirname, transferPath)+'/'+file);
        });
        console.log('删除成功')
    })
});

//获取草稿箱
router.post('/getArticleDraft',function(req, res, next){
    let current = req.body.current||1;
    let pageSize = req.body.pageSize;
    let skip= (current-1) * pageSize||0;
    let total = 0;
    Article.count({
        published:false
    },function(err,count){
        total=count;
	}).then(function(){
        Article.find({
            published:false
        }).limit(pageSize).skip(skip).sort({
            publish_time:-1
        }).then(function(result) {
            if (result) {
                let blogList = result;
                resData.code = 1;
                resData.blogList = blogList;
            } else {
                resData.code = 0;
            }
            resData.total = total;
            resData.cur = current-1;
            res.json(resData);
        })
    })

})

//获取已发表的博客
router.post('/getArticlePublished',function(req, res, next){
    let current = req.body.current||1;
    let pageSize = req.body.pageSize;
    let skip = (current-1) * pageSize||0;
    let total = 0;
    Article.count({
        published:true
    },function(err,count){
        total=count;
	}).then(function(){
        Article.find({
            published:true
        }).limit(pageSize).skip(skip).sort({
            publish_time:-1
        }).then(function(result) {
            if (result) {
                let blogList = result;
                resData.code = 1;
                resData.blogList = blogList;
            } else {
                resData.code = 0;
            }
            resData.total = total;
            resData.cur = current-1;
            res.json(resData);
        })
    })
})

router.post('/sendArticle',function(req, res, next){
    let id = req.body.id;
    Article.findOneAndUpdate({
        _id:id
    },{
        published:true
    }).then((result,err)=>{
        updateCateATagCount(result.aCategory,result.aTag,true);
    }).then((err)=>{
        resData.msg = '发表成功！';
        resData.status = true;
        res.json(resData);
    })
})


router.post('/deleteArticle',function(req, res, next){
    let id = req.body.id;
    Article.findByIdAndRemove(id).then((result,err)=>{
        if(result.published){
            updateCateATagCount(result.aCategory,result.aTag,false);
        }
    }).then((err)=>{
        resData.msg = '删除成功！';
        resData.status = true;
        res.json(resData);
    })
})

module.exports = router;