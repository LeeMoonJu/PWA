import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication3/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        }
    ]
};

export default AuthenticationRoutes;
