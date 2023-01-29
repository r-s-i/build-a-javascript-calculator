import { useState } from "react";
import * as math from "mathjs";

function Calculator() {
  const [display, setDisplay] = useState("0");

  const buttons = {
    clear: "AC",
    divide: "/",
    multiply: "*",
    subtract: "-",
    add: "+",
    equals: "=",
    decimal: ".",
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    home: "HOME",
    test: "TEST",
  };
  const buttonIds = Object.keys(buttons);

  function handleClick(e) {
    if (e.target.id === "clear") setDisplay("0");
    else if (e.target.id === "equals") setDisplay(math.evaluate(display));
    else {
      setDisplay((prev) => {
        if (prev[0] === "0") prev = prev.slice(1);
        return prev + buttons[e.target.id];
      });
    }
  }

  return (
    <div id="calculator">
      <h1>JS Calculator</h1>
      <div id="display">{display}</div>
      <div id="buttons">
        {buttonIds.map((key, i) => {
          return (
            <button id={key} key={"key-" + i} onClick={handleClick}>
              {buttons[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calculator;
