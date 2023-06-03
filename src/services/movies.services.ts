import Movie from "../models/Movie";
import User from "../models/User";

const get_favorites = async (userId: any) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const favorites = await Movie.find({ _id: { $in: user.movies } });
  return favorites;
};

const add_favorite = async (data: any) => {
  const { userId, code, title, poster_path, vote_average, release_date, type } =
    data;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  console.log(vote_average);

  const movie = await Movie.findOneAndUpdate(
    { code },
    {
      code,
      title,
      poster_path,
      raiting: vote_average,
      release_date,
      type,
    },
    { upsert: true, new: true }
  );

  console.log(movie);

  user.movies.push(movie._id);
  await user.save();
};

const remove_favorite = async (data: any) => {
  const { userId, code, type } = data;
  const user = await User.findById(userId);
  const movie = await Movie.findOne({ code, type });
  if (user && movie) {
    user.movies.pull(movie);
    await user.save();
  }
};

export { get_favorites, add_favorite, remove_favorite };
