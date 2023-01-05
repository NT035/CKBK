import { Recipe } from "./recipe";

export type User = {
  user_id: string;
  recipe_list: Recipe[];
};

const DEFAULT = {
  user_id: "default",
  recipe_list: [],
};

export function makeUser(id, recipe_list) {
  return {
    user_id: id,
    recipe_list: recipe_list,
  };
}

export function addRecipeToUser(user, recipe) {
  return {
    user_id: user.user_id,
    recipe_list: user.recipe_list.concat(recipe),
  };
}
