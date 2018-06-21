<template>
    <div class="main-area">
        <h1>小小内容智能应用</h1>
        <ul class="cus-menu">
            <li>
                <div class="cus-title">
                    <a href="#">
                    <img src="../assets/customer-1.png"/>
                    <h3>留资转化</h3>
                    </a>
                </div>
                <p class="cus-price"><span>¥18</span></p>
                <p class="cus-des"><a href="#">自定义用户提交的内容，帮助您快速收拢用户信息，是内容转化的最佳帮手。</a></p>
            </li>
            <li>
                    <div class="cus-title">
                        <a href="#">
                            <img src="../assets/customer-2.png"/>
                            <h3>版权专属</h3>
                        </a>
                    </div>
                    <p class="cus-price"><span class="gr">¥18</span></p>
                    <p class="cus-des"><a href="#">所有页面将终身显示为您的版权声明，建立品牌的重要一步。</a></p>
            </li>
            <li>
                <div class="cus-title">
                    <a href="#">
                    <img src="../assets/customer-3.png"/>
                    <h3>红包赞赏</h3>
                    </a>
                </div>
                <p class="cus-price"><span class="or">¥18</span></p>
                <p class="cus-des"><a href="#">时下最流行的赞赏功能，使用场景丰富，让您的内容更值钱。</a></p>
            </li>
        </ul>
        <div class="cus-cz">
            <a href="#"><img src="../assets/customer-b.png"/></a>
            <p class="cus-cz-msg">费用算一算，买了真划算。应用购买不需分期、分月、分年。一次购买终身拥有。</p>
        </div>
    </div>
</template>
<script>
    module.exports = {
        created: function(){

        },
        data () {
            return {
                index: 0,
                objList: null
            }
        },
        methods: {
            changeItme: function (index) {
                this.$data.index = index;
            }
        }
    }
</script>
<style scoped>
    .main-area {background: #FFF;}
    .main-area h1 { text-align: center; font-size: 22px;margin: 35px 0;}
    .cus-menu {padding: 10px 40px 20px; overflow: hidden;}
    .cus-menu li {width: 30.5%;margin-right: 4%;box-shadow: 0 5px 6px 1px #DDD;border-radius: 10px;}
    .cus-menu li:last-child {margin-right:0;}
    .cus-menu li .cus-title {width: 100%;position: relative;}
    .cus-menu li .cus-title img {width: 100%;}
    .cus-cz {padding: 50px 40px;}
    .cus-title h3 {position: absolute;width: 100%;text-align: center;color: #FFF;top: 35%;font-weight: bolder;letter-spacing: 8px;}
    .cus-price {text-align: center;margin: 15px;}
    .cus-price span {border: 1px solid #1597fc; border-radius: 10px; padding: 5px 10px;color: #1597fc;font-weight: bolder;}
    .gr {border-color: #57ca0a !important;color: #57ca0a !important;}
    .or {border-color: #fab000 !important;color: #fab000 !important;}
    .cus-des {width: 80%; text-align: center;margin: 20px auto;line-height: 24px;}
    .cus-des a {color: #333;}
    .cus-cz-msg {display: inline-block; width: 27%; margin: 50px;line-height: 30px;}
</style>


