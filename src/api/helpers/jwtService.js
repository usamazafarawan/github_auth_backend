import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";

const generateApiJWT = async ({ payload }) => {
  const token = `${jsonwebtoken.sign(payload, process.env.JWT_SECRET,{ expiresIn: config.apiLevelJWTExpiry })}`;
  return token;
};
const generateUserJWT = async ({ payload }) => {
  const token = `${jsonwebtoken.sign(payload, process.env.JWT_SECRET,{ expiresIn: config.userLevelJWTExpiry})}`;
  return token;
};
const verifyJWT = async ({ token }) => {
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return data;
};
const refreshJWT = async ({ token }) => {
  const data_ = await verifyJWT({ token: token });
  
  if (!data_ || !data_.exp) {
    throw new Error("Invalid token");
  }
  
  // const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
  // const expiryTime = data_.exp; // expiration time in seconds
  // const timeDifference = expiryTime - currentTime; // time difference in seconds
  
  // // Refresh the token only if it expires within the next 24 hours (86400 seconds)
  // if (timeDifference <= 86400) {
  //   const data = generateUserJWT({ payload: { ...jwtPayload } });
  //   return data;
  // }
  
  // Return the original token if it's not time to refresh yet
  const token_ = await generateUserJWT({payload:  {email:data_.email, name:data_.name, phone:data_.phone}})
  return token_;
};

export { generateApiJWT, verifyJWT, generateUserJWT, refreshJWT };
