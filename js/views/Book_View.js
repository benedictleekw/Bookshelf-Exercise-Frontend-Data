(function(){

	window.App = {
		Models: {},
		Collections: {},
		View: {}
	};

	window.template = function(id){
		return _.template( $('#' + id).html() );
	};

	App.Models.Book = Backbone.Model.extend({
		validate: function(attrs) {
			if ( ! $.trim(attrs.title) ){
				return 'A book requires a title.';
			}
		}
	});

	App.Models.Shelf = Backbone.Model.extend({

	});

	App.Collections.Books = Backbone.Collection.extend({
		model: App.Models.Book
	});

	App.Collections.Shelves = Backbone.Collection.extend({
		model: App.Models.Shelf
	});

	// App.View.Shelves = Backbone.View.extend({
	// 	initialize: function(){
	// 		this.collection.on('add', this.addOne, this);
	// 	},

	// 	render: function(){
	// 		this.collection.each(this.addOne, this);
	// 		return this;
	// 	},

	// 	addOne: function(shelf){
	// 		var shelfView = new App.View.Shelf({ model: shelf});
	// 		this.$el.append(shelfView.render().el);
	// 	}
	// });

	// view for all books
	App.View.Shelf = Backbone.View.extend({
		tagName: 'ul',
		className: 'connectedSortable',
		id: 'shelf1',
		// template: template('shelfTemplate'),

		initialize: function(){
			this.collection.on('add', this.addOne, this);
		},

		render: function(){
			// filter through all books in a collection
			var template = this.template( this.model.toJSON() );
			this.$el.html(template);
			this.collection.each(this.addOne, this);
			
			return this;
		},

		addOne: function(book) {
			// for each create a new BookView
			var bookView = new App.View.Book({ model: book });
			// append to root eleement
			this.$el.append(bookView.render().el);
		}
	});

	//view for a book
	App.View.Book = Backbone.View.extend({
		tagName : 'li',
		className : 'ui-state-default',
		template: template('bookTemplate'),

		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		events:{
			'click .edit': 'editTask',
			'click .delete': 'destroy'
		},

		editTask: function() {
			var editBookTitle = prompt('Change title name to?', this.model.get('title'));

			if ( !editBookTitle ) return;

			this.model.set('title', editBookTitle, {validate:true});

		},

		destroy: function(){
			this.model.destroy();
		},

		remove: function(){
			this.$el.remove();
		},

		render: function(){
			var template = this.template( this.model.toJSON() );
			this.$el.html(template);
			//this.collection.each(this.addOne, this);
			return this;
		}

	});

	App.View.AddBook = Backbone.View.extend({
		el: '#addBook',

		events: {
			'submit': 'submit'
		},

		initialize: function(){

		},

		submit: function(e){
			e.preventDefault();

			var newBookTitle = $(e.currentTarget).find('#inputTitle').val();
			var newBookIsbn = $(e.currentTarget).find('#inputIsbn').val();
			var newBookAuthor = $(e.currentTarget).find('#inputAuthor').val();
			var newBookGenre = $(e.currentTarget).find('#inputGenre').val();

			var book = new App.Models.Book({ title: newBookTitle, isbn: newBookIsbn, author: newBookAuthor, genre: newBookGenre });
			this.collection.add(book);
		}
	});

	shelvesCollection = new App.Collections.Shelves([
			{
				title: "shelf 1",
				id: "s1",
				books: [
					{	
						title: "Secrets of the JavaScript Ninja",
						isbn: "193398869X",
						author: "John Resig",
						genre: "Technology"
					},
					{
						title: "Ender's Game (The Ender Quintet)",
						isbn: "0812550706",
						author: "Orson Scott Card",
						genre: "Sci Fi"
					},
					{
						title: "I, Robot",
						isbn: "055338256X",
						author: "Isaac Asimov",
						genre: "Sci Fi"
					}
				]
			},
			{
				title: "shelf 2",
				id: "s2",
				books: [
					{
	                    title: "JavaScript Patterns",
	                    isbn: "0596806752",
	                    author: "Stoyan Stefanov",
	                    genre: "Technology"
	                },
	                {
	                    title: "Abraham Lincoln",
	                    isbn: "0195374525",
	                    author: "James M. McPherson",
	                    genre: "Biography"
	                }
				]
			}
		]);


	booksCollection = new App.Collections.Books([
			{
				title: "Secrets of the JavaScript Ninja",
				isbn: "193398869X",
				author: "John Resig",
				genre: "Technology"
			},
			{
				title: "Ender's Game (The Ender Quintet)",
				isbn: "0812550706",
				author: "Orson Scott Card",
				genre: "Sci Fi"
			},
			{
				title: "I, Robot",
				isbn: "055338256X",
				author: "Isaac Asimov",
				genre: "Sci Fi"
			}
		]);

	booksCollection2 = new App.Collections.Books([
			{
				title: "Secrets of the JavaScript Ninja",
				isbn: "193398869X",
				author: "John Resig",
				genre: "Technology"
			},
			{
				title: "Ender's Game (The Ender Quintet)",
				isbn: "0812550706",
				author: "Orson Scott Card",
				genre: "Sci Fi"
			},
			{
				title: "I, Robot",
				isbn: "055338256X",
				author: "Isaac Asimov",
				genre: "Sci Fi"
			}
		]);

	var addBookView = new App.View.AddBook({ collection: booksCollection });

	var shelfView = new App.View.Shelf({ collection: booksCollection });
	$('.books').append(shelfView.render().el);

	// var shelvesView = new App.View.Shelves({ collection: shelvesCollection });
	// $('.books').append(shelvesView.render().el);

})();
