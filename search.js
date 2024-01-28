document.addEventListener("DOMContentLoaded", function(){
    //Adding Event Listener to the searchInput:
    
    let searchInputElement = document.getElementById("searchInput");
    let searchResultContainer = document.getElementById("searchResults");
    let spinnerElement = document.getElementById("spinner");
    
    //Displaying a single search result:
    
    function createAndAppendResult(result) {
    
        let {
            link,
            title,
            description
        } = result;
    
        //Creating result item:
        let resultContainer = document.createElement("div");
        resultContainer.classList.add("result-item");
    
        //Creating title element:
        let titleElement = document.createElement("a");
        titleElement.classList.add("result-title");
        titleElement.href = link;
        titleElement.target = "_blank";
        titleElement.textContent = title;
        resultContainer.appendChild(titleElement);
    
        //Creating break element:
        let titleBreakElement = document.createElement("br");
        resultContainer.appendChild(titleBreakElement);
    
        //Creating url element:
        let urlElement = document.createElement("a");
        urlElement.classList.add("result-url");
        urlElement.href = link;
        urlElement.target = "_blank";
        urlElement.textContent = link;
        resultContainer.appendChild(urlElement);
    
        //Creating break element:
        let urlBreakElement = document.createElement("br");
        resultContainer.appendChild(urlBreakElement);
    
        //Creating description element:
        let descriptionElement = document.createElement("p");
        descriptionElement.classList.add("link-description");
        descriptionElement.textContent = description;
        resultContainer.appendChild(descriptionElement);
    
        searchResultContainer.appendChild(resultContainer);
    }
    
    function displayResult(searchResults) {
        spinnerElement.classList.toggle("d-none");
        for (let eachSearchResult of searchResults) {
            createAndAppendResult(eachSearchResult);
        }
    }
    
    function searchWikipedia(event) {
        if (event.key === "Enter") {
            //Displaying a loading indicator:
            spinnerElement.classList.toggle("d-none");
    
            //Clearing previous search results before displaying:
            searchResultContainer.textContent = "";
    
            let searchInputValue = searchInputElement.value;
    
            //Making HTTP Request:
            let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
            let options = {
                method: "GET"
            }
    
            fetch(url, options)
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    let {
                        search_results
                    } = jsonData;
                    displayResult(search_results);
                });
        }
    }
    
    searchInputElement.addEventListener("keydown", searchWikipedia);
    
    });