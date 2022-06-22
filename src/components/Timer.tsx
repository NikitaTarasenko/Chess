import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setfisrtMove: (status: boolean) => void;
  fisrtMoveDone: boolean;
  victory: Colors | null;
  victoryHandler: (vinner: Colors | null) => void;
}
const Timer: React.FC<TimerProps> = ({
  currentPlayer,
  restart,
  setfisrtMove,
  fisrtMoveDone,
  victory,
  victoryHandler,
}) => {
  let time = 300;
  const [blackTime, setBlackTime] = useState(time);
  const [whiteTime, setWhiteTime] = useState(time);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  const [pause, setPause] = useState(false);
  const [vinner, setVinner] = useState(victory);

  useEffect(() => {
    if (fisrtMoveDone) {
      // console.log("first");
      startTimer();
    }
  }, [currentPlayer]);

  useEffect(() => {
    setVinner(null);
  }, [fisrtMoveDone]);

  useEffect(() => {
    // console.log("current vic : " + vinner + " and FM" + fisrtMoveDone);
    // console.log("cur vinner : " + vinner);

    victoryHandler(vinner);

    if (vinner !== null && fisrtMoveDone) {
      console.log("restarted");
      if (timer.current !== null) {
        clearInterval(timer.current);
      }
      handleRestart();
    }
  }, [vinner]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (fisrtMoveDone) {
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
    setBlackTime((prev) => {
      if (prev === 0) {
        setVinner(Colors.WHITE);
        // alert(" WHITE won !");
        return 0;
      } else {
        return prev - 1;
      }
    });
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => {
      if (prev === 0) {
        // alert("  BLACK won !");
        setVinner(Colors.BLACK);

        return 0;
      } else {
        return prev - 1;
      }
    });
  }

  const handleRestart = () => {
    setWhiteTime(time);
    setBlackTime(time);
    //  setVinner(null);
    setfisrtMove(false);
    restart();
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
  };

  const handlePause = () => {
    setPause(!pause);
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
