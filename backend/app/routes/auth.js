import express from 'express';
import register from '../controllers/auth/register.js';
import validateRegister from '../controllers/auth/validators/validateRegister.js';
import validateLogin from '../controllers/auth/validators/validateLogin.js';
import login from '../controllers/auth/login.js';
import checkUsernameAvailable from '../controllers/auth/checkUsernameAvailable.js';
import logout from '../controllers/auth/logout.js';

const AuthRouter = express.Router();

AuthRouter.post("/register",
    validateRegister,
    register,
);

AuthRouter.post("/login",
    validateLogin,
    login,
);

AuthRouter.get("/logout",
    logout,
);

AuthRouter.get("/checkusernameavailable",
    checkUsernameAvailable,
);

export default AuthRouter;