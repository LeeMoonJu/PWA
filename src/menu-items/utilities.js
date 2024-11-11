// assets
import { IconGridPattern } from '@tabler/icons-react';
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconComponents } from '@tabler/icons-react';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconComponents,
    IconGridPattern
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'components',
            title: 'Components',
            type: 'item',
            url: '/pages/components',
            icon: icons.IconComponents,
            breadcrumbs: false
        },
        {
            id: 'patternGame',
            title: 'Pattern Game',
            type: 'item',
            url: '/pages/patternGame',
            icon: icons.IconGridPattern,
            breadcrumbs: false
        },
        {
            id: 'util-typography',
            title: 'Typography',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Color',
            type: 'item',
            url: '/utils/util-color',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        }
    ]
};

export default utilities;
