export const TOWER_TYPES = {
    BASIC: 'BASIC',
    ARCHER: 'ARCHER',
    MAGIC: 'MAGIC',
    CANNON: 'CANNON'
};

export const TOWERS = {
    [TOWER_TYPES.BASIC]: {
        id: TOWER_TYPES.BASIC,
        name: '기본 타워',
        damage: 10,
        range: 2,
        attackSpeed: 1,
        cost: 100,
        color: '#666666',
        design: {
            base: '#4a4a4a',
            top: '#666666',
            accent: '#808080',
            pattern: 'basic'
        },
        description: '기본적인 공격 타워'
    },
    [TOWER_TYPES.ARCHER]: {
        id: TOWER_TYPES.ARCHER,
        name: '궁수 타워',
        damage: 15,
        range: 3,
        attackSpeed: 1.5,
        cost: 150,
        color: '#458B00',
        design: {
            base: '#2d5a00',
            top: '#458B00',
            accent: '#66cc00',
            pattern: 'archer'
        },
        description: '빠른 공격속도의 원거리 타워'
    },
    [TOWER_TYPES.MAGIC]: {
        id: TOWER_TYPES.MAGIC,
        name: '마법 타워',
        damage: 20,
        range: 2,
        attackSpeed: 0.8,
        cost: 200,
        color: '#4169E1',
        design: {
            base: '#1a4ba8',
            top: '#4169E1',
            accent: '#87CEEB',
            pattern: 'magic'
        },
        description: '강력한 마법 공격'
    },
    [TOWER_TYPES.CANNON]: {
        id: TOWER_TYPES.CANNON,
        name: '대포 타워',
        damage: 30,
        range: 2,
        attackSpeed: 0.5,
        cost: 250,
        color: '#8B0000',
        design: {
            base: '#5c0000',
            top: '#8B0000',
            accent: '#ff4444',
            pattern: 'cannon'
        },
        description: '느리지만 강력한 범위 공격'
    }
}; 