<template>
    <div class="main-area">
        <div class="area fr comm-area">
            <div class="menu-item comm-item">
                <a href="javascript:;" v-bind:class="{'select': index === 0 }" v-on:click="changeItme(0)">商品设置</a>
                <a href="javascript:;" v-bind:class="{'select': index === 1 }" v-on:click="changeItme(1)">物流设置</a>
                <a href="javascript:;" v-bind:class="{'select': index === 2 }" v-on:click="changeItme(2)">支付设置</a>
            </div>
            <div class="display-area" v-bind:class="{ 'show': index === 0,'hide': index === 1||index===2}">
                <commodity-setting></commodity-setting>
            </div>
            <div class="display-area" v-bind:class="{ 'show': index === 1,'hide': index === 0||index===2}">
                <logistics-setting></logistics-setting>
            </div>
            <div class="display-area" v-bind:class="{ 'show': index === 2,'hide': index === 0||index===1}">
                <pay-setting></pay-setting>
            </div>
        </div>
    </div>

</template>

<script scoped>
	module.exports = {
        created: function(){
        },
        data () {
            return {
                index: 0,
                objList: null
            }
        },
        components:{
            'commodity-setting': require('./CommoditySetting.vue'),
            'logistics-setting': require('./LogisticsSetting.vue'),
            'pay-setting': require('./PaySetting.vue')
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
    .main-area {background: #FFF;}
	 .layui-layer{border-radius:22px;}
    .area {position: relative;}
    div.comm-area{
    	width: initial;
    }
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
	.comm-item a{
		width: 33.3%;
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