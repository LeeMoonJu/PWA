import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MusicPlayer from 'views/utilities/MusicPlayer';
import PatternGame from 'components/Pattern/PatternGame';
import RPGGame from 'components/RPG/RPGGame';
import DefenceGame from 'components/Defence/DefenceGame';
import DataTable from 'components/Tables/DataTable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const Components = Loadable(lazy(() => import('views/pages/components')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'game',
            children: [
                {
                    path: 'defence',
                    element: <DefenceGame />
                },
                {
                    path: 'rpg',
                    element: <RPGGame />
                },
                {
                    path: 'pattern',
                    element: <PatternGame />
                }
            ]
        },
        {
            path: 'table',
            children: [
                {
                    path: 'data-table',
                    element: <DataTable />
                }
            ]
        },

        {
            path: 'moonju',
            children: [
                {
                    path: 'music-player',
                    element: <MusicPlayer />
                },
                {
                    path: 'rpg-game',
                    element: <RPGGame />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                },
                {
                    path: 'util-color',
                    element: <UtilsColor />
                },
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'pages/components',
            element: <Components />
        },
        {
            path: 'pages/patternGame',
            element: <PatternGame />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
