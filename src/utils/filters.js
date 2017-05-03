/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的filter都放在这里
 * 在js里面可以这样直接调用：Vue.filter('getLocalISOString')(new Date())
 * */
import Vue from 'vue'
import emoji from 'emoji'


/*给图片路径插入后缀，用于获取图片对应的压缩图，缩略图等*/
Vue.filter('imageType', function (url, string) {
    if (!url || !string) {
        return url;
    } else {
        return url.replace(/(\.)(jpg|png|gif|bmp|jpeg)$/gi, string + "$1$2");
    }
});

/*把1和0转换成是和否*/
Vue.filter('toBoolean', function (text) {
    if(text == 1){
        return '是';
    }else if(text == 0){
        return '否';
    }
});


