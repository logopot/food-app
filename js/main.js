var apiKey = "00c765b4b5add7f8f6bd5e5cba9b05a7";
var appId = "e277f834";

var recipesContainer = document.getElementById("recipes");

var searchField = document.querySelector(".keyword-input");
var searchButton = document.querySelector(".search-button");

var loader = document.querySelector('.loader');
var imageLoader = document.createElement('img');



searchField.addEventListener("keyup", function(e) {
    if (e.target.value.length) {
        searchButton.removeAttribute("disabled");
        addClick();
    } else {
        searchButton.setAttribute("disabled", "disabled");
    }
});

function addClick() {
    searchButton.addEventListener("click", getRecipes);
};

function onSearch() {
    imageLoader.setAttribute("src", "img/loader.gif");
    imageLoader.style.display = "block";
    loader.appendChild(imageLoader);

    recipesContainer.innerHTML = "";
    return searchTerm = searchField.value;
};


function getRecipes() {
    onSearch();
    var recipesRequest = new XMLHttpRequest();
    var health = document.getElementById("health");
    var diet = document.getElementById("diet");

    var healthValue = health[health.selectedIndex].value;
    var dietValue = diet[diet.selectedIndex].value;

    
    var url = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=" + appId + "&from=0&to=12&app_key=" + apiKey;

    if (healthValue) {
        url = url + "&health=" + healthValue;
    }

    if (dietValue) {
        url = url + "&diet=" + dietValue;
    }


    recipesRequest.open("GET", url);

    recipesRequest.onload = function() {
        imageLoader.style.display = "none";
        var recipes = JSON.parse(recipesRequest.responseText).hits;
        var count = JSON.parse(recipesRequest.responseText).count;
        var countNumber = document.querySelector(".recipe-count-number");
        countNumber.innerHTML = count;

        listRecipes(recipes);
        console.log(recipes);
    };
    recipesRequest.send();
};



function listRecipes(recipes) {
    recipes.forEach(function(recipe) {
        createRecipes(recipe);
    });
};


function createRecipes(recipe) {
    var recipeElement = document.createElement("div");
    // var labelsContainer = document.createElement("div");
    // console.log(recipe);

    var image = '<img src = "' + recipe.recipe.image + '" alt = "">';
    var label = '<h3>' + recipe.recipe.label + '</h3>';
    var calories = '<span class= "calories">' + Math.round(recipe.recipe.calories); + '</span>';
    var tags = '<div class="labels">'; 

    recipe.recipe.healthLabels.forEach(function(label) {
        tags += '<span class="label">' + label + '</span>';
    }) 

    tags += "</div>";

    recipeElement.classList.add("recipe-element");

    recipeElement.innerHTML = image + label + tags + calories;

    recipesContainer.appendChild(recipeElement);

};

// search on press enter
searchField.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
        getRecipes();
    }
});


