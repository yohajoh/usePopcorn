export function Button({ onAdd, children }) {
  return (
    <button className="btn" onClick={onAdd}>
      {children}
    </button>
  );
}
