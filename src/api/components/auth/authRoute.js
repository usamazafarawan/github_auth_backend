import express from "express";
import {
  loginUser,
  githubLoginUser,
  githubCallbackFunction,
  getGithubReposData
} from "./authController.js";
import axios from "axios";
import GitUsers from "../../models/githubUserModel.js";
const router = express.Router();


const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;



router.use((req, res, next) => {
  /* #swagger.tags = ['Auth'] */
  next();
});

let userSession = {};




router.post("/login", loginUser);

router.get("/login", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo read:org`;
  res.redirect(redirectUrl);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
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

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `token ${accessToken}` },
    });
    console.log('userRes: ', userRes);

    const result = await GitUsers.findOneAndUpdate(
      { gitId: userRes.data.id },
      { $set: { gitToken: accessToken } },
      { upsert: true, returnDocument: 'after' }
    );

    userSession[userRes.data.id] = {
      accessToken,
      user: userRes.data,
    };

    res.redirect("http://localhost:4200/dashboard");
  } catch (err) {
    console.error("OAuth error", err);
    res.status(500).send("OAuth failed");
  }
});



router.get("/data/repos", async (req, res) => {
  try {
    const userId = Object.keys(userSession)[0]; // (single user only for demo)
    const token = userSession[userId].accessToken;
    console.log('userSession: ', userSession);

    const reposRes = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `token ${token}` },
    });

    res.json(reposRes.data); // ✅ Return list of repos
  } catch (err) {
    console.error("Repos Error", err);
    res.status(500).send("Failed to fetch repos");
  }
});



router.get("/data/commits", async (req, res) => {
  const { owner, repo } = req.query;

  try {
    const userId = Object.keys(userSession)[0];
    const token = userSession[userId].accessToken;

    const commitsRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      { headers: { Authorization: `token ${token}` } }
    );

    res.json(commitsRes.data); // ✅ Return commit history
  } catch (err) {
    console.error("Commits Error", err);
    res.status(500).send("Failed to fetch commits");
  }
});


router.get("/data/issues", async (req, res) => {
  const { owner, repo } = req.query;

  try {
    const userId = Object.keys(userSession)[0];
    const token = userSession[userId].accessToken;

    const issuesRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      { headers: { Authorization: `token ${token}` } }
    );

    res.json(issuesRes.data); // ✅ Return open issues
  } catch (err) {
    console.error("Issues Error", err);
    res.status(500).send("Failed to fetch issues");
  }
});


router.delete("/logout", async (req, res) => {
  try {
    const userId = Object.keys(userSession)[0];

    if (!userId) {
      return res.status(400).json({ logout: false, error: "No active session" });
    }

    const token = userSession[userId]?.accessToken;

    if (!token) {
      delete userSession[userId];
      return res.json({ logout: true });
    }

    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    await axios.delete(`https://api.github.com/applications/${CLIENT_ID}/token`, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      data: {
        access_token: token,
      },
    });


    const result = await GitUsers.deleteOne({ gitId: userId }); // `id` is your custom field


    // Clear the user session after successful token revocation
    userSession = {};

    console.log("✅ GitHub token revoked and session cleared");
    res.json({ logout: true });

  } catch (err) {
    console.error(" Failed to revoke GitHub token:", err.response?.data || err.message);

    // Attempt to clear session even if token revocation fails
    if (userId) {
      delete userSession[userId];
    }

    res.status(500).json({
      logout: false,
      error: err.response?.data || err.message,
    });
  }
});

export default router;
