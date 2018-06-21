<template>
	<div class="main-area">
		<a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'commodity'}">< 返回</a>
		<h3 class="title">{{title}}</h3>
		<div class="info">
			<label>
				商品名称:
				<input type="text" class="form-control" style="font-weight: normal;" v-model="name"/>
			</label>

		</div>
		<div class="header">
			<label class="fl">商品价格</label>
			<label class="fr" v-if="commId && commId != 0">ID:
				<span>{{commId}}</span>
			</label>
			<label class="fr" v-else>
				新增商品
			</label>
		</div>
		<div class="info">
			<div class="info-price">
				<p>价格:</p>
				<input type="text" class="form-control" oninput="value=value.replace(/[^\-?\d.]/g,'')" v-model="specification_list[0].price" />
				<span class="cny">CNY</span>
			</div>
			<div class="info-repertory">
				<p>库存:</p>
				<input type="text" v-if="specification_list[0].stock === -1" readonly="readonly" class="form-control" disabled oninput="value=value.replace(/[^\-?\d.]/g,'')" />
				<input type="text" v-else class="form-control" oninput="value=value.replace(/[^\-?\d.]/g,'')" v-model="specification_list[0].stock" />
				<label style="font-weight: normal;margin-left: 15px;">
					<input type="checkbox" v-on:click="changeBuyLimit(false,specification_list[0])" v-if="specification_list[0].stock === -1" checked/>
					<input type="checkbox" v-on:click="changeBuyLimit(true,specification_list[0])" v-else />
					无购买限制
				</label>
			</div>
		</div>
		<div class="specification">
			<button class="btn" v-on:click="addSpec">+添加规格</button>
			<table class="table table-striped">
				<thead v-if="specification_list.length > 1">
					<tr>
						<th>商品规格:</th>
						<th>价格:</th>
						<th>库存:</th>
					</tr>
				</thead>
				<tbody v-if="specification_list.length > 1">
					<tr v-for="specItem in specification_list">
						<td><input type="text" class="form-control" v-model="specItem.specification" placeholder="颜色尺寸等等" /></td>
						<td class="price">
							<input type="text" class="form-control" v-model="specItem.price" oninput="value=value.replace(/[^\-?\d.]/g,'')" />
							<span class="cny">CNY</span>
						</td>
						<td class="repertory">
							<input type="text" v-if="specItem.stock === -1" readonly="readonly" disabled class="form-control" oninput="value=value.replace(/[^\-?\d.]/g,'')" />
							<input type="text" v-else class="form-control" v-model="specItem.stock" oninput="value=value.replace(/[^\-?\d.]/g,'')" />
							<label style="font-weight: normal;margin-left: 15px;">
								<input type="checkbox" v-on:click="changeBuyLimit(false,specItem)" v-if="specItem.stock === -1" checked/>
								<input type="checkbox" v-on:click="changeBuyLimit(true,specItem)" v-else />
								无购买限制</label>
						</td>
						<td>
							<a title="删除" v-on:click="deleteSpec(specItem)"><img style="width: 20px" src="../assets/delete.png" /></a>
						</td>
					</tr>
				</tbody>
			</table>
			<button class="btn" v-on:click="addSpec">+添加规格</button>
		</div>
		<div class="original">
			<div class="originalres">
				<p>原价效果:</p>
				<input type="text" class="form-control" v-if="cost_price === -1" oninput="value=value.replace(/[^\-?\d.]/g,'')" disabled/>
				<input type="text" class="form-control" v-else oninput="value=value.replace(/[^\-?\d.]/g,'')" v-model="cost_price"/>
				<span class="cny">CNY</span>
				<label style="font-weight: normal;">
					<input type="checkbox" v-model="hasOrigin" v-on:click="changeOrigin()"/>
					开启
				</label>
			</div>
			<div class="sale">
				<p>销量效果:</p>
				<span>购买倍数:</span>
				<select class="form-control" v-model="times" v-bind:disabled="times === -1">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
				<span>倍</span>
				<label style="font-weight: normal;">
					<input type="checkbox" v-model="hasTimes" v-on:click="changeMuit()"/>
					开启
				</label>
			</div>
		</div>
		<button class="btn btn-success save" v-on:click="save" v-bind:disabled="computedSave">保存</button>
	</div>
</template>

