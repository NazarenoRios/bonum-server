import { Document } from "mongoose";

export interface MovieAttributes extends Document {
  code: number;
  title: string;
  poster_path: string;
  raiting: string;
  release_date: string;
  type: string;
}

export interface MovieCreationAttributes {
  code: number;
  title: string;
  poster_path: string;
  raiting: string;
  release_date: string;
  type: string;
}
