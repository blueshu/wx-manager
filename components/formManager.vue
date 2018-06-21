<template>
    <div class="main-area">
        <h1>留资转化管理</h1>
        <a class="wk-btn fr add-form" v-link="{name: 'addForm'}">新建表单</a>
        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th style="width: 40%;">活动名称</th>
                <th>创建时间</th>
                <th>关联内容</th>
                <th style="width: 25%;">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="obj in objList">
                <td>{{obj.name}}</td>
                <td>{{returnDataStr(obj.create_time)}}</td>
                <td>
                    <a href="javascript:;" class="btn btn-success" v-if="obj.content_id === 0" v-on:click="buildConnect(obj)">关联</a>
                    <a title="{{obj.content_name}}" v-link="{name: 'updateNews',params:{id: obj.content_id,publicFlag: true}}" v-if="obj.content_id !== 0">{{obj.content_id}}</a>
                    <a href="javascript:;" class="btn btn-warning" v-if="obj.content_id !== 0" style="margin-left: 10px;" v-on:click="disConnect(obj)">解除关联</a>
                </td>
                <td>
                    <a href="javascript:;"  class="btn btn-default" style="margin-right: 20px;" v-on:click="displayStyle(obj)">样式</a>
                    <a class="btn btn-info" style="margin-right: 20px;" v-link="{name: 'formSources'}">数据</a>
                    <a class="btn btn-primary" style="margin-right: 20px;" v-if="obj.content_id == 0" v-link="{name: 'updateForm',params:{id: obj.id}}">修改</a>
                    <a href="javascript:;" title="删除" v-if="obj.content_id == 0" v-on:click="deleteActivity(obj)"><img style="width: 20px" src="../assets/delete.png"/></a>
                </td>
            </tr>
            <tr v-if="objList && objList.length === 0">
                <td colspan="4" style="text-align: center;">暂无数据</td>
            </tr>
            </tbody>
        </table>
        <table class="table" id="navArea" style="display: none;">
            <thead>
            <tr>
                <th>文章名称</th>
                <th>图片</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cont in contentList" >
                <td>{{cont.title}}</td>
                <td><img v-bind:src="cont.content_pic" style="width: 200px;height:100px;"/></td>
                <td><a href="javascript:;" class="btn btn-success" v-on:click="doConnect(cont)">选择</a> </td>
            </tr>
            </tbody>
        </table>
        <form class="style-form" id="styleForm">
            <ul>
                <li v-for="formInput in selectForm">
                    <label>{{formInput.name}}:</label>
                    <label class="label-sex" v-if="formInput.type === 'radio'">
                        <input type="radio" name="sex" checked>{{specialObj.sex.list[0].name}}
                    </label>
                    <label class="label-sex" v-if="formInput.type === 'radio'">
                        <input type="radio" name="sex"> {{specialObj.sex.list[1].name}}
                    </label>
                    <textarea class="form-control choose-msg" v-if="formInput.type === 'textarea'" placeholder="{{formInput.name}}"></textarea>
                    <input type="{{formInput.type}}" class="form-control" v-if="formInput.type === 'text'" placeholder="{{formInput.name}}"/>
                    <input type="{{formInput.type}}" class="form-control" v-if="formInput.type === 'tel'" placeholder="{{formInput.name}}"/>
                    <input type="{{formInput.type}}" class="form-control" v-if="formInput.type === 'email'" placeholder="{{formInput.name}}"/>
                    <input type="{{formInput.type}}" class="form-control" v-if="formInput.type === 'date'" placeholder="{{formInput.name}}"/>
                </li>
            </ul>
        </form>
    </div>

