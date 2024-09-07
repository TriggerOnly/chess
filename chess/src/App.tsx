import React, { useEffect, useState } from "react";
import './App.css'
import BoardComponet from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(null)
  } 

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <Timer
      setCurrentPlayer={setCurrentPlayer}
        restart={restart} 
        currentPlayer={currentPlayer}
      />
      <BoardComponet 
        board={board} 
        setBoard={setBoard}
        currentPlayer = {currentPlayer}
        swapPlayer = {swapPlayer}
      />
      <div>
        <LostFigures
          restart={restart}
          title="Черные фигуры"
          figures={board.lostBlackFigure}
        />
        <LostFigures
          restart={restart}
          title="Белые фигуры"
          figures={board.lostWhiteFigure}
        />
      </div>
    </div>
  );
}

export default App;
