import { useState } from "react";
import { Star } from "./Star";

export function StarRating({
  maxRating = 5,
  size = 50,
  color = "yellow",
  setUserRating,
}) {
  const [count, setCount] = useState(0);
  const [reset, setReset] = useState(0);

  function countHandler(c) {
    setCount(c + 1);
    setReset(c + 1);
    setUserRating(c);
  }

  function hoverInHandler(c) {
    setCount(c + 1);
  }

  function hoverOutHandler() {
    setCount(reset);
  }
  return (
    <div className="stars">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          size={size}
          stroke={color}
          fill={count > i + 1 ? color : null}
          key={i}
          c={i + 1}
          onCount={countHandler}
          onHoverIn={hoverInHandler}
          onHoverOut={hoverOutHandler}
        />
      ))}
    </div>
  );
}
