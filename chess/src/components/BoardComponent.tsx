import React, {FC, useEffect, useState} from 'react';
import '../App.css'
import { Board } from '../models/Board';
import CellComponents from './CellComponents';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player'; 

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent : FC <BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    
    function click(cell: Cell) {
        console.log(currentPlayer);
        
        if (selectedCell && selectedCell !== cell  && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()   
            setSelectedCell(null)
            updateBoard()
        } else{
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }  
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])
    
    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>
                Текущий игрок {currentPlayer?.color}
            </h3>
            <div className='board'>
            {board.cells.map((row, index) => 
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponents
                            click={click}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            cell={cell}
                            key={cell.id}
                        />
                    )}
                </React.Fragment>
            )}
            </div>
        </div>
    );
};

export default BoardComponent;