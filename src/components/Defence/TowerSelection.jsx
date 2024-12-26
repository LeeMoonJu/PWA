import { Typography, Button } from '@mui/material';
import styles from './styles/TowerSelection.module.css';
import { TOWERS } from './constants/towerData';

const TowerSelection = ({ gameState, onTowerSelect }) => {
    const { money } = gameState;

    return (
        <div className={styles.towerSelection}>
            <Typography variant="h6" gutterBottom>
                타워 선택
            </Typography>
            <div className={styles.towerList}>
                {Object.values(TOWERS).map((tower) => (
                    <Button
                        key={tower.id}
                        className={styles.towerButton}
                        onClick={() => onTowerSelect(tower)}
                        disabled={money < tower.cost}
                        style={{ backgroundColor: tower.color }}
                    >
                        <div className={styles.towerInfo}>
                            <Typography variant="subtitle2">{tower.name}</Typography>
                            <Typography variant="caption">비용: {tower.cost}</Typography>
                            <Typography variant="caption">공격력: {tower.damage}</Typography>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TowerSelection;
