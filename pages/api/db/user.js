import { ddbDocClient, TABLE_NAME } from './db'
import { makeUser } from '../../../structs/user'
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function (req, res) {
  user_id = req.body.user_id
  if (req.method == 'POST') {
    let user = makeUser(user_id, [])
    post(user, res)
  }

  if (req.method == 'GET') {
    get(user_id, res)
  }
}


async function post(user, res) {
  let params = makePostParams(user)
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    res.status(200).json('SUCCESS')
  } catch (err) {
    res.status(500).json(`Error: ${err}`)
  }
}

async function get(user_id, res) {
  let params = makeGetParams(user_id)
  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    res.status(200).json(data.Item)
  } catch (err) {
    res.status(500).json(`Error: ${err}`)
  }
}

function makePostParams(user) {
  return {
    TableName: TABLE_NAME,
    Item: user,
  };
}

function makeGetParams(user_id) {
  return {
    TableName: TABLE_NAME,
    Key: {
      user_id: user_id
    }
  };
}

