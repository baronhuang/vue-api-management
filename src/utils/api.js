/**
 * Created by Administrator on 2016/10/18 0018.
 */

/**
 * 接口地址放在这里，存放在Vue的全局自定义方法
 * */
export default {
    install: function (Vue, options) {
        /*拦截请求*/
        Vue.http.interceptors.push((request, next)  => {
            // continue to next interceptor
            next((response) => {
                // modify response
                if(response.status == 301){
                    if(window.location.pathname != '/signup'){
                        window.location.href = '/signup';
                    }
                }
            });
        });

        Vue.http.options.emulateJSON = true;
        /*自定义ajax函数，自带的不好用*/
        Vue.http.ajax = async function (options) {
            if('get delete'.includes(options.method)){
                let res = await Vue.http[options.method](options.url, {params: options.params});
                if(typeof res.body == 'string'){
                    return JSON.parse(res.body);
                }else{
                    return res.body;
                }

            }else if('post put'.includes(options.method)){
                let res = await Vue.http[options.method](options.url, options.params);
                if(typeof res.body == 'string'){
                    return JSON.parse(res.body);
                }else{
                    return res.body;
                }
            }
        }

        /**
         * str: 为type和url的合成，用'-'连接
         * params: 参数
         * */
        Vue.api = function (str, params) {
            var str = str.split('-');
            let type = str[0];
            let url = str[1];
            return Vue.http.ajax({
                method: type,
                url: IXT_CONFIG.httpUrl + url,
                params: params
            })
        }
    },

}