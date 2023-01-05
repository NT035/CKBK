export type Recipe = {
  recipe_id: string;
  recipe_name: string;
  serving_size: string;
  prep_time: string;
  ingredients: string[];
  instructions: string[];
};

const DEFAULT: Recipe = {
  recipe_id: "default",
  recipe_name: "default",
  serving_size: "default",
  prep_time: "default",
  ingredients: [],
  instructions: [],
};

export function makeRecipeObject(recipeText: string): Recipe {
  let split_text = recipeText.split("Serving Size:");
  let recipe_name = split_text[0];

  split_text = split_text[1].split("Preparation Time:");
  let serving_size = split_text[0];

  split_text = split_text[1].split("Ingredients:");
  let prep_time = split_text[0];

  split_text = split_text[1].split("Instructions:");
  let ingredients = split_text[0];
  let ingredients_list = ingredients.split("-").slice(1, -1);

  let instructions_list = split_text[1].split(
    /\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\./
  );
  instructions_list = instructions_list.slice(1, -1);
  var final_ins: string[] = [];
  for (let i = 1; i < instructions_list.length; i += 2) {
    final_ins.push(instructions_list[i]);
  }
  instructions_list = final_ins;

  return {
    recipe_id: "default",
    recipe_name: recipe_name,
    serving_size: serving_size,
    prep_time: prep_time,
    ingredients: ingredients_list,
    instructions: instructions_list,
  };
}
