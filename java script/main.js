
var isTrue = !0;
$('.toggle-menue').click(function(){

    isTrue ?(
        $('.side-header').animate({left: "230px"}, 500, function(){
            $('.menue').toggle(1)
            $('.menue').removeClass("d-none")
            $('.fa-align-justify').toggleClass("fa-times"),
            $('.item1').animate({opacity:"1", paddingTop: "25px"}, 300, function(){
                $('.item2').animate({opacity:"1", paddingTop: "25px"},350, function(){
                    $('.item3').animate({opacity:"1", paddingTop: "25px"},400, function(){
                        $('.item4').animate({opacity:"1", paddingTop: "25px"},550, function(){
                            $('.item5').animate({opacity:"1", paddingTop: "25px"},500)
                        })
                    })
                })
            })
        }), isTrue = !isTrue)
     :($(".menue").addClass("d-none"),
     $('.fa-align-justify').toggleClass("fa-times"),
     $('.side-header').animate({left: "0px"}, 500),
     $(".menue li").animate({
            opacity: "0",
            paddingTop: "700px"
        }, 500),
        isTrue = !isTrue)
    
})


var allSearchArr = [];
var allMealsArr=[];
var cureentIndex;



// Show All Meals 
async function showAllMeals(){
    $(".loading-container").fadeIn(100)
    let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    allMeals = await allMeals.json()
    allMealsArr = allMeals.meals;
    $(".loading-container").fadeOut(400)
    displayAllMeals()
    // console.log(allMeals.meals)
 
}
showAllMeals()



let showMeal = "";
// Display all Meals
function displayAllMeals(){
    
    for(let i = 0; i < allMealsArr.length; i++){
        showMeal +=`<div  class="  col-md-6 col-lg-3  shadow">
        <div onclick="getMeal('${allMealsArr[i].idMeal}')" class=" card overflow-hidden" onclick="getRecipes()">
            <figure class="mb-0 post">
                <img src="${allMealsArr[i].strMealThumb}" class=" w-100 rounded" alt="meal">
                <figcaption class=" rounded d-flex align-items-center ">
                    <h2>${allMealsArr[i].strMeal}</h2>
                </figcaption>
            </figure>
            
        </div>
    </div> `
    }
    document.querySelector('.all-meals').innerHTML = showMeal;
    $("html, body").animate({
        scrollTop: 0
    }, 200)
    
}


async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    $(".loading-container").fadeOut(500)
    $('.overlay').removeClass('d-none')
}

function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 25; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>`
    } 
    let str = `
    <div class="col-md-4 myM text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white text-start">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex list-unstyled flex-wrap " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex list-unstyled " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
    document.querySelector('.meal-details').innerHTML = str
    document.querySelector("#recipes").innerHTML = recipes
    document.querySelector("#tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)

}


function displayRecipes(){

}

// Search Function
async function search(q) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals = await meals.json()
    allSearchArr =meals.meals

    $(".loading-container").fadeOut(400)
    displayMealSearch()
    return meals

}


async function getByLetter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        allSearchArr =meals.meals
        $('.search-letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
        // if (allSearchArr) {
        //     displayMealSearch(meals.meals)
        // }
        $(".loading-container").fadeOut(100)
        displayMealSearch()
        return meals
    }
}
// document.querySelector('.search-letter').addEventListener("keyup", function(){
//     getByLetter()
// })
// Display Search Meal
function displayMealSearch(){
    let searchResult = "";

    for(let i = 0; i < allSearchArr.length; i++){
        searchResult +=`<div class="col-md-6 col-lg-3 shadow">
        <div onclick="getMeal('${allSearchArr[i].idMeal}')" class="card overflow-hidden">
            <figure class="mb-0">
                <img src="${allSearchArr[i].strMealThumb}" class=" w-100 rounded" alt="meal">
                <figcaption class=" rounded d-flex align-items-center ">
                    <h2>${allSearchArr[i].strMeal}</h2>
                </figcaption>
            </figure>
            
        </div>
    </div> `
    }
    document.querySelector('.searchRow').innerHTML = searchResult;
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}




async function showAllAreas(){
    $(".loading-container").fadeIn(100)
    let allMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    allMeals = await allMeals.json()
    allMealsArr = allMeals.meals;
    $(".loading-container").fadeOut(400)
    displayArea()
 
}

showAllAreas()
function displayArea() {
    let area = ""
    for (var i = 0; i < allMealsArr.length; i++)
     area += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByArea('${allMealsArr[i].strArea}')" >
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${allMealsArr[i].strArea}</h2>
            </div>
        </div>
    </div>`
    document.querySelector('#areaData').innerHTML = area
    $("html, body").animate({
        scrollTop: 0
    }, 200)

}
// displayArea()
async function filterByArea(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    allMealsArr= meals.meals
    // showAllMeals()
    // displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
    console.log(allMealsArr)
    displayAllMeals()
    // return meals

}

async function showAllIngrediants(){
    $(".loading-container").fadeIn(100)
    let allMeals = await fetch(`www.themealdb.com/api/json/v1/1/list.php?i=list`);
    allMeals = await allMeals.json()
    allMealsArr = allMeals.meals;
    $(".loading-container").fadeOut(400)
    displayIngredients()
    console.log("ingrediants")
 
}

  showAllIngrediants()

function displayIngredients() {
    let home = ""
    for (var i = 0; i < allMealsArr.length; i++) 
    home += `
    <div class="col-md-6 col-lg-3 my-3  shadow">
        <div onclick="getMainIngredient('${allMealsArr[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${allMealsArr[i].strIngredient}</h2>
                <p class="text-white">${allSearchArr[i].strDescription}</p>
            </div>
        </div>
    </div>`

    document.querySelector('#ingredData').innerHTML= home
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}

async function getMainIngredient(mealName) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loading-container").fadeOut(500)
}