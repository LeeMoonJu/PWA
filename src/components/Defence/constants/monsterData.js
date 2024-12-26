export const MONSTER_TYPES = {
    NORMAL: 'NORMAL',
    FAST: 'FAST',
    TANK: 'TANK',
    BOSS: 'BOSS'
};

export const MONSTERS = {
    [MONSTER_TYPES.NORMAL]: {
        id: MONSTER_TYPES.NORMAL,
        name: '일반',
        hp: 100,
        speed: 3,
        reward: 10,
        damage: 1,
        color: '#7B68EE',
        size: 30
    },
    [MONSTER_TYPES.FAST]: {
        id: MONSTER_TYPES.FAST,
        name: '고속',
        hp: 60,
        speed: 4.5,
        reward: 15,
        damage: 1,
        color: '#20B2AA',
        size: 25
    },
    [MONSTER_TYPES.TANK]: {
        id: MONSTER_TYPES.TANK,
        name: '탱크',
        hp: 300,
        speed: 1.5,
        reward: 20,
        damage: 2,
        color: '#8B4513',
        size: 40
    },
    [MONSTER_TYPES.BOSS]: {
        id: MONSTER_TYPES.BOSS,
        name: '보스',
        hp: 1000,
        speed: 2,
        reward: 50,
        damage: 5,
        color: '#DC143C',
        size: 45
    }
};

// 웨이브별 몬스터 구성
export const WAVE_DATA = [
    {
        wave: 1,
        monsters: [
            { type: MONSTER_TYPES.NORMAL, count: 5 },
            { type: MONSTER_TYPES.NORMAL, count: 5 }
        ],
        interval: 1000
    },
    {
        wave: 2,
        monsters: [
            { type: MONSTER_TYPES.NORMAL, count: 8 },
            { type: MONSTER_TYPES.FAST, count: 3 }
        ],
        interval: 1800
    },
    {
        wave: 3,
        monsters: [
            { type: MONSTER_TYPES.NORMAL, count: 10 },
            { type: MONSTER_TYPES.FAST, count: 5 },
            { type: MONSTER_TYPES.TANK, count: 2 }
        ],
        interval: 1500
    }
]; 