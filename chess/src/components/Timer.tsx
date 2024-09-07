import React, { FC, useState, useRef, useEffect } from 'react'; 
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
    currentPlayer: Player | null;
    setCurrentPlayer: (player: Player | null) => void;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, setCurrentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const [modalOpen, setModalOpen] = useState(true); 
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        console.log('Current player:', currentPlayer);
        if (currentPlayer?.color === Colors.BLACK) {
            setBlackTime(300);
        } else {
            setWhiteTime(300);
        }
        if (timer.current) {
            clearInterval(timer.current);
        }
        if (currentPlayer) {
            startTimer();
        }
    }, [currentPlayer]);
    
    function startTimer() {        
        if (timer.current) {
            clearInterval(timer.current);
        }       
        
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
        setModalOpen(false);
    }

    function decrementBlackTimer() {
        setBlackTime((prev) => {
            if (prev <= 1) {
                clearInterval(timer.current!);
                alert('Победили белые!');
            }
            return prev - 1;
        });
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev) => {
            if (prev <= 1) {
                clearInterval(timer.current!);
                alert('Победили чёрные!');
            }
            return prev - 1;
        });
    }

    function handleRestart() {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
        if (timer.current) {
            clearInterval(timer.current);
        }
        setCurrentPlayer(new Player(Colors.WHITE))
        setModalOpen(true); 
    }

    return (
        <div>
            {modalOpen && (
                <div className='modalStyles'>
                    <div className='modalContentStyles'>
                        <h2>Классические шахматы</h2>
                        <button onClick={handleRestart}>НАЧАТЬ</button>
                    </div>
                </div>
            )}
            <div>
                <button onClick={handleRestart}>ЗАНОВО</button>
            </div>
            <h2>Чёрные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;
