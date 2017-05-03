<!--接口详细页-->
<template>
    <article class="ivu-article">
        <h1 class="page-title">{{recordDetail.name}}</h1>
        <Row>
            <i-col span="20" class="record-detail">
                <p>
                    <b class="left-title">修改人：</b>
                    <Tooltip style="margin-left: 14px;" v-if="recordDetail.updateBy" :content="recordDetail.updateBy.phone"  placement="top">
                        <b style="color: #3399ff;cursor: pointer;" ><i class="ivu-icon ivu-icon-person"></i> {{recordDetail.updateBy.name}}</b>
                    </Tooltip>
                </p>
                <p>
                    <b class="left-title">接口描述：</b>
                    <span v-show="!recordDetail.isEdit">{{recordDetail.description}}</span>
                    <input v-show="recordDetail.isEdit" type="text" v-model="recordDetail.description" placeholder="接口描述" class="ivu-input">
                </p>
                <p>
                    <b class="left-title">请求方式：</b>
                    <span v-show="!recordDetail.isEdit">{{recordDetail.method}}</span>
                    <input v-show="recordDetail.isEdit" type="text" v-model="recordDetail.method" placeholder="请求方式" class="ivu-input">
                </p>
                <p>
                    <b class="left-title">接口URL：</b>
                    <span v-show="!recordDetail.isEdit">{{recordDetail.url}}</span>
                    <input v-show="recordDetail.isEdit" type="text" v-model="recordDetail.url" placeholder="接口URL" class="ivu-input">
                </p>
            </i-col>
            <i-col span="4" class="text-right">
                <i-button v-show="!recordDetail.isEdit" style="margin-right: 20px;" type="primary" @click="setRecordDetailStatus()" size="large">修改</i-button>
                <i-button v-show="recordDetail.isEdit" style="margin-right: 20px;" type="primary" @click="saveRecordDetail()" size="large">保存</i-button>
            </i-col>
        </Row>
        <Row style="margin-top: 10px;">
            <i-col>
                <p>
                    <b>参数说明：</b>
                    <i-button  type="primary" @click="addNewParams()">添加</i-button>
                    <i-button  type="info" @click="">单次执行</i-button>
                </p>
            </i-col>
        </Row>

        <!--<i-table style="margin-top: 5px" class="record-table" border :columns="columns" :data="paramsList"></i-table>-->

        <div class="record-table ivu-table-wrapper" style="margin-top: 5px">
            <div class="ivu-table ivu-table-border">
                <div class="ivu-table-header">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                        <colgroup>
                            <col ><col width="500"><col width="100"><col ><col width="100"><col width="130">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>
                                <div class="ivu-table-cell">
                                    <div>名称</div>
                                </div>
                            </th>
                            <th>
                                <div class="ivu-table-cell">
                                    <div>说明</div>
                                </div>
                            </th>
                            <th>
                                <div class="ivu-table-cell">
                                    <div>是否必填</div>
                                </div>
                            </th>
                            <th>
                                <div class="ivu-table-cell">
                                    <div>示例</div>
                                </div>
                            </th>
                            <th>
                                <div class="ivu-table-cell">
                                    <div>默认值</div>
                                </div>
                            </th>
                            <th class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                    <div>操作</div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                    </table>
                </div>

                <div class="ivu-table-body">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                        <colgroup>
                            <col ><col width="500"><col width="100"><col ><col width="100"><col width="130">
                        </colgroup>
                        <tbody class="ivu-table-tbody">
                            <tr class="ivu-table-row" v-for="param in recordDetail.params">
                                <td>
                                    <div class="ivu-table-cell">
                                        <div>
                                            <span v-show="!param.isUpdating">{{param.name}}</span>
                                            <input v-show="param.isUpdating" type="text" v-model="param.name" placeholder="名称" class="ivu-input">
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <div>
                                            <span v-show="!param.isUpdating">{{param.remark}}</span>
                                            <input v-show="param.isUpdating" type="text" v-model="param.remark" placeholder="说明" class="ivu-input">
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <div>
                                            <span v-show="!param.isUpdating">{{param.required | toBoolean}}</span>
                                            <select v-show="param.isUpdating" class="ivu-input" v-model="param.required">
                                                <option value="1">是</option>
                                                <option value="0">否</option>
                                            </select>
                                            <!--<input v-show="param.isUpdating" type="text" v-model="param.required" placeholder="是否必填" class="ivu-input">-->
                                            <!--<i-select v-show="param.isUpdating" :model.sync="param.required" style="width:100%">-->
                                                <!--<i-option  :value="'1'">是</i-option>-->
                                                <!--<i-option  :value="'0'">否</i-option>-->
                                            <!--</i-select>-->
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <div>
                                            <span v-show="!param.isUpdating">{{param.example}}</span>
                                            <input v-show="param.isUpdating" type="text" v-model="param.example" placeholder="示例" class="ivu-input">
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="ivu-table-cell">
                                        <div>
                                            <span v-show="!param.isUpdating">{{param.defaults}}</span>
                                            <input v-show="param.isUpdating" type="text" v-model="param.defaults" placeholder="默认值" class="ivu-input">
                                        </div>
                                    </div>
                                </td>
                                <td class="ivu-table-column-center">
                                    <div class="ivu-table-cell">
                                        <div>
                                            <i-button v-show="!param.isUpdating"  type="primary" @click="setParamStatus(param)" size="small">修改</i-button>
                                            <i-button v-show="param.isUpdating"  type="primary" @click="saveParams(param, $index)" size="small">保存</i-button>
                                            <i-button  type="error" @click="deleteParams(param, $index)" size="small">删除</i-button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>


        <Tabs active-key="key1" style="margin-top: 50px;">
            <Tab-pane label="数据设置" key="key1">
                <div class="use-case">
                    <Spin fix v-show="isProcessing" class="use-case-loading">
                        <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                        <div>测试中</div>
                    </Spin>

                    <div class="text-right" style="padding: 0 10px;margin-bottom: 16px;">
                        <i-button  type="primary" @click="addNewUseCase()">添加</i-button>
                        <i-button v-show="!isProcessed" type="info" @click="postProcess()">一键执行</i-button>
                        <i-button v-show="isProcessed" @click="resetProcess()">重置</i-button>

                    </div>
                    <div class="record-table ivu-table-wrapper">
                        <div class="ivu-table ivu-table-border">
                            <div class="ivu-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                                    <colgroup>
                                        <col width="60"><col v-for="col in recordDetail.params"><col width="250"><col width="100"><col width="100"><col width="220">
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th class="ivu-table-column-center">
                                            <div class="ivu-table-cell">
                                                <label @click="selectAllUseCase()" class="ivu-checkbox-wrapper" :class="{'ivu-checkbox-wrapper-checked': isUseCaseSelectAll}">
                                                    <span class="ivu-checkbox" :class="{'ivu-checkbox-checked': isUseCaseSelectAll}">
                                                        <span class="ivu-checkbox-inner"></span>
                                                        <input type="checkbox" class="ivu-checkbox-input">
                                                    </span>
                                                </label>
                                            </div>
                                        </th>
                                        <th v-for="col in recordDetail.params">
                                            <div class="ivu-table-cell">
                                                <div>{{col.name}}</div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="ivu-table-cell">
                                                <div>验证字段</div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="ivu-table-cell">
                                                <div>预期结果</div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="ivu-table-cell">
                                                <div>执行结果</div>
                                            </div>
                                        </th>
                                        <th class="ivu-table-column-center">
                                            <div class="ivu-table-cell">
                                                <div>操作</div>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>

                            <div class="ivu-table-body">
                                <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;" class="use-case-table">
                                    <colgroup>
                                        <col width="60"><col v-for="col in recordDetail.params"><col width="250"><col width="100"><col width="100"><col width="220">
                                    </colgroup>
                                    <tbody class="ivu-table-tbody">
                                    <tr class="ivu-table-row" :class="{'selected-row': item.selected, 'error-row': item.execute&&item.execute!=item.expect, 'info-row': item.execute&&item.execute==item.expect}" v-for="item in useCase">
                                        <td class="ivu-table-column-center">
                                            <div class="ivu-table-cell">
                                                <label @click="selectUseCase(item)" class="ivu-checkbox-wrapper" :class="{'ivu-checkbox-wrapper-checked': item.selected}">
                                                    <span class="ivu-checkbox" :class="{'ivu-checkbox-checked': item.selected}">
                                                        <span class="ivu-checkbox-inner"></span>
                                                        <input type="checkbox" class="ivu-checkbox-input">
                                                    </span>
                                                </label>
                                            </div>
                                        </td>
                                        <td v-for="col in recordDetail.params">
                                            <div class="ivu-table-cell">
                                                <div>
                                                    <span v-show="!item.isUpdating">{{item.row[col.name]}}</span>
                                                    <input type="text" v-show="item.isUpdating" v-model="item.row[col.name]" placeholder="{{col.name}}" class="ivu-input">
                                                    <!--<input v-show="param.isUpdating" type="text" v-model="param.name" placeholder="名称" class="ivu-input">-->
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="ivu-table-cell">
                                                <div>
                                                    <span v-show="!item.isUpdating">{{item.checkData}}</span>
                                                    <input type="text" v-show="item.isUpdating" v-model="item.checkData" placeholder="验证字段" class="ivu-input">
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="ivu-table-cell">
                                                <div>
                                                    <span v-show="!item.isUpdating">{{item.expect}}</span>
                                                    <!--<input type="text" v-show="item.isUpdating" v-model="item.expect" placeholder="预期结果" class="ivu-input">-->
                                                    <select v-show="item.isUpdating" class="ivu-input" v-model="item.expect">
                                                        <option value="1">1</option>
                                                        <option value="0">0</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="ivu-table-cell">
                                                <div>
                                                    <!--<input type="text" v-model="" placeholder="执行结果" class="ivu-input">-->
                                                    <span>{{item.execute}}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="ivu-table-column-center">
                                            <div class="ivu-table-cell">
                                                <div>
                                                    <i-button  @click="viewResult(item)" size="small">查看结果</i-button>
                                                    <i-button v-show="!item.isUpdating"  type="primary" @click="setUseCaseStatus(item)" size="small">修改</i-button>
                                                    <i-button v-show="item.isUpdating"  type="primary" @click="saveUseCase(item)" size="small">保存</i-button>
                                                    <i-button  type="error" @click="deleteUseCase(item, $index)" size="small">删除</i-button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Tab-pane>
            <Tab-pane label="返回示例" key="key2">
                <div>
                    <div>
                        <i-button  type="primary" @click="updateResponse()" >
                            <span v-show="!recordDetail.isEditResponse">修改</span>
                            <span v-show="recordDetail.isEditResponse">保存</span>
                        </i-button>
                    </div>
                    <pre v-show="!recordDetail.isEditResponse"><code class="language-javascript response-code"></code></pre>
                    <textarea v-show="recordDetail.isEditResponse" v-model="recordDetail.response" @keydown="useTab($event)"
                              class="ivu-input" style="width:99.5%;margin-top: 10px;" placeholder="请输入..." rows="20"></textarea>
                </div>
            </Tab-pane>
            <!--<Tab-pane label="异常示例" key="key3">-->
                <!--<div>-->
                    <!--异常示例-->
                <!--</div>-->
            <!--</Tab-pane>-->
        </Tabs>

    </article>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .ivu-article {
        .left-title {
            margin-right: 10px;
        }
        .record-detail {
            .ivu-input {
                width:500px;
            }
        }
        .selected-row {
            td {
                background-color: #ebf7ff;
            }
        }
        .info-row {
            td {
                background-color: #2db7f5;
                color: #fff;
            }
        }
        .error-row {
            td {
                background-color: #f60;
                color: #fff;
            }
        }
    }
    .use-case {
        position: relative;
        .use-case-loading {
            background: rgba(255, 255, 255, .5);
        }
    }


