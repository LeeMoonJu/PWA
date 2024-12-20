import { Box, Typography, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import ItemButton from './ItemButton';

const InventoryPanel = ({ player, onEquip, onUnequip, onClose }) => {
    return (
        <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            zIndex: 1000
        }}>
            <Typography variant="h6" sx={{ mb: 2 }}>인벤토리</Typography>
            <Grid container spacing={2}>
                {/* 장착 중인 장비 */}
                <Grid item xs={12}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                        <Typography variant="subtitle1">장착 장비</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <ItemButton
                                    item={player.equipment.weapon || { 
                                        name: '(없음)', 
                                        rarity: 'common',
                                        color: '#666666'
                                    }}
                                    onClick={() => onUnequip('weapon')}
                                    disabled={!player.equipment.weapon}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ItemButton
                                    item={player.equipment.armor || { 
                                        name: '(없음)', 
                                        rarity: 'common',
                                        color: '#666666'
                                    }}
                                    onClick={() => onUnequip('armor')}
                                    disabled={!player.equipment.armor}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/* 보유 아이템 목록 */}
                <Grid item xs={12}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                        <Typography variant="subtitle1">보유 아이템</Typography>
                        <Grid container spacing={1}>
                            {player.inventory.map((item) => (
                                <Grid item xs={12} sm={6} key={item.instanceId}>
                                    <ItemButton 
                                        item={item} 
                                        onClick={() => onEquip(item)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Button 
                variant="contained" 
                onClick={onClose}
                sx={{ mt: 2 }}
            >
                닫기
            </Button>
        </Box>
    );
};

InventoryPanel.propTypes = {
    player: PropTypes.shape({
        equipment: PropTypes.shape({
            weapon: PropTypes.object,
            armor: PropTypes.object
        }).isRequired,
        inventory: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired,
    onEquip: PropTypes.func.isRequired,
    onUnequip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default InventoryPanel; 