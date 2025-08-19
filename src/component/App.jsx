import { useEffect, useState } from "react";
import { MoviesList } from "./MoviesList";
import { MovieDetailsBox } from "./MovieDetailsBox";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Search } from "./Search";
import { Box } from "./Box";
import { Main } from "./Main";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { AmountOfMovie } from "./AmountOfMovie";

export const KEY = "fc9f2ab7";
export default function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [watchedMovie, setWatchedMovie] = useState([]);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isWatched, setIsWatched] = useState(false);
  const [active, setActive] = useState("comp1");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(function () {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.addEventListener("resize", checkMobile);
  }, []);

  useEffect(
    function () {
      async function fetchingData() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) throw new Error("something went wrong!!!");

          const data = await res.json();
          if (data.Response === "False") throw new Error("movie not found");

          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchingData();
    },
    [query]
  );

  function selectedIdHandler(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function closeHandler() {
    setSelectedId(null);
  }

  function watchedHandler(movie) {
    const isExist = watchedMovie.find((mov) => mov.imdbID === movie.imdbID);
    if (isExist) return;
    setWatchedMovie((mov) => [...mov, movie]);
  }

  return (
    <>
      <Navigation>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <AmountOfMovie movies={movies} />
      </Navigation>
      <Main>
        {!isMobile && (
          <>
            <Box>
              {isLoading && <Loader />}
              {!isLoading &&
                !error &&
                movies.map((movie, i) => (
                  <MoviesList
                    movie={movie}
                    onSelectedId={selectedIdHandler}
                    watchedMovie={watchedMovie}
                    setIsWatched={setIsWatched}
                    setActive={setActive}
                    key={i}
                  />
                ))}
              {error && <ErrorMessage message={error} />}
            </Box>
            <MovieDetailsBox
              onCloseMovie={closeHandler}
              selectedId={selectedId}
              onAddWatched={watchedHandler}
              watchedMovie={watchedMovie}
              isWatched={isWatched}
              setActive={setActive}
            />
          </>
        )}

        {isMobile && (
          <>
            {active === "comp1" && (
              <Box>
                {isLoading && <Loader />}
                {!isLoading &&
                  !error &&
                  movies.map((movie, i) => (
                    <MoviesList
                      movie={movie}
                      onSelectedId={selectedIdHandler}
                      watchedMovie={watchedMovie}
                      setIsWatched={setIsWatched}
                      setActive={setActive}
                      key={i}
                    />
                  ))}
                {error && <ErrorMessage message={error} />}
              </Box>
            )}

            {active === "comp2" && (
              <MovieDetailsBox
                onCloseMovie={closeHandler}
                selectedId={selectedId}
                onAddWatched={watchedHandler}
                watchedMovie={watchedMovie}
                isWatched={isWatched}
                setActive={setActive}
              />
            )}
          </>
        )}
      </Main>
    </>
  );
}
