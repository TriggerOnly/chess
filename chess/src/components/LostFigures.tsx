import React, { FC, useEffect, useState } from 'react';
import { Figure, FigureNames } from '../models/figures/Figure';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
    restart: () => void;
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures, restart }) => {
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (figures.some(figure => figure.name === 'Король')) {
            setGameOver(true);
            console.log(FigureNames.KING); 
        }
    }, [figures.length]);

    function handleRestart() {
        setGameOver(false);
        restart();
    }

    return (
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figure => (
                <div key={figure.id}>
                    {figure.name} {figure.logo && <img className="figureLogo" src={figure.logo} alt={figure.name} />}
                </div>
            ))}
            {gameOver && (
                <div className='modalStyles'>
                    <div className='modalContentStyles'>
                        <h2>Игра окончена!</h2>
                        <button onClick={handleRestart}>Начать заново</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LostFigures;
