 // Declaration
 const noInfo =  document.querySelector("#meal-details h4");
 const mealsDiv = document.getElementById("meals-by-search");
 const mealName = document.getElementById("search");
 const submit = document.getElementById("submit");
 const mealDetails = document.getElementById("meal-details");
 const brk1 = document.getElementById("break1");
 const brk2 = document.getElementById("break2");

 // Event Listener Using For Search

 function getFirstMeals(){
     const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
     fetch(url)
     .then(res => res.json())
     .then(mealNames => {
         
         const meals = mealNames.meals;
         noInfo.innerHTML = "";
         mealsDiv.innerHTML = "";
         if(meals){
             showMeals(meals);
             brk1.style.display = "none";
             brk2.style.display = "none";
             const myMeals = document.getElementsByClassName("meal");
             // Event Bubble For Showing Meal Details
             for (let i = 0; i < myMeals.length; i++) {
                 const meal = myMeals[i];
                 // console.log(meal)
                 meal.addEventListener('click', function(){
                     showMealDetails(meals, meal.id);
                 })
             }
         }
         else{
             noInfo.innerHTML = `There is no meal in the name of <span class="text-danger">${mealName.value}<span>`;
             brk1.style.display = "none";
             brk2.style.display = 'block';
         }
     });
 }
 getFirstMeals();
 submit.addEventListener("click", (evt) =>{
     // console.log(mealName.value);
     loadMeals(mealName.value).then(mealNames => {
         // console.log(mealNames.meals);
         const meals = mealNames.meals;
         noInfo.innerHTML = "";
         mealsDiv.innerHTML = "";
         mealDetails.innerHTML = "";
         if(meals){
             showMeals(meals);
             brk1.style.display = "none";
             brk2.style.display = "none";
             const myMeals = document.getElementsByClassName("meal");
             // Event Bubble For Showing Meal Details
             for (let i = 0; i < myMeals.length; i++) {
                 const meal = myMeals[i];
                 // console.log(meal)
                 meal.addEventListener('click', function(){
                     showMealDetails(meals, meal.id);
                 })
             }
         }
         else{
             noInfo.innerHTML = `There is no meal in the name of <span class="text-danger">${mealName.value}<span>`;
             brk1.style.display = "none";
             brk2.style.display = 'block';
         }
     });
     evt.preventDefault();
 })
 
 // Fetching Data By Any Name
 const loadMeals = async (name) => {
     // console.log(name)
     const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
     const response = await fetch(`${url}${name}`);
     const data = await response.json();
     console.log(data)
     return data;
 }

 // Showing All Meals

 const showMeals = (meals) =>{
     // console.log(meals);
     meals.forEach(meal => {
         const mealDiv = document.createElement("a");
         // const href = document.createAttribute('href');
         // href.value = "#nav";
         // mealDiv.setAttributeNode(href);
         mealDiv.setAttribute("href", "#my-meal");
         mealDiv.id = `${meal.idMeal}`;
         mealDiv.className = `meal col-md-2 col-sm-6 p-2 card mx-3 my-2 text-decoration-none`;
         const mealInfo = `
             <img src="${meal.strMealThumb}" class="rounded" alt="">
             <div class="bg-light text-center text-muted py-3">${meal.strMeal}</div>
         `;
         mealDiv.innerHTML = mealInfo;
         mealsDiv.appendChild(mealDiv);
     }); 
 }
 
 // Meal Details Showing 
 
 function showMealDetails(meals, id){
     // console.log(meals, "\n", id);
     const meal = meals.find(meal => meal.idMeal === id);
     // console.log(meal);
     const mealInfo = `<div class="card meal-card p-2 mx-auto">
         <img class="rounded" src="${meal.strMealThumb}" alt="">
         <div class="d-flex justify-content-between ml-3 mr-3 mt-2">
             <h3>${meal.strMeal}</h3>
             <h5 class="text-warning mt-1">${meal.strArea} Food</h5>
         </div>
         <h6 class="ml-3 text-info">Ingredients:</h6>
         <ul id="ingredients"></ul> 
     </div>`;
     mealDetails.innerHTML = mealInfo;
     let ingredientLists = "";
     for (let i = 1; i <= 20; i++) {
         const ingredient = `strIngredient${i}`;              
         const measure = `strMeasure${i}`;
         // console.log(meal[ingredient]);
         if(!meal[ingredient]){
             break;
         }
         ingredientLists += `<li>${meal[ingredient]} - ${meal[measure]}</li>`;            
     }
     document.getElementById('ingredients').innerHTML = ingredientLists;
 }
 document.getElementById('date').innerHTML = new Date().getFullYear();