// assets
import { IconArrowLeft, IconArrowRight, IconArrowDown, IconArrowUp, IconActivity, IconGoGame } from '@tabler/icons-react';

// constant
const icons = {
    IconActivity,
    IconArrowDown,
    IconArrowUp,
    IconArrowLeft,
    IconArrowRight,
    IconGoGame
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
                }
            ]
        },
        {
            id: 'moonju',
            title: 'Moonju',
            type: 'collapse',
            icon: icons.IconActivity,
            children: [
                {
                    id: 'login',
                    title: 'Login',
                    type: 'item',
                    url: '/'
                },
                {
                    id: 'register',
                    title: 'Register',
                    type: 'item',
                    url: '/register'
                },
                {
                    id: 'musicPlayer',
                    title: 'Music Player',
                    type: 'item',
                    url: '/moonju/music-player'
                }
            ]
        },
        {
            id: 'wonjae',
            title: 'Wonjae',
            type: 'collapse',
            icon: icons.IconArrowUp,
            children: [{}]
        },
        {
            id: 'donggun',
            title: 'Donggun',
            type: 'collapse',
            icon: icons.IconArrowLeft,
            children: [{}]
        },
        {
            id: 'gyurim',
            title: 'Gyurim',
            type: 'collapse',
            icon: icons.IconArrowRight,
            children: [{}]
        }
    ]
};

export default pages;
