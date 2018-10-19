let favFoods = []

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods);
        let foodList = document.querySelector("#foodList");
        parsedFoods.forEach((food) => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(foods => foods.json())
                .then(grabbedFoods => {
                    console.log(grabbedFoods) 
                    foodList.innerHTML += 
                    `<div class="foodDiv">
                    <h2>${food.name}</h2>
                    <p>${food.ethnicity} ${food.type}</p>
                    <p>Ingredients: ${grabbedFoods.product.ingredients_text}</p>
                    <p>Country of Origin: ${grabbedFoods.product.countries}</p>
                    <p>Ingredients: ${grabbedFoods.product.nutriments.energy} ${grabbedFoods.product.nutriments.energy_unit}</p>
                    <p>Total Fat: ${grabbedFoods.product.nutriments.fat}</p>
                    <p>Total Sugars: ${grabbedFoods.product.nutriments.sugars} ${grabbedFoods.product.nutriments.sugars_unit}</p>
                    </div>`
                })          
        })
    })

// Create individual card for each food with header(name) li type and ethnicity
//Each food is an object within array