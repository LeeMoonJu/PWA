import { Dialog, DialogTitle, DialogContent, Grid, Button, Typography, Box } from '@mui/material';
import EquipmentIcon from '@mui/icons-material/Security';
import UnequipIcon from '@mui/icons-material/NoEncryption';

const InventoryPanel = ({ player, onEquip, onUnequip, onClose }) => {
    const renderEquippedItems = () => (
        <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>착용 중인 장비</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle2">무기</Typography>
                    {player.equipment.weapon ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>{player.equipment.weapon.name}</Typography>
                            <Button
                                size="small"
                                startIcon={<UnequipIcon />}
                                onClick={() => onUnequip('weapon')}
                                color="secondary"
                            >
                                해제
                            </Button>
                        </Box>
                    ) : (
                        <Typography color="textSecondary">없음</Typography>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle2">방어구</Typography>
                    {player.equipment.armor ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>{player.equipment.armor.name}</Typography>
                            <Button
                                size="small"
                                startIcon={<UnequipIcon />}
                                onClick={() => onUnequip('armor')}
                                color="secondary"
                            >
                                해제
                            </Button>
                        </Box>
                    ) : (
                        <Typography color="textSecondary">없음</Typography>
                    )}
                </Grid>
            </Grid>
        </Box>
    );

    const renderInventoryItems = () => (
        <Grid container spacing={2}>
            {player.inventory.map((item) => (
                <Grid item xs={12} key={item.instanceId}>
                    <Box 
                        sx={{ 
                            p: 2, 
                            border: '1px solid #ccc', 
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <Typography>{item.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {item.type === 'weapon' 
                                    ? `공격력 +${item.attack}` 
                                    : `방어력 +${item.defense}`}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EquipmentIcon />}
                            onClick={() => onEquip(item)}
                            disabled={
                                (item.type === 'weapon' && player.equipment.weapon?.instanceId === item.instanceId) ||
                                (item.type === 'armor' && player.equipment.armor?.instanceId === item.instanceId)
                            }
                        >
                            착용
                        </Button>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>인벤토리</DialogTitle>
            <DialogContent>
                {renderEquippedItems()}
                <Typography variant="h6" sx={{ mb: 2 }}>보유 아이템</Typography>
                {player.inventory.length > 0 
                    ? renderInventoryItems()
                    : <Typography color="textSecondary">보유 중인 아이템이 없습니다.</Typography>
                }
            </DialogContent>
        </Dialog>
    );
};

export default InventoryPanel; 