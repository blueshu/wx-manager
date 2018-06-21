<template>
    <div class="main-area">
        <a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'index'}">< 返回</a>
        <br class="clear">
        <h1>版权管理</h1>
        <div class="cop-content">
            <label class="label-sex">当前版权信息：</label>
            <p>{{copyrightMsg}}</p>
            <br>
            <label class="label-sex">我的版权信息：</label>
            <input type="text" class="form-control" placeholder="请输入更新的版权信息" v-model="newCopyrightMsg" v-on:blur="verifyCopyright"/>
            <p class="error" v-show="newCopyrightMsgError">请输入新的版权信息</p>
            <div class="center">
                <a href="javascript:;" class="btn btn-success" v-on:click="saveCopy()">修 改</a>
            </div>
        </div>
    </div>
</template>
<script>

    module.exports = {
        created: function(){
            this.getCopyright();
        },
        data () {
            return {
                newCopyrightMsgError: false,
                copyrightMsg: '小小内容',
                newCopyrightMsg: ''
            }
        },
        methods: {
            getCopyright: function () {
                var that = this;
                that.$http.get('/minapp/copyright/detail/').then(function(res){
                    that.$set('copyrightMsg',res.data.data.copyright);
                },function(error){

                });
            },
            verifyCopyright: function () {
                var newCopyrightMsg = this.$get('newCopyrightMsg');
                if(newCopyrightMsg) {
                    this.$set('newCopyrightMsgError',false);
                }
                else {
                    this.$set('newCopyrightMsgError',true);
                }
            },
            saveCopy: function () {
                var newCopyrightMsg = this.$get('newCopyrightMsg');
                if(newCopyrightMsg) {
                    this.$set('newCopyrightMsgError',false);
                    var that = this;
                    that.$http.post('/minapp/copyright/update/',{
                        copyright: newCopyrightMsg
                    }).then(function(){
                        layer.msg('修改活动成功');
                        that.$set('copyrightMsg',newCopyrightMsg);
                        that.$set('newCopyrightMsg','');
                    },function(error){
                        //error
                    });
                }
                else {
                    this.$set('newCopyrightMsgError',true);
                }

            }
        }
    }
</script>
<style scoped>
    .back-i {border-top-left-radius: 0;border-bottom-left-radius: 0;}
    .main-area {background: #FFF;padding: 20px;}
    .main-area h1 { text-align: center; font-size: 22px;margin: 20px 0;}
    .cop-content {padding: 20px 280px;font-size: 16px;line-height: 40px;}
    .cop-content label {font-weight: normal;width: 20%}
    .cop-content >p {display: inline-block;}
    .cop-content .form-control {display: inline-block;width: 65%;}
    .cop-content .center {text-align: center;margin: 20px 0;}
    .error {color: red;}
</style>


