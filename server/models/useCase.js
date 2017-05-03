// Example model

/**
 * 测试用例
 * */
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

mongoose.model('useCase', new Schema({
    record: {type: Schema.Types.ObjectId, required: true, ref: 'record'},   /*关联到接口记录*/
    checkData: {type: String, default: ''},	/*验证字段*/
    expect: {type: String, default: ''},	/*预期结果*/
    // execute: {type: String, default: ''},	/*执行结果*/
    row: {type: Schema.Types.Mixed, default: {}},	/*测试数据行，格式：{col1: 'XXX', col2: 'XXX' }*/
    createDate: {type: Number, default: new Date().getTime()},    /*创建时间*/
}));

