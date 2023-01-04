
const DEFAULT = {
  recipe_id: 'default',
  recipe_name: 'default',
  serving_size: 'default',
  prep_time: 'default',
  ingredients: [],
  instructions: [],
}

export function makeRecipeObject(text) {
  let split_text = text.split("Serving Size:")
  let recipe_name = split_text[0]

  split_text = split_text[1].split("Preparation Time:")
  let serving_size = split_text[0]

  split_text = split_text[1].split("Ingredients:")
  let prep_time = split_text[0]

  split_text = split_text[1].split("Instructions:")
  let ingredients = split_text[0]
  ingredients = ingredients.split("-").slice(1, -1)

  let instructions = split_text[1].split(/\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\./)
  var final_ins = []
  for (let i = 1; i < instructions.slice(1, -1).length; i += 2) {
    final_ins.push(ins.slice(1, -1)[i])
  }
  instructions = final_ins

  return {
    recipe_id: 'default',
    recipe_name: recipe_name,
    serving_size: serving_size,
    prep_time: prep_time,
    ingredients: ingredients,
    instructions: instructions,
  }
}