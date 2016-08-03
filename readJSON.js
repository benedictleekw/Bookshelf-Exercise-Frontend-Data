$(document).ready(function() {
	var books = [];
	$.getJSON("case.json", function(data){
		$.each(data.bookcase, function(i, shelf) {
			var shelfTitle = $.trim(shelf.title).split(" ").join("");
			console.log(shelfTitle);
			var tblRow = "<tr>" + "<td>" + shelf.title + "</td>" + "<td>" + shelf.id + "</td>" + "</tr>"
				//$(tblRow).appendTo("#userdata tbody");
			$.each(shelf.books, function(i, book){
				var author = appendHTMLDiv("Author", book.author);
				var isbn = appendHTMLDiv("ISBN", book.isbn);
				var genre = appendHTMLDiv("Genre", book.genre);
				var booksData = "<li class='ui-state-default'>" + book.title + author + isbn + genre + "</li>"
				$(booksData).appendTo("#" + shelfTitle);
				//var tblRow2 = "<tr>" + "<td>" + book.title + "</td>" + "<td>" + book.author + "</td>" + "</tr>"
				//$(tblRow2).appendTo("#userdata tbody");
			}); 
		});
	});

	function appendHTMLDiv(arg, data) {
		var html = "<div>" + arg + ": " + data + "</div>"
		return html;
	}
});

