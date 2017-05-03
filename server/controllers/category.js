/**
 * Created by Administrator on 2016/11/21 0021.
 */


/**
 * 项目分类的controller
 * 遵循restful约定，get:获取，post:新增，put:更新，delete:删除
 * */
import express from 'express'
const router = express.Router();

router.route('/category')
    .get(async function(req, res, next){
        try {
            const {_id} = req.query;
            const category = global.utils.getModel('category');
            let result;
            if(_id){
                result = await category.findOne({_id})
            }else{
                result = await category.find();
            }
            res.send({data:result});
        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * body:{
     *  name:项目名称
     * }
     *
     * */
    .post(async function (req, res, next) {
        try {
            console.log(444, req.body);
            const {name} = req.body;
            if(name){
                const category = global.utils.getModel('category');
                let result = await category.create({name});
                res.send({data: result});
            }else{
                // res.status(400);
                next({status: 400, message: '请输入参数name'});
            }

        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * body: {
     *  id: 记录id，
     *  name: 需要修改的名字
     * }
     * */
    .put(async function(req, res, next){
        try {
            const {_id, name}= req.body;
            if(!_id || !name){
                next({status: 400, message: '参数不全'});
                return;
            }

            const category = global.utils.getModel('category');
            let result = await category.findOneAndUpdate({_id}, {name}, {upsert:true, 'new': true});
            res.send({data:result});
        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * query: {
     *  id: 记录id，
     * }
     * */
    .delete(async function(req, res, next){
        try {
            const {_id} = req.query;
            if(!_id){
                next({status: 400, message: '参数不全'});
                return;
            }

            const category = global.utils.getModel('category');
            let {result} = await category.remove({_id});

            if(result && result.n > 0){
                res.send({data:result});
            }else{
                next({status: 405, message: '删除失败'});
            }

        }catch (e){
            next(new Error(e));
        }
    })




export default router;