</style>


<script>
    import Vue from 'vue'

    export default{
        components: {
        },
        data() {
            return {
                recordDetail: {},   /*详情信息*/
                useCase: [],   /*测试用例数据*/
                isUseCaseSelectAll: false,  /*是否全选所有用例*/
                isProcessed: false, /*标志是否开始了测试*/
                isProcessing: false,    /*是否测试中*/
            }
        },
        methods: {
            /*获取接口详情*/
            getRecordDetail(){
                Vue.api('get-recordDetail', {_id: this.$route.params.id}).then((data)=>{
                    this.recordDetail = data.data;
                    const html = Prism.highlight(this.recordDetail.response, Prism.languages.javascript);
                    Vue.$('.response-code').html(html);
                })
            },

            setRecordDetailStatus(){
//                this.recordDetail.isEdit = true;
                Vue.set(this.recordDetail, 'isEdit', true);
            },
            /*保存接口详情*/
            saveRecordDetail(){
                const {_id, name, method, url, description} = this.recordDetail;
                Vue.api('put-record', {_id, name, method, url, description}).then((data) => {
                    this.recordDetail.isEdit = false;
                    Vue.set(this.recordDetail, 'updateBy', this.$root.userData);
                    this.$Message.info('操作成功！');
                });
            },
            /*新加一行参数*/
            addNewParams(){
                this.recordDetail.params.push({
                    name:'',
                    remark:'',
                    required:'0',
                    example:'',
                    defaults:'',
                    isUpdating: true,
                    isNew: true
                })
            },
            /*设置参数修改状态*/
            setParamStatus(param){
                Vue.set(param, 'isUpdating', true);
            },
            /*保存参数*/
            saveParams(param, index){

                /*校验参数名是否重复*/
                for(let i=0;i<this.recordDetail.params.length;i++){
                    if(this.recordDetail.params[i].name == param.name && i != index){
                        this.$Message.error('参数名不能重复！');
                        return;
                    }
                }

                if(param.isNew){
                    /*post 为新增*/
                    Vue.api('post-record/params', Object.assign({}, {_id: this.$route.params.id}, param)).then((data)=>{
                        console.log(data);
                        this.$Message.info('操作成功！');
                        Vue.set(param, 'createDate', data.data.createDate);
                        param.isUpdating = false;
                        param.isNew = false;
                    });
                }else{
                    /*put 为更新*/
                    Vue.api('put-record/params', Object.assign({}, {_id: this.$route.params.id, index:index}, param)).then((data)=>{
                        console.log(data);
                        this.$Message.info('操作成功！');
                        param.isUpdating = false;
                        param.isNew = false;
                    });
                }
            },
            /*删除参数*/
            deleteParams(param, index){
                if(confirm('删除项目，会把里面的所有数据都会清空，确定删除？')){
                    if(param.createDate){
                        Vue.api('delete-record/params', {_id: this.$route.params.id, createDate:param.createDate}).then((data)=>{
                            console.log(data);
                            this.recordDetail.params.splice(index, 1);
                            this.$Message.info('操作成功！');
                            param.isUpdating = false;
                            param.isNew = false;
                        });
                    }else{
                        this.recordDetail.params.splice(index, 1);
                    }
                }
            },
            /*获取测试用例*/
            getUseCase(){
                Vue.api('get-useCase', {record: this.$route.params.id}).then((data)=>{
                    console.log(data);
                    this.useCase = data.data;
                });
            },
            /*新加一行测试用例*/
            addNewUseCase(){
                let row = {};
                this.recordDetail.params.forEach(function (item, i) {
                    row[item.name] = '';
                })

                this.useCase.push({
                    checkData:'',
                    expect:'',
                    execute:'',
                    row:row,
                    isUpdating: true,
                    isNew: true
                })
            },
            /*保存用例*/
            saveUseCase(item, index){
                if(item.isNew){
                    /*post 为新增*/
                    Vue.api('post-useCase', Object.assign({}, {record: this.$route.params.id}, item)).then((data)=>{
                        console.log(data);
                        this.$Message.info('操作成功！');
                        Vue.set(item, '_id', data.data._id);
                        item.isUpdating = false;
                        item.isNew = false;
                    });
                }else{
                    /*put 为更新*/
                    Vue.api('put-useCase', item).then((data)=>{
                        console.log(data);
                        this.$Message.info('操作成功！');
                        item.isUpdating = false;
                        item.isNew = false;
                    });
                }
            },
            /*设置参数修改状态*/
            setUseCaseStatus(item){
                Vue.set(item, 'isUpdating', true);
            },
            /*删除测试用例*/
            deleteUseCase(item, index){
                if(confirm('删除项目，会把里面的所有数据都会清空，确定删除？')){
                    if(item._id){
                        Vue.api('delete-useCase', {_id: item._id}).then((data)=>{
                            console.log(data);
                            this.useCase.splice(index, 1);
                            this.$Message.info('操作成功！');
                            item.isUpdating = false;
                            item.isNew = false;
                        });
                    }else{
                        this.useCase.splice(index, 1);
                    }
                }
            },
            /*单条选择用例*/
            selectUseCase(item){
                Vue.set(item, 'selected', !item.selected);
            },
            /*全选/取消全选用例*/
            selectAllUseCase(){
                if(!this.isUseCaseSelectAll){
                    this.useCase.forEach(function (item, i) {
                        Vue.set(item, 'selected', true);
                    })
                }else{
                    this.useCase.forEach(function (item, i) {
                        Vue.set(item, 'selected', false);
                    })
                }
            },
            /*提交测试用例，进行测试*/
            postProcess: function () {
                try {
                    for(let item of this.useCase){
                        eval(`({ ${item.checkData} })`)
                    }
                }catch (e){
                    this.$Message.error('你输入的验证字段不符合格式要求！');
                    return;
                }

                let useCaseIds = this.useCase.map((item, i)=>{
                    if(item.selected){
                        return item._id;
                    }
                }).filter(Boolean);

                Vue.$('.use-case-loading').height(Vue.$('.use-case').height());
                this.isProcessing = true;

               Vue.api('post-process', {useCaseIds, recordId: this.$route.params.id}).then((data)=>{
                    console.log(data);
                    this.useCase.map((use, index)=> {
                        data.data.map((item, i)=>{
                            if(use._id == item._id){
                                Vue.set(use, 'execute', item.execute);
                                Vue.set(use, 'result', JSON.stringify(item.result, null, 2));
                            }

                        })
                    });

                    this.isProcessed = true;
                    this.$Message.info('操作成功！');
                    this.isProcessing = false;
               }).catch((res) => {
                    console.log(res.data);
                    this.$Message.info('有问题！');
                    this.isProcessing = false;
               });
            },
            /*重置测试*/
            resetProcess(){
                this.isProcessed = false;
                this.useCase.map(function (item, i) {
                    item.selected = false;
                    Vue.delete(item, 'execute');
                    Vue.delete(item, 'result');
                });
            },
            /*更新返回示例*/
            updateResponse(){
                Vue.set(this.recordDetail, 'isEditResponse', !this.recordDetail.isEditResponse);
                /*编辑状态*/
                if(!this.recordDetail.isEditResponse){
                    const {_id, response} = this.recordDetail;
                    Vue.api('put-record/response', {_id, response}).then((data)=>{
                        const html = Prism.highlight(this.recordDetail.response, Prism.languages.javascript);
                        Vue.$('.response-code').html(html);
                    });
                }
            },
            /*在textarea里面使用tab键需要处理*/
            useTab(e){
                if (e.keyCode == 9) {
                    var target = e.target;
                    e.preventDefault();
                    var indent = '    ';
                    var start = target.selectionStart;
                    var end = target.selectionEnd;
                    var selected = window.getSelection().toString();
                    selected = indent + selected.replace(/\n/g, '\n' + indent);
                    target.value = target.value.substring(0, start) + selected
                            + target.value.substring(end);
                    target.setSelectionRange(start + indent.length, start
                            + selected.length);
                }
            },
            /*查看结果*/
            viewResult(item){
                if(!item.result){
                    this.$Message.info('请先执行用例！');
                    return;
                }
                const html = Prism.highlight(item.result, Prism.languages.javascript);
                this.$Modal.info({
                    title: '查看结果',
                    width: 1024,
                    content: `<pre><code class="language-javascript" >${html}</code></pre>`
                })
            }
        },
        watch: {

        },
        computed: {
            isUseCaseSelectAll: function () {
                for(let item of this.useCase){
                    if(!item.selected){
                        return false;
                    }
                }

                return true;
            }
        },
        created: function () {

        },
        route: {
            data(){
                this.getRecordDetail();
                this.getUseCase();
//                this.updateParams();
            }
        }
    }
</script>