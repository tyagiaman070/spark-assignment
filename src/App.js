import React, { useState } from "react";

// Custom Component
import Icon from "./components/Icons";

//Toastify
import { ToastContainer, toast } from "react-toastify";
// Toastify CSS
import "react-toastify/dist/ReactToastify.css";
//reactstrap
import { Card, CardBody, Button, Col, Row } from "reactstrap";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
// Custom CSS
import "./App.css";

// Array for TTT 9 positions
const itemArray = new Array(9).fill("empty");

// Main App Component
const App = () => {
  //States
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [score, setScore] = useState({
    cross: 0,
    circle: 0,
  });

  const { cross, circle } = score;

  // function which runs for computer turn
  const computerTurn = () => {
    const randNum = Math.floor(Math.random() * 10);
    if (itemArray[randNum] === "empty") {
      itemArray[randNum] = "cross";
    } else if (itemArray.includes("empty")) {
      computerTurn();
    } else {
      return;
    }
  };

  // to set score if anyone won
  const SetScoreOfBoth = (msg) => {
    if (msg === "cross") {
      setScore({
        ...score,
        cross: cross + 1,
      });
    } else if (msg === "circle") {
      setScore({
        ...score,
        circle: circle + 1,
      });
    }
  };

  // function to reload game
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  // function to check if there is any winner
  const checkIsWinner = () => {
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} won`);
      return itemArray[0];
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
      return itemArray[3];
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
      return itemArray[6];
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
      return itemArray[0];
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
      return itemArray[1];
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
      return itemArray[2];
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
      return itemArray[0];
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
      return [itemArray[2]];
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[1] !== "empty" &&
      itemArray[2] !== "empty" &&
      itemArray[3] !== "empty" &&
      itemArray[4] !== "empty" &&
      itemArray[5] !== "empty" &&
      itemArray[6] !== "empty" &&
      itemArray[7] !== "empty" &&
      itemArray[8] !== "empty"
    ) {
      setWinMessage("DRAW! :)");
      return "DRAW";
    }
  };

  // to fill the
  const changeItem = (itemNumber) => {
    if (winMessage !== "") {
      return toast(winMessage, { type: "success", position: "top-right" });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = "circle";
      setIsCross(!isCross);
      // after user turn execute the function for computer turn
      computerTurn();
    } else {
      return toast("already filled", { type: "error", position: "top-right" });
    }
    // to set the score if anyone won
    SetScoreOfBoth(checkIsWinner());
  };

  return (
    <div>
      <div className="p-5">
        <ToastContainer position="bottom-center" />
        <h1 class="text-center text-info pt-5 mb-5">
          Assignment of Aman Tyagi
        </h1>
        <Row className="text-white offset-md-3 mb-3">
          <Col md={3}>
            <h3>Computer score:- {score.cross}</h3>
          </Col>
          <Col md={3}>
            <h3>Player Score:- {score.circle}</h3>
          </Col>
          <Col md={2}>
            <button
              className="btn btn-primary"
              disabled={cross === 0 && circle === 0 ? true : false}
              onClick={() => {
                setScore({
                  cross: 0,
                  circle: 0,
                });
              }}
            >
              Reset Score
            </button>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="offset-md-3">
            {/* if someone won then display winner message else none */}
            {winMessage ? (
              <div className="mb-2 mt-2">
                <h1 className="text-warning text-uppercase text-center">
                  {winMessage}
                </h1>
                <Button color="warning" block onClick={reloadGame}>
                  Reload the Game
                </Button>
              </div>
            ) : (
              ""
            )}
            <div className="grid">
              {/* to display all the array elements in 9 grids */}
              {itemArray.map((item, index) => (
                <Card
                  onClick={() => {
                    changeItem(index);
                  }}
                  color="success"
                  key={index}
                >
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default App;
