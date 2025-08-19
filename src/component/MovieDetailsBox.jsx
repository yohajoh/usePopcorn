import { MovieDetails } from "./MovieDetails";
import { WatchedMovie } from "./WatchedMovie";

export function MovieDetailsBox({
  onCloseMovie,
  selectedId,
  onAddWatched,
  watchedMovie,
  isWatched,
  setActive,
  isMobile,
}) {
  return (
    <div className="movie-detail-box">
      {selectedId ? (
        <MovieDetails
          onCloseMovie={onCloseMovie}
          selectedId={selectedId}
          onAddWatched={onAddWatched}
          isWatched={isWatched}
          setActive={setActive}
        />
      ) : (
        <WatchedMovie
          watchedMovie={watchedMovie}
          onCloseMovie={onCloseMovie}
          setActive={setActive}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}
