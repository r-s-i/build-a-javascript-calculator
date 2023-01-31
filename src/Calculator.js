import { useState, useEffect } from "react";
import * as math from "mathjs";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [testsOn, setTestsOn] = useState(false);

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
    tests: "TESTS",
  };
  const buttonIds = Object.keys(buttons);
  const buttonValues = Object.values(buttons);

  useEffect(() => {
    function handleKeyDown(e) {
      if (display === "0") setDisplay("");
      e.preventDefault();
      if (buttonValues.includes(e.key)) {
        setDisplay((prev) => prev + e.key);
      }
      switch (e.key) {
        case ",":
          setDisplay((prev) => prev + ".");
          break;
        case "PageUp":
        case "NumLock":
        case "Escape":
          setDisplay("0");
          break;
        case "Enter":
          setDisplay(String(math.evaluate(display)));
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [display, buttonValues]);

  function handleClick(e) {
    if (e.target.id === "clear") setDisplay("0");
    else if (e.target.id === "equals" || e.key === "Enter") {
      let newDisplay = display;
      if (testsOn) {
        newDisplay = removeExtraOperators(display);
      }
      try {
        if (newDisplay.includes(".")) {
          let evaluatedExpression = math.evaluate(newDisplay);
          setDisplay(String(evaluatedExpression));
        } else {
          setDisplay(String(math.evaluate(newDisplay)));
        }
      } catch (e) {
        setDisplay("Error");
      }
    } else if (e.target.id === "tests") {
      if (testsOn) {
        setTestsOn(false);
        document.getElementById("fcc_test_suite_wrapper").style.visibility =
          "hidden";
      } else {
        setTestsOn(true);
        document.getElementById("fcc_test_suite_wrapper").style.visibility =
          "visible";
      }
    } else if (e.target.id === "home") {
      window.location.href = "../index.html"; // change to robiniversen.com if needed.
    } else {
      setDisplay((prev) => {
        if (prev[0] === "0") prev = prev.slice(1);
        return prev + buttons[e.target.id];
      });
    }
  }

  function removeExtraDots(str) {
    let count = 0;
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "." && count === 0) {
        newStr += str[i];
        count++;
      }
      if (str[i] !== ".") {
        newStr += str[i];
      }
      if (
        str[i] === "+" ||
        str[i] === "-" ||
        str[i] === "*" ||
        str[i] === "/"
      ) {
        count = 0;
      }
    }
    return newStr;
  }

  function removeExtraOperators(str) {
    str = str.replace(/\s/g, "");
    const strArr = str.split("");
    const newStrArr = [];

    for (let i = 0; i < strArr.length; i++) {
      if (!isNaN(strArr[i]) || strArr[i] === ".") {
        newStrArr.push(strArr[i]);
      } else {
        if (
          !isNaN(strArr[i + 1]) ||
          (strArr[i + 1] === "-" && !isNaN(strArr[i + 2]))
        ) {
          newStrArr.push(strArr[i]);
        }
      }
    }

    return newStrArr.join("");
  }

  return (
    <div id="calculator">
      <h1>JS Calculator</h1>
      <div id="display">{removeExtraDots(display)}</div>
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
