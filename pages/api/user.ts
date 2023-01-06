import { ddbDocClient, TABLE_NAME } from "../../db/db";
import { makeUser, User } from "../../interfaces/user";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

function makePostParams(user: User) {
  return {
    TableName: TABLE_NAME,
    Item: user,
  };
}

function makeGetParams(user_id: string) {
  return {
    TableName: TABLE_NAME,
    Key: {
      user_id: user_id,
    },
  };
}

async function post(user: User, res) {
  let getParams = makeGetParams(user.user_id);
  const result = await ddbDocClient.send(new GetCommand(getParams));
  if (result.Item !== undefined && result.Item !== null) {
    res.status(200).json("USER EXISTS");
  }

  let postParams = makePostParams(user);
  await ddbDocClient.send(new PutCommand(postParams));
  res.status(200).json("SUCCESS");
}

async function get(user_id: string, res) {
  let params = makeGetParams(user_id);
  const data = await ddbDocClient.send(new GetCommand(params));
  res.status(200).json(data.Item);
}

async function handler(req, res) {
  try {
    let sesh = await getSession(req, res);
    if (sesh == null) {
      throw new Error("User logged out");
    }

    let user_id: string = sesh.user.sub;

    if (req.method == "POST") {
      let user = makeUser(user_id, []);
      post(user, res);
    }

    if (req.method == "GET") {
      get(user_id, res);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      error: error,
    });
  }
}

export default withApiAuthRequired(handler);
