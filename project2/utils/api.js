const processMovie = (movie) => ({
  title: movie.Title,
  year: movie.Year,
  type: movie.Type,
  img: movie.Poster,
  imdbID: movie.imdbID,
});

export const searchMovieByName = async (query) => {
  const url = `http://www.omdbapi.com/?apikey=812cedba&s=${query}`;
  try {
    const response = await fetch(url);
    const { Search, totalResults } = await response.json();
    let allMovies = Search;
    const totalPages = Math.ceil(+totalResults / 10);
    for (let i = 2; i <= totalPages && i <= 10; i++) {
      const response = await fetch(url + `&page=${i}`);
      const json = await response.json();
      allMovies = allMovies.concat(json.Search);
    }
    console.log(allMovies);
    return allMovies.map(processMovie);
  } catch (err) {
    return console.log(err);
  }
};

export const searchMovieById = async (id) => {
  const url = `http://www.omdbapi.com/?apikey=812cedba&i=${id}`;
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    return results;
  } catch (err) {
    return console.log(err);
  }
};
