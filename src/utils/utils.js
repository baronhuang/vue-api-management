/**
 * Created by Administrator on 2016/9/27 0027.
 */


/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
export default {
    install: function (Vue, options) {

        Vue.utils = {
            /*转换vue变量，让其可在console.log里面输出*/
            parse: function (data) {
                return JSON.parse(JSON.stringify(data));
            },
        }
    },


}
