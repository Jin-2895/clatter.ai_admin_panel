import { Box, Circle, DollarSign, Home, Power, UserPlus } from "react-feather";

// ** Merge & Export
export default [
    {
        id: 'dashboards',
        title: 'Dashboard',
        icon: <Home />,
        navLink: '/dashboard'
    },
    {
        id: 'apps',
        title: 'Apps',
        icon: <Box />,
        navLink: '/user'
    },
    {
        id: 'sales',
        title: 'Sales',
        icon: <DollarSign size={20} />,
        children: [
            {
                id: 'transaction',
                title: 'Transaction',
                icon: <Circle size={12} />,
                navLink: '/sales/transaction'
            },
            {
                id: 'subscription',
                title: 'Subscription',
                icon: <Circle size={12} />,
                navLink: '/sales/subscription'
            }
        ]
    },
    {
        id: 'admin',
        title: 'Admin',
        icon: <UserPlus size={20} />,
        navLink: '/admin',
        access: 'superAdmin'
    },
]
