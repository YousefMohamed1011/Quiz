import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Questions from "./questions";
import NextBtn from "./NextBtn";
import Progres from "./Progres";
import Finshed from "./Finshed";
import Footer from "./Footer";
import Timer from "./Timer";
const SecP = 30;
const initialValue = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  sec: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataAv":
      return { ...state, questions: action.payload, status: "Ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "active", sec: state.questions.length * SecP };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finshed":
      return {
        ...state,
        status: "finshed",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "Ready",
        index: 0,
        answer: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        sec: state.sec - 1,
        status: state.sec === 1 ? "finshed" : state.status,
      };
    default:
      throw new Error("Error");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, sec },
    dispatch,
  ] = useReducer(reducer, initialValue);
  const maxpoints = questions.reduce((sum, q) => sum + q.points, 0);

  useEffect(function () {
    fetch("/questions.json?cacheBust=" + Date.now())
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => dispatch({ type: "dataAv", payload: data.questions }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <Start NUM={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progres
              NUM={questions.length}
              index={index}
              points={points}
              maxpoints={maxpoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} sec={sec} />
              <NextBtn
                dispatch={dispatch}
                answer={answer}
                index={index}
                NUM={questions.length}
              />
            </Footer>
          </>
        )}
        {status === "finshed" && (
          <Finshed
            maxpoints={maxpoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
