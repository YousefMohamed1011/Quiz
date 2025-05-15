import React from "react";

export default function Progres({ index, NUM, points, maxpoints, answer }) {
  return (
    <header className="progress">
      <progress max={NUM} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {NUM}
      </p>
      <p>
        {points} / {maxpoints}
      </p>
    </header>
  );
}
