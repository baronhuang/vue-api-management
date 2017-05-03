/**
 * Created by Administrator on 2016/11/21 0021.
 */

/**
 * 应用的基本配置
 * */
import mongoose from 'mongoose'
import glob from 'glob'
import axios from 'axios'

let serverConfig;
/*生产环境*/
if(process.env.NODE_ENV == 'production'){
    serverConfig = {
        port: 9100, /*接口端口*/
        dbUrl: 'mongodb://192.168.2.16:27017/IXTTest'  /*数据库地址*/
    };
}else{
    serverConfig = {
        port: 9101,
        dbUrl: 'mongodb://localhost:27017/IXTTest'
    };;
}

/*服务器启动配置*/
global.serverConfig = serverConfig

/*测试接口时，需要连接到哪台机*/
global.httpConfig = {
    prd: 'http://www.baron.com/',    /*生产机*/
    sit: 'http://192.168.2.21/',    /*测试机*/
    uat: 'http://192.168.2.14/',    /*开发机*/
}

/*配置axios */
/*需要对post进行formdata转换*/
axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if(config.data){
        var str = [];
        var data = JSON.parse(config.data);
        for(var p in data)
            if (data.hasOwnProperty(p) && data[p]) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
            }
        config.data = str.join("&");
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

/*默认过滤返回的数据*/
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


/*这里需要用es5的exports*/
module.exports = function(app){

    app.use(function(req, res, next){
        if(req.session.user || req.originalUrl.includes('/api/user')){
            next();
        }else{
            // next('/signup');
            next({status: 301, message: '请先登录！'});
        }
    });

    /*批量导入models*/
    let models = glob.sync(__dirname + '/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    /*批量导入controllers*/
    let controllers = glob.sync(__dirname + '/controllers/*.js');
    controllers.forEach(function (ctrl) {
        app.use('/api', require(ctrl).default);
    });

    /*公用函数库*/
    global.utils = require('./utils/utils');

    /*需要将es6的promise配置给mongoose，不然会一直警告*/
    mongoose.Promise = global.Promise;

    /*验证是否连接到mongodb*/
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
    });
    mongoose.connection.on('error', function (err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });

    /*链接数据库*/
    global.db = mongoose.connect(global.serverConfig.dbUrl);

    return app;
}



