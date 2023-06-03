import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import {
  add_favorite,
  get_favorites,
  remove_favorite,
} from "../services/movies.services";

const getFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const response = await get_favorites(userId);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR GET FAVORITES");
  }
};

const addFavorite = async (req: Request, res: Response) => {
  try {
    const data = req.query;

    await add_favorite(data);

    res.status(200).json({ message: "Favorite movie added successfully" });
  } catch (e) {
    handleHttp(res, "ERROR ADD FAVORITES");
  }
};

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    await remove_favorite(data);
    res.status(200).json({ message: "Favorite movie deleted successfully" });
  } catch (error) {
    handleHttp(res, "ERROR ADD FAVORITES");
  }
};

export { getFavorites, addFavorite, removeFavorite };
