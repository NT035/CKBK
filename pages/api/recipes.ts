import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { DEFAULT } from "../../interfaces/recipe";

async function handler(req, res) {
  // placeholder
  let placeholder = [
    DEFAULT,
    DEFAULT,
    DEFAULT,
    DEFAULT,
    DEFAULT,
    DEFAULT,
    DEFAULT,
  ];
  res.status(200).json(placeholder);
}

export default withApiAuthRequired(handler);
