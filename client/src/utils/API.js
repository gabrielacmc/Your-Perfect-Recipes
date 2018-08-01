import axios from "axios";

export default {
  // Gets all recipes
  getRecipes: function () {
    return axios.get("/api/recipes");
  },
  //Get recipe from user
  getRecipesUser: function (user) {
    return axios.get("/api/recipes/user/" + user);
  },
   //Search recipes from user by keyword 

   getRecipesUserQuery: function (user, queryString) {
    return axios.get("/api/recipes/search/" + user, {params:{searchQuery:queryString}});

  },
  // Deletes the recipe with the given id
  deleteRecipes: function (id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database
  saveRecipes: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  // Gets the recipe with the given id
  getRecipesID: function (id) {
    return axios.get("/api/recipes/" + id);
  },
  patchRecipes: function (id, recipeData) {
    return axios.patch("/api/recipes/" + id, recipeData);
  },
  searchEdamam: function (queryString) {
    // console.log(queryString);
    return axios.get("https://api.edamam.com/search?q=" + queryString + "&app_id=a5ee7877&app_key=385a3e92adcbf250abaab079e4e705f5");
    // console.log("API hit");
  },
  saveEdamam: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  findEdamamID: function (cardLink) {
    // return axios.get("api/recipes/search/" + {params:{searchQuery:cardLink}});
    console.log({params:{searchQuery:cardLink}});
  },
  deleteEdamam: function (id) {
    return axios.delete("/api/recipes/" + id);
  }
};
