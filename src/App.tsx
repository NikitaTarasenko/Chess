import React, { useEffect, useState } from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [fisrtMoveDone, setFirstMoveDone] = useState(false);
  const [victory, setVictory] = useState<Colors | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setFirstMoveDone(false);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function firstMoveHandle(status: boolean) {
    setFirstMoveDone(status);
  }

  return (
    <div className="app">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
        setfisrtMove={firstMoveHandle}
        fisrtMoveDone={fisrtMoveDone}
        victory={victory}
        setVictory={setVictory}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        setfisrtMove={firstMoveHandle}
      ></BoardComponent>
      <div>
        <LostFigures title="black figures" figures={board.lostBlackFigures} />
        <LostFigures title="white figures" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
