const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  user: {type: String, required: true, },
  name: { type: String, required: true, text: true },
  ingredients: { type: String, required: true, text: true },
  description: { type: String, required: true, text: true },
  // key: {type: Number },
  sharable: {type: Boolean, required: true},
  origin: { type : String},
  labels: { type: String, text: true}
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
