import { Dialog, DialogTitle, DialogContent, Grid, Button, Typography, Tabs, Tab } from '@mui/material';
import { itemDatabase } from '../data/items';
import { useState } from 'react';

const ShopPanel = ({ player, onBuy, onSell, onClose }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const renderItemList = (item) => (
        <Grid container 
            key={item.id} 
            sx={{ 
                p: 1, 
                mb: 1, 
                border: '1px solid #ccc', 
                borderRadius: 1,
                alignItems: 'center' 
            }}
        >
            <Grid item xs={6}>
                <Typography>{item.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                    {item.type === 'weapon' ? `공격력 +${item.attack}` : `방어력 +${item.defense}`}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography>{item.price} G</Typography>
            </Grid>
            <Grid item xs={3}>
                <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => onBuy(item)}
                    disabled={player.gold < item.price}
                >
                    구매
                </Button>
            </Grid>
        </Grid>
    );

    const renderInventoryItem = (item) => (
        <Grid container 
            key={item.instanceId} 
            sx={{ 
                p: 1, 
                mb: 1, 
                border: '1px solid #ccc', 
                borderRadius: 1,
                alignItems: 'center' 
            }}
        >
            <Grid item xs={6}>
                <Typography>{item.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                    {item.type === 'weapon' ? `공격력 +${item.attack}` : `방어력 +${item.defense}`}
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography>{Math.floor(item.price * 0.5)} G</Typography>
            </Grid>
            <Grid item xs={3}>
                <Button 
                    variant="contained" 
                    size="small"
                    color="secondary"
                    onClick={() => onSell(item)}
                >
                    판매
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                상점 (보유 골드: {player.gold} G)
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="구매" />
                    <Tab label="판매" />
                </Tabs>
            </DialogTitle>
            <DialogContent>
                {tabValue === 0 ? (
                    <div>
                        <Typography variant="h6" sx={{ mb: 2 }}>무기</Typography>
                        {itemDatabase.weapons.map(renderItemList)}
                        <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>방어구</Typography>
                        {itemDatabase.armors.map(renderItemList)}
                    </div>
                ) : (
                    <div>
                        {player.inventory.map(renderInventoryItem)}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ShopPanel; 