import User from "../models/User";
import bcrypt from "bcrypt";

const create_user = async (user: any) => {
  try {
    const createdUser = await User.create(user);
    return createdUser;
  } catch (e) {
    return e;
  }
};

const login_user = async (email: string) => {
  try {
    const user = await User.findOne({ email: email }).populate("movies");
    return user;
  } catch (e) {
    return e;
  }
};

const get_users = async () => {
  const users = await User.find();
  return users;
};

const get_user = async (id: any) => {
  const user = await User.findOne({ _id: id });
  return user;
};

const update_user = async (id: any, data: any) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  return updatedUser;
};

const change_password = async (id: any, data: any) => {
  const { password } = data;
  const userToUpdate = await User.findById(id);
  const salt = await bcrypt.genSalt();
  const hash = await userToUpdate?.hashedPassword(password, salt);

  const updatedUser = await userToUpdate?.updateOne({
    salt: salt,
    password: hash,
  });

  return updatedUser;
};

const search_users = async (name: any) => {
  const users = User.find({ name: name });
  return users;
};

export {
  create_user,
  login_user,
  get_users,
  get_user,
  update_user,
  change_password,
  search_users,
};
