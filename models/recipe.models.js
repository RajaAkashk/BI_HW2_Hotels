const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeName: String,
  recipeDescription: String,
  serving: Number,
  preppingTime: String,
  cookingTime: String,
  ingredient: [{ type: String }],
  direction: [{ type: String }],
  notes: String,
  dishImage: String,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
