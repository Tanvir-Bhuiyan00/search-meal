const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  // console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerText = "";
  meals.forEach((meal) => {
    // console.log(meal);

    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
          ${meal.strTags ? meal.strTags : "Delicious Try it!!!"}
        </p>
        <button onclick="loadMealDetails(${
          meal.idMeal
        })" type="button" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target="#mealDetails">
          Details
        </button>
      </div>
    </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  loadMeals(searchText);
};

const loadMealDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (meal) => {
  document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
  const mealDetails = document.getElementById("mealDetailsBody");
  mealDetails.innerHTML = `
  <div class="card h-100">
    <img src="${meal.strMealThumb}" class="img-fluid card-img-top" />
    <h3 class="p-3">Instruction</h3>
    <p class="card-text p-3">${meal.strInstructions}</p>
  </div>
  `;
};

loadMeals("fish");
