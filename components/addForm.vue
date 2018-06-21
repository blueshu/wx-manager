<template>
    <div class="main-area">
        <a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'formManager'}">< 返回</a>
        <br class="clear">
        <h1>新建活动</h1>
        <div class="add-lz-content">
            <div class="fast-choose fl">
            <div></div>
                <h3>快速选择</h3>
                <ul>
                    <li v-for="formInput in formInputs">
                        <a href="javascript:;" class="choose-btn" v-on:click="chooseForm(formInput)">+</a>
                        <label>{{formInput.name}}</label>
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
                <p class="msg">
                    您可在此面板快速选择需要让用户填写的表单信息。
                </p>
            </div>
            <div class="add-content fl">
                <label class="add-title">活动名称 </label>
                <input type="text" class="form-control title-input" placeholder="活动名称" v-model="activityName"/>
                <p class="error" v-if="activityNameFlag">请输入活动名称</p>
                <div class="content-area">
                    <ul>
                        <li v-for="formItem in selectMessage" track-by="$index">
                            <select v-on:change="changeSelect($event,formItem)" v-model="formItem.name">
                                <option v-for="formInput in formInputs">{{formInput.name}}</option>
                            </select>

                            <label class="label-sex" v-if="formItem.type === 'radio'">
                                <input type="radio" name="sex" checked>{{specialObj.sex.list[0].name}}
                            </label>
                            <label class="label-sex" v-if="formItem.type === 'radio'">
                                <input type="radio" name="sex"> {{specialObj.sex.list[1].name}}
                            </label>
                            <textarea class="form-control choose-msg" v-if="formItem.type === 'textarea'"  placeholder="{{formItem.name}}"></textarea>
                            <input type="{{formItem.type}}" class="form-control" v-if="formItem.type === 'text'" placeholder="{{formItem.name}}"/>
                            <input type="{{formItem.type}}" class="form-control" v-if="formItem.type === 'tel'" placeholder="{{formItem.name}}"/>
                            <input type="{{formItem.type}}" class="form-control" v-if="formItem.type === 'email'" placeholder="{{formItem.name}}"/>
                            <input type="{{formItem.type}}" class="form-control" v-if="formItem.type === 'date'" placeholder="{{formItem.name}}"/>

                            <a href="javascript:;" title="删除" v-on:click="deleteForm(formItem)"><img style="width: 20px" src="../assets/delete.png"/></a>
                        </li>
                    </ul>
                    <div class="center">
                        <a href="javascript:;" class="btn btn-success" v-on:click="addForm()">添加字段</a>
                        <a href="javascript:;" class="btn btn-info" v-on:click="saveForm()">保 存</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

    module.exports = {
        created: function(){
            this.getList();
        },
        data () {
            return {
                activityNameFlag: false,
                activityName: '',
                specialObj: {
                    sex: {
                        list: [
                            {name: '男', value: 'man'},
                            {name: '女', value: 'woman','isChecked': true}
                        ]
                    }
                },
                formInputs: [
                    {name: '姓名',type: 'text'},
                        { name: '性别',key: 'sex',type: 'radio',list: [
                        {name: '男', value: 'man'},
                        {name: '女', value: 'woman','isChecked': true}
                    ]},
                    {
                        name: '手机',
                        type: 'tel',
                    },
                    {
                        name: '邮箱',
                        type: 'email',
                    },
                    {
                        name: '生日',
                        type: 'date',
                    },
                    {
                        name: '地址',
                        type: 'text',
                    },
                    {
                        name: 'QQ',
                        type: 'text',
                    },
                    {
                        name: '微信',
                        type: 'text',
                    },
                    {
                        name: '留言',
                        type: 'textarea',
                    },
                    {
                        name: '公司',
                        type: 'text',
                    }
                ],
                idString: '',
                selectMessage: [
                    {
                        sid: 1,
                        name: '姓名',
                        type: 'text',
                    }
                ]
            }
        },
        methods: {
            getList: function () {
                var that = this;
                that.$http.get('/minform/form/enums/list/').then(function(res) {
                    if(res.data && res.data.data && res.data.data.object_list && res.data.data.object_list.length > 0){
                        that.$set('formInputs',res.data.data.object_list);
                        that.$set('selectMessage',[res.data.data.object_list[0]]);
                        this.$set('idString',''+ res.data.data.object_list[0].id);
                    }
                    else {
                        layer.alert('数据格式发生变更或者错误!', {icon: 2});
                    }
                },function(error){

                });
            },
            deleteForm: function (obj) {
                var items = this.$get('selectMessage'),
                    that = this,
                    idString = this.$get('idString');
                var thlay = layer.confirm('确认删除该内容吗？',{title:'确认'},function () {
                    idString = idString.replace(obj.id.toString(),'');
                    that.$set('idString', idString);
                    for(var i = 0, len = items.length; i < len; i++) {
                        if(items[i].id === obj.id) {
                            items.splice(i,1);
                            break;
                        }
                    }
                    layer.close(thlay);
                });
            },
            addForm: function () {
                var items = this.$get('selectMessage'),
                    formInputs = this.$get('formInputs'),
                    idString = this.$get('idString'),
                    addInput = null;
                for(var i = 0,len = formInputs.length; i < len; i++) {
                    var sid = formInputs[i].id;
                    if(idString.indexOf(sid) < 0) {
                        addInput = JSON.parse(JSON.stringify(formInputs[i]));
                        break;
                    }
                }
                this.$set('idString',(idString+''+addInput.id));
                items.push(addInput);
            },
            changeSelect: function (e,obj) {
                var sVal = e.target.value,
                    select = null,
                    sid = obj.id,
                    formInputs = this.$get('formInputs'),
                    items = this.$get('selectMessage');
                for(var i = 0, len = formInputs.length; i < len; i++) {
                    if(formInputs[i].name === sVal) {
                        select = JSON.parse(JSON.stringify(formInputs[i]));
                        break
                    }
                }
                for(var i = 0, len = items.length; i < len; i++) {
                    if(items[i].id === sid) {
                        items[i] = select;
                        break;
                    }
                }
                //this.$set('selectMessage',items);
            },
            chooseForm: function (item) {
                var sId = item.id,
                    items = this.$get('selectMessage'),
                    idString = this.$get('idString');
                if(idString.indexOf(sId) < 0) {
                    this.$set('idString',(idString+''+sId));
                    items.push(item);
                }
                else {
                    layer.alert('表单-'+ item.name +'-已经添加!', {icon: 2});
                }

            },
            saveForm: function () {
                var activityName = this.$get('activityName');
                if(activityName) {
                    this.$set('activityNameFlag', false);
                    var items = this.$get('selectMessage');
                    if(!items || items.length == 0) {
                        layer.alert('表单内容不能为空!', {icon: 2});
                        return;
                    }
                    var that = this;
                    var form_enums_list = [];
                    for(var i = 0,len = items.length; i < len; i++) {
                        form_enums_list.push({
                            form_enums_id: items[i].id
                        })
                    }
                    that.$http.post('/minform/campaign/update/',{
                        content_id: 0,
                        name: activityName,
                        form_enums_list: JSON.stringify(form_enums_list)
                    }).then(function(){
                        layer.msg('添加活动成功');
                        that.$router.go('formManager');
                    },function(error){
                        //error
                    });
                }
                else {
                    this.$set('activityNameFlag', true);
                }
            }
        }
    }
