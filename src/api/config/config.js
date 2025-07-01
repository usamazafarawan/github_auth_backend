import dotenv from "dotenv";

dotenv.config();

export default {
  apiVersionUrl: "/api/v1",
  appPort: process.env.PORT || 3000,
  appEnv:process.env.NODE_ENV,
  otpTimeout0InMinutes: 20,
  fileSizeLimit: "100mb",
  whitelistUrl: [
    /\localhost\$/,
    /\distinctcloud\.io$/,
    /\signettags\.com$/,
    "http://localhost:3000",
    "https://sample-react-eta.vercel.app",
    "http://localhost:4200",
  ],
  apiLevelJWTExpiry: "90d",
  userLevelJWTExpiry: "7d",


  db: {
    str: process.env.MONGO_DB_STRING_DEV,
    options: {
      useNewUrlParser: true,
      readPreference: "primaryPreferred",
      useUnifiedTopology: true,
    },
  },

};
