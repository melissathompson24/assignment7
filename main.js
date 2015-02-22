
var appId = '+Gd+7CMkT+CBOLT46UmpOMj9FWHCG0Gg8lTZYGJ0JKc';
var searchUrl = 'http://api.bing.net/json.aspx?AppId=';

// Keyup event listener to send AJAX request to Bing
$('input').on('keyup', function (evt) {	
	getSearchResults($(this).val());
}); 


function getSearchResults(query) {
	//put parameters here from API specs page
	var q = query
	var url = encodeURI(searchUrl  
		+ appId  
		+'&Query='
		+ query
		+ '&Sources=Web+RelatedSearch'
		+ '&JsonType=callback&JsonCallback=?'
		)
	$.ajax({
		url: url,
		dataType: 'jsonp',
	}).done(function(response){
		render(response.search);//this gives you an array of search result responses
	});
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
	;
	var searchNow = $(searchString);
	return searchNow;
}

/*
function Search()
    {
		var requestStr = "http://api.bing.net/json.aspx?"

		        
		            // Common request fields (required)
		            + "AppId=+Gd+7CMkT+CBOLT46UmpOMj9FWHCG0Gg8lTZYGJ0JKc" 
		            + "&Query" + query
		            + "&Sources=Web+RelatedSearch"
		            
		            // Common request fields (optional)
		            + "&Version=2.0"
		            + "&Market=en-us"
		            + "&Adult=Moderate"
		            + "&Options=EnableHighlighting"

		            // JSON-specific request fields (optional)
		            + "&JsonType=callback"
		            + "&JsonCallback=SearchCompleted";

		         var requestScript = document.getElementById("searchCallback");
		         requestScript.src = requestStr;
		    }

		    function SearchCompleted(response)
		    {
		        var errors = response.SearchResponse.Errors;
		        if (errors != null)
		        {
		            // There are errors in the response. Display error details.
		            DisplayErrors(errors);
		        }
		        else
		        {
		            // There were no errors in the response. Display the
		            // Web and RelatedSearch results.
		            DisplayResults(response);
		        }
		    }

		    function DisplayResults(response)
		    {
		        var output = document.getElementById("output");
		        
		        var resultsHeader = document.createElement("h4");
		        var resultsList = document.createElement("ul");
		        output.appendChild(resultsHeader);
		        output.appendChild(resultsList);
		    
		        var results = response.SearchResponse.RelatedSearch.Results;
		        
		        // Display the RelatedSearch results header.
		        resultsHeader.innerHTML = "Bing API Version "
		            + response.SearchResponse.Version
		            + "<br />RelatedSearch results for "
		            + response.SearchResponse.Query.SearchTerms
		            + "<br />";
		        
		        // Display the RelatedSearch results.
		        var resultsListItem = null;
		        var resultStr = "";
		        for (var i = 0; i < results.length; ++i)
		        {
		            resultsListItem = document.createElement("li");
		            resultsList.appendChild(resultsListItem);
		            resultStr = "<a href=\""
		                + results[i].Url
		                + "\">"
		                + results[i].Title
		                + "</a>";
		            
		            // Replace highlighting characters with strong tags.
		            resultsListItem.innerHTML = ReplaceHighlightingCharacters(
		                resultStr,
		                "<strong>",
		                "</strong>");
		        }

		        resultsHeader = document.createElement("h4");
		        resultsList = document.createElement("ul");
		        output.appendChild(resultsHeader);
		        output.appendChild(resultsList);
		    
		        results = response.SearchResponse.Web.Results;
		        
		        // Display the Web results header.
		        resultsHeader.innerHTML = "Web results for "
		            + response.SearchResponse.Query.SearchTerms
		            + "<br />Displaying "
		            + (response.SearchResponse.Web.Offset + 1)
		            + " to "
		            + (response.SearchResponse.Web.Offset + results.length)
		            + " of "
		            + response.SearchResponse.Web.Total
		            + " results<br />";
		        
		        // Display the Web results.
		        resultsListItem = null;
		        resultStr = "";
		        for (var i = 0; i < results.length; ++i)
		        {
		            resultsListItem = document.createElement("li");
		            resultsList.appendChild(resultsListItem);
		            resultStr = "<a href=\""
		                + results[i].Url
		                + "\">"
		                + results[i].Title
		                + "</a><br />"
		                + results[i].Description
		                + "<br />Last Crawled: "
		                + results[i].DateTime
		                + "<br /><br />";
		            
		            // Replace highlighting characters with strong tags.
		            resultsListItem.innerHTML = ReplaceHighlightingCharacters(
		                resultStr,
		                "<strong>",
		                "</strong>");
		        }
		    }
		    
		    function ReplaceHighlightingCharacters(text, beginStr, endStr)
		    {
		        // Replace all occurrences of U+E000 (begin highlighting) with
		        // beginStr. Replace all occurrences of U+E001 (end highlighting)
		        // with endStr.
		        var regexBegin = new RegExp("\uE000", "g");
		        var regexEnd = new RegExp("\uE001", "g");
		              
		        return text.replace(regexBegin, beginStr).replace(regexEnd, endStr);
		    }

		    function DisplayErrors(errors)
		    {
		        var output = document.getElementById("output");
		        var errorsHeader = document.createElement("h4");
		        var errorsList = document.createElement("ul");
		        output.appendChild(errorsHeader);
		        output.appendChild(errorsList);
		        
		        // Iterate over the list of errors and display error details.
		        errorsHeader.innerHTML = "Errors:";
		        var errorsListItem = null;
		        for (var i = 0; i < errors.length; ++i)
		        {
		            errorsListItem = document.createElement("li");
		            errorsList.appendChild(errorsListItem);
		            errorsListItem.innerHTML = "";
		            for (var errorDetail in errors[i])
		            {
		                errorsListItem.innerHTML += errorDetail
		                    + ": "
		                    + errors[i][errorDetail]
		                    + "<br />";
		            }
		            
		            errorsListItem.innerHTML += "<br />";
		        }
		    }
*/
