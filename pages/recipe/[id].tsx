import { useRouter } from "next/router";
import useSWR from "swr";
import RecipeCard from "../../components/Recipe/RecipeCard";
import { Recipe } from "../../interfaces/recipe";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data;
};

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
