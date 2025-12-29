const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;
const discover_point = 'discover/movie';
const genre_point = `genre/movie/list`;
const search_point = `search/movie`;
const trailer_point = 'movie';

export {
  BASE_URL,
  API_KEY,
  discover_point,
  genre_point,
  search_point,
  trailer_point,
};
