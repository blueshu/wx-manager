<template>
    <div class="main-area">
        <p class="nav"><a href="#index">小程序首页</a> > <a href="javascript:;">发布内容</a></p>
        <h3 class="title">撰写新内容</h3>
        <input type="text" class="form-control" placeholder="标题输入框" v-model="title"/>
        <div class="content" v-ck="content"></div>
        <input type="text" class="form-control" placeholder="描述" v-model="desc"/>
        <div class="pic-area">
            <p>封面图</p>
            <div class="preview-area fl">
                <div class="preview-area-img-area">
                    <img v-bind:src="content_pic"/>
                    <i v-up="content_pic" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 100;"></i>
                </div>
                <a href="javascript:;" class="clear-img" v-on:click="clearImg()">清除图片</a>
                <div class="u-iphone-switch switch-bg" v-bind:class="{ 'u-iphone-switch-on': show_pic }" v-on:click="changeShowFlag()"><div class="switch-btn"></div></div> <a href="javascript:;" v-on:click="changeShowFlag()">文章是否显示大封面图</a>
            </div>
            <div class="fl upload-area" style="position: relative;">
                <i v-up="content_pic" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 100;"></i>
                <a href="javascript:;" class="wk-btn upload-btn">上传图片</a>
                <p>建议尺寸（640*340）</p>
            </div>
        </div>
        <div class="category">
            <p class="fl lab">添加应用:</p>
            <div v-if="applyNow" class="select-apply">
                <p>应用类型：{{applyNow.typeName}}</p>
                <a href="javascript:;" v-link="{name: 'newCommodity',params:{commId: applyNow.id}}">应用名称：{{applyNow.name}}</a>
            </div>
            <a href="javascript:;" v-if="!applyNow" class="btn btn-success add-apply-item" v-on:click="addApplyItem()">添加应用</a>
            <a href="javascript:;" v-else class="btn btn-success add-apply-item" v-on:click="addApplyItem()">更新应用</a>
        </div>
        <div class="category">
            <p class="fl lab">分类目录:</p>
            <a class="wk-btn fl hide" href="javascript:;">添加分类</a>
            <br class="clear">
            <p class="fl lab">所有分类:</p>
            <label v-if="category.length == 0" class="fl">暂无分类</label>
            <label class="fl" v-for="cat in category" style="margin-right: 10px;">
                <input class="fl" type="checkbox" v-bind:checked="categoryStr.indexOf(cat.id) >= 0" v-on:click="chooseCategory(cat)" style="margin-right: 5px;"/>{{ cat.value_data }}
            </label>
        </div>
        <div>
            <a class="wk-btn" href="javascript:;" v-on:click="save(0)" v-if="publicFlag">保存为草稿</a>
            <a class="wk-btn apply-btn" href="javascript:;" v-on:click="save(1)">立即发布</a>
        </div>
    </div>
    <div id="applyChoose" class="apply-item-area" style="display: none;">
        <ul class="menu" >
            <li v-bind:class="{'select': index === 0 }" v-on:click="chooseMenu(0)">留资</li>
            <li v-bind:class="{'select': index === 1 }" v-on:click="chooseMenu(1)">商品</li>
        </ul>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>应用名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in applyItemList">
                    <td>{{obj.name}}</td>
                    <td><a href="javascript:;" class="btn btn-success" v-on:click="chooseApply(obj)">选择</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    var defaultUp = '../assets/up.png',
        splitStr = '*@!';

    module.exports = {
        created: function(){
            var publicFlag = this.$route.params && this.$route.params.publicFlag ? true : false;
            this.$set('publicFlag',publicFlag);
            this.renderDetails();
            this.renderCategory();
            this.getApplyMessage();
        },
        data () {
            return {
                publicFlag: false,
                id: '',
                category: [],
                category_id : [],
                categoryStr: '',
                title: '',
                desc: '',
                content: '',
                show_pic: 0,
                content_pic: defaultUp,
                index: 0,
                applyNow: null,
                applyItemList: []
            }
        },
        methods: {
            getApplyMessage: function () {
                var index = this.$get('index');
                var that = this;
                switch (index) {
                    case 0:
                        that.$http.get('/minform/campaign/list/').then(function(res) {
                            if(res.data && res.data.data && res.data.data.object_list && res.data.data.object_list.length > 0){
                                that.$set('applyItemList',res.data.data.object_list);
                            }
                            else {
                                layer.alert('数据格式发生变更或者错误!', {icon: 2});
                            }
                        },function(error){

                        });
                        break;
                    case 1:
                        that.$http.get('/goods/goods/list/').then(function(res) {
                            if(res.data && res.data.data && res.data.data.object_list && res.data.data.object_list.length > 0){
                                that.$set('applyItemList',res.data.data.object_list);
                            }
                            else {
                                layer.alert('数据格式发生变更或者错误!', {icon: 2});
                            }
                        },function(error){

                        });
                        break;

                    case 2:

                        break;
                }
            },
            filterCategory: function (category_id) {
                for(var i = 0,len = category_id.length; i < len; i++) {
                    if(!category_id[i]) {
                        category_id.splice(i,1);
                    }
                }
                return category_id;
            },
            renderDetails: function () {
                var that = this;
                var sId = this.$route.params.id;
                that.$http.get('/app/setings/content/detail/?id='+sId).then(function(res){
                    var details = res.data.data,
                        category_id = that.filterCategory(details.category_id),
                        str = category_id.length > 0 ? category_id.join(splitStr)+''+splitStr: '';
                    that.$set('id',details.id);
                    that.$set('category_id',category_id);
                    that.$set('title',details.title);
                    that.$set('desc',details.desc);
                    that.$set('content',details.content);
                    that.$set('content_pic',details.content_pic);
                    that.$set('show_pic',details.show_pic || 0);
                    that.$set('categoryStr',str);
                    if(details.bind_type === 'goods') {
                        details.goods.typeName = '商品';
                        that.$set('applyNow',details.goods);
                    }
                    else if(details.bind_type === 'campaign') {
                        details.campaign.typeName = '留资';
                        that.$set('applyNow',details.campaign);
                    }

                },function(error){
                });
            },
            renderCategory: function () {
                var that = this;
                that.$http.get('/app/setings/enums/category/').then(function(res){
                    that.$set('category',res.data.data);
                },function(error){

                });
            },
            clearImg: function () {
                this.$set('content_pic',defaultUp);
            },
            changeCategory: function (id,type) {
                var categoryStr = this.$get('categoryStr');
                if(type === 'add') {
                    categoryStr += id+''+splitStr;
                }
                else if(type === 'del') {
                    categoryStr = categoryStr.replace(id+''+splitStr,'');
                }
                var category_id = categoryStr.split(splitStr);
                category_id.pop(); //删除最后一个无效值
                //console.log(category_id,categoryStr);
                //console.log(category_id.length);
                this.$set('categoryStr',categoryStr);
                this.$set('category_id',category_id);
            },
            chooseCategory: function (cat) {
                var categoryStr = this.$get('categoryStr'),
                    category_id = this.$get('category_id');
                if(categoryStr.indexOf(cat.id) >= 0) {
                    this.changeCategory(cat.id,'del');
                }
                else {
                    this.changeCategory(cat.id,'add');
                }
            },
            changeShowFlag: function () {
                this.$set('show_pic',!this.$get('show_pic'));
            },
            save: function (saveTag) {
                var that = this,
                    title = that.$get('title'),
                    desc = that.$get('desc'),
                    content = that.$get('content'),
                    show_pic = that.$get('show_pic') ? 1 : 0,
                    category_id = that.$get('category_id'),
                    content_pic = that.$get('content_pic'),
                    sId = this.$route.params.id;
                if(!title) {
                    layer.alert('标题不能为空!',{icon:2});
                }
                else if(!title.length > 60) {
                    layer.alert('标题不能超过60个字符串!',{icon:2});
                }
                else if(!content) {
                    layer.alert('内容不能为空!',{icon:2});
                }
                else if(!desc) {
                    layer.alert('描述不能为空!',{icon:2});
                }
                else if(!category_id || category_id.length == 0) {
                    layer.alert('分类不能为空!',{icon:2});
                }
                else if(content_pic == defaultUp) {
                    layer.alert('封面不能为空!',{icon:2});
                }
                else {
                    that.$http.post('/app/setings/content/update/',{
                        id: sId,
                        title: title,
                        content: content,
                        desc: desc,
                        show_pic : show_pic,
                        category_id: JSON.stringify(category_id),
                        content_pic: content_pic,
                        state: saveTag
                    }).then(function(res){
                        if(saveTag === 0) {
                            that.$router.go({name: 'draft'});
                        }
                        else {
                            that.$router.go({name: 'news'});
                        }
                    },function(error){

                    });
                }
            },
            addApplyItem: function () {
                this.tableLay = layer.open({
                    type: 1,
                    title: false,
                    content: $('#applyChoose'),
                    area: ['620px', '700px'], //宽高
                });
            },
            chooseMenu: function (index) {
                this.$set('index',index);
                this.getApplyMessage();
            },
            chooseApply: function (obj) {
                var that = this,
                    index = that.$get('index');
                obj.content_id = this.$route.params.id;
                var url = index === 0 ? '/minform/campaign/update/' : '/goods/goods/update/';
                if(obj.create_time) {
                    delete obj.create_time;
                }
                if(obj.update_time) {
                    delete obj.update_time;
                }
                that.$http.post(url,obj).then(function(){
                    layer.close(that.tableLay);
                    layer.msg('关联成功!');
                    that.renderDetails();

                },function(error){
                    //error
                });
            }
        }
    }
