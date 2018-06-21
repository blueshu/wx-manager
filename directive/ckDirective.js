/**
 * Created by Kevin on 2017/7/17.
 */

module.exports = {
    inserted : function () {
    },
    bind: function () {

    },
    update: function (res) {
        if(res || res == '-1&*'){
            if(!this.firstUpdateFlag){
                var self = this,
                    key = self.expression,
                    initVal = self.vm.$get(key),
                    initVal = initVal== '-1&*' ? '' : initVal,
                    el = this.el;
                if( CKEDITOR.instances['message'] ){
                    CKEDITOR.remove(CKEDITOR.instances['message']);
                }
                var textArea = '<textarea id="message">'+initVal+'</textarea>';
                el.innerHTML = textArea;
                setTimeout(function () {
                    var editor = CKEDITOR.replace('message');
                    editor.on('change', function( event ) {
                        var data = this.getData();//内容
                        self.vm.$set(key,data);
                    });
                },0);
                this.firstUpdateFlag = true;
            }
        }
    }
}