import { useState } from 'react';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        name: '모험가',
        level: 1,
        exp: 0,
        maxExp: 100,
        hp: 100,
        maxHp: 100,
        attack: 10,    // 기본 공격력
        defense: 5,    // 기본 방어력
        gold: 0,
        inventory: [],
        equipment: {
            weapon: null,
            armor: null
        },
        position: {
            x: 3,
            y: 3
        }
    });

    const gainExp = (amount) => {
        setPlayer(prev => {
            const newExp = prev.exp + amount;
            if (newExp >= prev.maxExp) {
                // 레벨업
                return {
                    ...prev,
                    level: prev.level + 1,
                    exp: newExp - prev.maxExp,
                    maxExp: Math.floor(prev.maxExp * 1.5),
                    maxHp: prev.maxHp + 20,
                    hp: prev.maxHp + 20,
                    attack: prev.attack + 2,
                    defense: prev.defense + 1
                };
            }
            return { ...prev, exp: newExp };
        });
    };

    const createItem = (baseItem) => {
        return {
            ...baseItem,
            instanceId: Math.random().toString(36).substr(2, 9), // 고유 ID 생성
        };
    };

    const equipItem = (item) => {
        setPlayer(prev => {
            const newPlayer = { ...prev };
            
            // 이전 장비 해제
            if (item.type === 'weapon' && prev.equipment.weapon) {
                newPlayer.inventory.push(prev.equipment.weapon);
                newPlayer.attack -= prev.equipment.weapon.attack; // 이전 무기 공격력 제거
            } else if (item.type === 'armor' && prev.equipment.armor) {
                newPlayer.inventory.push(prev.equipment.armor);
                newPlayer.defense -= prev.equipment.armor.defense; // 이전 방어구 방어력 제거
            }
            
            // 새 장비 장착
            newPlayer.equipment[item.type] = item;
            newPlayer.inventory = newPlayer.inventory.filter(i => i.instanceId !== item.instanceId);
            
            // 스탯 업데이트
            if (item.type === 'weapon') {
                newPlayer.attack += item.attack;
            } else {
                newPlayer.defense += item.defense;
            }
            
            return newPlayer;
        });
    };

    const unequipItem = (type) => {
        setPlayer(prev => {
            const equipment = prev.equipment[type];
            if (!equipment) return prev;

            const newPlayer = { ...prev };
            newPlayer.inventory.push(equipment);
            newPlayer.equipment[type] = null;
            
            // 스탯 업데이트
            if (type === 'weapon') {
                newPlayer.attack = 10; // 기본 공격력으로 복구
            } else {
                newPlayer.defense = 5; // 기본 방어력으로 복구
            }
            
            return newPlayer;
        });
    };

    return {
        player,
        setPlayer,
        gainExp,
        equipItem,
        unequipItem,
        createItem
    };
}; 