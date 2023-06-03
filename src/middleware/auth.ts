import { NextFunction, Response } from "express";
import { validateToken } from "../config/tokens";
import { userRequest } from "../interfaces/user.interface";

const validateUser = (req: userRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const payload = validateToken(token);

    req.user = payload;

    if (payload) return next();

    res.sendStatus(401);
  }
};

export default validateUser;
