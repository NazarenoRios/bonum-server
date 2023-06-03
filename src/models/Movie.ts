import mongoose, { Schema } from "mongoose";
import { MovieAttributes } from "../interfaces/movie.interface";

const movieSchema = new Schema<MovieAttributes>({
  code: {
    type: Number,
  },
  title: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  raiting: {
    type: String,
  },
  release_date: {
    type: String,
  },
  type: {
    type: String,
  },
});

const Movie = mongoose.model<MovieAttributes>("Movie", movieSchema);

export default Movie;
