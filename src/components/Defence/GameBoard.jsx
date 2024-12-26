import { useEffect, useState, useCallback } from 'react';
import styles from './styles/GameBoard.module.css';
import { INITIAL_MAP, TILE_TYPES, PREDEFINED_PATH } from './constants/mapData';
import { MONSTERS, WAVE_DATA } from './constants/monsterData';

// 상수 수정 및 추가
const TILE_SIZE = 60;
const GRID_PADDING = 10;
const TILE_GAP = 4;
const FPS = 60;
const FRAME_TIME = 1000 / FPS;  // 약 16.67ms
const WAVE_INTERVAL = 30000; // 30초

const GameBoard = ({ gameState, selectedTower, onTowerPlace }) => {
    const [map, setMap] = useState(INITIAL_MAP);
    const [towers, setTowers] = useState({});
    const [hoveredTile, setHoveredTile] = useState(null);
    const [placementAnimation, setPlacementAnimation] = useState(null);
    const [monsters, setMonsters] = useState([]);
    const [waveInProgress, setWaveInProgress] = useState(false);
    const [totalMonsters, setTotalMonsters] = useState(0);
    const [waveTimer, setWaveTimer] = useState(null);
    const [nextWaveTime, setNextWaveTime] = useState(null);

    // 경로 찾기
    const findPath = useCallback(() => {
        return PREDEFINED_PATH; // 미리 정의된 경로 사용
    }, []);

    // 몬스터 이동 처리
    const moveMonsters = useCallback(() => {
        setMonsters(prevMonsters => {
            return prevMonsters.map(monster => {
                if (!monster || !monster.path) return monster;

                const nextPathIndex = monster.pathIndex + 1;
                
                // 경로의 마지막에 도달했을 때의 처리
                if (nextPathIndex >= monster.path.length) {
                    return {
                        ...monster,
                        pathIndex: 0,
                        progress: 0,
                        position: monster.path[0]
                    };
                }

                // 초당 이동 속도를 프레임당 이동 속도로 변환
                const frameProgress = (monster.speed / FPS);
                const progress = monster.progress + frameProgress;

                if (progress >= 1) {
                    // 다음 타일로 이동
                    return {
                        ...monster,
                        pathIndex: nextPathIndex,
                        progress: progress - 1, // 남은 진행도를 다음 타일로 이월
                        position: monster.path[nextPathIndex]
                    };
                }

                // 현재 타일 내에서 이동
                return {
                    ...monster,
                    progress
                };
            });
        });
    }, []);

    // 게임 오버 체크
    useEffect(() => {
        if (totalMonsters >= 30) {
            // 게임 오버 처리
            setWaveInProgress(false);
            gameState.setGameStatus('gameOver');
        }
    }, [totalMonsters, gameState]);

    // 웨이브 시작
    const startWave = useCallback(() => {
        const currentWave = gameState.wave - 1;
        if (currentWave >= WAVE_DATA.length) return;

        setWaveInProgress(true);
        const waveInfo = WAVE_DATA[currentWave];
        let monstersToSpawn = [];
        const path = findPath();

        waveInfo.monsters.forEach(({ type, count }) => {
            for (let i = 0; i < count; i++) {
                monstersToSpawn.push({
                    ...MONSTERS[type],
                    id: `${type}-${Date.now()}-${i}`,
                    currentHp: MONSTERS[type].hp,
                    path: path,
                    pathIndex: 0,
                    progress: 0,
                    position: path[0]
                });
            }
        });

        let spawnedCount = 0;
        const spawnInterval = setInterval(() => {
            if (spawnedCount >= monstersToSpawn.length) {
                clearInterval(spawnInterval);
                setWaveInProgress(false);
                // 다음 웨이브 타이머 설정
                setNextWaveTime(Date.now() + WAVE_INTERVAL);
                const timer = setTimeout(() => {
                    setWaveTimer(null);
                    setNextWaveTime(null);
                    gameState.setWave(prev => prev + 1);
                    startWave();
                }, WAVE_INTERVAL);
                setWaveTimer(timer);
                return;
            }

            setMonsters(prev => [...prev, monstersToSpawn[spawnedCount]]);
            setTotalMonsters(prev => prev + 1);
            spawnedCount++;
        }, waveInfo.interval);
    }, [gameState.wave, findPath]);

    // 게임 루프
    useEffect(() => {
        if (monsters.length === 0) return;

        const gameLoop = setInterval(() => {
            moveMonsters();
        }, FRAME_TIME);

        return () => clearInterval(gameLoop);
    }, [monsters.length, moveMonsters]);

    // 몬스터 위치 계산 함수 수정
    const calculateMonsterPosition = (currentPos, nextPos, progress) => {
        // 타일의 실제 크기 (간격 포함)
        const effectiveTileSize = TILE_SIZE + TILE_GAP;
        
        // 시작 위치와 목표 위치를 타일 단위로 계산
        const startX = GRID_PADDING + (currentPos[1] * effectiveTileSize) + (TILE_SIZE / 2);
        const startY = GRID_PADDING + (currentPos[0] * effectiveTileSize) + (TILE_SIZE / 2);
        const endX = GRID_PADDING + (nextPos[1] * effectiveTileSize) + (TILE_SIZE / 2);
        const endY = GRID_PADDING + (nextPos[0] * effectiveTileSize) + (TILE_SIZE / 2);

        // 선형 보간으로 현재 위치 계산
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;

        return { x, y };
    };

    // 몬스터 렌더링 함수 수정
    const renderMonster = (monster) => {
        // monster 객체가 유효한지 먼저 확인
        if (!monster || !monster.position || !monster.path) return null;

        const currentPos = monster.position;
        // 마지막 경로 포인트일 경우 다시 처음으로 돌아가도록 수정
        const nextPos = monster.path[monster.pathIndex + 1] || monster.path[0];
        
        if (!currentPos || !nextPos) return null;

        const { x, y } = calculateMonsterPosition(currentPos, nextPos, monster.progress);
        const offset = monster.size / 2;

        return (
            <div
                key={monster.id}
                className={styles.monster}
                style={{
                    width: monster.size,
                    height: monster.size,
                    backgroundColor: monster.color,
                    transform: `translate(${x - offset}px, ${y - offset}px)`,
                    transition: 'transform 0.016s linear'
                }}
            >
                <div className={styles.monsterHp}>
                    <div 
                        className={styles.monsterHpBar}
                        style={{ width: `${(monster.currentHp / monster.hp) * 100}%` }}
                    />
                </div>
            </div>
        );
    };

    const getTileClassName = (tileType) => {
        switch (tileType) {
            case TILE_TYPES.PATH:
                return styles.path;
            case TILE_TYPES.TOWER_SLOT:
                return styles.towerSlot;
            case TILE_TYPES.START:
                return styles.start;
            case TILE_TYPES.END:
                return styles.end;
            default:
                return '';
        }
    };

    const isInRange = (towerRow, towerCol, targetRow, targetCol, range) => {
        const distance = Math.sqrt(
            Math.pow(towerRow - targetRow, 2) + 
            Math.pow(towerCol - targetCol, 2)
        );
        return distance <= range;
    };

    const handleTileClick = (rowIndex, colIndex) => {
        const tileType = map[rowIndex][colIndex];
        
        if (tileType === TILE_TYPES.TOWER_SLOT && selectedTower) {
            const tileKey = `${rowIndex}-${colIndex}`;
            
            if (towers[tileKey]) return;

            if (gameState.money >= selectedTower.cost) {
                const newTowers = {
                    ...towers,
                    [tileKey]: selectedTower
                };
                setTowers(newTowers);
                onTowerPlace(selectedTower.cost);
                
                // 설치 애니메이션 효과 추가
                setPlacementAnimation(tileKey);
                setTimeout(() => setPlacementAnimation(null), 500);
            }
        }
    };

    const renderTile = (tile, rowIndex, colIndex) => {
        const tileKey = `${rowIndex}-${colIndex}`;
        const tower = towers[tileKey];
        
        // 타워 사정거리 표시 계산
        let showRange = false;
        if (hoveredTile) {
            if (towers[hoveredTile]) {
                // 설치된 타워의 사정거리
                const [hoverRow, hoverCol] = hoveredTile.split('-').map(Number);
                showRange = isInRange(
                    hoverRow, 
                    hoverCol, 
                    rowIndex, 
                    colIndex, 
                    towers[hoveredTile].range
                );
            } else if (selectedTower && tile === TILE_TYPES.TOWER_SLOT && !towers[hoveredTile]) {
                // 설치 예정인 타워의 사정거리 미리보기
                const [hoverRow, hoverCol] = hoveredTile.split('-').map(Number);
                showRange = isInRange(
                    hoverRow,
                    hoverCol,
                    rowIndex,
                    colIndex,
                    selectedTower.range
                );
            }
        }

        // 타워 설치 가능 여부 표시
        const isPlaceable = tile === TILE_TYPES.TOWER_SLOT && 
            !towers[tileKey] && 
            selectedTower && 
            gameState.money >= selectedTower.cost;

        const tileClassName = [
            styles.tile,
            getTileClassName(tile),
            showRange ? styles.inRange : '',
            isPlaceable ? styles.placeable : '',
            placementAnimation === tileKey ? styles.placing : ''
        ].filter(Boolean).join(' ');

        return (
            <div
                key={`${rowIndex}-${colIndex}`}
                className={tileClassName}
                onClick={() => handleTileClick(rowIndex, colIndex)}
                onMouseEnter={() => setHoveredTile(tileKey)}
                onMouseLeave={() => setHoveredTile(null)}
            >
                {tower && (
                    <div 
                        className={`${styles.tower} ${styles[tower.design.pattern]} ${
                            placementAnimation === tileKey ? styles.placing : ''
                        }`}
                    >
                        <div className={styles.towerBase} style={{ backgroundColor: tower.design.base }} />
                        <div className={styles.towerTop} style={{ backgroundColor: tower.design.top }}>
                            <div className={styles.towerAccent} style={{ backgroundColor: tower.design.accent }} />
                        </div>
                    </div>
                )}
                {/* 선택된 타워 미리보기 */}
                {isPlaceable && hoveredTile === tileKey && (
                    <div className={`${styles.towerPreview} ${styles[selectedTower.design.pattern]}`}>
                        <div className={styles.towerBase} style={{ backgroundColor: selectedTower.design.base }} />
                        <div className={styles.towerTop} style={{ backgroundColor: selectedTower.design.top }}>
                            <div className={styles.towerAccent} style={{ backgroundColor: selectedTower.design.accent }} />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // 컴포넌트 cleanup
    useEffect(() => {
        return () => {
            if (waveTimer) {
                clearTimeout(waveTimer);
            }
        };
    }, [waveTimer]);

    return (
        <div className={styles.gameBoard}>
            <div className={styles.monsterCount}>
                누적 몬스터: {totalMonsters} / 30
                <div className={styles.nextWaveTimer}>
                    다음 웨이브까지: {Math.ceil((nextWaveTime - Date.now()) / 1000)}초
                </div>
            </div>
            <div className={styles.grid}>
                {map.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((tile, colIndex) => renderTile(tile, rowIndex, colIndex))}
                    </div>
                ))}
                <div className={styles.monstersLayer}>
                    {monsters.map(renderMonster)}
                </div>
            </div>
            {!waveInProgress && !waveTimer && (
                <button 
                    className={styles.startWaveButton}
                    onClick={startWave}
                >
                    웨이브 시작
                </button>
            )}
            {gameState.gameStatus === 'gameOver' && (
                <div className={styles.gameOver}>
                    게임 오버!
                </div>
            )}
        </div>
    );
};

export default GameBoard; 
