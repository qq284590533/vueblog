var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var Cookies = require('cookies')
var bodyParser = require('body-parser');
var moment = require('moment')


var front = require('./router/front');
var admin = require('./router/admin');
var login_out = require('./router/login_out');

var app = express();

//vue-router使用 mode:"history" 模式后端需要额外配置（详见Vue-router官方说明），express使用"connect-history-api-fallback"中间件既可
app.use(history());

app.use(express.static(path.join(__dirname, './dist')))

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, './dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {

    //获取时间,时间格式化
    getTime = function(_time) {
        return moment(_time).format('YYYY-MM-DD HH:mm:ss');
    }

    // 放在路由配置前面，所以路由都会经过这里
    //设置cookie
    req.cookies = new Cookies(req, res);
    cookieJson = {};
    _cookie = req.cookies.get('userInfo');
    if (_cookie) {
        try {
            cookieJson = JSON.parse(_cookie);
        } catch (e) {
            console.log(e);
        }
    }
    next();
});

app.use('/api/login_out', login_out);
app.use('/api/front', front);
app.use('/api/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;