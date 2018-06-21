<template>
    <div class="list-info fl">
        <h3>线上版本</h3>
        <img v-if="status===1||status===2" src="/api/qrcode/getwxacode/" width="200px;"/>
        <img v-else src="../assets/online.png"/>
        <p>{{programStatus}}</p>
        <p>提交审核时间：{{programTime}}</p>
        <a class="do-apply" href="javascript:;" v-on:click="getMessage()" v-if="status===1">查看线上审核信息</a>
    </div>
</template>
<script>
    var statuStr = ['尚未提交审核','微信审核中','已上线（审核通过）'];
    module.exports = {
        created: function () {
            this.fetchRender();
        },
        data: function () {
            return {
                codeUrl: '',
                status: 0,
                programStatus:  '尚未提交审核', //等待审核中
                programTime: '-',
                auditid: 1
            }
        },
        events: {
            'sent-change': function (res) {
                this.fetchRender();
            }
        },
        methods: {
            returnDataStr: function (str) {
                var d = new Date(str),
                    year = d.getFullYear(),
                    m = d.getMonth()+1,
                    d = d.getDate();
                m = m >= 10 ? m: 0+''+m;
                d = d >= 10 ? d: 0+''+d;
                return year+'-'+m+'-'+d;
            },
            getMessage: function () {
                var that = this;
                var auditid = this.$get('auditid');
                that.$http.get('/apptemplates/app/online/get_auditstatus/',{
                    auditid: auditid
                }).then(function(res){
                    layer.msg(res.data.data);
                },function(error){

                });
            },
            fetchRender: function () {
                var that = this;
                that.$http.get('/apptemplates/app/online/status/').then(function(res){
                    var obj = res.data.data;
                    var push_time = that.returnDataStr(obj.push_time),
                        status = parseInt(obj.status);
                    that.$set('programTime',push_time);
                    that.$set('status',status);
                    that.$set('programStatus',statuStr[status]);
                    that.$set('auditid',obj.auditid);
                },function(error){
                    //error
                });
            }
        }
    }
</script>

<style scoped>
    .list-info {background: #FFF;width: 100%;text-align: center;padding-top: 30px;overflow: hidden;margin-top: 10px;}
    h3 {margin-bottom: 35px;}
    p {margin: 10px;line-height: 30px;}
    .list-info a {color: #333 !important;margin-bottom: 50px;display: inline-block;}
    .list-info a:hover {text-decoration: underline;}
</style>
