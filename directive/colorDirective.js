/**
 * Created by Kevin on 2017/7/17.
 */

module.exports = {
    inserted : function () {

    },
    bind: function () {
        var self = this,
            $el = $(this.el),
            sId = 'picker'+new Date().getTime();
        $el.parent().click(function () {
            var offsets = $el.offset();
            offsets.top = offsets.top + $el.height();

            var defaultColor = self.vm.$data.app_config[$el.data('key')];
            if($('#'+sId).length == 0) {
                $('<div id= "'+sId+'" class="wk-color-picker-con" style="top:'+offsets.top+'px;left:'+offsets.left+'px;"></div>').appendTo('body').farbtastic({
                    defaultColor: defaultColor,
                    callback: function (sColor) {
                        self.vm.$data.app_config[$el.data('key')] = sColor;
                    }
                })
            }
            else {
                $('#'+sId).css({top:offsets.top,left:offsets.left}).show();
            }
            return false;
        });
    },
    update: function (el,binding, vnode) {

    }
}