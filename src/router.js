/**
 * Created by Administrator on 2016/10/21 0021.
 */

/**
 * 路由配置放在这里
 * */
import Vue from 'vue'
import Router from 'vue-router'

import Home from './containers/Home.vue'
import Record from './containers/Record.vue'
import RecordDetail from './containers/RecordDetail.vue'
import Signup from './containers/Signup.vue'

Vue.use(Router);
let router = new Router({
    // root: 'oneStop',
    history: true, //html5模式 去掉锚点
    saveScrollPosition: true //记住页面的滚动位置 html5模式适用
});

router.map({
    '/': {
        component: Home
    },
    '/record': {
        component: Record
    },
    '/record/:id': {
        component: RecordDetail
    },
    '/signup': {
        component: Signup
    }
});

router.redirect({
    '*': '/'
});

/*默认要把router导出，后面会用到*/
export default router;