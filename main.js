//if(typeof jQuery213010040295729413629_1424747350860 == 'function') jQuery213010040295729413629_1424747350860({"SearchResponse":{"Version":"2.2","Query":{"SearchTerms":"house"},"Errors":[{"Code":1001,"Message":"Required parameter is missing.","Parameter":"SearchRequest.AppId","HelpUrl":"http\u003a\u002f\u002fmsdn.microsoft.com\u002fen-us\u002flibrary\u002fdd251042.aspx"}]}} /* pageview_candidate */);


var searchUrl = 'http://api.bing.net/json.aspx?&Query=';
//var searchUrl = 'https://api.datamarket.azure.com/Bing/Search/v1/&Query=';

// Keyup event listener to send AJAX request to Bing
$('input').on('keyup', function (evt) {	
	getSearchResults($(this).val());
}); 


function getSearchResults(query) {
	//put parameters here from API specs page
	var q = query
	var url = encodeURI(searchUrl  
		+ query
		+'&SearchRequest.AppId'
		+ '+Gd+7CMkT+CBOLT46UmpOMj9FWHCG0Gg8lTZYGJ0JKc'
		+ '&Sources=web'
		+ '&JsonType=callback&JsonCallback=?'
		)
	$.ajax({
		url: url,
		dataType: 'jsonp',
	}).done(function(response){
		render(response.search);//this gives you an array of search result responses
	})
	.fail(function(error){ 
		console.log(error); 
	})
}


function render(search) {//this is how you iterate over all of the search results the apis has returned
	var results = $('.results');
	results.empty();//clears the results each time a new query is sent.
	for(var i = 0; i < search; i++) {
		results.append(createSearchResultsHTML(search[i]));//this will append/display the results into the html page
	}
}


function createSearchResultsHTML (searchResult) {
	var searchString = '<div class="searchResult">'
	+ '<div class = "subResults">' 
	+ '<div class = "title">' 
	+ searchResult.Title
	+ '</div>'
	+ '<div class = "description">'
	+ searchResult.Description
	+ '</div>'
	+ '<div class="url">'
	+ searchResult.Url
	+ '</div>'
	+ '<div class="displayUrl">'
	+ searchResult.DisplayUrl
	+ '</div>'
	+ '</div>'
	+ '</div>'
	;
	var searchNow = $(searchString);
	return searchNow;
}

