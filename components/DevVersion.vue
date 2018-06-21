<template>
    <div class="list-info fl">
        <h3>开发版本</h3>
        <p>名称：{{name}}</p>
        <p>版本号：{{version}}</p>
        <p>描述：{{description}}</p>
        <a class="create-version" href="javascript:;" v-if="!flag" v-on:click="createVersion()">创建版本</a>
        <a class="create-version" href="javascript:;" v-else v-on:click="updateVersion()">修改版本</a>
        <a class="do-apply" href="javascript:;" v-on:click="apply()">提交审核</a>
        <img src="../assets/center-ann.jpg" style="margin-bottom: 40px;"/>
    </div>
    <div class="create-version-layer"><create-version v-on:close-layer="closeLayerSelf" v-on:render-self="renderSelf"></create-version></div>
</template>
<script>
    module.exports = {
        props: {
            list: {
                type: Object
            },
            flag: false
        },
        data: function () {
            return {
                name: '小小内容',
                version:  1.0,
                description: '小小内容小小内容小小内容小小内容小小内容'
            }
        },
        created: function () {
            this.$data = this.list;
            if(this.list && this.list.length > 0) {
                this.$set('flag',true);
            }
        },
        components:{
            'create-version': require("./CreateVersion.vue")
        },
        events: {
            'sent-data': function (res) {
                this.$data = res[0];
                if(res && res.length > 0) {
                    this.$set('flag',true);
                }
            }
        },
        methods: {
            createVersion: function () {
                //layer.open()
                this.layIndex = layer.open({
                    type: 1,
                    title: false,
                    shadeClose: true,
                    shade: [0.5, '#dad6d6'],
                    area: ['642px','520px'],
                    content: $('.create-version-layer')
                });
            },
            updateVersion: function () {
                this.layIndex = layer.open({
                    type: 1,
                    title: false,
                    shadeClose: true,
                    shade: [0.5, '#dad6d6'],
                    area: ['642px','520px'],
                    content: $('.create-version-layer')
                });
            },
            apply: function () {
                var that = this;
                that.$http.post('/apptemplates/app/online/push/',{
                    id: that.$get('id')
                }).then(function(res){
                    layer.msg('提交成功、等待验证中',{icon:1});
                    that.$emit('change-online');
                },function(error){
                });
            },
            closeLayerSelf: function () {
                layer.close(this.layIndex);
            },
            renderSelf: function () {
                debugger;
                var that = this;
                that.$http.get('/apptemplates/version/list/').then(function(res){
                    var list = res.data.data.object_list;
                    that.$data = list[0];
                    if(list.length > 0) {
                        that.$set('flag',true);
                    }
                },function(error){
                    //error
                });
            }
        }
    }
</script>

<style scoped>
    .list-info {background: #FFF;width: 100%;text-align: center;padding-top: 30px;overflow: hidden;}
    h3 {margin-bottom: 35px;}
    p {width: 250px;margin: 10px auto;text-align: left;line-height: 30px;}
    .list-info a {background-color: #54a427; color: #FFF;border-radius: 30px;border: 1px solid #54a427;width: 110px;line-height: 35px;display: inline-block;}
    .create-version {margin: 40px 80px 50px 0;}
</style>
