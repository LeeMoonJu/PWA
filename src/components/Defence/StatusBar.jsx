import { Typography, Box } from '@mui/material';
import styles from './styles/StatusBar.module.css';

const StatusBar = ({ score, money, wave }) => {
    return (
        <Box className={styles.statusBar}>
            <Typography variant="h6">점수: {score}</Typography>
            <Typography variant="h6">골드: {money}</Typography>
            <Typography variant="h6">웨이브: {wave}</Typography>
        </Box>
    );
};

export default StatusBar;
