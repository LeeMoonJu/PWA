export const calculateReward = (monster) => {
    return {
        gold: Math.floor(monster.exp * 1.5),
        exp: monster.exp
    };
};

export const getMonsterColor = (monster) => {
    return monster.color || 'error.main';
};
