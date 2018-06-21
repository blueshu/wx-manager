<template>
    <div class="create-version-area">
        <h3>小小内容模块初始化</h3>
        <form class="form-horizontal">
            <div class="form-group">
                <label for="version" class="col-sm-4 control-label">版本号：</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="version" placeholder="版本号" v-model="version">
                </div>
            </div>
            <div class="form-group">
                <label for="description" class="col-sm-4 control-label">描述：</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="description" placeholder="描述"  v-model="description">
                </div>
            </div>
            <div class="form-group">
                <label for="navBg" class="col-sm-4 control-label">导航栏背景颜色：</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="navBg" placeholder="导航栏背景颜色" v-model="app_config.navigationBarBackgroundColor" v-color data-key="navigationBarBackgroundColor">
                    <a href="javascript:;" class="choose-picker"  :style="{ 'background-color': app_config.navigationBarBackgroundColor}" ></a>
                </div>
            </div>
            <div class="form-group">
                <label for="navTitleBg" class="col-sm-4 control-label">导航栏标题颜色：</label>
                <div class="col-sm-5">
                    <select id="navTitleBg">
                        <option value="white" selected>白色</option>
                        <option value="black">黑色</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="navTitle" class="col-sm-4 control-label">导航栏标题：</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="navTitle" placeholder="导航栏标题" v-model="app_config.navigationBarTitleText">
                </div>
            </div>
            <div class="form-group">
                <label for="winBg" class="col-sm-4 control-label">窗口背景颜色：</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="winBg" placeholder="窗口背景颜色" v-model="app_config.backgroundColor" v-color data-key="backgroundColor">
                    <a href="javascript:;" class="choose-picker" :style="{ 'background-color': app_config.backgroundColor}"></a>
                </div>
            </div>
            <div class="form-group">
                <label for="winBg" class="col-sm-4 control-label">下拉背景样式：</label>
                <div class="col-sm-5">
                    <select v-model="app_config.backgroundTextStyle">
                        <option value="dark">深色</option>
                        <option value="light">浅色</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <a href="javascript:;" class="btns cancel-btn" v-on:click="doCancel()">取消</a>
                    <a href="javascript:;" class="btns sure-btn" v-if="!id" v-on:click="doCreate()">创建</a>
                    <a href="javascript:;" class="btns sure-btn" v-else v-on:click="doUpdate()">修改</a>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    module.exports = {
        created: function () {
            var that = this;
            that.$http.get('/apptemplates/version/list/').then(function(res){
                var list = res.data.data.object_list,
                    len = list.length;
                if(len > 0) {
                    var obj = list[0];
                    that.$set('id',obj.id);
                    that.$set('version',obj.version);
                    that.$set('description',obj.description);
                    that.$set('status',obj.status);
                    that.$set('app_config',JSON.parse(obj.app_config));
                }

            },function(error){
                //error
            });
        },
        data: function () {
            return {
                id: '',
                version: '1.0',
                description: '',
                status: 0,
                app_config: {
                    navigationBarBackgroundColor: '#000000',
                    navigationBarTextStyle: 'white',
                    navigationBarTitleText: '',
                    backgroundColor: '#ffffff',
                    backgroundTextStyle: 'light',
                    enablePullDownRefresh: false
                }
            }
        },
        methods: {
            doCreate: function () {
                if(!this.$data.description) {
                    layer.alert('描述信息不能为空!',{icon:2});
                }
                else if(!this.$data.app_config.navigationBarTitleText) {
                    layer.alert('导航栏标题不能为空!',{icon:2});
                }
                else if(!this.$data.version) {
                    layer.alert('版本号不能为空!',{icon:2});
                }
                else {
                    //to do add
                    function cloneObject(obj) {
                        var clone = {};
                        for(var i in obj) {
                            if(typeof(obj[i])=="object")
                                clone[i] = cloneObject(obj[i]);
                            else
                                clone[i] = obj[i];
                        }
                        return clone;
                    }
                    var that = this;
                    var param = cloneObject(that.$data);
                    delete param.id;
                    param.app_config = JSON.stringify(param.app_config);
                    that.$http.post('/apptemplates/version/add/',param).then(function(data){
                        layer.closeAll();
                        that.$emit('render-self');
                    },function(error){
                        //error
                    })
                }
            },
            doUpdate: function () {
                if(!this.$data.description) {
                    layer.alert('描述信息不能为空!',{icon:2});
                }
                else if(!this.$data.app_config.navigationBarTitleText) {
                    layer.alert('导航栏标题不能为空!',{icon:2});
                }
                else if(!this.$data.version) {
                    layer.alert('版本号不能为空!',{icon:2});
                }
                else {
                    //to do add
                    function cloneObject(obj) {
                        var clone = {};
                        for(var i in obj) {
                            if(typeof(obj[i])=="object")
                                clone[i] = cloneObject(obj[i]);
                            else
                                clone[i] = obj[i];
                        }
                        return clone;
                    }
                    var that = this;
                    var param = cloneObject(that.$data);
                    param.app_config = JSON.stringify(param.app_config);
                    that.$http.post('/apptemplates/version/update/',param).then(function(data){
                        layer.closeAll();
                        that.$emit('render-self');
                    },function(error){
                        //error
                    })
                }
            },
            doCancel: function () {
                this.clearColor();
                this.$emit('close-layer')
            },
            clearColor: function () {
                $('.wk-color-picker-con').remove();
            }
        }
    }
</script>

<style scoped>
    .create-version-area {width: 100%;text-align: center;overflow: hidden;}
    .create-version-area h3 {font-size: 18px;font-weight: bold;position: relative;line-height: 30px;}
    .create-version-area h3:before {content: '.';width: 35px;height: 40px;background: url("../assets/split.png") no-repeat center 1px;display: block;position: absolute;left: 200px; top: 0; text-indent: -100px;overflow: hidden;}
    .form-horizontal .form-group {margin: 20px 0;}
    .choose-picker {display: block;width: 25px;height: 25px;position: absolute; right: 22px;  top: 5px;  border-radius: 30px;}
    select {width: 100%;height: 35px;line-height: 35px;border: 1px solid #ccc;  border-radius: 4px;  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);}
    input[type="text"] {height: 35px;}
    .cancel-btn {margin-right: 60px;background-color: #d7d7d7;border-color: #d7d7d7;}
</style>
