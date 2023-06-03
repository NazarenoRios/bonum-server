import { Request } from "express";
import { Document } from "mongoose";

export interface UserAttributes extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  salt?: string;
  lastActivity?: Date;
  pic?: string;
  movies?: any;
  hashedPassword?: any;
  validatePassword?: any;
  getQuery?: any;
}

export interface UserCreationAttributes {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface userRequest extends Request {
  user?: {
    id: any;
    name: string;
    lastname: string;
    username: string;
    email: string;
    pic: string;
  };
}

// export interface User {
//   id: number;
//   name: string;
//   lastname: string;
//   email: string;
//   password: string;
//   salt: string;
//   lastActivity: Date;
//   pic: String;
// }
