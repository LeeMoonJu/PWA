import { useState, useEffect } from 'react';
import { monsterDatabase } from '../data/monsters';

export const useBattle = (onMonsterDefeat) => {
    const [monster, setMonster] = useState(monsterDatabase[0]);
    const [defeatedMonsters, setDefeatedMonsters] = useState(0);
    const [battleMessage, setBattleMessage] = useState('전투 시작!');

    const generateNewMonster = () => {
        let availableMonsters = monsterDatabase.slice(
            0,
            Math.min(Math.floor(defeatedMonsters / 3) + 1, monsterDatabase.length)
        );
        const randomMonster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
        setMonster({ ...randomMonster });
        setBattleMessage(`${randomMonster.name}이(가) 나타났다!`);
    };

    const attack = (playerAttack, playerHp, setPlayerHp) => {
        // 몬스터 공격
        setMonster(prev => ({
            ...prev,
            hp: Math.max(0, prev.hp - playerAttack)
        }));

        // 몬스터가 살아있다면 반격
        if (monster.hp > playerAttack) {
            setPlayerHp(Math.max(0, playerHp - monster.attack));
            setBattleMessage(`${monster.name}에게 ${playerAttack}의 데미지를 입혔습니다!`);
        } else {
            setBattleMessage(`${monster.name}을(를) 처치했습니다!`);
            setDefeatedMonsters(prev => prev + 1);
            onMonsterDefeat(monster);
            setTimeout(generateNewMonster, 1000);
        }
    };

    // 초기 몬스터 생성
    useEffect(() => {
        generateNewMonster();
    }, []);

    const getBattleMessage = (playerHp) => {
        if (playerHp <= 0) return "게임 오버!";
        if (monster.hp <= 0) return `${monster.name}을(를) 처치했습니다! (${defeatedMonsters}마리 처치)`;
        return battleMessage;
    };

    return {
        monster,
        defeatedMonsters,
        attack,
        getBattleMessage
    };
}; 