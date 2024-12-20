import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { itemDatabase } from '../data/items';

export const usePlayer = () => {
    const createItem = (baseItem) => ({
        ...baseItem,
        instanceId: uuidv4()
    });

    const [player, setPlayer] = useState({
        name: '용사',
        level: 1,
        hp: 100,
        maxHp: 100,
        exp: 0,
        maxExp: 100,
        attack: 10,
        gold: 0,
        equipment: {
            weapon: null,
            armor: null
        },
        inventory: [
            createItem(itemDatabase.weapons[0]), 
            createItem(itemDatabase.armors[0])
        ]
    });

    const levelUp = () => {
        setPlayer(prev => ({
            ...prev,
            level: prev.level + 1,
            maxHp: prev.maxHp + 20,
            hp: prev.maxHp + 20,
            attack: prev.attack + 5,
            exp: prev.exp - prev.maxExp,
            maxExp: Math.floor(prev.maxExp * 1.5)
        }));
    };

    const gainExp = (exp) => {
        setPlayer(prev => {
            const newExp = prev.exp + exp;
            if (newExp >= prev.maxExp) {
                return {
                    ...prev,
                    level: prev.level + 1,
                    maxHp: prev.maxHp + 20,
                    hp: prev.maxHp + 20,
                    attack: prev.attack + 5,
                    exp: newExp - prev.maxExp,
                    maxExp: Math.floor(prev.maxExp * 1.5)
                };
            }
            return {
                ...prev,
                exp: newExp
            };
        });
    };

    useEffect(() => {
        if (player.exp >= player.maxExp) {
            levelUp();
        }
    }, [player.exp]);

    const equipItem = (item) => {
        setPlayer(prev => {
            const newPlayer = { ...prev };
            const slot = item.id.startsWith('w') ? 'weapon' : 'armor';
            
            if (prev.equipment[slot]) {
                newPlayer.attack -= prev.equipment[slot].attack || 0;
                newPlayer.maxHp -= prev.equipment[slot].maxHp || 0;
                newPlayer.inventory.push(prev.equipment[slot]);
            }

            newPlayer.equipment[slot] = item;
            newPlayer.attack += item.attack || 0;
            newPlayer.maxHp += item.maxHp || 0;
            newPlayer.hp = Math.min(newPlayer.hp, newPlayer.maxHp);
            newPlayer.inventory = newPlayer.inventory.filter(i => i.instanceId !== item.instanceId);

            return newPlayer;
        });
    };

    const unequipItem = (slot) => {
        setPlayer(prev => {
            const newPlayer = { ...prev };
            const equippedItem = prev.equipment[slot];

            if (equippedItem) {
                newPlayer.attack -= equippedItem.attack || 0;
                newPlayer.maxHp -= equippedItem.maxHp || 0;
                newPlayer.inventory.push(equippedItem);
                newPlayer.equipment[slot] = null;
                newPlayer.hp = Math.min(newPlayer.hp, newPlayer.maxHp);
            }

            return newPlayer;
        });
    };

    return {
        player,
        setPlayer,
        levelUp,
        gainExp,
        equipItem,
        unequipItem,
        createItem
    };
}; 