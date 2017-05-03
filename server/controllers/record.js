/**
 * Created by Administrator on 2016/12/16 0016.
 */

/**
 * api接口记录controller
 * */
import express from 'express'
const router = express.Router();

router.route('/record')
    /**
     * 获取
     * query {
     *  category: 为某个项目的id
     *  keyword: 搜索关键词，非必填
     * }
     * */
    .get(async function(req, res, next){
        try {
            const {category, keyword} = req.query;
            const record = global.utils.getModel('record');
            const reg = new RegExp(keyword, 'i');
            /*支持模糊查询*/
            let result = await record.find({ category, '$or':[{name: reg}, {url: reg}] });
            res.send({data:result});
        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 增加
     * body:{
     *  name:接口名，
     *  method:接口方式，
     *  url:接口地址，
     *  category:所属项目的id
     * }
     *
     * */
    .post(async function (req, res, next) {
        try {
            const {name, method, url, category} = req.body;
            const updateBy = req.session.user._id;  /*当前登录的用户id*/
            if(name && method && url && category){
                const record = global.utils.getModel('record');
                const result = await record.create({name, method, url, category, updateBy});
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
     * 更新
     * body: {
     *  跟增加差不多，只是少了category
     * }
     * */
    .put(async function(req, res, next){
        try {
            const {_id, name, method, url, description} = req.body;
            const updateBy = req.session.user._id;  /*当前登录的用户id*/
            console.log(_id, name, method, url)
            if(_id && name && method && url){
                const record = global.utils.getModel('record');
                const result = await record.findOneAndUpdate({_id: _id}, {name, method, url, description, updateBy}, {upsert:true, 'new': true});
                res.send({data:result});
            }else{
                next({status: 400, message: '参数不全'});
            }

        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 删除
     * query: {
     *  id: 记录id，
     * }
     * */
    .delete(async function(req, res, next){
        try {
            const {_id} = req.query;
            if(_id){
                const record = global.utils.getModel('record');
                const {result} = await record.remove({_id: _id});
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

/*接口详情的操作*/
router.route('/recordDetail')
    /**
     * 获取
     * */
    .get(async function(req, res, next){
        try {
            const {_id} = req.query;
            const record = global.utils.getModel('record');
            let result = await record.findOne({_id}).populate('updateBy', 'name phone _id');
            // console.log(result.date)
            // const category = global.utils.getModel('category');
            // .populate('category');

            res.send({data:result});
        }catch (e){
            next(new Error(e));
        }
    });

/*接口参数的操作*/
router.route('/record/params')
    /**
     * 新增
     * */
    .post(async function(req, res, next){
        try {
            const {_id, name, remark, required, example, defaults} = req.body;
            const record = global.utils.getModel('record');
            const createDate = new Date().getTime();
            let result = await record.update({_id}, {'$push': {'params': {name, remark, required, example, defaults, createDate}}}, {upsert:true, 'new': true});
            if(result.nModified > 0){
                result.createDate = createDate;
                res.send({data:result});
            }else{
                next({status: 405, message: '操作失败'});
            }

        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 更新
     * */
    .put(async function(req, res, next){
        try {
            const {_id, name, remark, required, example, defaults, index, createDate} = req.body;
            const record = global.utils.getModel('record');
            /*更新操作*/
            let commond = {};
            /*params.index表示更新第index条记录*/
            commond[`params.${index}`] = {name, remark, required, example, defaults, createDate: parseInt(createDate)};
            let result = await record.update({_id}, {'$set': commond });
            if(result.n > 0){
                res.send({data:result});
            }else{
                next({status: 405, message: '操作失败'});
            }

        }catch (e){
            next(new Error(e));
        }
    })
    /**
     * 删除
     * query: {
     *  _id: 记录id，
     * }
     * */
    .delete(async function(req, res, next){
        try {
            const {_id, createDate} = req.query;
            if(_id && createDate){
                const record = global.utils.getModel('record');
                /*删除操作*/
                const result = await record.update({_id: _id}, {'$pull': {params: {createDate: parseInt(createDate)}} });
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


router.route('/record/response')
    /**
     * 修改返回示例
     * */
    .put(async function(req, res, next){
        try {
            const {_id, response} = req.body;
            const record = global.utils.getModel('record');
            let result = await record.update({_id}, {response});
            res.send({data:result});
            // if(result.n > 0){
            //     res.send({data:result});
            // }else{
            //     next({status: 405, message: '操作失败'});
            // }

        }catch (e){
            next(new Error(e));
        }
    })

export default router;