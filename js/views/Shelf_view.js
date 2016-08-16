var app = app || {};

(function ($) {
	'use strict';

	app.Appview = Backbone.View.extend({
		render: function(){
			var items = this.model.get('');
		}
	});

})();