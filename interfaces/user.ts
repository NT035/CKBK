import { Recipe } from "./recipe";

export type User = {
  user_id: string;
  recipe_list: Recipe[];
};

const DEFAULT: User = {
  user_id: "default",
  recipe_list: [],
};

export function makeUser(id: string, recipe_list: Recipe[]): User {
  return {
    user_id: id,
    recipe_list: recipe_list,
  };
}

export function addRecipeToUser(user: User, recipe: Recipe): User {
  return {
    user_id: user.user_id,
    recipe_list: user.recipe_list.concat(recipe),
  };
}
