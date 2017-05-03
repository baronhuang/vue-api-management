<!--接口列表页-->
<template>
    <article class="ivu-article record-page">
        <Row>
            <i-col span="12">
                <h1 class="page-title">
                    {{$root.curCategory.name}}
                </h1>
            </i-col>
            <i-col span="12">
                <div class="text-right">
                    <!--<input v-model="recordKeyword" style="width:300px;vertical-align: middle" class="ivu-input ivu-input-large" type="text" placeholder="请输入接口名、URL，回车搜索">-->
                    <i-input icon="ios-search" :value.sync="recordKeyword" @on-enter="getRecord()" @on-click="getRecord()" size="large"
                             placeholder="请输入接口名、URL" style="width: 300px;vertical-align: middle;"></i-input>
                    <!--<div class="ivu-input-wrapper ivu-input-type ivu-input-group search-group">-->
                        <!--<input class="ivu-input ivu-input-large" v-model="recordKeyword" type="text" placeholder="请输入接口名、URL">-->
                        <!--<div class="ivu-input-group-append" @click="getRecord()">-->
                            <!--<button slot="append" class="ivu-btn" type="button">-->
                                <!--<i class="ivu-icon ivu-icon-ios-search"></i>-->
                                <!--<span>搜索</span>-->
                            <!--</button>-->
                        <!--</div>-->
                    <!--</div>-->

                    <i-button style="margin: 0 10px;"  type="primary" @click="showRecordModal({})" size="large">添加</i-button>
                    <i-button  type="primary" @click="showCategoryModal()" size="large">一键执行</i-button>
                </div>
            </i-col>
        </Row>

        <i-table class="record-table" border :columns="columns" :data="recordList"></i-table>
    </article>


    <Modal  :visible.sync="isShowRecordModal"
           title="接口修改" width="760"
           >
        <i-table width="726" class="record-table" border :columns="modalColumns" :data="[{}]"></i-table>

        <div slot="footer">
            <i-button type="text" @click="cancelSave()" size="large">取消</i-button>
            <i-button type="primary" @click="saveRecord()" size="large">确定</i-button>
        </div>
    </Modal>
</template>

<style lang="less" rel="stylesheet/less">
    .record-page {
        .search-group {
            display: inline-table;
            width: 300px;
            vertical-align: middle;
        }
    }
    .record-table {
        .ivu-table-header {
            .ivu-table-cell {
                font-size: 14px;
            }
        }
    }
</style>


<script>
    import Vue from 'vue'
    export default {
        components: {

        },
        data () {
            return {
                loading: false,
                isShowRecordModal: false,
                /*配置弹窗的table*/
                modalColumns: [
                    {
                        title: 'API接口',
                        key: 'name',
                        width: 240,
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        },
                        render (row, column, index) {
                            return `<input type="text" v-model="$parent.modalRecord.name"  style="width: 200px;" placeholder="API接口" class="ivu-input">`
                        }
                    },
                    {
                        title: '请求方式',
                        key: 'method',
                        width: 100,
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        },
                        render (row, column, index) {
//                            return `<input type="text" v-model="$parent.modalRecord.method"  style="width: 60px;" placeholder="请求方式" class="ivu-input">`
                            return `
                                    <select  class="ivu-input" style="width: 70px;" v-model="$parent.modalRecord.method">
                                        <option value="get">get</option>
                                        <option value="post">post</option>
                                    </select>
                                    `
                        }
                    },
                    {
                        title: '接口URL',
                        key: 'url',
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        },
                        render (row, column, index) {
                            return `<input type="text" v-model="$parent.modalRecord.url"  style="width: 350px;" placeholder="接口URL" class="ivu-input">`
                        }
                    },
                ],
                modalRecord: {
                    name: '',
                    method: '',
                    url: '',
                },
                /*配置页面上的table*/
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'API接口',
                        key: 'name',
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        },
                        render: function(row, column, index) {
                            console.log(row)
                            return `<a v-link="'/record/${row._id}?categoryId=${this.$route.query.categoryId}'">${row.name}</a>`;
                        }.bind(this)
                    },
                    {
                        title: '请求方式',
                        key: 'method',
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        }
                    },
                    {
                        title: '接口URL',
                        key: 'url',
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        }
                    },
                    {
                        title: '已设定用例',
                        key: 'isUsed',
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 130,
                        align: 'center',
                        renderHeader: function (col, index) {
                            return `<div>${col.title}</div>`
                        },
                        render: function(row, column, index) {
                            return `
                                    <i-button type="primary" size="small" @click="showRecordModal(${index})">修改</i-button>
                                    <i-button type="error" size="small" @click="deleteRecord(${index})">删除</i-button>
                                    `;
                        }
                    }
                ],
                recordList: [],
                recordKeyword: '',  /*搜索关键词*/

            }
        },
        methods: {
            /*获取接口列表*/
            getRecord() {
                Vue.api('get-record', {category: this.$route.query.categoryId, keyword: this.recordKeyword}).then((data) => {
//                    this.categoryList = data.data;
                    this.recordList = data.data;
                });
            },
            /*删除*/
            deleteRecord(index){
                if(confirm('删除项目，会把里面的所有数据都会清空，确定删除？')){
                    Vue.api('delete-record', {_id: this.recordList[index]._id}).then((data) => {
                        console.log(data);
                        this.recordList.splice(index, 1);
                        this.$Message.info('删除成功！');
                    });
                }

            },
            /*保存*/
            saveRecord () {
                const {_id, name, method, url} = this.modalRecord;
                if(!name || !method || !url){
                    this.$Message.error('请输入完整的参数！');
                    return;
                }
                /*修改*/
                if(this.modalRecord._id){
                    Vue.api('put-record', {_id, name, method, url}).then((data) => {
                        this.isShowRecordModal = false;
                        this.$Message.info('修改成功！');
                    });
                /*新增*/
                }else{
                    Vue.api('post-record',
                            Object.assign({},
                                    {_id, name, method, url},
                                    {category: this.$route.query.categoryId}
                                    )).then((data) => {
                        this.isShowRecordModal = false;
                        this.recordList.push(data.data);
                        this.$Message.info('新增成功！');
                    });
                }
            },
            /*取消保存*/
            cancelSave () {
                this.isShowRecordModal = false;
                this.$Message.info('点击了取消');
            },
            /*显示弹出框*/
            showRecordModal(item){
                console.log(item);
                if(typeof item == 'number'){
                    this.modalRecord = this.recordList[item];
                }else{
                    this.modalRecord = item;
                }

                this.isShowRecordModal = true;
            },
            /*搜索接口*/
            searchRecord(){

            }
        },
        created: function () {

        },
        route: {
            data(){
                this.getRecord();
            }
        }
    }

</script>