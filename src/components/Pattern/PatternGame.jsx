import React, { useState } from 'react';
import './PatternGame.css';

const PatternGame = () => {
    const [pattern, setPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameStatus, setGameStatus] = useState('waiting');
    const [round, setRound] = useState(1);

    const points = Array(9).fill(null);

    // 각 점에서 이동 가능한 인접한 점들을 정의
    const adjacentPoints = {
        0: [1, 3, 4],      // 좌상단
        1: [0, 2, 3, 4, 5], // 상단 중앙
        2: [1, 4, 5],      // 우상단
        3: [0, 1, 4, 6, 7], // 좌측 중앙
        4: [0, 1, 2, 3, 5, 6, 7, 8], // 중앙
        5: [1, 2, 4, 7, 8], // 우측 중앙
        6: [3, 4, 7],      // 좌하단
        7: [3, 4, 5, 6, 8], // 하단 중앙
        8: [4, 5, 7]       // 우하단
    };

    const startGame = () => {
        const patternLength = round + 2;
        const newPattern = [];

        // 첫 번째 점은 랜덤하게 선택
        newPattern.push(Math.floor(Math.random() * 9));

        // 나머지 점들은 인접한 점들 중에서 선택
        for (let i = 1; i < patternLength; i++) {
            const lastPoint = newPattern[newPattern.length - 1];
            const availablePoints = adjacentPoints[lastPoint].filter((point) => point !== newPattern[newPattern.length - 2]); // 직전 점만 제외

            const randomIndex = Math.floor(Math.random() * availablePoints.length);
            newPattern.push(availablePoints[randomIndex]);
        }

        setPattern(newPattern);
        setUserPattern([]);
        setIsPlaying(true);
        setGameStatus('showing');

        // 패턴 보여주기가 끝나면 입력 모드로 전환
        setTimeout(() => {
            setGameStatus('input');
        }, 1500); // 선이 그려지는 시간만큼 대기
    };

    const handleDotClick = (index) => {
        if (gameStatus !== 'input') return;

        const newUserPattern = [...userPattern, index];
        setUserPattern(newUserPattern);

        const currentIndex = newUserPattern.length - 1;
        if (newUserPattern[currentIndex] !== pattern[currentIndex]) {
            setGameStatus('fail');
            setIsPlaying(false);
            
            // 3초 후 1라운드부터 다시 시작
            setTimeout(() => {
                setRound(1);
                startGame();
            }, 3000);
            return;
        }

        if (newUserPattern.length === pattern.length) {
            setGameStatus('success');
            setIsPlaying(false);
            
            // 2초 후 다음 라운드 시작
            setTimeout(() => {
                setRound(prev => prev + 1);
                startGame();
            }, 2000);
        }
    };

    const getCellCenter = (index) => {
        // 게임 보드의 실제 크기와 패딩을 고려한 계산
        const boardSize = 300; // 게임 보드 전체 크기
        const cellSize = boardSize / 3; // 각 셀의 크기
        const padding = 20; // 게임 보드의 패딩
        
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        return {
            x: padding + (col * cellSize) + (cellSize / 2),
            y: padding + (row * cellSize) + (cellSize / 2)
        };
    };
    
    const renderLines = () => {
        if (pattern.length < 2) return null;
        
        return pattern.slice(1).map((point, index) => {
            const start = getCellCenter(pattern[index]);
            const end = getCellCenter(point);
            
            // 두 점 사이의 각도 계산
            const angle = Math.atan2(end.y - start.y, end.x - start.x);
            // 두 점 사이의 거리 계산
            const length = Math.sqrt(
                Math.pow(end.x - start.x, 2) + 
                Math.pow(end.y - start.y, 2)
            );
            
            return (
                <div
                    key={index}
                    className="line"
                    style={{
                        position: 'absolute',
                        left: start.x,
                        top: start.y,
                        width: length,
                        height: '2px',
                        backgroundColor: '#007bff',
                        transformOrigin: '0 50%',
                        transform: `rotate(${angle}rad)`,
                        transition: 'all 0.3s ease'
                    }}
                />
            );
        });
    };

    return (
        <div className="pattern-game">
            <div className="round-info">라운드 {round}</div>
            <div className="pattern-info">이번 라운드: {round + 2}개의 점</div>
            <div className="game-board">
                {points.map((_, index) => (
                    <button 
                        key={index} 
                        className={`dot ${userPattern.includes(index) ? 'active' : ''} ${userPattern.includes(index) ? 'user-input' : ''}`}
                        onClick={() => handleDotClick(index)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleDotClick(index);
                            }
                        }}
                        aria-label={`패턴 점 ${index + 1}`}
                    />
                ))}
                {renderLines()}
            </div>
            <button className="start-button" onClick={startGame} disabled={isPlaying}>
                {gameStatus === 'waiting' ? '시작하기' : '다음 라운드'}
            </button>
            {gameStatus === 'success' && <div className="message success">성공! 2초 후 다음 라운드가 시작됩니다.</div>}
            {gameStatus === 'fail' && <div className="message fail">실패! 3초 후 처음부터 다시 시작합니다.</div>}
        </div>
    );
};

export default PatternGame;
