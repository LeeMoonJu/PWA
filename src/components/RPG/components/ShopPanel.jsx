import { useState } from 'react';
import { Box, Typography, Grid, Button, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import ItemButton from './ItemButton';
import { itemDatabase } from '../data/items';

const ShopPanel = ({ player, onBuy, onSell, onClose }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
            <Typography variant="h6" sx={{ mb: 2 }}>상점</Typography>
            <Typography color="primary" sx={{ mb: 2 }}>
                보유 골드: {player.gold}
            </Typography>

            <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="구매" />
                <Tab label="판매" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
                {tabValue === 0 ? (
                    // 구매 탭
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">무기</Typography>
                            {itemDatabase.weapons.map(item => (
                                <Box key={item.id} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ItemButton 
                                        item={item}
                                        onClick={() => onBuy(item)}
                                        disabled={player.gold < item.price}
                                    />
                                    <Typography>{item.price} G</Typography>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">방어구</Typography>
                            {itemDatabase.armors.map(item => (
                                <Box key={item.id} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ItemButton 
                                        item={item}
                                        onClick={() => onBuy(item)}
                                        disabled={player.gold < item.price}
                                    />
                                    <Typography>{item.price} G</Typography>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                ) : (
                    // 판매 탭
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">인벤토리</Typography>
                            {player.inventory.map(item => (
                                <Box key={item.instanceId} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ItemButton 
                                        item={item}
                                        onClick={() => onSell(item)}
                                    />
                                    <Typography>{Math.floor(item.price * 0.5)} G</Typography>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Box>

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

ShopPanel.propTypes = {
    player: PropTypes.shape({
        gold: PropTypes.number.isRequired,
        inventory: PropTypes.array.isRequired
    }).isRequired,
    onBuy: PropTypes.func.isRequired,
    onSell: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ShopPanel; 