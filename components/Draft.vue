<template>
    <div class="main-area">
        <div class="news-list-con">
            <a class="wk-btn apply-new fr" href="javascript:;" v-link="{name: 'apply'}">发布内容</a>
            <ul>
                <li v-for="news in newsList" style="width: 100%;">
                    <div class="fl icon-area">
                        <img src="../assets/img-icon.png"/>
                    </div>
                    <p class="user-name fl">111</p>
                    <p class="fl on-line">在 线</p>
                    <div class="fr">
                        <a href="javascript:;" class="delete-icon" v-on:click="deleteNews(news)"></a>
                    </div>
                    <div class="con fl" style="width: 95%;">
                        <h6>{{news.title}}</h6>
                        <div v-html="news.content" style="max-height: 200px;overflow: hidden;">
                        </div>
                        <a href="javascript:;"  v-link="{name: 'updateNews',params:{id: news.id}}">修改</a>
                    </div>
                </li>
            </ul>
        </div>
        <div v-laypage="page" class="wk-page"></div>
    </div>
</template>
<script>
    module.exports = {
        created: function(){
            this.renderList();
        },
        data: function () {
            return {
                maxLength: 50,
                newsList: [],
                page: null
            }
        },
        methods: {
            renderList: function () {
                var that = this;
                that.$http.get('/app/setings/content/list/?state=0').then(function(res){
                    var dataRes = res.data.data.object_list;
                    that.$set('newsList',dataRes);
                    that.$set('page',res.data.data.paginator);
                },function(error){
                });
            },
            deleteNews: function (news) {
                var that = this;
                var thlay = layer.confirm('确认删除该内容吗？',{title:'确认'},function () {
                    that.$http.post('/app/setings/content/delete/',{id: news.id}).then(function(res){
                        that.renderList();
                    },function(error){

                    });
                    layer.close(thlay);
                });
            }
        }
    }
</script>

<style scoped>
    .news-list-header {background: #FFF; padding: 30px 20px 30px 0;overflow: hidden; line-height: 40px;}
    .back-i {border-top-left-radius: 0;border-bottom-left-radius: 0;}
    .news-list-header p:before {width: 45px;height: 40px;content: '.';text-indent: -100px;background: url("../assets/split.png") no-repeat 12px -342px;display: inline-block;  margin-right: 10px;}
    .news-list-header p.p-l:before {background-position: 12px -424px;}
    .news-list-header p {margin-left: 150px;}
    .news-list-con {padding: 30px;background: #FFF;margin-top: 10px;overflow: hidden;}
    li {overflow: hidden; line-height: 30px;padding: 20px 0;border-bottom: 1px solid #CCC;}
    li:last-child {border-bottom: none;}
    li .icon-area {border-radius: 100%; overflow: hidden;width: 70px;height: 70px;}
    li .icon-area img {width: 100%;}
    .user-name {font-size: 18px;margin-left:30px;}
    .on-line {color: #54a427;margin-right: 20px;}
    .off-line {color: #a5a5a5;margin-right: 20px;}
    li span {margin-right: 20px;}
    li span:before {width: 30px;height: 30px;content: '.';text-indent: -100px;background: url("../assets/split.png") no-repeat 12px -269px;display: inline-block;}
    .on-line:before {width: 45px;height: 40px;content: '.';text-indent: -100px;background: url("../assets/split.png") no-repeat 12px -269px;display: inline-block;}
    .off-line:before {width: 45px;height: 40px;content: '.';text-indent: -100px;background: url("../assets/split.png") no-repeat 12px -484px;display: inline-block;}
    .look:before {background-position: -5px -568px;}
    .favorite:before {background-position:-5px -523px}
    .mes:before {background-position: -5px -647px;}
    .comment:before {background-position: -5px -731px;}
    .delete-icon {background: url("../assets/split.png") no-repeat  6px -181px;width: 30px;height: 30px;display: inline-block;margin-left: 65px;}
    li .con {margin: -35px 0 0 100px;overflow: hidden;}
    li .con h6{font-size: 24px;}

</style>
