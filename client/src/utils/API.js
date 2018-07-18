import axios from "axios";

export default {
  // Gets all books
  getRecipes: function () {
    return axios.get("/api/recipes");
  },
  // Deletes the book with the given id
  deleteRecipes: function (id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a book to the database
  saveRecipes: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  // Gets the book with the given id
  getRecipes: function (id) {
    return axios.get("/api/recipes/" + id);
  },
  patchRecipes: function (id, recipeData) {
    return axios.patch("/api/recipes/" + id, recipeData);
  },
};
