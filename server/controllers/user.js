/**
 * Created by Administrator on 2016/12/27 0027.
 */

/**
 * 用户注册登录等
 * */
import express from 'express'
const router = express.Router();

router.route('/user')
    /**
     * 获取用户信息，不传id默认获取当前登录的用户信息
     * query {
         *  _id: 用户id
         * }
     * */
    .get(async function(req, res, next){
        try {
            const {_id} = req.query;
            if(_id){
                const user = global.utils.getModel('user');
                let result = await user.findOne({_id});
                req.session.user = result._doc;
                res.send({data: result});
                return;
            }


            const {user} = req.session;
            if(user){
                const result = Object.assign({}, user);
                delete result.password;
                res.send({data: result});
            }else{
                next({status: 301, message: '请先登录！'});
            }

        }catch (e){
            next(new Error(e));
        }
    })

router.route('/user/signin')
    /**
     * 登录
     * query {
     *  name: 手机号或姓名
     *  password: 密码
     * }
     * */
    .get(async function(req, res, next){
        try {
            const {name, password} = req.query;
            const user = global.utils.getModel('user');
            let result = await user.findOne({$or: [{name: name}, {phone: name}], password: password});
            if(result){
                req.session.user = result;
                res.send({data:result});
            }else{
                next({status: 403, message: '密码或账号不对！'});
            }

        }catch (e){
            next(new Error(e));
        }
    })

router.route('/user/signup')
    /**
     * 注册
     * body:{
     *  name: 名字，
     *  phone: 电话，
     *  password: 密码
     * }
     * */
    .post(async function (req, res, next) {
        try {
            const {name, phone, password} = req.body;
            if(name && phone && password){
                const user = global.utils.getModel('user');
                const userData = await user.findOne({$or: [{name}, {phone}]});
                if(userData){
                    next({status: 300, message: '用户已存在！'});
                }else{
                    const result = await user.create({name, phone, password});
                    req.session.user = result;
                    res.send({data: result});
                }

            }else{
                // res.status(400);
                next({status: 400, message: '参数不全！'});
            }

        }catch (e){
            next(new Error(e));
        }
    })

export default router;