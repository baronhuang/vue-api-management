<!--登录注册页-->
<template>
    <div class="signup">
        <Tabs active-key="key1">
            <Tab-pane label="登录" key="key1">
                <div class="group-inputs">
                    <div class="input-wrap"><input class="ivu-input ivu-input-large" v-model="signinInfo.name" type="text" placeholder="手机号或姓名" size="large"></div>
                    <div class="input-wrap"><input @keydown.enter="signin()" class="ivu-input ivu-input-large" v-model="signinInfo.password" type="password" placeholder="密码" size="large"></div>
                </div>
                <div class="group-buttons">
                    <i-button type="primary" size="large" long @click="signin()">登录</i-button>
                </div>
            </Tab-pane>
            <Tab-pane label="注册" key="key2">
                <div class="group-inputs">
                    <div class="input-wrap"><input class="ivu-input ivu-input-large" v-model="signupInfo.name" type="text" placeholder="姓名，请输入真实姓名" size="large"></div>
                    <div class="input-wrap"><input class="ivu-input ivu-input-large" v-model="signupInfo.phone" type="text" placeholder="手机号，方便同事沟通" size="large"></div>
                    <div class="input-wrap"><input @keydown.enter="signup()" class="ivu-input ivu-input-large" v-model="signupInfo.password" type="password" placeholder="密码，请不要输入银行密码" size="large"></div>
                </div>
                <div class="group-buttons">
                    <i-button type="primary" size="large" long @click="signup()">注册</i-button>
                </div>
            </Tab-pane>
        </Tabs>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .signup {
        width: 300px;
        margin: 0 auto;
        .group-inputs {
            padding: 1px 0;
            border: 1px solid #d5d5d5;
            border-radius: 3px;
            .input-wrap {
                padding: 5px;
                .ivu-input {
                    border: 0;
                    outline: 0;
                    box-shadow:none;
                }
            }
            .input-wrap + .input-wrap {
                border-top: 1px solid #e8e8e8;
            }
        }
        .group-buttons {
            margin-top: 20px;
            .ivu-btn {
                height: 45px;
                font-size: 16px;
            }
        }
    }
</style>

<script>
    import Vue from 'vue'
    export default{
        components: {
        },
        data: function () {
            return {
                signupInfo: {
                    name: '',
                    phone: '',
                    password: ''
                }, /*注册数据*/
                signinInfo: {}, /*登录数据*/
            }
        },
        methods: {
            /*注册*/
            signup(){
                if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.signupInfo.phone)) {
                    alert('请输入有效的手机号码！');
                    return false;
                }

                Vue.api('post-user/signup', this.signupInfo).then((data)=> {
                    setTimeout(function(){
                        window.location.href = '/';
                    }, 500);

                }).catch((res)=> {
                    this.$Message.error(res.data.message);
                });
            },
            /*登录*/
            signin(){
                Vue.api('get-user/signin', this.signinInfo).then((data)=> {
                    setTimeout(function(){
                        window.location.href = '/';
                    }, 500);
                }).catch((res)=> {
                    this.$Message.error(res.data.message);
                });
            }
        },
        created: function () {

        },
        ready: function () {
            Vue.$('.wrapper-navigate').remove();
            Vue.$('.wrapper-content').addClass('ivu-col-offset-2');
        }
    }
</script>