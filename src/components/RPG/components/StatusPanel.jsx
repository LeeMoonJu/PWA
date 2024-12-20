import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const StatusPanel = ({ player, monster }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 1,
            boxShadow: 1
        }}>
            <Typography variant="h5" sx={{ borderBottom: '2px solid #ccc', pb: 1 }}>
                상태창
            </Typography>
            
            {/* 플레이어 상태 */}
            <Box sx={{ 
                border: '1px solid #ccc', 
                p: 2, 
                borderRadius: 1,
                bgcolor: 'background.paper'
            }}>
                <Typography variant="h6" color="primary">{player.name}</Typography>
                <Typography>레벨: {player.level}</Typography>
                <Typography>HP: {player.hp}/{player.maxHp}</Typography>
                <Typography>공격력: {player.attack}</Typography>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    mt: 1 
                }}>
                    <Typography>EXP:</Typography>
                    <Box sx={{ 
                        flex: 1, 
                        height: 10, 
                        bgcolor: 'grey.300', 
                        borderRadius: 5,
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ 
                            width: `${(player.exp / player.maxExp) * 100}%`,
                            height: '100%',
                            bgcolor: 'success.main',
                            transition: 'width 0.3s ease-in-out'
                        }} />
                    </Box>
                    <Typography>{player.exp}/{player.maxExp}</Typography>
                </Box>
            </Box>

            {/* 몬스터 상태 */}
            <Box sx={{ 
                border: '1px solid #ccc', 
                p: 2, 
                borderRadius: 1,
                bgcolor: 'background.paper'
            }}>
                <Typography variant="h6" color="error">{monster.name}</Typography>
                <Typography>HP: {monster.hp}/{monster.maxHp}</Typography>
                <Typography>공격력: {monster.attack}</Typography>
                <Typography>경험치: {monster.exp}</Typography>
            </Box>
        </Box>
    );
};

StatusPanel.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        hp: PropTypes.number.isRequired,
        maxHp: PropTypes.number.isRequired,
        exp: PropTypes.number.isRequired,
        maxExp: PropTypes.number.isRequired,
        attack: PropTypes.number.isRequired
    }).isRequired,
    monster: PropTypes.shape({
        name: PropTypes.string.isRequired,
        hp: PropTypes.number.isRequired,
        maxHp: PropTypes.number.isRequired,
        attack: PropTypes.number.isRequired,
        exp: PropTypes.number.isRequired
    }).isRequired
};

export default StatusPanel; 