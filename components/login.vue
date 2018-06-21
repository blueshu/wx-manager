<template>
    <a v-on:click="doLogin(menu)" href="javascript:;">登录</a>
    <a v-on:click="doRegister(menu)" href="javascript:;">注册</a>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                name: "kevin",
                password: "123456"
            }
        },
        methods: {
            doLogin: function () {
                var that = this;
                that.$http.post('/users/login/',that.$data).then(function(data){

                },function(error){
                    //error
                })
            },
            doRegister: function () {
                var that = this;
                that.$http.post('/users/reg/',that.$data).then(function(data){

                },function(error){
                    //error
                });
            }
        }
    }
</script>
