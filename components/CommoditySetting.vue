<template>
    <div class="main-area">
    	<div class="commManager-header">
    		<a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'index'}">< 返回</a>
        	<a class="wk-btn fr add-form" v-link="{name: 'newCommodity',params:{commId:0}}">新建商品</a>
    	</div>
    	
        <table class="table table-bordered table-striped">
            <thead>
            	<tr>
                	<th>商品名称</th>
                	<th>创建时间</th>
                	<th>关联内容</th>
                	<th>查看</th>
            	</tr>
            </thead>
            <tbody>
            	<tr v-for="commItem in commList">
            		<td>{{commItem.name}}<a title="编辑" v-link="{name: 'newCommodity',params:{commId:commItem.id}}"><img style="width: 20px" src="../assets/marker.png"/></a></td>
                	<td>{{returnDataStr(commItem.create_time)}}</td>
                	<td style="width: 30%;">
						<a href="javascript:;" class="btn btn-success" v-if="commItem.content_id === 0" v-on:click="buildGoodsConnect(commItem)">关联</a>
						<a title="{{commItem.content_name}}" v-link="{name: 'updateNews',params:{id: commItem.content_id,publicFlag: true}}" v-if="commItem.content_id !== 0">{{commItem.content_id}}</a>
						<a href="javascript:;" class="btn btn-warning" v-if="commItem.content_id !== 0" style="margin-left: 10px;" v-on:click="disGoodsConnect(commItem)">解除关联</a>
					</td>
                	<td>
						<a style="float: left;text-align: center;" v-link="{name: 'buyData',params:{commId:commItem.id}}">购买数据<span style="display: block;">{{commItem.order_num}}</span></a>
                    	<a title="删除" href="javascript:;" v-if="commItem.content_id === 0" v-on:click="deleteGood(commItem)" class="bfr"><img style="width: 20px" src="../assets/delete.png"/></a>
                	</td>
            	</tr>
            
            </tbody>
        </table>
		<table class="table" id="navArea" style="display: none;">
			<thead>
			<tr>
				<th>文章名称</th>
				<th>图片</th>
				<th>操作</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="cont in contentList" >
				<td>{{cont.title}}</td>
				<td><img v-bind:src="cont.content_pic" style="width: 200px;height:100px;"/></td>
				<td><a href="javascript:;" class="btn btn-success" v-on:click="doGoodsConnect(cont)">选择</a> </td>
			</tr>
			</tbody>
		</table>
    </div>
</template>
<script scoped>
    module.exports = {
        created: function(){
			this.getGoodList();
            this.getNewList();
        },
        data() {
            return {
                index: 0,
                objList: null,
                contentList: [],
                commList:[
               	 {
                	"id":11,
                	"name":"果树园饼干",
                	"create_time":"2017-01-01  15：25",
                	"content_id":10242,
                	"order_num":122
              	  }
                ]
            }
        },
        methods: {
            returnDataStr: function (str) {
                var d = new Date(str),
                    year = d.getFullYear(),
                    m = d.getMonth()+1,
                    min = d.getMinutes(),
                    h = d.getHours(),
                    d = d.getDate();
                m = m >= 10 ? m: 0+''+m;
                d = d >= 10 ? d: 0+''+d;
                min = min >= 10 ? min : 0+''+min;
                h = h >= 10 ? h : 0+''+h;
                return year+'-'+m+'-'+d+' '+h+':'+min;
            },
            getNewList: function () {
                var that = this;
                that.$http.get('/app/setings/content/list/?state=1').then(function(res){
                    var dataRes = res.data.data.object_list;
                    that.$set('contentList',dataRes);
                    //that.$set('page',res.data.data.paginator);
                },function(error){
                });
            },
            doGoodsConnect: function (cont) {
                layer.close(this.tableLay);
                var that = this;
                var res = JSON.parse(JSON.stringify(that.goods));
                res.content_id = cont.id;
                res.content_name = cont.title;
                if(res.create_time) {
                    delete res.create_time;
                }
                if(res.update_time) {
                    delete res.update_time;
                }
                that.$http.post('/goods/goods/update/',res).then(function(){
                    layer.msg('关联成功!');
                    that.getGoodList();
                },function(error){
                    //error
                });
            },
            disGoodsConnect: function (goods) {
                var that = this;
                var thlay = layer.confirm('确认解除关联吗？',{title:'确认'},function () {
                    var res = JSON.parse(JSON.stringify(goods));
                    res.content_id = 0;
                    if(res.create_time) {
                        delete res.create_time;
                    }
                    if(res.update_time) {
                        delete res.update_time;
                    }
                    that.$http.post('/goods/goods/update/',res).then(function(){
                        layer.close(thlay);
                        layer.msg('解除关联成功!');
                        that.getGoodList();
                    },function(error){
                        //error
                    });
                });
            },
            getGoodList: function () {
                var that = this;
                that.$http.get('/goods/goods/list/').then(function(res) {
                    if(res.data && res.data.data){
                        that.$set('commList',res.data.data.object_list);
                    }
                    else {
                        layer.alert('数据格式发生变更或者错误!', {icon: 2});
                    }
                },function(error){

                });
            },
            deleteGood: function (commItem) {
                var that = this;
                var thlay = layer.confirm('确认删除该商品吗？',{title:'确认'},function () {
                    that.$http.post('/goods/goods/del/',{id:commItem.id}).then(function(){
                        layer.close(thlay);
                        layer.alert('删除商品成功!');
                        that.getGoodList();
                    },function(error){
                        //error
                    });
                })
            },
            buildGoodsConnect: function (goods) {
                this.goods = goods;
                this.tableLay = layer.open({
                    type: 1,
                    content: $('#navArea'),
                    area: ['620px', '700px'], //宽高
                });
            }
        }
    }
</script>
<style scoped>
    .main-area {background: #FFF;padding: 20px;}
    .main-area h1 { text-align: center; font-size: 22px;margin: 20px 0;}
    .add-form {margin-bottom: 20px;}
    .commManager-header h1{
    	float: left;
    	margin-left: 165px;
    	line-height: 2px;
    }
	.bfr{
		float: right;
		margin-right: 30px;
	}
</style>


