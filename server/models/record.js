// Example model

/**
 * 接口记录
 * */
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

mongoose.model('record', new Schema({
    category: {type: Schema.Types.ObjectId, required: true, ref: 'category'},
    name: {type: String, required: true},	/*接口名字*/
    method: {type: String, default: 'get'},	/*get or post方式*/
    url: {type: String, required: true},	/*url*/
    isUsed: {type: Boolean, default: false},	/*是否添加了用例*/
    description: {type: String, default: ''},	/*描述*/
    params: {type: Array, default: []},	/*参数列表：[{name: 参数名, remark: 说明, required: 是否必填, example: 示例, defaults: 默认值, createDate: 数据的插入时间，在修改数据是唯一ID}]*/
    response: {type: String, default: ''},	/*响应示例*/
    // exception: {type: String, default: ''},	/*异常示例*/
    // testCase: {type: Array, default: []},	/*测试用例*/
    createDate: {type: Number, default: new Date().getTime()},    /*创建时间*/
    updateBy: {type: Schema.Types.ObjectId, required: true, ref: 'user'},   /*修改者*/
}));

