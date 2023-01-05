import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.recipe),
    temperature: 0.2,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(recipe) {
  return `Generate a recipe from a recipe idea in the following format;
  Name:
  Serving Size:
  Preparation Time:
  Ingredients:
  Instructions:

  Recipe Idea: ${recipe}
  Name: `
    ;
}
