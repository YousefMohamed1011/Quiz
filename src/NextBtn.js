import React from "react";

export default function NextBtn({ dispatch, answer, NUM, index }) {
  if (answer === null) return null;
  if (index < NUM - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          key={dispatch}
          onClick={() => dispatch({ type: "nextquestion" })}
        >
          Next
        </button>
      </div>
    );

  if (index === NUM - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          key={dispatch}
          onClick={() => dispatch({ type: "finshed" })}
        >
          Finsh
        </button>
      </div>
    );
}
