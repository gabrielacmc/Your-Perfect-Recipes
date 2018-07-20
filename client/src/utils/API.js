import axios from "axios";

export default {
  // Gets all recipes
  getRecipes: function () {
    return axios.get("/api/recipes");
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
  searchRecipes: function () {
    return axios.get("/api/edamamrecipes");
  }
};
