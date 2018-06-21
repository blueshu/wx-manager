<template>
    <div class="main-area">
        <div class="setting-header">
            <a href="javascript:;" v-link="{name: 'index'}">小程序首页</a>
            <a href="javascript:;">> 综合设置</a>
        </div>
        <div class="setting-area-item">
            <h3 class="fl">广告位设置</h3>
            <a href="javascript:;" class="wk-btn fr hide">添加头部广告图</a>
            <br class="clear">
            <ul class="box an-img">
                <li class="box-item">
                    <a href="javascript:;" class="an-edit" v-up="img1"></a>
                    <a href="javascript:;" class="an-delete" v-on:click="deleteImg('img1')"></a>
                    <a href="javascript:;" ><img v-if="img1!==defaultImg" v-bind:src="img1"/><img v-else v-bind:src="img1" style="width: 25%;margin: 44px 35%;"/></a>
                </li>
                <li class="box-item">
                    <a href="javascript:;" class="an-edit" v-up="img2"></a>
                    <a href="javascript:;" class="an-delete" v-on:click="deleteImg('img2')"></a>
                    <a href="javascript:;" ><img v-if="img2!==defaultImg" v-bind:src="img2"/><img v-else v-bind:src="img2" style="width: 25%;margin: 44px 35%;"/></a>
                </li>
                <li class="box-item">
                    <a href="javascript:;" class="an-edit" v-up="img3"></a>
                    <a href="javascript:;" class="an-delete" v-on:click="deleteImg('img3')"></a>
                    <a href="javascript:;" ><img v-if="img3!==defaultImg" v-bind:src="img3"/><img v-else v-bind:src="img3" style="width: 25%;margin: 44px 35%;"/></a>
                </li>
                <li class="box-item">
                    <a href="javascript:;" class="an-edit" v-up="img4"></a>
                    <a href="javascript:;" class="an-delete" v-on:click="deleteImg('img4')"></a>
                    <a href="javascript:;" ><img v-if="img4!==defaultImg" v-bind:src="img4"/><img v-else v-bind:src="img4" style="width: 25%;margin: 44px 35%;"/></a>
                </li>
            </ul>
            <p class="fl">广告图最多只可上传4张，建议尺寸（600 * 320 ）。</p>
            <a href="javascript:;" class="wk-btn fr" v-on:click="saveImg()">更新广告设置</a>
            <br class="clear">
        </div>
        <div class="setting-area-item">
            <h3>搜索设置</h3>
            <div class="inner-area">
                <label class="fl">设置常用搜索词：</label> <input type="text" class="form-control fl" v-model="searchStr" placeholder="搜索词"/> <a href="javascript:;" class="wk-btn fl" v-on:click="addSearch()">添加</a>
                <span class="des-span fl">(最多只可添加10个)</span>
                <br class="clear">
                <div v-if="searchVal.length == 0" style="margin-top: 25px;">
                    暂无搜索词
                </div>
                <div>
                    <span class="tag" v-for="search in searchVal" v-on:click="deleteSearch(search)">{{ search.value_data }}</span>
                </div>
            </div>
            <a href="javascript:;" class="wk-btn fr hide" >更新搜索设置</a>
            <br class="clear">
        </div>
        <div class="setting-area-item hide">
            <h3>公众号设置</h3>
            <div class="inner-area">
                <div class="wx-mes fl">
                    公众号：<input type="text" class="gz-input" v-model="gz.gzName"/><a href="javascript:;" class="set-editor hide" title="保存"></a><br />
                    微信号：<input type="text" class="gz-input" v-model="gz.gzNick"/><a href="javascript:;" class="set-editor hide" title="保存"></a> <br />
                    公众号介绍：<textarea class="gz-text" v-model="gz.gzDes"></textarea><a href="javascript:;" class="set-editor hide" title="保存"></a>
                </div>
                <div class="fr wx-header-img">
                    <div><img v-bind:src="imgHeader"/></div>
                    <a href="javascript:;" class="wk-btn" style="width: 100px;height: 35px;position: relative;" v-if="haveHeaderFlag">修改<i v-up="imgHeader" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></i></a>
                    <a href="javascript:;" class="wk-btn" style="width: 100px;height: 35px;position: relative;" v-else >添加<i v-up="imgHeader" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></i></a>
                </div>
                <br class="clear" />
            </div>
            <a href="javascript:;" class="wk-btn fr" v-on:click="addWechatfeed()">更新公众号</a>
            <br class="clear">
        </div>
        <div class="setting-area-item">
            <h3>首页推荐</h3>
            <div class="inner-area">
                <label class="fl" style="width: 50%;text-align: center;">
                    <input type="radio" v-bind:checked="iSort == 0" name="sor"  v-on:click="changeSort(0)" style="margin-right: 10px;"/>最新
                </label>
                <label class="fl" style="width: 50%;text-align: center;">
                    <input type="radio" v-bind:checked="iSort == 1" name="sor" v-on:click="changeSort(1)" style="margin-right: 10px;"/>最热
                </label>
                <br class="clear">
            </div>
            <a href="javascript:;" class="wk-btn fr" v-on:click="saveHomePage()">更新首页推荐</a>
            <br class="clear">
        </div>
        <div class="setting-area-item">
            <h3>分类设置</h3>
            <div class="inner-area">
                <label class="cat-lbl">分类：</label><input v-model="categoryStr" type="text" class="form-control cat-input" placeholder="分类"/>
                <a href="javascript:;" class="wk-btn" v-on:click="addCategory()">添加分类</a>
                <div v-if="category.length == 0" style="margin-top: 25px;">
                    暂无分类
                </div>
                <div>
                    <span class="cat" v-for="cat in category" v-on:click="deleteCategory(cat)">{{ cat.value_data }}</span>
                </div>
            </div>
            <a href="javascript:;" class="wk-btn fr" style="display: none;">更新分类</a>
            <br class="clear">
        </div>
        <div class="setting-area-item">
            <h3>导航设置</h3>
            <div class="inner-area">
                <ul class="box nav-set">
                    <li class="box-item">
                        <label>导航1</label>
                        <input type="text" class="form-control" placeholder="名称" v-model="nav[0].name"/>
                        <a href="javascript:;" class="nav-edit" v-on:click="chooseNav(0)"><img v-bind:src="nav[0].url"/></a>
                    </li>
                    <li class="box-item">
                        <label>导航2</label>
                        <input type="text" class="form-control" placeholder="名称" v-model="nav[1].name"/>
                        <a href="javascript:;" class="nav-edit" v-on:click="chooseNav(1)"><img v-bind:src="nav[1].url"/></a>
                    </li>
                    <li class="box-item">
                        <label>导航3</label>
                        <input type="text" class="form-control" placeholder="名称" v-model="nav[2].name"/>
                        <a href="javascript:;" class="nav-edit" v-on:click="chooseNav(2)"><img v-bind:src="nav[2].url"/></a>
                    </li>
                    <li class="box-item">
                        <label>导航4</label>
                        <input type="text" class="form-control" placeholder="名称" v-model="nav[3].name"/>
                        <a href="javascript:;" class="nav-edit" v-on:click="chooseNav(3)"><img v-bind:src="nav[3].url"/></a>
                    </li>
                </ul>
            </div>
            <a href="javascript:;" class="wk-btn fr" v-on:click="saveNav()">更新分类</a>
            <br class="clear">
        </div>
        <div class="setting-area-item">
            <h3>全局设置</h3>
            <div class="inner-area">
                <div class="row fl">
                    <label class="cat-lbl fl">颜色：</label>
                    <div class="fl" style="position: relative;overflow: hidden;width: 300px;">
                        <input type="text" class="form-control" style="width: 92%;" placeholder="全局颜色" v-on:click="showColorDialog()" v-model="app_config.globalColor">
                        <a href="javascript:;" class="choose-picker" v-on:click="showColorDialog()" :style="{ 'background-color': app_config.globalColor}"></a>
                    </div>
                    <div id="colorAlert" style="display: none; padding: 20px;overflow: hidden;">
                        <li v-for="cList in defaultColorList" class="color-alert">
                            <a class="choose-picker-or" v-on:click="doChooseColor(cList)" title="{{cList.value}}" href="javascript:;" :style="{ 'background-color': cList.color}"></a>
                        </li>
                    </div>
                </div>
                <div class="row fl">
                    <label class="cat-lbl fl">评论配置：</label>
                    <div class="u-iphone-switch switch-bg" v-bind:class="{ 'u-iphone-switch-on': app_config.isCommit }" v-on:click="changeCommitFlag()">
                        <div class="switch-btn"></div>
                    </div>
                    <a href="javascript:;" v-on:click="changeCommitFlag()">文章是否显示评论</a>
                </div>
                <br class="clear">
            </div>
            <a href="javascript:;" class="wk-btn fr" v-on:click="saveGlobalSetting()">更新配置</a>
            <br class="clear">
        </div>
    </div>
    <table class="table" id="navArea" style="display: none;">
        <thead>
            <tr>
                <th>显示</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="nav in navIconList" >
                <td><img style="width: 30px;" v-bind:src="nav.url"/></td>
                <td><a href="javascript:;" v-on:click="doChooseNav(nav)">选择</a> </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    var navPath = '../assets/icon',
        defaultImg = '../assets/up.png',
        defaultHeader = '../assets/img-3.png';
    var colorList = [
        {
            key: 'co1',
            color: '#eb615f',
            value: '温柔'
        },

        {
            key: 'co2',
            color: '#cf171f',
            value: '可爱'
        },
        {
            key: 'co3',
            color: '#1f497b',
            value: '古典'
        },
        {
            key: 'co4',
            color: '#01989f',
            value: '香甜'
        },
        {
            key: 'co5',
            color: '#00602b',
            value: '成熟'
        },
        {
            key: 'co6',
            color: '#866377',
            value: '暧昧'
        },
        {
            key: 'co7',
            color: '#0499b1',
            value: '干净'
        },
        {
            key: 'co8',
            color: '#b32c19',
            value: '尊贵'
        },
        {
            key: 'co9',
            color: '#569930',
            value: '自然'
        },
        {
            key: 'co10',
            color: '#94004c',
            value: '怀旧'
        },
        {
            key: 'co11',
            color: '#733409',
            value: '浓郁'
        },
        {
            key: 'co12',
            color: '#ee9105',
            value: '亲善'
        },
        {
            key: 'co13',
            color: '#a8b19e',
            value: '格调'
        },
        {
            key: 'co14',
            color: '#faaf78',
            value: '舒适'
        },
        {
            key: 'co15',
            color: '#834d98',
            value: '信心'
        },
        {
            key: 'co16',
            color: '#060807',
            value: '历练'
        },
        {
            key: 'co17',
            color: '#b6d4f0',
            value: '能量'
        },
        {
            key: 'co18',
            color: '#f388a2',
            value: '余香'
        }
    ];
    var navIconList = [
        {
            key: 'circle-user-7',
            url: navPath+'/circle-user-7.png',
        },
        {
            key: 'command-7',
            url: navPath+'/command-7.png',
        },
        {
            key: 'connectivity-bar-7',
            url: navPath+'/connectivity-bar-7.png',
        },
        {
            key: 'crown-7',
            url: navPath+'/crown-7.png',
        },
        {
            key: 'electric-7',
            url: navPath+'/electric-7.png',
        },
        {
            key: 'games-abstract-7',
            url: navPath+'/games-abstract-7.png',
        },
        {
            key: 'gift-7',
            url: navPath+'/gift-7.png',
        },
        {
            key: 'heart-7',
            url: navPath+'/heart-7.png',
        },

        {
            key: 'home-7',
            url: navPath+'/home-7.png',
        },
        {
            key: 'layer-7',
            url: navPath+'/layer-7.png',
        },
        {
            key: 'new-sign-badge-7',
            url: navPath+'/new-sign-badge-7.png',
        },
        {
            key: 'note-write-7',
            url: navPath+'/note-write-7.png',
        },
        {
            key: 'paper-plane-7',
            url: navPath+'/paper-plane-7.png',
        },

        {
            key: 'telephone-7',
            url: navPath+'/telephone-7.png',
        },
        {
            key: 'thumb-up-7',
            url: navPath+'/thumb-up-7.png',
        },
        {
            key: 'video-camera-7',
            url: navPath+'/video-camera-7.png',
        }
    ];
    module.exports = {

        data: function () {
            return {
                defaultColorList: colorList,
                app_config: {
                    globalColorKey: 'co1',
                    globalColor: '#eb615f',
                    isCommit: true
                },

                defaultImg: defaultImg,
                img1: defaultImg,
                img2: defaultImg,
                img3: defaultImg,
                img4: defaultImg,

                searchStr: '',
                searchVal: [],

                categoryStr: '',
                category: [],

                gz: {
                    gzName: '关注小考拉',
                    gzNick: 'xiaokaola',
                    gzDes: '关注小考拉关注小考拉关注小考拉关注小考sadasdas拉关注小考拉关注小考拉关注小考拉',
                },
                imgHeader: defaultHeader,
                haveHeaderFlag: false,
                navIconList: navIconList,
                nav: [
                    {key: 'paper-plane-7',name: '',url:'../assets/icon/paper-plane-7.png'},
                    {key: 'paper-plane-7',name: '',url:'../assets/icon/paper-plane-7.png'},
                    {key: 'paper-plane-7',name: '',url:'../assets/icon/paper-plane-7.png'},
                    {key: 'paper-plane-7',name: '',url:'../assets/icon/paper-plane-7.png'}],
                iSort: 1
            }
        },
        methods: {
            saveGlobalSetting: function () {
                var that = this;
                var appConfig = this.$get('app_config'),
                    globalSetting = JSON.stringify(appConfig);
                that.$http.post('/app/setings/add/globalsettings/',{globalSetting: globalSetting}).then(function(res){

                },function(error){

                });
            },
            renderGlobalSetting: function () {
                var that = this;
                that.$http.get('/app/setings/enums/globalsettings/').then(function(res){
                    if(res.data && res.data.data && res.data.data.length>0) {
                        var globalsettings = res.data.data[0].value_data;
                        that.$set('app_config',JSON.parse(globalsettings));
                    }
                },function(error){


                });
            },
            showColorDialog: function () {
                this.colorleLay = layer.open({
                    type: 1,
                    title: false, //不显示标题栏
                    content: $('#colorAlert'),
                    area: ['420px', '100px'], //宽高
                });
            },
            doChooseColor: function (oColor) {
                var app_config = this.$get('app_config');
                app_config.globalColorKey = oColor.key;
                app_config.globalColor = oColor.color;
                this.$set('app_config',app_config);
                if(this.colorleLay){
                    layer.close(this.colorleLay);
                }
            },
            changeCommitFlag: function () {
                var appConfig = this.$get('app_config');
                appConfig.isCommit = !appConfig.isCommit;
                this.$set('app_config',appConfig);
            },
            changeSort: function (type) {
                this.$set('iSort',type);
            },
            renderHomePage: function () {
                var that = this;
                that.$http.get('/app/setings/enums/homepage/').then(function(res){
                    if(res.data && res.data.data && res.data.data.length>0) {
                        var obj = res.data.data[0].value_data;
                        obj = parseInt(obj);
                        this.$set('iSort',obj);
                    }
                },function(error){
                });
            },
            renderGroup: function () {
                var that = this;
                that.$http.get('/app/setings/enums/adgroup/').then(function(res){
                    if(res.data && res.data.data && res.data.data.length>0) {
                        var obj = res.data.data[0].value_data;
                        obj = JSON.parse(obj).imgObj;
                        that.$set('img1',obj.img1);
                        that.$set('img2',obj.img2);
                        that.$set('img3',obj.img3);
                        that.$set('img4',obj.img4);
                    }
                },function(error){
                });
            },
            saveHomePage: function () {
                var that = this;
                var homePageFlag = that.$get('iSort');
                that.$http.post('/app/setings/add/homepage/',{homePageFlag: homePageFlag}).then(function(res){
                    that.renderHomePage();
                },function(error){
                    //that.renderHomePage();
                });
            },
            saveImg: function () {
                var that = this;
                var imgObj = {
                    img1: that.$get('img1'),
                    img2: that.$get('img2'),
                    img3: that.$get('img3'),
                    img4: that.$get('img4'),
                }
                if(!that.$get('img1') || that.$get('img1') == defaultImg) {
                    delete imgObj.img1;
                }
                if(!that.$get('img2') || that.$get('img2') == defaultImg) {
                    delete imgObj.img2;
                }
                if(!that.$get('img3') || that.$get('img3') == defaultImg) {
                    delete imgObj.img3;
                }
                if(!that.$get('img4') || that.$get('img4') == defaultImg) {
                    delete imgObj.img4;
                }

                var obj = {
                    imgObj : imgObj
                }
                that.$http.post('/app/setings/add/adgroup/',{group: JSON.stringify(obj)}).then(function(res){
                    that.renderGroup();
                },function(error){
                    that.renderGroup();
                });
            },
            deleteImg: function (key) {
                var that = this;
                var thlay = layer.confirm('确认删除该图片吗？',{title:'确认'},function () {
                    that.$set(key, '');
                    layer.close(thlay);
                });
            },
            renderSearch: function () {
                var that = this;
                that.$http.get('/app/setings/enums/search/').then(function(res){
                    that.$set('searchVal',res.data.data);
                },function(error){

                });
            },
            deleteSearch: function (search) {
                var that = this;
                var thlay = layer.confirm('确认删除该查询关键字？',{title:'确认'},function () {
                    that.$http.post('/app/setings/delete/search/',{id: search.id}).then(function(res){
                        that.renderSearch();
                    },function(error){

                    });
                    layer.close(thlay);
                });
            },
            addSearch: function () {
                var searchStr = this.$get('searchStr'),
                    aSearchVal = this.$get('searchVal');
                if(!searchStr) {
                    layer.alert('关键字不能为空',{icon:2});
                }
                else if(aSearchVal.length >= 10){
                    layer.alert('关键字最多只可添加10个',{icon:2});
                }
                else {
                    var that = this;
                    that.$http.post('/app/setings/add/search/',{search: searchStr}).then(function(res){
                        that.$set('searchStr','');
                        that.renderSearch();
                    },function(error){

                    });
                }
            },
            renderCategory: function () {
                var that = this;
                that.$http.get('/app/setings/enums/category/').then(function(res){
                    that.$set('category',res.data.data);
                },function(error){

                });
            },
            addCategory: function () {
                var categoryStr = this.$get('categoryStr');
                if(!categoryStr) {
                    layer.alert('分类不能为空',{icon:2});
                }
                else {
                    var that = this;
                    that.$http.post('/app/setings/add/category/',{category: categoryStr}).then(function(res){
                        that.$set('categoryStr','');
                        that.renderCategory();
                    },function(error){

                    });
                }
            },
            deleteCategory: function (category) {
                var that = this;
                var thlay = layer.confirm('确认删除该分类？',{title:'确认'},function () {
                    that.$http.post('/app/setings/delete/category/',{id: category.id}).then(function(res){
                        that.renderCategory();
                    },function(error){

                    });
                    layer.close(thlay);
                });
            },
            renderWechatfeed: function () {
                var that = this;
                that.$http.get('/app/setings/enums/wechatfeed/').then(function(res){
                    if(res.data && res.data.data && res.data.data.length>0) {
                        var obj = res.data.data[0].value_data;
                        that.$set('gz',JSON.parse(obj));
                        that.$set('imgHeader',JSON.parse(obj).imgHeader);
                        that.$set('haveHeaderFlag',true);
                    }
                    else {
                        that.$set('haveHeaderFlag',false);
                    }
                },function(error){
                });
            },
            addWechatfeed: function () {
                var gz = this.$get('gz') || {},
                    im = this.$get('imgHeader');
                gz['imgHeader'] = im;
                var str = JSON.stringify(gz);
                var that = this;
                that.$http.post('/app/setings/add/wechatfeed/',{wechatfeed: str}).then(function(res) {
                    //that.renderSearch();
                },function(error){

                });
            },
            renderNav: function () {
                var that = this;
                that.$http.get('/app/setings/enums/navigation/').then(function(res){
                    if(res.data && res.data.data && res.data.data.length>0) {
                        var obj = res.data.data[0].value_data;
                        that.$set('nav',JSON.parse(obj));
                    }
                },function(error){

                });
            },
            chooseNav: function (index) {
                this.navIndex = index;
                this.tableLay = layer.open({
                    type: 1,
                    content: $('#navArea'),
                    area: ['520px', '300px'], //宽高
                });
            },
            doChooseNav: function (nav) {
                if(this.tableLay) {
                    layer.close(this.tableLay);
                }
                if(this.navIndex >= 0) {
                    var navAll = this.$get('nav');
                    navAll[this.navIndex].url = nav.url;
                    navAll[this.navIndex].key = nav.key;
                    this.$set('nav',navAll);
                }
            },
            saveNav: function () {
                var res = this.$get('nav');
                res = JSON.stringify(res);
                var that = this;
                that.$http.post('/app/setings/add/navigation/',{navs: res}).then(function(res){
                    //console.log(res);
                },function(error){

                });
            }
        },
        created: function () {
            this.renderCategory();
            this.renderSearch();
            this.renderGroup();
            //this.renderWechatfeed();
            this.renderNav();
            this.renderHomePage();
            this.renderGlobalSetting();
            CKEDITOR.disableAutoInline = true;
        }
    }
