/**
 * Created by Administrator on 2016/12/21 0021.
 */

/**
 * 测试用例
 * */
import express from 'express'
const router = express.Router();

router.route('/useCase')
    /**
     * 获取
     * query {
         *  category: 为某个项目的id
         * }
     * */
    .get(async function(req, res, next){
        try {
            const record = req.query.record;
            const useCase = global.utils.getModel('useCase');
            let result = await useCase.find({record});
            // const category = global.utils.getModel('category');
            // .populate('category');
            res.send({data:result});
        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 增加
     * body:{
     * record:接口的id，需要做关联用
     *  checkData:验证字段，
     *  expect:预期结果，
     *  row:{col1: '111', col2: '222' } 为每个用例的参数
     * }
     * */
    .post(async function (req, res, next) {
        try {
            const {checkData, expect, row, record} = req.body;
            if(record){
                const useCase = global.utils.getModel('useCase');
                const result = await useCase.create({checkData, expect, row, record});
                res.send({data: result});
            }else{
                // res.status(400);
                next({status: 400, message: '参数不全'});
            }

        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 修改
     * body:{
     * _id:用例id
     *  checkData:验证字段
     *  expect:预期结果
     *  row:{col1: '111', col2: '222' } 为每个用例的参数
     * }
     *
     * */
    .put(async function (req, res, next) {
        try {
            const {_id, checkData, expect, row} = req.body;
            if(_id){
                const useCase = global.utils.getModel('useCase');
                const result = await useCase.update({_id}, {checkData, expect, row});
                res.send({data: result});
            }else{
                // res.status(400);
                next({status: 400, message: '参数不全'});
            }

        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 删除
     * query: {
     *  _id: 记录_id，
     * }
     * */
    .delete(async function(req, res, next){
        try {
            const {_id} = req.query;
            if(_id){
                const useCase = global.utils.getModel('useCase');
                const {result} = await useCase.remove({_id});
                console.log(result)
                if(result && result.n > 0){
                    res.send({data:result});
                }else{
                    next({status: 405, message: '删除失败'});
                }
            }else{
                next({status: 400, message: '参数不全'});
            }

        }catch (e){
            next(new Error(e));
        }
    });



export default router;