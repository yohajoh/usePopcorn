import { useState, useEffect } from "react";
import { KEY } from "./App";
import { Loader } from "./Loader";
import { StarRating } from "./StarRating";
import { Button } from "./Button";

export function MovieDetails({
  onCloseMovie,
  selectedId,
  onAddWatched,
  isWatched,
  setActive,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState({});
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbrating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movies;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbrating: Number(imdbrating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  function handleActive() {
    onCloseMovie();
    setActive("comp1");
  }

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchMovieDetail() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) throw new Error("something went wrong!!!");

          const data = await res.json();
          console.log(data);
          setMovies(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetail();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleActive}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movies} movie`} />
            <div className="detail-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {parseFloat(imdbrating)} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={15}
                    color="yellow"
                    setUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <Button onAdd={handleAdd}>+ Add to list</Button>
                  )}
                </>
              ) : (
                <p>You rated with movie</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
