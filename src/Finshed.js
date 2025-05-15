import React from "react";

export default function Finished({ points, maxpoints, highScore, dispatch }) {
  const done = ((points / maxpoints) * 100).toFixed(2);

  return (
    <>
      <p className="result">
        You scored {points} out of {maxpoints} ({done}%)
      </p>
      <p className="highscore">highScore ({highScore} ponits)</p>
      <button
        className="btn btn-ui"
        key={dispatch}
        onClick={() => dispatch({ type: "restart" })}
      >
        Rest Quiz
      </button>
    </>
  );
}
