/**
 * 登录退出接口
 */

let express = require('express');
let router = express.Router();
let User = require('../models/mo_user');

//统一返回格式：
var resData;
router.use(function(req, res, next) {
    resData = {
        code: 0,
        msg: ''
    }
    next();
})

//判断是否本地已登录，如果登录返回ture否则返回false
router.get('/login', function(req, res, next) {
    if (_cookie) {
        User.findOne({
            _id: cookieJson.id
        }).then(function(userInfo) {
            if (userInfo) {
                //本地cookie中的最后登录时间是否和数据库中一致，如果不一致需要重新登录
                if (getTime(userInfo.login_time) == cookieJson.login_time) {
                    resData.status = true;
                } else {
                    resData.status = false;
                    resData.msg = '您的账号在其他设备登录，请确认是否是本人操作！';
                }
            } else {
                resData.status = false;
            }
            res.json(resData);
        })
    } else {
        resData.status = false;
        res.json(resData);
    }
})


//登录操作
router.post('/login', function(req, res, next) {
    let user_id = req.body.user_id,
        password = req.body.password;
    User.findOne({
        user_id: user_id,
    }).then(function(userInfo) {
        if (userInfo) {
            if (userInfo.password == password) {
                let login_time = getTime();
                //登录成功后设置cookies值
                req.cookies.set('userInfo', JSON.stringify({
                    id: userInfo._id,
                    login_time: login_time
                }));

                User.update({
                    _id: userInfo._id
                }, {
                    login_time: login_time
                }).then(function() {
                    resData.msg = "登录成功!";
                    res.json(resData);
                })
            } else {
                resData.code = 1;
                resData.msg = "用户名或密码错误!";
                res.json(resData);
            }
        } else {
            signup_time = getTime();
            var user = new User({
                user_id: 'admin',
                password: 'CL030207',
                head_img: null,
                name: null,
                site_tit: null,
                site_desc: null,
                email: null,
                login_time: null,
                signup_time: signup_time,
            });
            User.findOne({
                user_id: user.user_id,
            }).then(function(userInfo) {
                if (userInfo) {
                    resData.code = 1;
                    resData.msg = "用户名或密码错误!";
                    res.json(resData);
                } else {
                    return user.save();
                }
            })
        }
    })
});

//退出
router.post('/logout', function(req, res, next) {
    req.cookies.set('userInfo', null);
    resData.status = true;
    resData.msg = "退出成功！"
    res.json(resData);
});

module.exports = router;