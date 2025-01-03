import React, { useEffect } from 'react';
import '../styles/GameMap.css';

const GameMap = ({ player, setPlayer, onEncounter, mapData, setMapData, onTownEnter }) => {
    const calculateNewPosition = (currentPosition, direction) => {
        const { x, y } = currentPosition;
        switch(direction) {
            case 'up': return { x, y: y - 1 };
            case 'down': return { x, y: y + 1 };
            case 'left': return { x: x - 1, y };
            case 'right': return { x: x + 1, y };
            default: return { x, y };
        }
    };

    const isValidMove = (position) => {
        const { x, y } = position;
        // 맵 범위 체크
        if (x < 0 || x >= mapData[0].length || y < 0 || y >= mapData.length) {
            return false;
        }
        // 벽 체크
        return mapData[y][x] !== 1;
    };

    const isMonsterZone = (position) => {
        const { x, y } = position;
        return mapData[y][x] === 2;
    };

    const isTownZone = (position) => {
        const { x, y } = position;
        return mapData[y][x] === 3;
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            let direction;
            switch(e.key) {
                case 'ArrowUp':
                    direction = 'up';
                    break;
                case 'ArrowDown':
                    direction = 'down';
                    break;
                case 'ArrowLeft':
                    direction = 'left';
                    break;
                case 'ArrowRight':
                    direction = 'right';
                    break;
                default:
                    return;
            }
            
            const newPosition = calculateNewPosition(player.position, direction);
            if (isValidMove(newPosition)) {
                setPlayer(prev => ({
                    ...prev,
                    position: newPosition
                }));

                // 몬스터 구역 체크
                if (isMonsterZone(newPosition)) {
                    if (Math.random() < 0.5) {
                        onEncounter();
                    }
                }

                // 마을 구역 체크
                if (isTownZone(newPosition)) {
                    onTownEnter();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [player.position, setPlayer, onEncounter, onTownEnter, mapData]);

    const getCellClassName = (cellType) => {
        switch(cellType) {
            case 0: return 'cell-ground';
            case 1: return 'cell-wall';
            case 2: return 'cell-monster';
            case 3: return 'cell-town';
            default: return 'cell-ground';
        }
    };

    return (
        <div className="game-container">
            <div className="game-map">
                {mapData.map((row, y) => (
                    <div key={y} className="map-row">
                        {row.map((cell, x) => (
                            <div 
                                key={`${x}-${y}`} 
                                className={`map-cell ${getCellClassName(cell)}`}
                            >
                                {player.position.x === x && player.position.y === y && (
                                    <div className="player-sprite" />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="controls-hint">
                <p>방향키로 이동하세요</p>
            </div>
        </div>
    );
};

export default GameMap; 