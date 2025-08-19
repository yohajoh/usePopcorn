export function MoviesList({
  movie,
  onSelectedId,
  watchedMovie,
  setIsWatched,
  setActive,
}) {
  const isExist = watchedMovie.find((mov) => mov.imdbID === movie.imdbID);
  function checkWatched() {
    onSelectedId(movie.imdbID);
    setActive("comp2");
    if (isExist) {
      setIsWatched(true);
      return;
    }
    setIsWatched(false);
  }
  return (
    <div className="movies" onClick={checkWatched}>
      <img src={movie.Poster} alt="" className="sm-img" />
      <div>
        <h4>{movie.Title}</h4>
        <p className="year">
          <span>🗓️</span> {movie.Year}
        </p>
      </div>
    </div>
  );
}
