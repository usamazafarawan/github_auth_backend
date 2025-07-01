import express from "express";
import {
  loginUser,
} from "./authController.js";

const router = express.Router();

router.use((req, res, next) => {
  /* #swagger.tags = ['Auth'] */
  next();
});


router.post("/login", loginUser);

export default router;
