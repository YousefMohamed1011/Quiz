import { useReducer } from "react";

function reducer(State, Action) {
  console.log(State, Action);
  // return { count: 0, step: 1 };
  switch (Action.type) {
    case "dec":
      return { ...State, count: State.count - State.step };
    case "inc":
      return { ...State, count: State.count + State.step };
    case "setCount":
      return { ...State, count: Action.payload };
    case "setStep":
      return { ...State, step: Action.payload };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error("Unkown");
  }

  // if (Action.type === "inc") return State + 1;
  // if (Action.type === "dec") return State - 1;
  // if (Action.type === "setCount") return Action.payload;
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialValue = { count: 1, step: 1 };
  const [state, setCount] = useReducer(reducer, initialValue);
  const { count, step } = state;

  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    setCount({ type: "dec" });
  };

  const inc = function () {
    setCount({ type: "inc" });

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    setCount({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    setCount({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    setCount({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
