
/**
 * 程序的入口文件，做最终的整合
 * */

import $ from 'jquery'
import Vue from 'vue'
import './config'
import vueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import api from './utils/api'
import utils from './utils/utils'
import './utils/filters'
import iView from 'iview'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import 'prismjs'
import 'prismjs/themes/prism.css'

/*--------vue组件---------*/
import App from './App'
import router from './router'
import './utils/filters'

/*安装插件，好处就是在main.js里面引入，其他地方无需重复引入*/
Vue.$ = $;
Vue.use(vueResource);
Vue.use(VueMoment);
Vue.use(iView);

/*---安装自定义插件---*/
Vue.use(api);
Vue.use(utils);

router.start(App, 'app');
console.info('-------------vue router start---------------')
