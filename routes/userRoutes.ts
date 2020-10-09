import { Router } from "../deps.ts";
import authMiddleware from "../middleware/authMiddleware.ts";
// import { Router, Context } from "../deps.ts";
import {
  allUser,
  addUser,
} from "../controllers/userController.ts";
import { login, logout } from "../controllers/authController.ts";

const router = new Router();
router
  .get("/users",authMiddleware.authorized, allUser)
  .post("/add-user", addUser)
  .post("/login", login) //authController.ts
  .get("/logout", logout) //authConroller.ts
export default router;
