import React from "react";

export default function Option({ question, dispatch, answer }) {
  return (
    <div>
      <div className="options ">
        {question.options.map((qe, index) => (
          <button
            className={`btn btn-option 
  ${index === answer ? "answer" : ""} 
  ${
    answer !== null
      ? index === question.correctOption
        ? "correct"
        : "wrong"
      : ""
  }`}
            key={qe}
            disabled={answer !== null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {qe}
          </button>
        ))}
      </div>
    </div>
  );
}
