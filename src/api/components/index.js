import express from "express";
import authRoute from "./auth/authRoute.js"


const router = express.Router();

router.use('/auth', authRoute);




export default router;

