export function AmountOfMovie({ movies }) {
  return (
    <div className="amount">
      <p>
        Found <strong>{movies.length}</strong> movies
      </p>
    </div>
  );
}
