<template>
    <div class="fl">
        <div class="user-info">
            <img class="user-icon" v-bind:src="headImg" style="border-radius: 100%;"/>
            <p class="program-name">小程序名：{{programName}}</p>
            <p class="program-limit">授权时间: {{programData}}天</p>
            <p class="program-status" v-if="programStatusFlag">已授权</p>
            <a class="program-status" v-else href="javascript:;" v-on:click="doAuthorize()">快速授权</a>
            <br>
            <a href="javascript:;" class="lz" v-link="{name: 'formManager'}">我的留资</a>
            <br>
            <a href="javascript:;" class="lz" v-link="{name: 'copyrightManage'}">我的版权</a>
            <br>
            <a href="javascript:;" class="lz" v-link="{name: 'commodity'}">我的商品</a>
            <br>
            <a href="javascript:;" class="disabled" v-if="!programStatusFlag">进入管理后台</a>
            <a href="javascript:;" v-else v-link="{name: 'news'}">进入管理后台</a>
        </div>

        <img src="../assets/right-ann.jpg"/>
    </div>
</template>
<script>
    module.exports = {

        data: function () {
            return {
                headImg : '../assets/header-icon.gif',
                programName: '--',
                programStatusFlag:  false,
                programStatus:  '接口未授权',
                programData: 0,
            }
        },
        created: function () {
            var that = this;
            that.$http.post('/user/status/').then(function(res){
                var dt = res.data.data,
                    wechat_permit = dt.wechat_permit;
                if(wechat_permit) {
                    that.$set('programStatusFlag',true);
                }
                else {
                    layer.confirm('您还没有授权，授权将前往公众号授权页面。去授权吗？',{title:'授权'},function () {
                        window.location.href = '/wechat/bind/minapp/';
                    });
                }
                dt.nick_name ? that.$set('programName',dt.nick_name) : '';
                dt.used_days ? that.$set('programData',dt.used_days) : '';
                dt.head_img ? that.$set('headImg',dt.head_img) : '';
                if(!dt.login) { //un login
                    location.href = 'login.html';
                }
            },function(error){
                //error
            });
        },
        methods: {
            doAuthorize: function () {
                layer.confirm('即将前往公众号授权页面，确认授权吗？',{title:'授权'},function () {
                    window.location.href = '/wechat/bind/minapp/';
                });
            },

        }
    }
</script>

<style scoped>
    .user-info {background: #FFF;width: 250px;text-align: center;padding-bottom: 40px;}
    .user-icon {margin: 30px 0 20px;width: 87px;height: 87px;}
    .program-name {font-weight: bold;}
    .program-limit {color: #b6b6b6;}
    .program-status {opacity: 0.8; margin: 20px 0;color: #54a427; border: 1px solid #54a427;border-radius: 5px;width: 112px;line-height: 35px;display: inline-block;}
    .program-status:hover {opacity: 1;}
    .lz {margin-bottom: 20px; }
    .user-info a:last-child,.lz {background-color: #54a427; color: #FFF;border-radius: 5px;border: 1px solid #54a427;width: 112px;line-height: 35px;display: inline-block;}
</style>
