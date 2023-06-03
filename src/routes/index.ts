import { Router } from "express";
const router = Router();

import users from "./user.routes";
import movies from "./movies.routes";

router.use("/users", users);
router.use("/movies", movies);

export default router;
