import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [recipeInput, setRecipeInput] = useState("");
  const [result, setResult] = useState();

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

  return (
    <div>
      <Head>
        <title>CKBK - AI Recipe Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
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
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
