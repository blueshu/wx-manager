<template>
	<div class="main-area">

		<div class="log-setting">
			<a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'index'}">
				< 返回</a>
					<h3 class="title">物流配送</h3>
					<div class="">
						<h3>运费</h3>
						<p class="tips">向每件商品单独征收运费，并根据买家增加商品而追加运费</p>
						<div class="charge">
							<span>收件运费:</span>
							<input class="form-control" type="text" v-model="first_cost" oninput="value=value.replace(/[^\-?\d.]/g,'')" />
							<span class="cny">CNY</span>
						</div>
						<div class="charge">
							<span>每添加一件叠加费用:</span>
							<input class="form-control" type="text" v-model="cost" oninput="value=value.replace(/[^\-?\d.]/g,'')" />
							<span class="cny">CNY</span>
						</div>
					</div>
					<div class="reserve">
						<h3>预定</h3>
						<label style="font-weight: normal;">
						<input type="checkbox"  v-model="is_booking" />
						<p class="tips">将我的商品显示为需要预订并设置预计发货时间</p>
						</label>
						<div class="time">
							<span>预计发货时间:</span>
							<input class="form-control" v-model="send_time" v-dtpicker v-bind:disabled="!is_booking" readonly>
						</div>
					</div>
					<div class="message">
						<h3>留言</h3>
						<p class="tips">买家在结账时将能看到你的留言（选填）。</p>
						<textarea class="form-control" name="" rows="" cols="" v-model="comment"></textarea>
					</div>
					<div class="remind">
						<h3>通知提醒</h3>
						<p class="tips">这是用来跟客户沟通的联系方式，有新订单生成或者库存短缺时，我们也会发送通知。</p>
						<div class="phone">
							<p>手机短信提醒:</p>
							<input type="text" class="form-control" placeholder="请输入您的手机号" v-model="mobile" v-on:blur="verifyPhone" />
							<input type="text" class="form-control" oninput="value=value.replace(/[^\-?\d.]/g,'')" placeholder="短信验证码" v-model="verificationCode" />
							<button class="btn" v-if="count > 0" disabled style="width: 96px;">{{count}} 秒</button>
							<button class="btn" v-else v-on:click="getVerificationCode">获取验证码</button>
							<p class="error" v-show="phoneError">手机格式不正确 or 验证失败，请重新验证</p>
						</div>
						<div class="email">
							<p>邮件提醒:</p>
							<input type="email" class="form-control" placeholder="请输入您的邮箱地址" v-model="email" v-on:blur="verifyEmail" />
							<p class="error" v-show="emailError">邮箱格式错误</p>
						</div>
					</div>
					<button class="btn btn-success" v-on:click="save" v-bind:disabled="computedSave">保存</button>
		</div>

	</div>
</template>

