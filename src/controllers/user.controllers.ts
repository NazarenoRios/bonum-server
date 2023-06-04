import { Request, Response } from "express";
import { generateToken } from "../config/tokens";

import { userRequest } from "../interfaces/user.interface";
import User from "../models/User";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "860870041014-ouinu3c3c7162n61tuqnlubvrv7dlv3i.apps.googleusercontent.com"
);

import {
  get_users,
  create_user,
  login_user,
  get_user,
  update_user,
  change_password,
  search_users,
} from "../services/user.services";

import { handleHttp } from "../utils/error.handle";

const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const response = await create_user(user);
    res.status(201).send(response);
  } catch (e) {
    handleHttp(res, "ERROR USER REGISTER");
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).populate("movies");
    if (!user) {
      return res.sendStatus(401);
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return res.sendStatus(401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      pic: user.pic,
    };

    const token = generateToken(payload);

    res.status(201).json({
      error: false,
      message: "login successfully",
      user: { ...payload, token },
    });
  } catch (e) {
    handleHttp(res, "ERROR USER REGISTER");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(204).send({});
  } catch (err) {
    handleHttp(res, "ERROR LOGOUT USER");
  }
};

const validation = async (req: userRequest, res: Response) => {
  try {
    res.send(req.user);
  } catch (e) {
    handleHttp(res, "ERROR USER VALIDATION");
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await get_users();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR GET USERS");
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await get_user(id);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR GET USER");
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await update_user(id, data);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "ERROR GET USER");
  }
};

const changePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await change_password(id, data);
    res.sendStatus(204);
  } catch (e) {
    handleHttp(res, "ERROR GET USER");
  }
};

const searchUser = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    const users = await search_users(name);
    res.send(users);
  } catch (e) {
    handleHttp(res, "ERROR GET USER");
  }
};

const googlelogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    const userInfo = await client.verifyIdToken({
      idToken: credential,
      audience:
        "860870041014-ouinu3c3c7162n61tuqnlubvrv7dlv3i.apps.googleusercontent.com",
    });

    const { email, given_name, family_name } = userInfo.payload;

    let password = email + email;

    const user = await User.findOne({ email: email }).populate("movies");
    // const user = await User.findOne({ email: email });

    if (!user) {
      const newUser = await User.create({
        email: email,
        password: password,
        name: given_name,
        lastname: family_name,
      });

      const isValid = await newUser.validatePassword(password);

      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        lastname: newUser.lastname,
        pic: newUser.pic,
      };

      const token = generateToken(payload);
      res.status(201).send({ ...payload, token });
    } else {
      const isValid = await user.validatePassword(password);

      if (!isValid) return res.sendStatus(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        pic: user.pic,
      };

      const token = generateToken(payload);
      res.status(201).send({ ...payload, token });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export {
  register,
  login,
  validation,
  getUsers,
  getUser,
  updateProfile,
  changePassword,
  searchUser,
  googlelogin,
};
