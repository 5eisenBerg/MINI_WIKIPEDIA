let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendData(result) {
    let {
        title,
        link,
        description
    } = result;
    let titleElement = document.createElement("a");
    titleElement.classList.add("result-title");
    titleElement.textContent = title;
    titleElement.href = link;
    titleElement.target = "_blank";
    searchResults.appendChild(titleElement);

    let breakElement1 = document.createElement("br");
    searchResults.appendChild(breakElement1);

    let linkElement = document.createElement("a");
    linkElement.classList.add("result-url");
    linkElement.textContent = link;
    linkElement.href = link;
    linkElement.target = "_blank";
    searchResults.appendChild(linkElement);

    let breakElement2 = document.createElement("br");
    searchResults.appendChild(breakElement2);

    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;
    searchResults.appendChild(descriptionElement);
}

function display(search_results) {
    searchResults.textContent = "";
    spinner.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendData(result);
    }
}

function searchTheItem(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        let searchInputValue = searchInput.value;
        let options = {
            method: "GET"
        };

        fetch("https://apis.ccbp.in/wiki-search?search=" + searchInputValue, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                display(search_results);
            });
    }
}

searchInput.addEventListener("keydown", searchTheItem);