import { Box, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const BattleScreen = ({ player, monster, battleMessage }) => {
    return (
        <Box sx={{ 
            flex: 1, 
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 2,
            bgcolor: 'background.paper',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}>
            {/* 전투 상태 표시 */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                px: 4
            }}>
                {/* 플레이어 캐릭터 */}
                <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                        sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: 'primary.main',
                            mb: 1
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FavoriteIcon color="error" />
                        <Typography>{player.hp}/{player.maxHp}</Typography>
                    </Box>
                </Box>

                {/* VS 표시 */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center'
                }}>
                    <LocalFireDepartmentIcon 
                        color="warning" 
                        sx={{ fontSize: 40 }} 
                    />
                    <Typography variant="h6">VS</Typography>
                </Box>

                {/* 몬스터 캐릭터 */}
                <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                        sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: monster.color || 'error.main',
                            mb: 1,
                            border: '3px solid',
                            borderColor: 'grey.300'
                        }}
                    >
                        <PetsIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FavoriteIcon color="error" />
                        <Typography>{monster.hp}/{monster.maxHp}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* 전투 메시지 */}
            <Box sx={{ 
                textAlign: 'center', 
                py: 2,
                bgcolor: 'background.default',
                borderRadius: 1
            }}>
                <Typography variant="h6" color="text.secondary">
                    {battleMessage}
                </Typography>
            </Box>
        </Box>
    );
};

BattleScreen.propTypes = {
    player: PropTypes.shape({
        hp: PropTypes.number.isRequired,
        maxHp: PropTypes.number.isRequired
    }).isRequired,
    monster: PropTypes.shape({
        hp: PropTypes.number.isRequired,
        maxHp: PropTypes.number.isRequired,
        color: PropTypes.string
    }).isRequired,
    battleMessage: PropTypes.string.isRequired
};

export default BattleScreen; 