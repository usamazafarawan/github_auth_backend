import catchAsync from "../../helpers/catchAsync.js";
import { handleError, handleResponse } from "../../helpers/responseHandler.js";

import {
  login,
  githubLoginService
} from "./authService.js";
import axios from "axios";


const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let userSession = {};



const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const response = await login(email, password);
  if (response.status === "SUCCESS") {
    return handleResponse({
      res,
      result: true,
      data: {
        user: response.user,
        authToken: response.authToken,
      },
    });
  }

  return handleError({
    res,
    statusCode: 500,
    err: response.error,
    result: false,
  });
});


const githubLoginUser = catchAsync(async (req, res) => {
  const response = await githubLoginService();
  if (response.status === "SUCCESS") {
      res.redirect(response.redirectUrl); 

  }

  return handleError({
    res,
    statusCode: 500,
    err: response.error,
    result: false,
  });
});


const githubCallbackFunction = catchAsync(async (req, res) => {
const code = req.query.code;
console.log('code:**** ', code);

  try {
    // 📩 Exchange the code for an access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 👤 Get authenticated GitHub user info
    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });

    // 💾 Save token and user in memory (for demo)
    userSession[userRes.data.id] = {
      accessToken,
      user: userRes.data,
    };

    // ✅ Redirect user back to frontend success screen
    res.redirect("http://localhost:4200/dashboard");
  } catch (err) {
    console.error("OAuth error", err);
    res.status(500).send("OAuth failed");
  } 
  
  
  // if (response.status === "SUCCESS") {
  //   return handleResponse({
  //     res,
  //     result: true,
  //     data: {
  //       user: response.user,
  //       authToken: response.authToken,
  //     },
  //   });
  // }

  return handleError({
    res,
    statusCode: 500,
    err: response.error,
    result: false,
  });
});



const getGithubReposData = catchAsync(async (req, res) => {
  try {
    const userId = Object.keys(userSession)[0]; // (single user only for demo)
    console.log('userId: ', userId);
    const token = userSession[userId].accessToken;
    console.log('token: ', token);

    const reposRes = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${token}` },
    });

    res.json(reposRes.data); // ✅ Return list of repos
  } catch (err) {
    console.error("Repos Error", err);
    res.status(500).send("Failed to fetch repos");
  }
});

export {
  githubLoginUser,
  loginUser,
  githubCallbackFunction,
  getGithubReposData
};