</template>
<script>
    module.exports = {
        created: function(){
			this.getList();
			this.getNewList();
        },
        data () {
            return {
                specialObj: {
                    sex: {
                        list: [
                            {name: '男', value: 'man'},
                            {name: '女', value: 'woman','isChecked': true}
                        ]
                    }
                },
                index: 0,
                objList: [],
                contentList: [],
                selectForm: [],
                page: null
            }
        },
        methods: {
            returnDataStr: function (str) {
                var d = new Date(str),
                    year = d.getFullYear(),
                    m = d.getMonth()+1,
                    min = d.getMinutes(),
                    h = d.getHours(),
                    d = d.getDate();
                m = m >= 10 ? m: 0+''+m;
                d = d >= 10 ? d: 0+''+d;
                min = min >= 10 ? min : 0+''+min;
                h = h >= 10 ? h : 0+''+h;
                return year+'-'+m+'-'+d+' '+h+':'+min;
            },
            getList: function () {
                var that = this;
                that.$http.get('/minform/campaign/list/').then(function(res) {
                    if(res.data && res.data.data && res.data.data.object_list && res.data.data.object_list.length > 0){
                        that.$set('objList',res.data.data.object_list);
                    }
                    else {
                        layer.alert('数据格式发生变更或者错误!', {icon: 2});
                    }
                },function(error){

                });
            },
            changeItme: function (index) {
                this.$data.index = index;
            },
            getNewList: function () {
                var that = this;
                that.$http.get('/app/setings/content/list/?state=1').then(function(res){
                    var dataRes = res.data.data.object_list;
                    that.$set('contentList',dataRes);
                    //that.$set('page',res.data.data.paginator);
                },function(error){
                });
            },
            buildConnect: function (activity) {
                this.activity = activity;
                this.tableLay = layer.open({
                    type: 1,
                    content: $('#navArea'),
                    area: ['620px', '700px'], //宽高
                });
            },
            doConnect: function (cont) {
                layer.close(this.tableLay);
                var that = this;
                var res = JSON.parse(JSON.stringify(that.activity));
                res.content_id = cont.id;
                res.content_name = cont.title;
                if(res.create_time) {
                    delete res.create_time;
                }
                if(res.update_time) {
                    delete res.update_time;
                }
                that.$http.post('/minform/campaign/update/',res).then(function(){
                    layer.msg('关联成功!');
                    that.getList();
                },function(error){
                    //error
                });
            },
            disConnect: function (activity) {
                var that = this;
                var thlay = layer.confirm('确认解除关联吗？',{title:'确认'},function () {
                    var res = JSON.parse(JSON.stringify(activity));
                    res.content_id = 0;
                    if(res.create_time) {
                        delete res.create_time;
                    }
                    if(res.update_time) {
                        delete res.update_time;
                    }
                    that.$http.post('/minform/campaign/update/',res).then(function(){
                        layer.close(thlay);
                        layer.msg('解除关联成功!');
                        that.getList();
                    },function(error){
                        //error
                    });
                });
            },
            displayStyle: function (obj) {
                this.$set('selectForm',obj.form_field)
                this.tableLay = layer.open({
                    type: 1,
                    shade: false,
                    title: false, //不显示标题
                    content: $('#styleForm'),
                    area: ['375px', '500px'], //宽高
                });
            },
            deleteActivity: function (activity) {
                var that = this;
                var thlay = layer.confirm('确认解除此活动吗？',{title:'确认'},function () {
                    that.$http.post('/minform/campaign/delete/',{id:activity.id}).then(function(){
                        layer.close(thlay);
                        layer.alert('删除活动成功!');
                        that.getList();
                    },function(error){
                        //error
                    });
                });
            }
        }
    }
</script>
<style scoped>
    .main-area {background: #FFF;padding: 20px;}
    .main-area h1 { text-align: center; font-size: 22px;margin: 20px 0;}
    .add-form {margin-bottom: 20px;}
    .style-form {display: none;}
    .style-form ul {margin: 60px 20px;}
    .style-form li {width: 100%;margin: 10px 0;}
    .style-form label {width: 10%;font-weight: normal;}
    .style-form .form-control {width: 70%;display: inline-block;}
</style>