<script scoped>
	module.exports = {
		created: function() {
			this.getLogistics();
		},
		data() {
			return {
                count: 0,
                first_cost: 0,
                cost: 0,
                is_booking: false,
                comment: null,
                mobile: '',
				phoneError: false,
				verificationCode: null,
                email: '',
				emailError: false,
                send_time : ''
			}
		},
		computed: {
			computedSave: function() {
				if(this.first_cost === '' || this.cost === '' || this.phoneError || this.emailError || !this.mobile || !this.verificationCode
					|| !this.email || (this.is_booking && !this.send_time)) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
		    getLogistics: function () {
                var that = this;
                that.$http.get('/goods/express/detail/').then(function(res) {
					if(res.data.data) {
					    var obj = res.data.data;
                        obj.first_cost && that.$set('first_cost',parseInt(obj.first_cost)/100);
                        obj.cost && that.$set('cost',parseInt(obj.cost)/100);
                        obj.is_booking && that.$set('is_booking',obj.is_booking);
                        obj.mobile && that.$set('mobile',obj.mobile);
                        obj.comment && that.$set('comment',obj.comment);
                        obj.email && that.$set('email',obj.email);
                        obj.email && that.$set('emailError',false);
                        obj.mobile && that.$set('phoneError',false);
                        obj.is_booking && that.$set('send_time',obj.send_time);
					}
                    //that.$set('contentList',dataRes);
                    //that.$set('page',res.data.data.paginator);
                },function(error){
                });
            },
			verifyPhone: function() {
				var flag = /^1[0-9]{10}$/.test(this.mobile);
				flag ? this.phoneError = false : this.phoneError = true;
			},
			verifyEmail: function() {
				var flag = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email);
				flag ? this.emailError = false : this.emailError = true;
			},
			getVerificationCode: function() {
		        if(!this.mobile) {
                    layer.alert('请先输入手机号码',{icon:2});
				}
				else if(this.phoneError) {
					return;
				}
                else if(this.times) {
                    return;
                }
				else {
		            var that = this;
		            this.doTimeOut();
                    that.$http.post('/user/sendsms/',{mobile: this.mobile}).then(function(res) {
                       	layer.msg('发送成功!');
                    },function(error){
                    });
				}
			},
			doTimeOut: function () {
		        var that = this;
		        that.count = 60;
		        if(this.times) {
		            clearInterval(this.times);
                    this.times = null;
				}
				function interV() {
                    that.count--;
					if(that.count === 0) {
                        clearInterval(that.times);
                        that.times = null;
					}
                }
                this.times = setInterval(interV,1000);
            },
			save: function() {
		        var postParam = {},
					that = this;
				if(this.computedSave) {
					return;
				}
				if(!this.is_booking){
					this.send_time = '';
                    postParam = {
                        first_cost: parseInt(that.$get('first_cost'))*100,
                        cost: parseInt(that.$get('cost'))*100,
                        comment: that.$get('comment'),
                        mobile: that.$get('mobile'),
                        email: that.$get('email'),
                        sms_code: that.$get('verificationCode')
                    }
				}
				else {
                    postParam = {
                        first_cost: parseInt(that.$get('first_cost'))*100,
                        cost: parseInt(that.$get('cost'))*100,
                        comment: that.$get('comment'),
                        mobile: that.$get('mobile'),
                        email: that.$get('email'),
                        send_time: that.$get('send_time'),
                        is_booking: (that.$get('is_booking') ? 1 : 0),
                        sms_code: that.$get('verificationCode')
                    }
				}
                that.$http.post('/goods/express/update/',postParam).then(function(){
                    layer.msg('更新送货信息成功');
                },function(error){
                    //error
                });
			}
		}
	}
</script>

<style scoped>
	.form-control[readonly] {
		background-color: #FFF !important;
	}
	.form-control[disabled] {
		background-color: #EEE !important;
	}
	.log-setting {
		padding: 20px;
	}
	
	.log-setting h3.title {
		text-align: center;
		display: block;
		line-height: 0;
		margin-right: 80px;
		margin-bottom: 40px;
	}
	
	.log-setting {
		background-color: #fff;
	}
	
	.log-setting>button {
		margin-top: 20px;
	}
	
	.charge {
		display: inline-block;
		margin-left: 20px;
		position: relative;
	}
	
	.tips {
		color: #aaa;
	}
	
	.charge input {
		padding-left: 55px;
		width: 160px;
		text-align: right;
	}
	
	#datetimepicker {
		width: 160px;
		display: inline-block;
	}
	
	.charge span {
		display: block;
	}
	
	.charge span.cny {
		position: absolute;
		top: 27px;
		left: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 0 3px;
	}
	
	.reserve>input {
		vertical-align: top;
	}
	
	.reserve .time input {
		display: inline-block;
		width: 160px;
	}
	
	.reserve p {
		display: inline-block;
	}
	
	.message textarea {
		width: 100%;
		height: 100px;
		resize: none;
	}
	
	.remind input {
		width: 160px;
		display: inline;
	}
	
	.remind .error {
		color: red;
	}
	
	.remind .phone,
	.remind .email {
		position: relative;
		margin-top: 10px;
	}
	
	.remind .phone input:nth-of-type(2) {
		margin-left: 20px;
	}
	
	.remind .phone a {
		position: absolute;
		left: 290px;
		top: 37px;
	}
</style>