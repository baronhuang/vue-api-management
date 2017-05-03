// Example model

/**
 * 项目分类
 * */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// schema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

mongoose.model('category', new Schema({
    name: {type:String,required:true},	/*项目名字*/
    createDate: {type: Number, default: new Date().getTime()},  /*创建时间*/
}));

