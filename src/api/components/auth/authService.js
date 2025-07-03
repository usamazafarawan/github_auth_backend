

import Users from "../../models/usersModel.js";
import { generateUserJWT } from "../../helpers/jwtService.js";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


const login = async (email, password) => {
  const user = await Users.findOne({
    email: email,
  })
  const userId = user._id.toString();

  const token = await generateUserJWT({
    payload: {
      email: user.email,
      name: user.name,
      userId: userId,
    },
  });

  return {
    status: "SUCCESS",
    user: user,
    authToken: token,
  };
};


const githubLoginService = async (email, password) => {


  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo read:org`;


  return {
    status: "SUCCESS",
    redirectUrl: redirectUrl,
  };
};



export {
  login,
  githubLoginService
};
