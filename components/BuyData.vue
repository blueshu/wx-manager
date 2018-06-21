<template>
	<div class="buyer window" v-bind:style="{top:buyerTop + 'px',left:buyerLeft+'px'}" v-show="isShowBuyer">
		<p>买家姓名:<span>{{selectAddress.userName}}</span></p>
		<p>买家电话:<span>{{selectAddress.mobile}}</span></p>
		<p>买家地址:<span>{{selectAddress.province}}省{{selectAddress.city}}市{{selectAddress.area}}区{{selectAddress.address}}</span></p>
		<p>邮政编码:<span>{{selectAddress.zipcode}}</span></p>
		<p v-show="selectAddress.message && selectAddress.message != ''">买家留言:<span>{{selectAddress.message}}</span></p>
	</div>

	<div id="editLogistics" class="editLogistics">
		<select name="" class="form-control" v-model="logistics.state">
			<option value="0">待处理</option>
			<option value="1">已完成</option>
		</select>
		<div>
			<span>物流编号:</span><input type="text" class="form-control" v-model="logistics.number" />
		</div>
		<div>
			<span>物流公司:</span><input type="text" class="form-control" v-model="logistics.company" />
		</div>
		<button class="btn btn-success fr" v-on:click="confirmLogistics(logistics)">确认</button>
	</div>

	<div class="main-area">
		<a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'commodity'}">
			< 返回</a>
				<h3 class="title">购买数据</h3>
				<div class="header">
					<span class="fr">成功交易金额：￥<span>{{transactionMoney}}</span></span>
				</div>
				<table class="table table-striped">
					<thead>
						<tr>
							<th>商品名称</th>
							<th>订单状态</th>
							<th>买家姓名</th>
							<th>下单日期</th>
							<th>总价</th>
							<th>订单编号</th>
							<th>物流编号</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="orderItem in orderList">
							<td>{{orderItem.goods_name}}</td>
							<td>
								<span v-html="orderItem | filterState"></span>
								<a title="更新物流信息" href="javascript:;" v-show="orderItem.status == 0 && orderItem.is_paid === 1 || orderItem.status == 1" v-on:click="editLogistics(orderItem,this)"><img style='width: 20px' src='../assets/marker.png' /></a>
							</td>
							<td><a href="javascript:;" v-on:mouseenter="showBuyer(orderItem,this)" v-on:mouseout="hideBuyer">{{orderItem.wechat_name}}
								<img v-show="orderItem.order_comment && orderItem.order_comment != ''" style='width: 20px' src='../assets/msg.png' />
							</a>
							</td>
							<td>{{returnDataStr(orderItem.update_time)}}</td>
							<td>{{parseFloat(orderItem.price)*100}}</td>
							<td>{{orderItem.order_num}}</td>
							<td><span>{{orderItem.express_num}}</span> <span>{{orderItem.express_company}}</span></td>
						</tr>
					</tbody>
				</table>
				<button class="btn btn-success save hide" v-on:click="save" v-bind:disabled="computedSave">保存</button>
	</div>
</template>

