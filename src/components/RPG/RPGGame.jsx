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
import GameMap from './components/GameMap';
import TownPanel from './components/TownPanel';

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
    const [showTown, setShowTown] = useState(false);
    const { player, setPlayer, gainExp, equipItem, unequipItem, createItem } = usePlayer();
    const { notifications, addNotification } = useNotifications();
    const [gameState, setGameState] = useState('exploring'); // 'exploring' | 'battle'
    const [mapData, setMapData] = useState([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 2, 0, 0, 2, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
        [1, 2, 0, 0, 0, 2, 0, 0, 2, 1],
        [1, 0, 1, 0, 3, 0, 0, 1, 0, 1],
        [1, 2, 0, 2, 0, 0, 2, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 1, 2, 1],
        [1, 0, 2, 0, 0, 2, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);

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

        setTimeout(() => {
            setGameState('exploring');
            
            const currentPos = player.position;
            setMapData(prev => {
                const newMapData = [...prev];
                newMapData[currentPos.y][currentPos.x] = 0;
                return newMapData;
            });
        }, 1500);
    };

    const { monster, attack, getBattleMessage } = useBattle(handleMonsterDefeat);

    const handleAttack = () => {
        attack(player.attack, player.hp, (newHp) => {
            setPlayer(prev => ({ ...prev, hp: newHp }));
        });
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

    const handleEncounter = () => {
        setGameState('battle');
        // 몬스터 생성 로직
    };

    const handleTownHeal = () => {
        const healCost = Math.floor((player.maxHp - player.hp) * 0.5);
        if (player.gold >= healCost) {
            setPlayer(prev => ({
                ...prev,
                hp: prev.maxHp,
                gold: prev.gold - healCost
            }));
            addNotification(`${healCost} 골드를 지불하고 완전히 회복했습니다!`, 'success');
        }
    };

    const handleSaveGame = () => {
        const saveData = {
            player,
            mapData,
            // 필요한 다른 게임 상태들
        };
        localStorage.setItem('rpgGameSave', JSON.stringify(saveData));
        addNotification('게임이 저장되었습니다!', 'success');
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>RPG Game</Typography>
            
            <Grid container spacing={3}>
                {/* 상태창 */}
                <Grid item xs={12} md={4}>
                    <StatusPanel player={player} monster={monster} />
                </Grid>

                {/* 게임 화면 */}
                <Grid item xs={12} md={8}>
                    {gameState === 'exploring' ? (
                        <GameMap 
                            player={player}
                            setPlayer={setPlayer}
                            onEncounter={handleEncounter}
                            mapData={mapData}
                            setMapData={setMapData}
                            onTownEnter={() => setShowTown(true)}
                        />
                    ) : (
                        <BattleScreen 
                            player={player}
                            monster={monster}
                            battleMessage={getBattleMessage(player.hp)}
                        />
                    )}
                    
                    {/* 전투 중에만 버튼들 표시 */}
                    {gameState === 'battle' && (
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
                        </Grid>
                    )}
                </Grid>
            </Grid>

            {/* 인벤토리 버튼 */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowInventory(true)}
                sx={{ position: 'absolute', top: 16, right: 16 }}
            >
                인벤토리
            </Button>

            {/* 인벤토리 패널 */}
            {showInventory && (
                <InventoryPanel 
                    player={player}
                    onEquip={equipItem}
                    onUnequip={unequipItem}
                    onClose={() => setShowInventory(false)}
                />
            )}

            {/* 마을 패널 */}
            {showTown && (
                <TownPanel 
                    player={player}
                    onHeal={handleTownHeal}
                    onOpenShop={() => setShowShop(true)}
                    onSave={handleSaveGame}
                    onClose={() => setShowTown(false)}
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