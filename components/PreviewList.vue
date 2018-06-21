<template>
    <div class="preview-area fl">
        <h3 class="title">体验者列表</h3>
        <div class="preview-btn" style="position: relative;" v-on:mousemove="changeItme(1)" v-on:mouseleave="changeItme(0)">
            <a class="wk-btn share-code" href="javascript:;">体验二维码</a>
            <div class="code-area" v-if="codeFlag">
                <img src="/api/qrcode/image/"/>
            </div>
        </div>
        <div class="clear">
            <input type="text" class="form-control fl" id="sharer" v-model="wkId" placeholder="输入体验账号，成功后扫码测试"/> <a class="add-btn wk-btn fl" href="javascript:;" v-on:click="add(0)">添加</a>
        </div>
        <ul class="list clear">
            <li v-for="preview in previewList">
                <a class="close" href="javascript:;" v-on:click="deletePreview(preview)"></a>
                <h3>编号{{preview.id}}</h3>
                <p>{{preview.wechatid}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    module.exports = {
        created: function(){
            this.getPreviwList();
        },
        data: function () {
            return {
                wkId: '',
                codeFlag: false,
                previewList: [],
            }
        },
        methods: {
            getPreviwList: function () {

                var that = this;
                that.$http.get('/api/bind/tester/list/').then(function(res){
                    var lists = res.data.data;
                    that.$set('previewList',lists.object_list);
                },function(error){
                });
            },
            changeItme: function (type) {
                type == 1 ? this.$set('codeFlag',true) : this.$set('codeFlag',false);
            },
            add: function () {
                var that = this,
                    wkId = that.$get('wkId');
                if(!wkId) {
                    layer.alert('体验账号不能为空!',{icon:2});
                }
                else {
                    that.$http.post('/api/bind/tester/',{
                        wechatid: wkId,}).then(function(res){
                            var details = res.data.data;
                            if(details.errcode !== 0) {
                                layer.alert('体验账号不存在或者不合法!',{icon:2});
                            }
                            else {
                                layer.alert('绑定成功！请至绑定者微信号确认体验者邀请');
                                that.getPreviwList();
                            }
                    },function(error){

                    });
                }
            },
            deletePreview: function (item) {
                var that = this;
                var wechatid = item.wechatid;
                var thlay = layer.confirm('确认删除该内容吗？',{title:'确认'},function () {
                    that.$http.post('/api/unbind/tester/', {
                        wechatid: wechatid,
                    }).then(function (res) {
                        var details = res.data.data;
                        if (details.errcode !== 0) {
                            layer.alert('解除绑定体验账号失败!', {icon: 2});
                        }
                        else {
                            layer.alert('解除绑定体验账号成功！');
                            that.getPreviwList();
                        }
                    }, function (error) {

                    });
                    layer.close(thlay);
                });
            }
        }
    }
</script>

<style scoped>
    .preview-area {background: #FFF;width: 100%;text-align: center;padding-top: 30px;overflow: hidden; min-height: 400px;}
    .share-code {margin-bottom: 45px; position: relative;cursor: pointer;}
    .share-code:before {text-indent: -100px;content:'.';width:25px;height:29px;display:inline-block;background: url("../assets/split.png") no-repeat -3px -158px;}
    .add-btn {line-height:45px;height: 45px;font-size: 16px;}
    .form-control {width: 30%;margin: 8px 5% 0 30%;border-radius: 30px;}
    .preview-btn{position: relative; width: 145px;margin: 0 auto;}
    .list {padding: 40px;}
    .list li{width: 29%;margin: 2%;border: 1px solid #e5e5e5; border-radius: 5px;text-align: left;position: relative;}
    .list li:nth-child(3n) {width: 30%;}
    .title {margin-bottom: 35px;}
    .list li h3 {margin-left: 15px;}
    .list li .close {width: 20px;height: 20px;background: url("../assets/split.png") no-repeat -3px -201px;position: absolute;top: 10px;right: 10px;opacity: 0.8;}
    .list li .close:focus,.list li .close:hover {opacity: 1;}
    .list li p {margin: 10px 0 20px 15px;line-height: 30px;}
    .code-area {z-index: 99;width: 242px;  height: 242px;  position: absolute; top: 43px;  left: 50%;  margin-left: -121px;  border-radius: 15px;  border: 1px solid #c6c3c3;  box-shadow: 1px 1px 2px 1px rgba(221, 221, 221, 0.48);  background: #FFF;}
    .code-area:before {text-indent: -100px;content:'.';width:25px;height:15px;background: url("../assets/split.png") no-repeat center -214px;position: absolute;top:-13px;left: 114px;}
    .code-area img {width: 230px;margin-top: 6px;}
</style>
