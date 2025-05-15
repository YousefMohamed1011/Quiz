import React, { useEffect } from "react";

export default function Timer({ dispatch, sec }) {
  const Min = Math.floor(sec / 60);
  const Sec = Math.floor(sec % 60);

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {Min < 10 && "0"}
      {Min}:{Sec < 10 && "0"}
      {Sec}
    </div>
  );
}
