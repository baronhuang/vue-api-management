/**
 * Created by Administrator on 2016/12/13 0013.
 */

/**
 * 工具集
 * */

import mongoose from 'mongoose'
import axios from 'axios'

module.exports = {
    /*扑捉错误信息*/
    errorHandle: function({e, res}) {
        console.error(e.message);
        res && res.send({msg: e.message, statusCode: 500});
    },
    /*获取model*/
    getModel: function (type) {
        return mongoose.model(type);
    },
    axios: function (type, url, params) {
        console.log(type, url ,params)
        if(type == 'get'){
            return axios({
                method: type,
                params: params,
                url: url
            })
        }else if(type == 'post'){
            return axios({
                method: type,
                data: params,
                url: url
            })
        }

    }
}