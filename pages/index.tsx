import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import RecipeCard from "../components/Recipe/RecipeCard";
import Button from "../components/Button/Button";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { Recipe, IGNORE, makeRecipeObject } from "../interfaces/recipe";
import { Oval, TailSpin, ThreeDots } from "react-loading-icons";

export default function Home() {
  const [recipeInput, setRecipeInput] = useState("");
  const [result, setResult] = useState<Recipe>(IGNORE);
  const [recipeLoading, setRecipeLoading] = useState<boolean>();
  const { user, error, isLoading: userLoading } = useUser();

  async function onSubmit(event) {
    event.preventDefault();
    setRecipeLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: recipeInput }),
    });
    const data = await response.json();
    let recipe: Recipe = makeRecipeObject(data.result);
    setResult(recipe);
    setRecipeLoading(false);
    setRecipeInput("");
  }

  if (userLoading) return <div>...Loading</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    let recipeCardElement = <RecipeCard {...result}></RecipeCard>;
    let loadingAnimation = (
      <div>
        <ThreeDots fill="#10a37f" />
      </div>
    );

    let recipeSection = recipeLoading ? loadingAnimation : recipeCardElement;

    return (
      <div>
        <Head>
          <title>CKBK - AI Recipe Generator</title>
          <link rel="icon" href="/chef.png" />
        </Head>

        <Button href="/api/auth/logout" text="Logout" />

        <main className={styles.main}>
          <img src="/chef.png" className={styles.icon} />
          <h3>Enter a recipe idea</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="recipe"
              placeholder="i.e. Chinese recipe with daikon, easy Asian snack recipe"
              value={recipeInput}
              onChange={(e) => setRecipeInput(e.target.value)}
            />
            <input type="submit" value="Generate recipe" />
          </form>
          <div className={styles.result}>{recipeSection}</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <img src="/chef.png" className={styles.icon} />
          <h3>CKBK - AI Recipe Generator</h3>
        </main>
        <Button href="/api/auth/login" text="Login" />
      </div>
    </div>
  );
}
