import { Paper, Typography, Grid, Button } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShopIcon from '@mui/icons-material/Store';
import { useState, useEffect } from 'react';

// 컴포넌트 import
import StatusPanel from './components/StatusPanel';
import BattleScreen from './components/BattleScreen';
import InventoryPanel from './components/InventoryPanel';
import Notifications from './components/Notifications';
import ShopPanel from './components/ShopPanel';

// hooks import
import { usePlayer } from './hooks/usePlayer';
import { useBattle } from './hooks/useBattle';
import { useNotifications } from './hooks/useNotifications';

// utils import
import { calculateReward } from './utils/gameUtils';
import { itemDatabase } from './data/items';

const RPGGame = () => {
    const [showInventory, setShowInventory] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const { player, setPlayer, gainExp, equipItem, unequipItem, createItem } = usePlayer();
    const { notifications, addNotification } = useNotifications();

    useEffect(() => {
        const prevLevel = player.level - 1;
        if (prevLevel > 0) {
            addNotification(`레벨 ${prevLevel} → ${player.level}로 레벨업!`, 'success');
        }
    }, [player.level]);

    const handleMonsterDefeat = (monster) => {
        const reward = calculateReward(monster);
        setPlayer(prev => ({
            ...prev,
            gold: prev.gold + reward.gold
        }));
        gainExp(reward.exp);
        addNotification(`${reward.gold} 골드와 ${reward.exp} 경험치를 획득했습니다!`);

        monster.dropTable.forEach(drop => {
            if (Math.random() < drop.chance) {
                const baseItem = drop.itemId.startsWith('w') 
                    ? itemDatabase.weapons.find(w => w.id === drop.itemId)
                    : itemDatabase.armors.find(a => a.id === drop.itemId);
                
                const newItem = createItem(baseItem);
                
                setPlayer(prev => ({
                    ...prev,
                    inventory: [...prev.inventory, newItem]
                }));

                addNotification(`${monster.name}에게서 ${newItem.name}을(를) 획득했습니다!`, 'success');
            }
        });
    };

    const { monster, attack, getBattleMessage } = useBattle(handleMonsterDefeat);

    const handleAttack = () => {
        attack(player.attack, player.hp, (newHp) => {
            setPlayer(prev => ({ ...prev, hp: newHp }));
        });
    };

    const handleHeal = () => {
        const healAmount = 30;
        setPlayer(prev => ({
            ...prev,
            hp: Math.min(prev.maxHp, prev.hp + healAmount)
        }));
        addNotification(`${healAmount}만큼 회복했습니다!`, 'info');
    };

    const handleBuyItem = (item) => {
        if (player.gold >= item.price) {
            const newItem = createItem(item);
            setPlayer(prev => ({
                ...prev,
                gold: prev.gold - item.price,
                inventory: [...prev.inventory, newItem]
            }));
            addNotification(`${item.name}을(를) 구매했습니다!`, 'success');
        }
    };

    const handleSellItem = (item) => {
        const sellPrice = Math.floor(item.price * 0.5);
        setPlayer(prev => ({
            ...prev,
            gold: prev.gold + sellPrice,
            inventory: prev.inventory.filter(i => i.instanceId !== item.instanceId)
        }));
        addNotification(`${item.name}을(를) ${sellPrice} 골드에 판매했습니다!`, 'success');
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>RPG Game</Typography>
            
            <Grid container spacing={3}>
                {/* 왼쪽 상태창 */}
                <Grid item xs={12} md={4}>
                    <StatusPanel player={player} monster={monster} />
                </Grid>

                {/* 오른쪽 게임 화면 */}
                <Grid item xs={12} md={8}>
                    <BattleScreen 
                        player={player}
                        monster={monster}
                        battleMessage={getBattleMessage(player.hp)}
                    />

                    {/* 행동 버튼 */}
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleAttack}
                                disabled={player.hp <= 0 || monster.hp <= 0}
                                size="large"
                            >
                                공격
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={handleHeal}
                                disabled={player.hp <= 0 || player.hp === player.maxHp}
                                size="large"
                            >
                                회복
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => setShowInventory(true)}
                                size="large"
                                startIcon={<InventoryIcon />}
                            >
                                인벤토리
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => setShowShop(true)}
                                size="large"
                                startIcon={<ShopIcon />}
                            >
                                상점
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* 인벤토리 패널 */}
            {showInventory && (
                <InventoryPanel 
                    player={player}
                    onEquip={equipItem}
                    onUnequip={unequipItem}
                    onClose={() => setShowInventory(false)}
                />
            )}

            {/* 상점 패널 */}
            {showShop && (
                <ShopPanel 
                    player={player}
                    onBuy={handleBuyItem}
                    onSell={handleSellItem}
                    onClose={() => setShowShop(false)}
                />
            )}

            {/* 알림 시스템 */}
            <Notifications notifications={notifications} />
        </Paper>
    );
};

export default RPGGame;