<script scoped>
	module.exports = {
		created: function() {
            this.commId = this.$route.params.commId;
			if(this.commId != 0) {
                this.getGoodDes()
			}
		},
		data() {
			return {
                name: '',
				commId: null,
                cost_price: 40, //原始价格
				hasOrigin: true,
                times: 1, //购买倍数
                hasTimes: true,
                specification_list: [{
                    id: 1,
                    specification: '',
					price: 20,
                    stock: -1
				}]
			}
		},
		computed: {
			computedSave: function() {
				if(this.name === '') {
					return true;
				} else {
					return false;
				}
			},
			title: function(){
				if(this.commId == 0){
					return '新建商品'
				}else{
					return '修改商品'
				}
			}
		},
		methods: {
            changeOrigin: function () {
                var times = this.$get('cost_price');
                if(times === -1) {
                    this.$set('cost_price',40);
                    this.$set('hasOrigin',true);
                }
                else {
                    this.$set('cost_price',-1);
                    this.$set('hasOrigin',false);
                }
            },
            changeMuit: function () {
                var times = this.$get('times');
                if(times === -1) {
                    this.$set('times',1);
                    this.$set('hasTimes',true);
				}
				else {
                    this.$set('times',-1);
                    this.$set('hasTimes',false);
				}

            },
            changeBuyLimit: function (tag,item) {
				var specList = this.$get('specification_list');
				if(tag) {
                    item.stock = -1;
                }
                else if(item.stock === -1) {
                    item.stock = 0;
				}

            },
			addSpec: function() {
				var items = this.$get('specification_list');
				var sid = new Date().getTime();
				var _addItem = {
				    id: sid,
                    specification: '',
                    price: 20,
                    stock: 0
				};
				items.push(_addItem);
			},
			getGoodDes: function () {
                var that = this;
                that.$http.get('/goods/goods/detail/?id='+that.commId).then(function(res) {
                    if(res.data && res.data.data) {
                        var obj = res.data.data;
                        that.$set('name',obj.name);
                        if(!obj.cost_price || obj.cost_price == -1) {
                            that.$set('hasOrigin',false);
                            that.$set('cost_price',parseFloat(obj.cost_price)/100);
						}
						else {
                            that.$set('hasOrigin',true);
                            that.$set('cost_price',parseFloat(obj.cost_price)/100);
						}
                        if(!obj.times || obj.times == -1) {
                            that.$set('hasTimes',false);
                            that.$set('times',obj.times);
                        }
                        else {
                            that.$set('hasTimes',true);
                            that.$set('times',obj.times);
                        }
                        if(obj.specification_list && obj.specification_list.length > 0) {
                            for(var i = 0 ,len = obj.specification_list.length; i < len; i++) {
                                obj.specification_list[i].price = parseFloat(obj.specification_list[i].price)/100;
							}
                            that.$set('specification_list',obj.specification_list);
						}
                    }
                    else {
                        layer.alert('数据格式发生变更或者错误!', {icon: 2});
                    }
                },function(error){

                });
            },
			deleteSpec: function(item) {
                var items = this.$get('specification_list');
                var thlay = layer.confirm('确认删除该规格吗？',{title:'确认'},function () {
                    for(var i = 0; i < items.length; i++) {
                        if(item.id === items[i].id) {
                            items.splice(i, 1);
                            break;
                        }
                    }
                    layer.close(thlay);
                })
			},
			save: function() {
				if(this.computedSave) {
					return;
				}
				var that = this,
					newItems = [],
				 	items = that.$get('specification_list');
                for(var i = 0; i < items.length; i++) {
                    newItems.push({
                        goods_id: that.commId,
                        specification: items[i].specification,
                        price: parseFloat(items[i].price)*100,
                        stock: items[i].stock
                    })
                }
                var parm = {
                    name: that.$get('name'),
                    cost_price: parseFloat(that.$get('cost_price'))*100,
                    times: that.$get('times'),
                    specification_list: JSON.stringify(newItems)
                };
                if(this.commId && this.commId != 0) {
                    parm.id = this.commId;
				}
                that.$http.post('/goods/goods/update/',parm).then(function(){
                    if(this.commId != 0) {
                        layer.msg('修改产品成功');
					}
					else {
                        layer.msg('添加产品成功');
					}
                    that.$router.go({name: 'commodity'});
                },function(error){
                    //error
                });
			}
		}
	}
</script>

<style scoped>
	input,
	select {
		text-align: right;
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
	
	.header .fl {
		margin-left: 20px;
	}
	
	.header .fr {
		margin-right: 20px;
	}
	.info > label {width: 80%;}
	.info > label input {text-align: left;width: 70%;display: inline-block;margin-left: 10px;margin-top: 20px;}
	.info,
	.specification {
		margin-top: 20px;
	}
	
	.info>div,
	.original>div {
		display: inline-block;
		vertical-align: top;
	}
	
	.info>div input[type="text"],
	.original>div input[type="text"],
	.original>div select {
		width: 160px;
		text-align: right;
		display: inline-block;
	}
	
	.info-price,
	.original>div {
		position: relative;
	}
	
	.deleteTest {
		text-decoration: line-through;
	}
	
	.info-price input {
		padding-left: 55px;
	}
	
	.info-price span.cny,
	.originalres span.cny {
		top: 36px;
		left: 9px;
	}
	
	.info-repertory,
	.sale {
		margin-left: 30px;
	}
	
	.info-repertory input[type="checkbox"] {
		display: inline-block;
	}
	
	span.cny {
		position: absolute;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 0 3px;
	}
	
	.table {
		width: 70%;
	}
	
	.table>thead>tr>th {
		border: 0;
		font-weight: initial;
	}
	
	.table .price {
		position: relative;
		;
	}
	
	.table .price input {
		padding-left: 55px;
	}
	
	.table .price span.cny {
		top: 14px;
		left: 16px;
	}
	
	.table input[type="text"] {
		width: 180px;
	}
	
	.table img {
		vertical-align: -webkit-baseline-middle;
	}
	
	.table .repertory input[type="text"] {
		display: inline-block;
		margin-right: 5%;
	}
	
	.original>div select {
		width: 60px;
	}
	
	.original input[type="checkbox"] {
		margin-left: 10px;
	}
	
	input[type="checkbox"]+span {
		/*vertical-align: text-bottom*/
	}
	
	.save {
		margin-top: 30px;
		display: block;
	}
</style>