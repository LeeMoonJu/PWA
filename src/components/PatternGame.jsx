import React, { useState } from 'react';
import './PatternGame.css';

const PatternGame = () => {
    const [pattern, setPattern] = useState([]);
    const [showPattern, setShowPattern] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // points 상태는 더 이상 필요하지 않습니다
    const points = Array(9).fill(null); // 단순히 9개의 점을 렌더링하기 위한 배열

    const startGame = () => {
        const newPattern = [];
        for (let i = 0; i < 4; i++) {
            newPattern.push(Math.floor(Math.random() * 9));
        }
        setPattern(newPattern);
        setShowPattern(true);
        setIsPlaying(true);

        setTimeout(() => {
            setShowPattern(false);
        }, 3000);
    };

    const renderLines = () => {
        if (!showPattern || pattern.length < 2) return null;

        // grid 셀의 중앙 좌표 계산 함수
        const getCellCenter = (index) => {
            const cellSize = 100; // 300px / 3
            const row = Math.floor(index / 3);
            const col = index % 3;
            return {
                x: col * cellSize + cellSize / 2,
                y: row * cellSize + cellSize / 2
            };
        };

        return (
            <svg 
                className="pattern-lines" 
                width="300" 
                height="300"
            >
                {pattern.map((pointIndex, index) => {
                    if (index === 0) return null;
                    
                    const startPoint = getCellCenter(pattern[index - 1]);
                    const endPoint = getCellCenter(pointIndex);
                    
                    return (
                        <line
                            key={`line-${index}`}
                            x1={startPoint.x}
                            y1={startPoint.y}
                            x2={endPoint.x}
                            y2={endPoint.y}
                            className="pattern-line"
                        />
                    );
                })}
            </svg>
        );
    };

    return (
        <div className="pattern-game">
            <div className="game-board">
                {points.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${showPattern && pattern.includes(index) ? 'active' : ''}`}
                    />
                ))}
                {renderLines()}
            </div>
            <button 
                className="start-button"
                onClick={startGame}
                disabled={isPlaying}
            >
                시작하기
            </button>
        </div>
    );
};

export default PatternGame;