import { Router } from "express";
import {
  changePassword,
  getUser,
  getUsers,
  googlelogin,
  login,
  logout,
  register,
  searchUser,
  updateProfile,
  validation,
} from "../controllers/user.controllers";
import validateUser from "../middleware/auth";
const router = Router();

router.get("/", getUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", validateUser, validation);

router.get("/user/:id", getUser);

router.put("/profile/:id", updateProfile);

router.put("/changePassword/:id", changePassword);

router.get("/search", searchUser);

router.put("/googlelogin", googlelogin);

export default router;
