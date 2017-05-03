/**
 * Created by Administrator on 2016/12/23 0023.
 */

/**
 * 执行测试时的流程
 * */
import express from 'express'
import request from 'request'
import axios from 'axios'
import _ from 'lodash'
const router = express.Router();


router.route('/process')
    /**
     * 执行测试
     * */
    .post(async function(req, res, next){
        try {
            const {useCaseIds, recordId} = req.body;
            const httpUrl = global.httpConfig[req.cookies.curEnv];
            const useCase = global.utils.getModel('useCase');
            const record = global.utils.getModel('record');

            const recordData = await record.findOne({_id: recordId});
            const useCaseData = await useCase.find({_id: {'$in':useCaseIds}});

            // const abc = await global.utils.axios(recordData.method, httpUrl + recordData.url, useCaseData[0].row);

            let reqsArray = useCaseData.map((item, i)=>{
                console.log(recordData.method, httpUrl + recordData.url, item.row)
                return global.utils.axios(recordData.method, httpUrl + recordData.url, item.row)
            });

            let resAll = await axios.all(reqsArray);

            // axios.all(reqsArray).then(axios.spread(function (data) {
            //     console.log(data);
            // }))

            resAll.map((item, i)=>{
                const evalObj = eval(`({ ${useCaseData[i].checkData} })`);
                useCaseData[i] = useCaseData[i]._doc;
                useCaseData[i].result = item;
                /*验证字段和返回的数据进行比较*/
                if(_.find([item], evalObj)){
                    useCaseData[i].execute = '1';
                }else{
                    useCaseData[i].execute = '0';
                }
            })

            res.send({data:useCaseData});


        }catch (e){
            next(new Error(e));
        }
    })


export default  router;