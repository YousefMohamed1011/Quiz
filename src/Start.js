import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export default function Start({ NUM, dispatch }) {
  return (
    <div className="start">
      <h2>Wellcome To React Quiz</h2>
      <h3>{NUM} questions to test your react mastry</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Go To Start
      </button>
    </div>
  );
}
