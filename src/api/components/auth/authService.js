

import Users from "../../models/usersModel.js";
import { generateUserJWT } from "../../helpers/jwtService.js";


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


export {
  login,
};
