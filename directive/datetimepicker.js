module.exports = {
	inserted: function() {

	},
	bind: function() {
		var self = this,
			$el = $(this.el);
		$el.datetimepicker({
			format: "yyyy-mm-dd",
			autoclose: true,
			minView:3,
			language:"zh-CN"
		});

	},
	update: function(el, binding, vnode) {

	}
}