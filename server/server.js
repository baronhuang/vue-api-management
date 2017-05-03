
/**
 * 工程的入口文件，包含对工程的配置
 * */

'use strict'
/*支持es6语法*/
require('babel-register')();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var methodOverride = require('method-override');
var session = require('express-session');

var app = express();
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use(methodOverride());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000000000*60*10 //过期时间设置(单位毫秒)
    }
}));

/*自定义的配置需要放在系统级配置的后面，不然会有莫名其妙的问题*/
app = require('./app')(app);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log('env', app.get('env'));

/*根据环境来配置错误提示，在接口里面抛出错误：next(new Error(e));*/
app.use(function (err, req, res, next) {
  /*输出报错的地方*/
  if(err.stack){
    console.error(err.stack);
  }
  var status = err.status || 500;
  res.status(status);
  res.send({
    message: err.message,
    error: err.stack,
    status: status
  });
});

// if(app.get('env') === 'dev'){
//
//
// }else{
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send({
//       message: err.message,
//       error: {},
//       title: 'error'
//     });
//   });
// }

/*启动服务*/
var port = global.serverConfig.port;
app.listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('listening on http://127.0.0.1:' + port);
});
