import React from "react";
import { IGNORE_ID, Recipe } from "../../interfaces/recipe";
import styles from "./RecipeCard.module.css";

export default function RecipeCard(recipe: Recipe) {
  if (recipe.recipe_id != IGNORE_ID) {
    return (
      <div className={styles.recipeCardContainer}>
        <p className={styles.recipeName}>{recipe.recipe_name}</p>
        <p className={styles.recipeMetadata}>
          <b>Serving Size:</b> {recipe.serving_size}
        </p>
        <p className={styles.recipeMetadata}>
          <b>Prep Time:</b> {recipe.prep_time}
        </p>
        <p className={styles.recipeSubheader}>Ingredients:</p>
        <ul>
          {recipe.ingredients.map((line) => (
            <li className={styles.listItem}>{line}</li>
          ))}
        </ul>
        <p className={styles.recipeSubheader}>Instructions:</p>
        <ol>
          {recipe.instructions.map((line) => (
            <li className={styles.listItem}>{line}</li>
          ))}
        </ol>
      </div>
    );
  }
  return <></>;
}
