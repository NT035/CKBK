import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Select from "@radix-ui/react-select";
import { Recipe } from "../../../interfaces/recipe";
import styles from "./RecipeScrollBar.module.css";

export interface RecipeScrollBarData {
  recipes: Recipe[];
}

export default function RecipeScrollBar({ recipes }: RecipeScrollBarData) {
  let scrollArea = (
    <ScrollArea.Root className={styles.ScrollAreaRoot} type="auto">
      <Select.Viewport asChild>
        <ScrollArea.Viewport className={styles.ScrollAreaViewport}>
          {recipes.map((recipe) => (
            <Select.Item value={recipe.recipe_id}>
              <div className={styles.RecipeItem}>{recipe.recipe_name}</div>
            </Select.Item>
          ))}
        </ScrollArea.Viewport>
      </Select.Viewport>
      <ScrollArea.Scrollbar
        className={styles.ScrollAreaScrollbar}
        orientation="vertical"
      >
        <ScrollArea.Thumb className={styles.ScrollAreaThumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );

  return (
    <Select.Root>
      <Select.Trigger className={styles.SelectTrigger}>
        <Select.Value placeholder="Pick a recipe" />
        <Select.Icon />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>{scrollArea}</Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
