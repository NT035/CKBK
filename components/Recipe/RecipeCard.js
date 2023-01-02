import { React } from 'react';
import styles from "./RecipeCard.module.css";

function parseComponents(text) {
  console.log(text)
  let split_text = text.split("Serving Size:")
  console.log(split_text)
  let rn = split_text[0]
  split_text = split_text[1].split("Preparation Time:")
  let ss = split_text[0]
  split_text = split_text[1].split("Ingredients:")
  let pt = split_text[0]
  split_text = split_text[1].split("Instructions:")
  let ing = split_text[0]
  let ins = split_text[1].split(/\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\./)
  var final_ins = []
  for (let i = 1; i < ins.slice(1, -1).length; i += 2) {
    final_ins.push(ins.slice(1, -1)[i])
  }

  return {
    RecipeName: rn,
    ServingSize: ss,
    PrepTime: pt,
    Ingredients: ing,
    Instructions: final_ins,
  }
}

export default function RecipeCard(props) {
  if (props.text) {
    let parsedComponents = parseComponents(props.text);
    return (
      <div className={styles.recipeCardContainer}>
        <p className={styles.recipeName}>{parsedComponents.RecipeName}</p>
        <p className={styles.recipeMetadata}><b>Serving Size:</b> {parsedComponents.ServingSize}</p>
        <p className={styles.recipeMetadata}><b>Prep Time:</b> {parsedComponents.PrepTime}</p>
        <p className={styles.recipeSubheader}>Ingredients:</p>
        <ul>
          {parsedComponents.Ingredients.split("-").slice(1, -1).map(line => (<li className={styles.listItem}>{line}</li>))}
        </ul>
        <p className={styles.recipeSubheader}>Instructions:</p>
        <ol>
          {parsedComponents.Instructions.map(line => (<li className={styles.listItem}>{line}</li>))}
        </ol>
      </div>
    );
  }
  return (<></>)
}