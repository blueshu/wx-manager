<template>
    <div class="main-area">
        <p class="nav"><a href="#index">小程序首页</a> > <a href="javascript:;">内容详情</a></p>
        <h3 class="title">内容详情</h3>
        <input type="text" class="form-control" placeholder="标题输入框" disabled v-model="res.title"/>
        <div class="content" v-html="res.content" style="text-align: initial;padding: 10px;"></div>
        <input type="text" class="form-control" placeholder="描述" disabled v-model="res.desc"/>
        <div class="pic-area">
            <p>封面图</p>
            <div class="preview-area fl">
                <img v-bind:src="res.content_pic"/>
                <br/>
                <div class="u-iphone-switch switch-bg" v-bind:class="{ 'u-iphone-switch-on': res.show_pic }" ><div class="switch-btn"></div></div> <a href="javascript:;">文章是否显示大封面图</a>
            </div>
        </div>
        <div class="category">
            <p class="fl lab">分类:</p>
            <label class="fl" style="margin-right: 10px;">
                {{category | getSelectCategory categoryStr}}
            </label>
        </div>
        <div class="hide">
            <a class="wk-btn" href="javascript:;" v-on:click="save(0)">保存为草稿</a>
            <a class="wk-btn apply-btn" href="javascript:;" v-on:click="save(1)">立即发布</a>
        </div>
    </div>
</template>

<script>
    require('../filter/selectCategoryFilter');
    var splitStr = '*@!';
    module.exports = {
        created: function(){
            this.renderDetails();
            this.renderCategory();
        },
        data () {
            return {
                category: [],
                categoryStr: '',
                res: {}
            }
        },
        methods: {
            renderDetails: function () {
                var that = this;
                var sId = this.$route.params.id;
                that.$http.get('/app/setings/content/detail/?id='+sId).then(function(res){
                    that.$set('res',res.data.data);
                    that.$set('categoryStr',res.data.data.category_id.join(splitStr));
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
    .pic-area .preview-area {
        width: 30%;
    }
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
</style>


