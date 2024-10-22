// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
    IconKey
};

const mjpages = {
    id: 'mjpages',
    title: 'MJ Pages',
    type: 'group',
    children: [
        {
            id: 'login',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,
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
        }
    ]
};

export default mjpages;