</script>
<style scoped>
    .main-area {background: #FFF;padding: 60px; text-align: center;}
    .nav {text-align: left; margin: -46px;color: #b5b5b5;}
    .nav a {color: #b5b5b5;}
    .title {margin-top: 80px;}
    .form-control{height: 50px;margin-bottom: 30px;line-height: 50px;border-radius: 5px;border: 1px solid #d1d1d1;}
    .content {margin-bottom: 30px;overflow: hidden;border-radius: 5px; border: 1px solid #d1d1d1;}
    .pic-area {padding: 20px;overflow: hidden;border: 1px solid #d1d1d1;border-radius: 5px;}
    .pic-area p {text-align: left;}
    .pic-area .preview-area {  width: 30%;  }
    .preview-area-img-area {width: 175px;position: relative;}
    .preview-area img {width: 175px;}
    .preview-area a {color: #2a2a2a;}
    .preview-area a.clear-img {margin: 20px 0 20px -114px;display: block;color: #009fe9;}
    .upload-area { width: 18%;position: relative;}
    .upload-btn {margin: 30px 0;padding: 0 15px;}
    .upload-btn:before {content: '+';font-weight: bolder;width: 22px;height: 20px;display: inline-block;font-size: 24px; vertical-align: top;}
    .upload-area p {text-align: center; color: #b5b5b5;}
    .category {padding: 20px;overflow: hidden;line-height: 40px;}
    .category .lab {margin-right: 10px;}
    .category input {margin-top: 13px; margin-right: 5px;}
    .category label {font-weight: normal;}
    .apply-btn { margin-left: 40px;}
    .upload-form {position: absolute;  width: 115px;  height: 40px;  overflow: hidden;  top: 27px;  left: 37px;opacity: 0; z-index: 99;}
    .upload-form input {font-size: 99px;}
    .add-apply-item{float:left;line-height: 30px;}
    .menu{width: 100%;margin-bottom: 20px;overflow: hidden;}
    .menu li{width: 50%; background: #f8f8f9;line-height: 45px;float: left;text-align: center;cursor: pointer;}
    .menu li.select {background: #FFF;font-weight: bolder;}
    .add-apply-item:before {content: '+';font-weight: bolder;width: 22px;height: 20px;display: inline-block;font-size: 24px; vertical-align: top;}
    .select-apply {float: left;padding: 10px 20px;  border: 1px solid #DDD;  margin: 0 20px;  border-radius: 5px;  line-height: 20px;}
</style>


