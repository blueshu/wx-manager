<template>
  <div class="footer">
      <div class="footer-area">
          <ul class="fl">
              <li><a href="javascript:;">关于我们</a></li>
              <li><a href="javascript:;">微酷课堂</a></li>
              <li><a href="javascript:;">我们团队</a></li>
          </ul>
          <ul class="fl" style="border-left: 1px solid #FFF;">
              <li class="wx-icon"><a href="javascript:;">微信：wecoolone  </a></li>
              <li class="qq-icon"><a href="javascript:;">QQ：111361632</a></li>
              <li class="email-icon"><a href="javascript:;">邮箱：team@socialmedia.cn</a></li>
          </ul>
          <img class="fr" src="../assets/logo-footer.png"/>
          <p class="fl">Copyright c 2013-2016 WECOOL All Rights Reserved</p>
          <p class="fl">兴东网络科技（上海）有限公司 上海市静安区海防路555号同乐坊2号楼</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .footer {background: #9ca2b1; width: 100%;overflow: hidden;margin-top: 20px;  }
    .footer-area { width: 1200px; margin: 20px auto 0; padding-top: 50px;  }
    ul { width: 25%; padding-left: 20px; margin-bottom: 25px;}
    ul li {display: block; width: 100%;line-height: 35px;margin: 5px 0;}
    .wx-icon:before {text-indent:-100px;content: '.';display: inline-block;width: 30px;height: 30px;background: url("../assets/split.png") no-repeat -1px -94px;}
    .qq-icon:before {text-indent:-100px;content: '.';display: inline-block;width: 30px;height: 30px;background: url("../assets/split.png") no-repeat -1px -63px;}
    .email-icon:before {text-indent:-100px;content: '.';display: inline-block;width: 30px;height: 30px;background: url("../assets/split.png") no-repeat -1px -123px;}
    ul li a {color: #FFF!important;}
    p {width: 100%;text-align: center;color: #cacaca;line-height: 25px;margin-top: 10px;}
</style>
