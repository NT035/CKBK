import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Recipe from "../components/Recipe/recipe";
import RecipeCard from "../components/Recipe/RecipeCard";
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Home() {
  const [recipeInput, setRecipeInput] = useState("");
  const [result, setResult] = useState();
  const { user, error, isLoading } = useUser();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: recipeInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setRecipeInput("");
  }

  if (isLoading) return <div>...Loading</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user);
    return (<div>
      <Head>
        <title>CKBK - AI Recipe Generator</title>
        <link rel="icon" href="/chef.png" />
      </Head>

      <p><a href="/api/auth/logout">Logout</a></p>

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
        <div className={styles.result}><RecipeCard text={result}></RecipeCard></div>
      </main>
    </div>
    );
  }

  return (<div>
    <Head>
      <title>CKBK - AI Recipe Generator</title>
      <link rel="icon" href="/chef.png" />
    </Head>
    <a href="/api/auth/login">Login</a>
  </div>);
}
