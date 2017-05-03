<!--根节点-->
<template>
    <div id="app" v-cloak>
        <div class="wrapper">
            <div class="wrapper-header">
                <h1 class="app-title text-center"><img class="logo" src="images/logo.png" alt=""> API 管理平台</h1>
            </div>
            <div class="wrapper-container">
                <Row>
                    <i-col span="4" class="wrapper-navigate">
                        <Menu :theme="theme3">
                            <Menu-group title="项目列表">
                                <Menu-item key="index" :class="{'ivu-menu-item-active ivu-menu-item-selected': $route.path=='/'}">
                                    <a style="color: inherit" v-link="'/'">
                                        <Icon type="document-text"></Icon>
                                        首页
                                    </a>
                                </Menu-item>
                                <Menu-item :class="{'ivu-menu-item-active ivu-menu-item-selected': curCategory._id==item._id}"
                                           @click="selectCategory(item)" :key="item._id" v-for="item in categoryList">
                                    <a style="color: inherit" v-link="'/record?categoryId='+item._id">
                                        <Icon type="document-text"></Icon>
                                        {{item.name}}
                                    </a>
                                </Menu-item>
                                <!--<Menu-item key="3">-->
                                <!--<i-button type="primary" size="large" long icon="plus-round">添加</i-button>-->
                                <!--</Menu-item>-->
                            </Menu-group>
                            <div class="manage">
                                <i-button type="primary" @click="showCategoryModal()" size="large" long>管理</i-button>
                            </div>
                        </Menu>
                        <br>
                        <!--<p>切换主题</p>-->
                        <!--<Radio-group :model.sync="theme3">-->
                        <!--<Radio value="light"></Radio>-->
                        <!--<Radio value="dark"></Radio>-->
                        <!--</Radio-group>-->

                    </i-col>

                    <i-col span="20" class="wrapper-content">
                        <router-view></router-view>
                    </i-col>
                </Row>

                <!--项目列表弹出框-->
                <Modal :visible.sync="isShowCategoryModal"
                       title="项目列表管理"
                       @on-ok="ok"
                       @on-cancel="cancel">
                    <p style="padding: 0 10px;">提示：点击项目名字进行编辑</p>
                    <ul class="category-list">
                        <li>
                            <i-button type="primary" @click="addCategory()">添加</i-button>
                        </li>
                        <li v-for="item in categoryList">
                            <span v-show="!item.isUpdating" @click="updateCategory(item)">{{item.name}}</span>
                            <input v-show="item.isUpdating" autofocus type="text" style="width: 300px"
                                   @blur="saveCategory(item, $index)"
                                   v-model="item.name" placeholder="请输入项目名" class="ivu-input" >
                            <i-button class="del-btn pull-right" type="error" @click="deleteCategory(item, $index)" size="small">删除</i-button>
                        </li>
                    </ul>
                </Modal>

            </div>
        </div>

        <div class="footer">
            <Row>
                <i-col span="8" offset="8">
                    <div class="footer-main text-center">
                        <div>反馈：<a href="https://github.com/baronhuang/vue-api-management">Baron</a></div>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less">
    @import "less/common";
    [v-cloak] { display: none }
    #app {
        .footer-main {
            padding: 20px 0;
        }
    }
</style>

<style lang="less" rel="stylesheet/less" scoped>
    .wrapper {
        background: #eee;
        padding: 1px;
        .wrapper-header {
            margin-top: 15px;
            .logo {
                width: 32px;
                vertical-align: middle;
            }
            .app-title-small {
                font-size: 14px;
                >span {
                    &+span {
                        margin-left: 10px;
                    }
                }
            }
        }
        .wrapper-container {
            background: #fff;
            width: 90%;
            margin: 30px auto 20px;
            border-radius: 6px;
            box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
            .wrapper-navigate {
                padding: 15px;
                .ivu-menu-item-group {
                    .ivu-menu-item {
                        padding: 0;
                        a {
                            display: block;
                            padding: 14px 24px;
                        }
                    }
                }
                .manage {
                    padding-left: 10px;
                    padding-right: 25px;
                    margin-top: 20px;
                }
                /*.title {*/
                    /*height: 48px;*/
                    /*line-height: 48px;*/
                    /*font-size: 14px;*/
                    /*padding-left: 28px;*/
                /*}*/
            }
            .wrapper-content {
                padding: 20px 25px;
            }
        }
    }

    .category-list {
        li {
            /*display: block;*/
            padding: 10px;
            color: #525558;
            position: relative;
            font-size: 14px;
            cursor: pointer;
            overflow: auto;
            .del-btn {
                visibility: hidden;
            }
            &:hover {
                color: #39f;
                .del-btn {
                    visibility: visible;
                }
            }
        }

    }
</style>

<script>
    import Vue from 'vue'
    export default{
        data() {
          return {
              isShowCategoryModal: false,   /*是否显示项目列表弹窗*/
              categoryList: [],  /*项目列表*/
              curCategory: {
                  _id: ''
              },  /*当前选中的项目*/
              userData: {}, /*用户信息*/
          }
        },
        methods: {
            /*获取用户信息*/
            getUserData(){
                Vue.api('get-user').then((data)=> {
//                    this.categoryList = data.data;
                    console.log(444, data);
                    this.userData = data.data;
                });
            },
            /*获取项目列表*/
            getCategory() {
                Vue.api('get-category').then((data)=> {
                    this.categoryList = data.data;
                });
            },
            /*添加一行*/
            addCategory(){
                this.categoryList.push({
                    isUpdating: true,
                    _id: '',
                    name:''
                });
            },
            /*失去焦点，就保存*/
            saveCategory(item, index){
                item.isUpdating = false;
                if(item.name.trim() == ''){
                    this.categoryList.splice(index, 1);
                    return;
                }

                /*有id就更新*/
                if(item._id){
                    Vue.api('put-category',  {_id: item._id, name: item.name}).then((data)=>{
                        console.log(data);
                    }).catch(function (res) {
                        console.log(res.data);
                    })
                }else{
                    Vue.api('post-category',  {name: item.name}).then((data)=>{
                        console.log(data);
                        Vue.set(item, '_id', data.data._id);
                        console.log(item)
                    }).catch(function (res) {
                        console.log(res.data);
                    })
                }
            },
            deleteCategory(item, index){
                if(confirm('删除项目，会把里面的所有接口数据都会清空，确定删除？')){
                    Vue.api('delete-category',  {_id: item._id}).then((data)=>{
                        console.log(data);
                        this.categoryList.splice(index, 1);
                    }).catch(function (res) {
                        console.log(res.data);
                    })
                }

            },
            /*更新项目名*/
            updateCategory(item){
                Vue.set(item, 'isUpdating', true);
            },
            selectCategory(item){
                this.curCategory = item;
            },
            /*获取当前的项目*/
            getCurCategory(){
                if(this.$route.query.categoryId){
                    Vue.api('get-category', {_id: this.$route.query.categoryId}).then((data)=> {
                        this.curCategory = data.data;
//                    console.log(444,this.categoryList);
                    });
                }
            },
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            /*显示项目弹出框*/
            showCategoryModal (){
                this.isShowCategoryModal = true;
                this.getCategory();
            }
        },
        created: function () {
            this.getUserData();
            this.getCategory();
            this.getCurCategory();
        },
        ready: function () {
            console.log(this.$route.query)
        }
    }
</script>