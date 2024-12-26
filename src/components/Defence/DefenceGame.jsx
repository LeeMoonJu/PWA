import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import StatusBar from './StatusBar';
import GameBoard from './GameBoard';
import TowerSelection from './TowerSelection';
import styles from './styles/DefenceGame.module.css';

const INITIAL_STATE = {
    score: 0,
    money: 1000,
    wave: 1
};

const DefenceGame = () => {
    const [score, setScore] = useState(INITIAL_STATE.score);
    const [money, setMoney] = useState(INITIAL_STATE.money);
    const [wave, setWave] = useState(INITIAL_STATE.wave);
    const [gameStatus, setGameStatus] = useState('ready');
    const [selectedTower, setSelectedTower] = useState(null);

    const gameState = {
        score,
        money,
        wave,
        gameStatus,
        setScore,
        setMoney,
        setWave,
        setGameStatus
    };

    const handleTowerSelect = (tower) => {
        if (gameStatus === 'gameOver') return;
        setSelectedTower(tower);
    };

    const handleTowerPlace = (cost) => {
        if (gameStatus === 'gameOver') return;
        setMoney((prev) => prev - cost);
        setSelectedTower(null);
    };

    const resetGame = () => {
        setScore(INITIAL_STATE.score);
        setMoney(INITIAL_STATE.money);
        setWave(INITIAL_STATE.wave);
        setGameStatus('ready');
        setSelectedTower(null);
    };

    return (
        <div className={styles.gameContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StatusBar {...gameState} />
                </Grid>
                <Grid item xs={9}>
                    <GameBoard gameState={gameState} selectedTower={selectedTower} onTowerPlace={handleTowerPlace} />
                </Grid>
                <Grid item xs={3}>
                    <TowerSelection gameState={gameState} onTowerSelect={handleTowerSelect} />
                </Grid>
            </Grid>
            {gameStatus === 'gameOver' && (
                <div className={styles.gameOverOverlay}>
                    <div className={styles.gameOverContent}>
                        <h2>게임 오버!</h2>
                        <p>최종 점수: {score}</p>
                        <p>웨이브: {wave}</p>
                        <Button variant="contained" color="primary" onClick={resetGame} className={styles.restartButton}>
                            다시 시작
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DefenceGame;
