var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Footer = require('./components/Footer.vue');
var Header = require('./components/Header.vue');
var Ck = require('./directive/ckDirective');
var Colors = require('./directive/colorDirective');
var Laypage = require('./directive/layPageDirective');
var Up = require('./directive/upDirective');
var Dtpicker = require('./directive/datetimepicker');

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.debug = true;//调试模式

var App = Vue.extend({});
Vue.component('footer-area', Footer);
Vue.component('header-area', Header);

Vue.directive('ck',Ck);
Vue.directive('color',Colors);
Vue.directive('laypage',Laypage);
Vue.directive('up',Up);
Vue.directive('dtpicker',Dtpicker);

var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
Vue.http.interceptors.push(function(request,next){
    var index = layer.load(2,{shade: [0.5, '#393D49'],area:'35px'});
    next(function (response) {
        layer.close(index);
        if(response.data.status !== 0) {
			layer.alert('请求发生错误!', {icon: 2});
            return Promise.reject()
		}
    })
});
router.map({
	'/':{				//首页
        name: 'index',
        component: require('./components/Main.vue')
    },
	'/index': {
		name: "index",
		component: require('./components/Main.vue')
	},
    '/customerManager': {
        name: "customerManager",
        component: require('./components/CustomerManager.vue')
    },
    '/login': {
        name: "login",
        component: require('./components/login.vue')
    },
    '/apply': {
        name: "apply",
        component: require('./components/Apply.vue')
	},
    '/news': {
        name: "news",
        component: require('./components/NewsList.vue')
    },
    '/setting': {
        name: "setting",
        component: require('./components/Setting.vue')
    },
    '/draft': {
        name: "draft",
        component: require('./components/Draft.vue')
    },
    '/newDetails/:id': {
        name: "newDetails",
        component: require('./components/NewDetails.vue')
    },
    '/updateNews/:id': {
        name: "updateNews",
        component: require('./components/UpdateNews.vue')
    },
    '/formManager': {
        name: "formManager",
        component: require('./components/FormManager.vue')
    },
    '/addForm': {
        name: "addForm",
        component: require('./components/AddForm.vue')
    },
    '/commodity':{
    	name:"commodity",
    	component: require('./components/Commodity.vue')
    },
    '/newCommodity/:commId':{
    	name:"newCommodity",
    	component: require('./components/NewCommodity.vue')
    },
    '/buyData/:commId':{
    	name:"buyData",
    	component: require('./components/BuyData.vue')
    },
    '/commoditySetting':{
    	name:"commManager",
    	component: require('./components/CommoditySetting.vue')
    },
    '/logisticsSetting':{
    	name:"logisticsSetting",
    	component: require('./components/LogisticsSetting.vue')
    },
    '/paySetting':{
    	name:"paySetting",
    	component: require('./components/PaySetting.vue')
    },
    '/formSources': {
        name: "formSources",
        component: require('./components/FormSources.vue')
    },
    '/copyrightManage': {
        name: "copyrightManage",
        component: require('./components/CopyrightManage.vue')
    },
    '/UpdateForm/:id': {
        name: "updateForm",
        component: require('./components/UpdateForm.vue')
    }
});

// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');