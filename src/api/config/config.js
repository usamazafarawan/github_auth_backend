import dotenv from "dotenv";

dotenv.config();

export default {
  apiVersionUrl: "/api/v1",
  appPort: process.env.PORT || 3001,
  numberOfProxies: process.env.NO_OF_PROXY,
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

  geminiAPIKey: process.env.GEMINI_API_KEY,
  sendgridAPIKey: process.env.SEND_GRID_API_KEY,
  openAiAPIKey: process.env.OPEN_AI_API_KEY,
  azurePlaywrightEndpoint: process.env.PLAYWRIGHT_SERVICE_URL,
  azurePlaywrightEndpointSecret: process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN,
  azureBlobStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
  azureBlobStorageContainerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
  azureBlobStorageAccountName: process.env.AZURE_STORAGE_ACCOUNT_NAME ?? 'milodocs',
  numberOfFilesUserUpload: 15,
  twilio: {
    accountSid:process.env.TWILIO_ACCOUNT_SID,
    authToken:process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: "+13342347056"
  },
  db: {
    str:
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_DB_STRING_PROD
        : process.env.MONGO_DB_STRING_DEV,
    options: {
      useNewUrlParser: true,
      readPreference: "primaryPreferred",
      useUnifiedTopology: true,
    },
  },
  sql_db: {
    user:  process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    server: process.env.SQL_DB_SERVER,
    name: process.env.SQL_DB_NAME,
    options: {
      encrypt: true,
      trustServerCertificate: true
    },
  },
  twilio: {
    accountSid:process.env.TWILIO_ACCOUNT_SID,
    authToken:process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: "+18145806001"
  },
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    indexDimension: 1536 // text-embedding-3-small
  },
  ai: {
    articleTokenLimit: '50000', // 128,000 token is max for gpt4o
    defaultChunkSize: 1000,
    defaultOverlap: 100
  },
  spiderApiKey: process.env.SPIDER_API_KEY,
  pineconeIndex:'milo',
  postmarkApiKey: process.env.POSTMARK_API_KEY,
  callbackUrl: process.env.CALLBACK_URL,
  locationApi:{
    clientId: process.env.MICROSOFT_MAPS_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_MAPS_SUBSCRIPTION_KEY
  },
  pipedriveApiKey: process.env.PIPE_DRIVE_API_KEY,
};
