// assets
import { IconArrowLeft, IconArrowRight, IconArrowDown, IconArrowUp, IconActivity, IconGoGame, IconTable } from '@tabler/icons-react';

// constant
const icons = {
    IconActivity,
    IconArrowDown,
    IconArrowUp,
    IconArrowLeft,
    IconArrowRight,
    IconGoGame,
    IconTable
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'personal',
    title: 'Personal',
    caption: 'Personal Component',
    type: 'group',
    children: [
        {
            id: 'game',
            title: 'Game',
            type: 'collapse',
            icon: icons.IconGoGame,
            children: [
                {
                    id: 'defenceGame',
                    title: 'Defence Game',
                    type: 'item',
                    url: '/game/defence'
                },
                {
                    id: 'RPGGame',
                    title: 'RPG Game',
                    type: 'item',
                    url: '/game/rpg'
                },
                {
                    id: 'PatternGame',
                    title: 'Pattern Game',
                    type: 'item',
                    url: '/game/pattern'
                }
            ]
        },
        {
            id: 'table',
            title: 'Table',
            type: 'collapse',
            icon: icons.IconTable,
            children: [
                {
                    id: 'dataTable',
                    title: 'Data Table',
                    type: 'item',
                    url: '/table/data-table'
                }
            ]
        }
    ]
};

export default pages;
