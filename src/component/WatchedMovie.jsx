export function WatchedMovie({ watchedMovie }) {
  const len = watchedMovie.length;

  const avRuntime = (
    watchedMovie.reduce((acc, watched) => acc + watched.runtime, 0) / len
  ).toFixed(2);

  const avImdbrating = (
    watchedMovie.reduce((acc, watched) => acc + watched.imdbrating, 0) / len
  ).toFixed(2);

  const avUserRating = (
    watchedMovie.reduce((acc, watched) => acc + watched.userRating, 0) / len
  ).toFixed(1);

  return (
    <>
      <div className="y-watched-movie">
        <h3 className="heading-3">Movies you watched</h3>
        <div className="y-w-m-info">
          <p>
            <span>#️⃣</span> {len} movies
          </p>
          <p>
            <span>⭐</span> {avImdbrating}
          </p>
          <p>
            <span>🌟</span> {avUserRating}
          </p>
          <p>
            <span>⏲️</span> {avRuntime} min
          </p>
        </div>
      </div>
      {watchedMovie.map((watched, i) => (
        <div className="watched-movies">
          <img src={watched.poster} alt={watched.title} />
          <div className="watched-movies--1">
            <h3>{watched.title}</h3>
            <div className="watched-movies--2">
              <p>
                <span>⭐</span> {watched.imdbrating}
              </p>
              <p>
                <span>🌟</span> {watched.userRating}
              </p>
              <p>
                <span>⏲️</span> {watched.runtime} min
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
