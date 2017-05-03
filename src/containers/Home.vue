<!--首页-->
<template>
   <article class="ivu-article home-page">
       <h1>欢迎使用API管理平台！</h1>
       <div class="wrap">
           <span>选择当前环境：</span>
           <i-select :model.sync="curEnv" style="width:200px" @on-change="selectEnv()">
               <i-option  v-for="item in envList" :value="item.value">{{ item.label }}</i-option>
           </i-select>
       </div>
   </article>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .home-page {
        .wrap {
            margin-top: 20px;
        }
    }


</style>


<script>
    import Vue from 'vue'
    import jsCookie from 'js-cookie'
    export default{
        components: {
        },
        data: function () {
            return {
                envList: [
                    {
                        value: 'prd',
                        label: '生产机'
                    },
                    {
                        value: 'sit',
                        label: '测试机'
                    },
                    {
                        value: 'uat',
                        label: '开发机'
                    },

                ],
                curEnv: ''
            }
        },
        methods: {
            selectEnv(){
                console.log(this.curEnv);
                jsCookie.set('curEnv', this.curEnv);

            }
        },
        created: function () {
            /*读取cookie值，默认选择sit环境*/
            if(!jsCookie.get('curEnv')){
                jsCookie.set('curEnv', 'sit');
            }
            this.curEnv = jsCookie.get('curEnv');
        }
    }
</script>