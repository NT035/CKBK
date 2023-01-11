import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../interfaces/user";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getUserData } from "../user";

async function recipeHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let sesh = await getSession(req, res);
    if (sesh == null) {
      throw new Error("User logged out");
    }

    let user_id: string = sesh.user.sub;
    let user: User = await getUserData(user_id);
    let recipe = user.recipe_list.find((r) => r.recipe_id === req.query.id);

    recipe
      ? res.status(200).json(recipe)
      : res
          .status(404)
          .json({ message: `Recipe with id: ${req.query.id} not found.` });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      error: error,
    });
  }
}

export default withApiAuthRequired(recipeHandler);
