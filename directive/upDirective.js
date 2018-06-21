/**
 * Created by Kevin on 2017/7/17.
 */

module.exports = {
    inserted : function () {
        console.log(1);
    },
    bind: function () {
        var self = this,
            el = this.el;
        el.innerHTML = '<form action="/api/public/static/upload/" enctype="multipart/form-data" name="form" class="wk-up-form"><input class="formFile" type="file" name="file" /><input type="submit" class="file-sub"></form>';
    },
    update: function () {
        var that = this,
            layss = null,
            el = that.el,
            key = that.expression;
        $(el).find('.formFile').bind('change',function () {
            if($(this).val() != ''){
                var $parent = $(this).closest('.wk-up-form');
                $parent.find('.file-sub').click();
                layss = layer.load(1,{shade:0.3});
            }
        });
        $(el).find('.wk-up-form').ajaxForm({
            complete: function(xhr) {
                if(layss){
                    layer.close(layss);
                }
                var data = eval('(' + xhr.responseText + ')');
                if (data['status'] == '0') {
                    that.vm.$set(key,data.data.file_path);
                } else {
                }
            }
        });
    }
}