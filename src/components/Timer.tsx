import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setfisrtMove: (status: boolean) => void;
  fisrtMoveDone: boolean;
  victory : Colors | null;
  setVictory : (vinner: Colors | null) => void;
}
const Timer: React.FC<TimerProps> = ({ currentPlayer, restart, setfisrtMove, fisrtMoveDone, victory, setVictory }) => {
  const [blackTime, setBlackTime] = useState(10);
  const [whiteTime, setWhiteTime] = useState(10);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    console.log("bag : " + fisrtMoveDone);
    if (fisrtMoveDone) {
      console.log("first");
      startTimer();
    }
  }, [currentPlayer]);

  useEffect(() => {
    console.log("current vic : " + victory + " and FM" + fisrtMoveDone);

    if (victory !== null && fisrtMoveDone) {
      console.log("restarted");
      if (timer.current !== null) {
        clearInterval(timer.current);
      }
      handleRestart();
    }
  }, [victory]);

  function startTimer() {
    console.log("started Timer");
    console.log("tmCur  == " + timer.current);
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (fisrtMoveDone) {
      console.log("shit is working");
      const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;

      timer.current = setInterval(callback, 1000);
    }
  }
  if (pause === true && timer.current) {
    clearInterval(timer.current);
  }
  if (pause === false && timer.current !== null) {
    startTimer();
  }
  function decrementBlackTimer() {
    console.log("tmCur222  == " + timer.current);
    setBlackTime((prev) => {
      if (prev === 0) {
        alert(" WHITE won !");
        setVictory(Colors.WHITE);

        return 0;
      } else {
        return prev - 1;
      }
    });
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => {
      if (prev === 0) {
        alert("  BLACK won !");
        setVictory(Colors.BLACK);

        return 0;
      } else {
        console.log(" decW -1");
        return prev - 1;
      }
    });
  }

  const handleRestart = () => {
    setWhiteTime(10);
    setBlackTime(10);
    setVictory(null);
    setfisrtMove(false);
    restart();
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
  };

  const handlePause = () => {
    setPause(!pause);
    console.log("pauseee" + pause + "timerC =" + timer.current);
  };

  return (
    <div>
      <div>
        <button type="button" onClick={handleRestart}>
          Restart game
        </button>
        <button type="button" onClick={handlePause}>
          {!pause ? "Pause game" : "Continue game"}
        </button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};

export default Timer;
