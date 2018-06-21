<template>
    <div class="main-area">
        <a class="wk-btn fl back-i" href="javascript:;" v-link="{name: 'formManager'}">< 返回</a>
        <br class="clear">
        <h1>活动数据</h1>
        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th v-for="oMsg in mesList">{{oMsg}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sourceA in sourcesList" track-by="$index">
                <td v-for="obj in sourceA" track-by="$index">{{obj}}</td>
            </tr>
            </tbody>
        </table>
    </div>

</template>
<script>
    module.exports = {
        created: function() {
            this.getSourcesList();
        },
        data () {
            return {
                mesList: [],
                sourcesList: [],
                objList: null
            }
        },
        methods: {
            getSourcesList: function () {
                var that = this;
                that.$http.get('/minform/campaign/report/').then(function(res) {
                    if(res.data && res.data.data && res.data.msg){
                        that.$set('mesList',res.data.msg);
                        that.$set('sourcesList',res.data.data.object_list);
                    }
                    else {
                        layer.alert('数据格式发生变更或者错误!', {icon: 2});
                    }
                },function(error){

                });
            },
            changeItme: function (index) {
                this.$data.index = index;
            }
        }
    }
</script>
<style scoped>
    .main-area {background: #FFF;padding: 20px;}
    .main-area h1 { text-align: center; font-size: 22px;margin: 20px 0;}
    .back-i {border-top-left-radius: 0;border-bottom-left-radius: 0;}

</style>


