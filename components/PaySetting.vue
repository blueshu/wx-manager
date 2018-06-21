<template>
	<div class="main-area">
        <div class="pay-setting">
            <img src="../assets/pay.jpg"/>
            <h3>请输入微信支付信息（商户号）：</h3>
            <div class="pay-item">
                <label>
                    商户号：
                    <input type="text" class="form-control" v-model="mch_id" style="font-weight: normal;"/>
                    <p class="error" v-if="!mch_id">请输入商户号！</p>
                </label>
            </div>
            <div class="pay-item">
                <label>
                    API密钥：
                    <input type="text" class="form-control" v-model="api_secret" style="font-weight: normal;"/>
                    <p class="error" v-if="!api_secret">请输入API密钥！</p>
                </label>
            </div>
            <div class="pay-item last">
                <button class="btn btn-success save" v-on:click="save">连接</button>
            </div>
            <br class="clear">
            <p class="pay-msg">连接后请登入微信小程序后台进行配置，了解如何配置</p>
        </div>
    </div>
</template>

<script>
    module.exports = {
        created: function(){
            this.getPayDes();
        },
        data() {
            return {
                mch_id : '',
                api_secret : ''
            }
        },
        methods: {
            save: function () {
                var that = this,
                    mch_id = that.$get('mch_id'),
                    api_secret = that.$get('api_secret');
                if(mch_id && api_secret) {
                    that.$http.post('/minapp/pay/info/update/',{
                        mch_id: mch_id,
                        api_secret: api_secret,
                    }).then(function(){
                        layer.msg('修改支付信息成功');
                    },function(error){
                        //error
                    });
                }
            },
            getPayDes: function () {
                var that = this;
                that.$http.get('/minapp/pay/info/detail/').then(function(res) {
                    if(res.data && res.data.data){
                        that.$set('api_secret',res.data.data.api_secret);
                        that.$set('mch_id',res.data.data.mch_id);
                    }
                    else {
                        layer.alert('数据格式发生变更或者错误!', {icon: 2});
                    }
                },function(error){

                });
            }
        }
    }
</script>

<style scoped>
    .pay-setting {width: 80%;margin: 20px 10%;overflow: hidden;}
    .pay-setting img {width: 100%;}
    .pay-setting h3{text-align: center;margin: 30px 0;}
    .pay-item {float: left;width: 35%;margin-right:3%;}
    .last{ width: 20%;padding-top: 28px;}
    .pay-item label {width: 100%;}
    .pay-item label .form-control {margin-top: 10px;}
    .pay-msg {margin-top: 40px;}
    .error {color: red;font-weight: normal;}
</style>