</script>

<style scoped>
    .setting-header {background: #FFF; padding: 0 20px;overflow: hidden; line-height: 30px;}
    .setting-header a {color: #b5b5b5 !important;}
    .setting-area-item {background: #FFF; padding: 20px 50px;width: 100%;margin-bottom: 20px;}
    .an-img {width: 100%; margin: 20px 0; padding:2% 4%; border: 1px solid #DDD; -webkit-border-radius: 5px;border-radius: 5px;}
    .an-img li {width: 44%;margin: 10px 6% 10px 0;position: relative;height: 210px;}
    .an-edit {opacity:0.8;position: absolute;top: 10px;right: 40px;width: 25px;height: 25px;background: rgba(0, 0, 0, 0.2) url("../assets/split.png") no-repeat -7px -776px;-webkit-border-radius: 100%;border-radius: 100%;}
    .an-delete {opacity:0.8;position: absolute;top: 10px;right: 10px;width: 25px;height: 25px;background: rgba(0, 0, 0, 0.2) url("../assets/split.png") no-repeat -8px -831px;-webkit-border-radius: 100%;border-radius: 100%;}
    .an-edit:hover, .an-delete:hover ,.set-editor:hover{opacity: 1;}
    .an-img li:nth-child(2n) {margin-right: 0;}
    .an-img li img{width: 100%;max-height: 210px;}
    .setting-area-item .inner-area {width: 100%; margin: 20px 0; padding:2%; border: 1px solid #DDD; -webkit-border-radius: 5px;border-radius: 5px;line-height: 40px;}
    .setting-area-item .wx-mes {width: 700px;overflow: hidden;}
    .setting-area-item label {font-weight: normal;width: 100%;}
    .setting-area-item .form-control {margin: 0 10px;width: 35%;height: 40px;}
    .setting-area-item .des-span {color: #ababab;margin-left: 10px;}
    .setting-area-item .tag, .setting-area-item .cat{ margin: 25px 10px 0;display: inline-block;  padding: 0 15px 0 25px;  border: 1px solid #DDD;  border-radius: 20px;  line-height: 30px;}
    .setting-area-item .tag:after, .setting-area-item .cat:after {content: '.';display: inline-block;width: 20px;height: 20px;text-indent: -1000px;background: url("../assets/split.png") no-repeat -1px -191px;margin-left: 10px; cursor: pointer;}
    .set-editor {opacity:1;width: 50px;height: 30px;background: url("../assets/split.png") no-repeat -1px -886px;display: inline-block;cursor: pointer;}
    .wx-header-img {text-align: center;margin: 20px 70px 0 0;}
    .wx-header-img div {width: 145px;height: 145px;border-radius: 5px;overflow: hidden;margin-bottom: 20px;}
    .wx-header-img div img {width: 100%;}
    .cat-input {width: 30% !important;display: inline-block;vertical-align: middle;}
    .nav-set li{width: 50%;}
    .cat-lbl {width: auto !important;display: inline-block;vertical-align: middle;}
    .nav-set li label {display: inline-block;width: auto;vertical-align: middle;}
    .nav-set li .form-control {display: inline-block;width: 60%;vertical-align: middle;}
    .nav-set li a {display: inline-block;width: 30px; height: 30px;overflow: hidden;vertical-align: middle;}
    .nav-edit img{vertical-align: top;width: 30px;height: 30px;}
    .gz-input {border: none;line-height: 35px;padding: 0 5px;}
    .gz-text {width: 500px; border: none; height: 180px;resize: none; vertical-align: text-top; margin-top: -14px;}
    .choose-picker {display: block;width: 25px;height: 25px;position: absolute; right: 22px;  top: 5px;  border-radius: 30px;}
    .color-alert {float: left;width: 40px; height: 30px;list-style: none;}
    .choose-picker-or {display: block;width: 25px;height: 25px;border-radius: 30px;}
    table th,table td {text-align: center;}
    .inner-area .row{width: 50%;}
</style>
