// assets
import { IconArrowLeft, IconArrowRight, IconArrowDown, IconArrowUp, IconActivity } from '@tabler/icons-react';

// constant
const icons = {
    IconActivity,
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
            icon: icons.IconActivity,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/'
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
                    url: '/'
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
                    url: '/'
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
                    url: '/'
                }
            ]
        }
    ]
};

export default pages;
