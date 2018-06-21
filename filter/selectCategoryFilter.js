/**
 * Created by Kevin on 2017/9/19.
 */

var Vue = require('vue');

Vue.filter('getSelectCategory', function (value, begin, xing) {
    var str = '';
    for(var i = 0,len = value.length; i < len; i++) {
        if(begin.indexOf(value[i].id)>=0) {
            str += value[i].value_data;
        }
    }
    return str;
});