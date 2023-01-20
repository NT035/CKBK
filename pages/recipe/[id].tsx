import { useRouter } from "next/router";
import useSWR from "swr";
import RecipeCard from "../../components/Recipe/RecipeCard";
import { Recipe } from "../../interfaces/recipe";
import { fetcher } from "../../utils";

export default function Person() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/recipe/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  let recipe = data as Recipe;

  return RecipeCard(recipe);
}
