<template>
    <div class="main-area">
        <p class="nav"><a href="#index">小程序首页</a> > <a href="javascript:;">发布内容</a></p>
        <h3 class="title">撰写新内容</h3>
        <input type="text" class="form-control" placeholder="标题输入框" v-model="title" maxlength="60"/>
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
            <p class="fl lab">分类目录:</p>
            <a class="wk-btn fl hide" href="javascript:;">添加分类</a>
            <br class="clear">
            <p class="fl lab">所有分类:</p>
            <label v-if="category.length == 0" class="fl">暂无分类</label>
            <label class="fl" v-for="cat in category" style="margin-right: 10px;">
                <input class="fl" type="checkbox" v-on:click="chooseCategory(cat)" style="margin-right: 5px;"/>{{ cat.value_data }}
            </label>
        </div>
        <div>
            <a class="wk-btn" href="javascript:;" v-on:click="save(0)">保存为草稿</a>
            <a class="wk-btn apply-btn" href="javascript:;" v-on:click="save(1)">立即发布</a>
        </div>
    </div>
</template>

<script>
    var defaultUp = '../assets/up.png',
        splitStr = '*@!';
    module.exports = {
        created: function(){
            this.$set('content','-1&*');
            this.renderCategory();
        },
        data () {
            return {
                category: [],
                category_id : [],
                categoryStr: '',
                title: '',
                desc: '',
                content: '',
                show_pic: 0,
                content_pic: defaultUp
            }
        },
        methods: {
            renderCategory: function () {
                var that = this;
                that.$http.get('/app/setings/enums/category/').then(function(res){
                    if(res.data && res.data.data && res.data.data.length > 0){
                        that.$set('category',res.data.data);
                    }
                    else {
                        var conLay = layer.confirm('您还没有添加分类，请先添加分类。去添加分类',{title:'添加分类'},function () {
                            layer.close(conLay);
                            that.$router.go('setting');
                        });
                    }
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
                    categoryStr = categoryStr.replace(id+''+splitStr,'')
                }
                var category_id = categoryStr.split(splitStr);
                category_id.pop(); //删除最后一个无效值
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
                    content_pic = that.$get('content_pic');
                if(!title) {
                    layer.alert('标题不能为空!',{icon:2});
                }
                else if(title.length > 60) {
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
    .pic-area .preview-area {
        width: 30%;
    }
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
</style>