<script>
	module.exports = {
		created: function() {
			this.commId = this.$route.params.commId;
			this.getOrderList();
		},
		data() {
			return {
                orderList: [],
                selectAddress: {},
				buyerTop: 0,
				buyerLeft: 0,
				isShowBuyer: false,
				logistics: {
					id: null,
					state: 1,
					number: "",
					company: ""
				},
				transactionMoney: 0
			}
		},

		filters: {
			filterState: function(item) {
			    var value = item.status,
					is_paid = item.is_paid;
			    console.log(value,is_paid);
				if( value == 0 ) {
				    if(is_paid === 0) {
                        return "<span><i style='width: 10px;height: 10px;border-radius: 50%;display: inline-block;background-color:blue;margin-right:8px;'></i>待付款</span>"
					}
					else {
                        return "<span><i style='width: 10px;height: 10px;border-radius: 50%;display: inline-block;background-color:blue;margin-right:8px;'></i>待处理</span>"
					}
				}
				else if( value == 1 ) {
					return "<span><i style='width: 10px;height: 10px;border-radius: 50%;display: inline-block;background-color:red;margin-right:8px;'></i>已完成</span>"
				}
				else if( value == 2 ) {
					return "<span><i style='width: 10px;height: 10px;border-radius: 50%;display: inline-block;background-color:gray;margin-right:8px;'></i>已取消</span>"
				}
			}
		},
		computed: {},
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
		    getOrderList: function () {
		        var that = this;
                that.$http.get('/goods/order/list/?goods_id='+this.commId).then(function(res) {
                    if(res.data.data) {
                        var totalPrice = 0;
                        that.$set('orderList',res.data.data.object_list);
                        var lists = res.data.data.object_list;
                        for(var i = 0, len = lists.length; i < len; i++) {
                            totalPrice += parseFloat(lists[i].price)*100;
						}
                        that.$set('transactionMoney',totalPrice);
                    }
                },function(error){
                });
            },
            save: function () {

            },
			editLogistics: function(item, e) {
                var logistics = {
                    state: item.status,
                    id: item.id,
                    number: item.express_num,
                    company: item.express_company
				}
                this.$set('logistics',logistics);
				var that = this;
				layer.open({
					title:'订单信息',
					type: 1,
					closeBtn:1,
					content: $('#editLogistics'),
					yes: function(index, layero) {
						layer.close(index);
						that.confirmLogistics(that.logistics);
					}
				});
			},
			confirmLogistics: function(item) {
				layer.closeAll();
				if(!item.number || !item.company) {
				    layer.alert('物流编号或者物流公司不能为空!');
				}
				else {
				    var that = this;
                    that.$http.post('/goods/order/update/',{status: item.state,id: item.id,express_num: item.number,express_company: item.company}).then(function(res) {
                        layer.msg('更新成功!');
                        that.getOrderList();
                    },function(error){
                    });
				}

			},
			showBuyer: function(item, e) {
				this.isShowBuyer = true;
				var selectAddress = item.address;
                selectAddress.userName = item.wechat_name;
                selectAddress.message = item.order_comment;
                this.$set('selectAddress',selectAddress);
				this.buyerTop = e.$event.clientY + 10;
				this.buyerLeft = e.$event.clientX + 10;
			},
			hideBuyer: function() {
				this.isShowBuyer = false;
			}
		}
	}
</script>

<style scoped>
	input,
	select {
		text-align: right;
	}
	
	.window {
		padding: 12px 8px;
		position: absolute;
		border: 1px solid #ccc;
		background-color: #fcfcfc;
		width: 300px;
		color: #555;
		border-radius: 5px;
		z-index: 1;
	}
	
	.buyer>p {
		margin-bottom: 10px;
	}
	
	.buyer>p span {
		font-weight: 600;
	}
	
	.layui-layer .layui-layer-content {
		padding: 10px;
	}
	
	.editLogistics{
		display: none;
		padding: 10px;
		color: #555;
	}
	.editLogistics select {
		width: 100px;
		margin: 5px;
		margin-left: 0;
	}
	

	.editLogistics input {
		width: 190px;
		display: inline-block;
		margin: 5px;
		text-align: center;
	}
	.editLogistics>button{
		margin-bottom: 10px;
		margin-right: 6px;
	}
	.main-area {
		background-color: #fff;
		padding: 20px;
	}
	
	.main-area>div {
		margin-top: 40px;
	}
	
	.main-area>h3.title {
		text-align: center;
		display: block;
		line-height: 0;
		margin-right: 80px;
		margin-bottom: 40px;
	}
	
	.header {
		height: 35px;
		font-size: 16px;
		border-bottom: 1px solid #ccc;
	}
	
	.header .fr {
		margin-right: 20px;
	}
	
	.round {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		display: inline-block;
	}
	
	.cancel {
		background-color: red;
	}
	
	.finish {
		background-color: red;
	}
</style>