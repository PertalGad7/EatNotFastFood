$(document).ready(function() {
    // Відображення деталей рецепту
    function displayRecipeDetails(recipeId) {
        var recipe = recipes[recipeId];
        // Перевірка, чи рецепт вже відкритий
        if (recipeDetailsState[recipeId]) {
			// Якщо відкритий, закрити його
			delete recipeDetailsState[recipeId];
        } else {
			// Якщо закритий, відкрити його
			recipeDetailsState[recipeId] = true;
			var recipeDetailsHTML = `
            <div class="recipe-details-frame">
				<h3>${recipe.title}</h3>
				<img src="${recipe.image}" alt="${recipe.title}">
				<div class="recipe-details">
					<h4>Інгредієнти:</h4>
					<ul>
						${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
					</ul>
					<h4>Інструкції:</h4>
					<p>${recipe.instructions}</p>
				</div>
            </div>`;
			$("#recipe-details").html(recipeDetailsHTML);
        }
    }

    // Відображення списку рецептів
    function displayRecipes() {
        $("#recipes").empty();

        for (var i = 0; i < recipes.length; i++) {
			var recipe = recipes[i];
			var recipeHTML = `
				<div class="recipe">
					<img src="${recipe.image}" alt="${recipe.title}">
					<h3>${recipe.title}</h3>
				</div>`;
			$("#recipes").append(recipeHTML);
        }
        // Оновлення відображення деталей рецептів
        $("#recipe-details").empty();
        for (var recipeId in recipeDetailsState) {
			if (recipeDetailsState.hasOwnProperty(recipeId)) {
				displayRecipeDetails(recipeId);
			}
        }
    }

    // Отримання списку рецептів з серверу
    function getRecipes() {
        $.get("/recipes", function(data) {
			recipes = JSON.parse(data);
			displayRecipes();
        });
      }

    // Додавання нового рецепту
    function addRecipe() {
        var recipeTitle = $("#recipe-title").val();
        var recipeIngredients = $("#recipe-ingredients").val().split("\n");
        var recipeInstructions = $("#recipe-instructions").val();
        var recipeData = {
			title: recipeTitle,
			ingredients: recipeIngredients,
			instructions: recipeInstructions
        };
        $.post("/recipes", JSON.stringify(recipeData), function() {
			$("#recipe-title").val("");
			$("#recipe-ingredients").val("");
			$("#recipe-instructions").val("");
			getRecipes();
        });
    }

    // Обробник події відправки форми
    $("#recipe-form").submit(function(event) {
        event.preventDefault();
        addRecipe();
    });
		var recipes = [];
		var recipeDetailsState = {};
		getRecipes();
    });