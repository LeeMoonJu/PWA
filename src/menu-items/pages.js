// assets
import { IconArrowLeft, IconArrowRight, IconArrowDown, IconArrowUp } from '@tabler/icons-react';

// constant
const icons = {
    IconArrowDown,
    IconArrowUp,
    IconArrowLeft,
    IconArrowRight
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'personal',
    title: 'Personal',
    caption: 'Personal Component',
    type: 'group',
    children: [
        {
            id: 'moonju',
            title: 'Moonju',
            type: 'collapse',
            icon: icons.IconArrowDown,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3'
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/register/register3'
                }
            ]
        },
        {
            id: 'wonjae',
            title: 'Wonjae',
            type: 'collapse',
            icon: icons.IconArrowUp,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3'
                }
            ]
        },
        {
            id: 'donggun',
            title: 'Donggun',
            type: 'collapse',
            icon: icons.IconArrowLeft,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3'
                }
            ]
        },
        {
            id: 'gyurim',
            title: 'Gyurim',
            type: 'collapse',
            icon: icons.IconArrowRight,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3'
                }
            ]
        }
    ]
};

export default pages;
