<template>
    <div class="main-header">
        <div class="header">
            <a href="#index" class="logo"><img src="../assets/logo.png"/></a>
            <ul class="menu-area">
                <li v-for="menu in menuList" v-bind:class="{'select': menu.selectFlag}"><a class="{{menu.key}}" href="{{menu.href}}" v-on:click="changeMenu(menu)">{{ menu.value }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'header',
    methods: {
        changeMenu: function (obj) {
            for(var i = 0,len = this.$data.menuList.length; i < len; i++) {
                var menuObj = this.$data.menuList[i];
                menuObj.selectFlag = false;
            }
            if(obj.key == 'ext'){
                this.logoOut();
            }
            obj.selectFlag = true;
        },
        logoOut: function () {
            var that = this;
            that.$http.post('/user/logout/').then(function(res){
                location.href = 'login.html';
            },function(error){
                //error
            });
        }
    },
    data () {
        return {
           menuList : [{
               key: 'index',
               href: '#',
               selectFlag: true,
               value: '首页'
           },
               {
                   key: 'index',
                   href: '#customerManager',
                   selectFlag: false,
                   value: '客户管理'
               },
               {
                   key: 'help',
                   href: 'http://help.xneirong.com/427009',
                   selectFlag: false,
                   value: '帮助'
               },
               {
                   key: 'ext',
                   href: '#',
                   selectFlag: false,
                   value: '退出'
               }
               ]
        }
    },
    created: function () {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-header {background: #FFF;overflow: hidden;}
    .header {width: 1200px;margin: 0 auto;overflow: hidden;background: #FFF;}
    .logo {float: left;  width: 154px;margin: 10px;}
    .menu-area {float: right;margin-right: 20px;margin-bottom: 0;}
    .menu-area li {margin: 0 40px; }
    .menu-area li a{display: inline-block;line-height: 65px;color: #2a2a2a;border-top: 3px solid #FFF;position: relative;}
    .menu-area li a:hover, .menu-area li.select a {font-weight: bold;}
    .menu-area li.select a{border-top: 3px solid #54a427;}
    .menu-area a.help:before {content: '.';background: url("../assets/help.png") no-repeat center; width: 24px;height: 24px;display: inline-block;position: absolute;top:20px;left: -28px;overflow: hidden;}
</style>
