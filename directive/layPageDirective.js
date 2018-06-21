/**
 * Created by Kevin on 2017/7/17.
 */

module.exports = {
    inserted : function () {

    },
    bind: function () {

    },
    update: function (res) {
        res = res || {num_pages:1,page:1}
        var self = this,
            $el = $(this.el);
        laypage({
            cont: $el,
            pages: res.num_pages,
            curr: res.page,
            skip: true,
            skin: '#54a427',
            groups: 4,
            prev: '<',
            next: '>',
            jump: function(obj){
                //console.log(obj);
            }
        });
    }
}