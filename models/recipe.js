const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  user: {type: String, required: true},
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
  sharable: {type: Boolean, required: true},
  origin: { type : String},
  labels: { type: String}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
