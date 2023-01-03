import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import RecipeCard from "../components/Recipe/RecipeCard";
import Button from "../components/Button/Button";
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

      <p><Button href="/api/auth/logout" text="Logout" /></p>

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
    <div className={styles.mainContainer}>
      <main className={styles.main}>
        <img src="/chef.png" className={styles.icon} />
        <h3>CKBK - AI Recipe Generator</h3>
      </main>
      <Button href="/api/auth/login" text="Login" />
    </div>
  </div>);
}
