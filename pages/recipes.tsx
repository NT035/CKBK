import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ThreeDots } from "react-loading-icons";
import useSWR from "swr";
import RecipeScrollBar from "../components/Recipe/RecipeScrollBar/RecipeScrollBar";
import { Recipe } from "../interfaces/recipe";
import { fetcher } from "../utils";
import styles from "./recipes.module.css";

export default function Recipes() {
  const { data, error } = useSWR("api/recipes", fetcher);
  let recipeList = data as Recipe[];

  let loadingAnimation = (
    <div>
      <ThreeDots fill="#10a37f" />
    </div>
  );

  if (!data) return loadingAnimation;

  let scrollArea = <RecipeScrollBar recipes={recipeList}></RecipeScrollBar>;
  

  return scrollArea;
}
