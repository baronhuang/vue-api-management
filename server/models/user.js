/**
 * Created by Administrator on 2016/12/27 0027.
 */

/**
 * 用户记录
 * */
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

mongoose.model('user', new Schema({
    name: {type: String, required: true},	/*用户名*/
    phone: {type: String, required: true},	/*电话*/
    password: {type: String, required: true},	/*密码*/
    createDate: {type: Number, default: new Date().getTime()},    /*创建时间*/
}));