import { Router } from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/movies.controller";

const router = Router();

router.get("/favorites", getFavorites);

router.put("/addFavorite", addFavorite);

router.delete("/removeFavorite", removeFavorite);

export default router;