</script>
<style scoped>
    .error {color: red;margin: 20px 0 0 109px;}
    .back-i {border-top-left-radius: 0;border-bottom-left-radius: 0;}
    .main-area {background: #FFF;padding: 20px;}
    .main-area h1 { text-align: center; font-size: 22px;margin: 20px 0;}
    .fast-choose {width: 32%;border: 1px solid #DDD; overflow: hidden;}
    .add-content {width: 66%;margin-left: 2%;border: 1px solid #DDD; overflow: hidden;min-height: 714px;padding: 20px;}
    .fast-choose h3 {border-bottom: 1px solid #DDD; text-align: center;font-size: 22px;margin: 0;line-height: 50px;}
    .fast-choose ul {margin: 20px;width: 90%; overflow: hidden;}
    .fast-choose ul li {width: 100%;overflow: hidden;margin: 10px 0;}
    .fast-choose label {margin: 0 10px;width: 10%;}
    .fast-choose .choose-btn {font-weight: bolder;  font-size: 30px;  display: inline-block;  vertical-align: middle;  line-height: 20px;text-decoration: none !important;}
    .fast-choose ul li .form-control {width: 70%;display: inline-block}
    .choose-msg {vertical-align: text-top;resize: none;}
    .label-sex {font-weight: normal;}
    .msg {margin: 0 0 20px 20px;  width: 65%;  line-height: 25px;  color: #398439;}
    .add-title {width: 15%;font-size: 20px;font-weight: normal;}
    .title-input {width: 80%;display: inline-block;height: 40px;}
    .content-area {margin: 40px 20px;}
    .content-area ul {width: 96%;margin: 20px 2%;overflow: hidden;}
    .content-area li {width: 100%;margin-bottom: 20px;}
    .content-area li >a {margin: 5px;float: right;}
    .content-area select {display: inline-block;  border: 1px solid #DDD;  height: 32px;  padding: 4px 10px;  border-radius: 4px;}
    .content-area .form-control {display: inline-block;width: 80%;}
    .content-area .choose-msg {margin-top: -9px;}
    .center {text-align: center;}
</style>


