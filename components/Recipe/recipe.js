import { React } from 'react';

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

  return {
    RecipeName: rn,
    ServingSize: ss,
    PrepTime: pt,
    Ingredients: ing,
    Instructions: ins,
  }
}

export default function Recipe(props) {
  if (props.text) {
    let parsedComponents = parseComponents(props.text);
    return (
      <div>
        <h2>Recipe: {parsedComponents.RecipeName}</h2>
        <p>Serving Size: {parsedComponents.ServingSize}</p>
        <p>Prep Time: {parsedComponents.PrepTime}</p>
        <br />
        <h3>Ingredients:</h3>
        <li>
          {parsedComponents.Ingredients.split("-").map(line => (<ul>{line}</ul>))}
        </li>
        <br />
        <h3>Instructions:</h3>
        <li>
          {parsedComponents.Instructions.map(line => (<ol>{line}</ol>))}
        </li>
      </div>
    );
  }
  return (<></>)
}