$(document).ready();
var bingKey = '+Gd+7CMkT+CBOLT46UmpOMj9FWHCG0Gg8lTZYGJ0JKc';
var searchUrl = 'http://api.bing.net/json.aspx?Query=';

// Keyup event listener to send AJAX request to Bing
$('input').on('keyup', function (evt) {
	
	getSearchResults($(this).val());
}); 


function getSearchResults(query) {
	//put parameters here from API specs page
	var url = encodeURI(searchUrl + query + '&JsonType=callback&JsonCallback=?')
	$.ajax({
		url: url,
		dataType: 'jsonp',
	}).done(function(response){
		render(response.search);//this gives you an array of search result responses
		$.empty();//clears the results each time a new query is sent.
	});
}


function render(search) {//this is how you iterate over all of the search results the apis has returned
	var results = $('.results');
	//put the .results.empty(); here instead?
	for(var i = 0; i < search.length; i++) {
		results.append(createSearchResultsHTML(search[i]));//this will append/display the results into the html page
	}
}


function createSearchResultsHTML (searchResults) {
	var searchString = '<div class="'
}


