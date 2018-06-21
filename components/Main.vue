<template>
    <banner-area></banner-area>
    <div class="main-area">
        <user-info></user-info>
        <div class="area fr">
            <div class="menu-item">
                <a href="javascript:;" v-bind:class="{'select': index === 0 }" v-on:click="changeItme(0)">小程序版本管理</a>
                <a href="javascript:;" v-bind:class="{'select': index === 1 }" v-on:click="changeItme(1)">小程序预览体验</a>
            </div>
            <div class="display-area" v-bind:class="{ 'show': index === 0,'hide': index === 1}">
                <dev-version :list="objList" v-on:change-online="changeOnline"></dev-version>
                <online-version></online-version>
            </div>
            <div class="display-area" v-bind:class="{ 'show': index === 1,'hide': index === 0}">
                <preview-list></preview-list>
            </div>
        </div>
    </div>

</template>
<script>
    module.exports = {
        created: function(){
            var that = this;
            that.$http.get('/apptemplates/version/list/').then(function(res){
                //that.$data = res.data.object_list;
                //that.$set('objList',res.data.data.object_list);

                that.$broadcast('sent-data', res.data.data.object_list);
            },function(error){
                //error
            });
        },
        data () {
            return {
                index: 0,
                objList: null
            }
        },
        components:{
            'banner-area': require('./Banner.vue'),
            'user-info': require('./UserInfo.vue'),
            'dev-version': require('./DevVersion.vue'),
            'online-version': require('./OnlineVersion.vue'),
            'preview-list': require('./PreviewList.vue')
        },
        methods: {
            changeItme: function (index) {
                this.$data.index = index;
            },
            changeOnline: function () {
                this.$broadcast('sent-change', 1);
            }
        }
    }
</script>
<style scoped>
    .layui-layer{border-radius:22px;}
    .area {position: relative;}
    .display-area {
        overflow: hidden;
        width: 100%;
    }
    .area .show {
        -webkit-animation-name: glow;
        -webkit-animation-duration: 1s;
    }
    .area .hide {
        -webkit-animation-name: hides;
        -webkit-animation-duration: 1s;
    }

    @-webkit-keyframes glow {
        0% {
            opacity: 0;
            display: none;
        }
        100% {
            opacity: 1;
            display: block;
        }
    }
    @-webkit-keyframes hides {
        0% {
            opacity: 1;
            display: block;
        }
        100% {
            opacity: 0;
            display: none;
        }
    }
</style>


