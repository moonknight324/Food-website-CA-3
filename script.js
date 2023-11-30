// function to fetch random meal data
let parsedData;

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((data) => data.json())
  .then((data) => {
    parsedData = data;
    console.log(parsedData);

    const foodName = document.getElementById("food-name");
    const foodImage = document.getElementById("random-meal");

    foodImage.innerHTML = `<img src="${parsedData.meals[0].strMealThumb}"/>`;
    foodName.innerHTML = `<h4>${parsedData.meals[0].strMeal}</h4>`;

    if (parsedData.meals && parsedData.meals.length > 0) {
      foodName.innerHTML = `<h4>${parsedData.meals[0].strMeal}</h4>`;
      foodImage.innerHTML = `<img src="${parsedData.meals[0].strMealThumb}" onclick="openingModal()"/>`;
    } else {
      console.error("Unable to display meal ingredients.");
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

// function to load category-wise meals in the searched section
function loadingCategoryMeals() {
  const inputBox = document.getElementById("input-box");
  const categoriesBox = document.getElementById("categories-box");
  const categoriesImage = document.getElementById("categories-image");
  const categoriesName = document.getElementById("categories-name");
  const searchValue = inputBox.value.trim();

  categoriesImage.innerHTML = " ";
  categoriesBox.innerHTML = " ";
  categoriesName.innerHTML = " ";

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`)
    .then((response) => response.json())
    .then((dataParsed) => {
      console.log(dataParsed);

      if (dataParsed.meals && dataParsed.meals.length > 0) {
        for (const meal of dataParsed.meals) {
          const mealContainer = document.createElement("div");

          const imageElement = document.createElement("img");
          imageElement.src = meal.strMealThumb;
          mealContainer.appendChild(imageElement);

          const nameElement = document.createElement("h4");
          nameElement.textContent = meal.strMeal;
          mealContainer.appendChild(nameElement);

          categoriesBox.appendChild(mealContainer);
        }
      } else {
        categoriesBox.innerHTML = "No meals found";
      }
    })
    .catch((error) => console.error(error));
}

// function to open random meal modal
function openingModal() {
  const modal = document.getElementById("randomModal");
  const ingredientsList = document.getElementById("ingredients-list");

  ingredientsList.innerHTML = "";

  if (parsedData && parsedData.meals && parsedData.meals.length > 0) {
    const meal = parsedData.meals[0];

    const ingredients = getIngredientsArray(meal);

    for (let i = 0; i < ingredients.length; i++) {
      const listItem = document.createElement("li");
      listItem.textContent = ingredients[i];
      ingredientsList.appendChild(listItem);
    }

    modal.style.display = "block";
  } else {
    console.error("Unable to display ingredients.");
  }
}

// function to get the ingredients of the meal
function getIngredientsArray(meal) {
  const ingredients = [];
  for (let i = 1; i <= 30; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const ingMeasure = meal[`strMeasure${i}`];

    if (ingredient && ingMeasure) {
      ingredients.push(`${ingMeasure.trim()} ${ingredient.trim()}`);
    }
  }
  return ingredients;
}

window.onclick = function (e) {
  const modal = document.getElementById("randomModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// function to close the ingredients modal
function closingModal() {
  const modal = document.getElementById("randomModal");
  modal.style.display = "none";
}
