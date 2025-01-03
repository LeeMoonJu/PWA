import { Dialog, DialogTitle, DialogContent, Grid, Button, Typography } from '@mui/material';
import ShopIcon from '@mui/icons-material/Store';
import HealingIcon from '@mui/icons-material/Healing';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';

const TownPanel = ({ player, onHeal, onOpenShop, onSave, onClose }) => {
    const healCost = Math.floor((player.maxHp - player.hp) * 0.5); // 회복량당 0.5골드
    const canHeal = player.hp < player.maxHp && player.gold >= healCost;

    return (
        <Dialog open maxWidth="sm" fullWidth>
            <DialogTitle>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                        <HomeIcon />
                    </Grid>
                    <Grid item>
                        마을
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {/* 회복 시설 */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            startIcon={<HealingIcon />}
                            onClick={onHeal}
                            disabled={!canHeal}
                            sx={{ py: 2 }}
                        >
                            회복하기 
                            {canHeal && ` (${healCost} 골드)`}
                            {!canHeal && player.hp >= player.maxHp && " (이미 최대 체력)"}
                            {!canHeal && player.hp < player.maxHp && " (골드 부족)"}
                        </Button>
                    </Grid>

                    {/* 상점 */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<ShopIcon />}
                            onClick={onOpenShop}
                            sx={{ py: 2 }}
                        >
                            상점 방문하기
                        </Button>
                    </Grid>

                    {/* 저장 */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="info"
                            fullWidth
                            startIcon={<SaveIcon />}
                            onClick={onSave}
                            sx={{ py: 2 }}
                        >
                            게임 저장하기
                        </Button>
                    </Grid>

                    {/* 상태 정보 */}
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary">
                            현재 체력: {player.hp} / {player.maxHp}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            보유 골드: {player.gold} G
                        </Typography>
                    </Grid>

                    {/* 나가기 */}
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            onClick={onClose}
                            sx={{ mt: 2 }}
                        >
                            마을 나가기
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default TownPanel; 