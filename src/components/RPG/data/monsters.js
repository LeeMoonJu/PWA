export const monsterDatabase = [
    {
        name: '슬라임',
        hp: 50,
        maxHp: 50,
        attack: 5,
        exp: 20,
        color: '#88ff88',
        dropTable: [
            { itemId: 'w1', chance: 0.3 },
            { itemId: 'a1', chance: 0.3 }
        ]
    },
    {
        name: '고블린',
        hp: 80,
        maxHp: 80,
        attack: 8,
        exp: 35,
        color: '#964B00',
        dropTable: [
            { itemId: 'w1', chance: 0.4 },
            { itemId: 'w2', chance: 0.1 },
            { itemId: 'a1', chance: 0.3 },
            { itemId: 'a2', chance: 0.1 }
        ]
    },
    {
        name: '스켈레톤',
        hp: 100,
        maxHp: 100,
        attack: 12,
        exp: 50,
        color: '#FFFFFF',
        dropTable: [
            { itemId: 'w2', chance: 0.3 },
            { itemId: 'a2', chance: 0.3 }
        ]
    },
    {
        name: '오우거',
        hp: 150,
        maxHp: 150,
        attack: 15,
        exp: 80,
        color: '#654321',
        dropTable: [
            { itemId: 'w2', chance: 0.4 },
            { itemId: 'w3', chance: 0.1 },
            { itemId: 'a2', chance: 0.3 },
            { itemId: 'a3', chance: 0.1 }
        ]
    },
    {
        name: '드래곤',
        hp: 300,
        maxHp: 300,
        attack: 25,
        exp: 150,
        color: '#FF0000',
        dropTable: [
            { itemId: 'w3', chance: 0.3 },
            { itemId: 'a3', chance: 0.3 }
        ]
    }
]; 