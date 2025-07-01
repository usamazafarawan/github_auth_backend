import catchAsync from "../../helpers/catchAsync.js";
import { handleError, handleResponse } from "../../helpers/responseHandler.js";

import {
  login,
} from "./authService.js";



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


export {
  loginUser,
};
