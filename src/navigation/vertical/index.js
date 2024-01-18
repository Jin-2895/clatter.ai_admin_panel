
import { Circle, DollarSign, Home, Power, User, UserPlus } from 'react-feather'

// ** Merge & Export
export default [
    {
        id: 'dashboards',
        title: 'Dashboard',
        icon: <Home size={20} />,
        badge: 'light-warning',
        navLink: '/dashboard',
        access: 'admin'
    },
    {
        id: 'users',
        title: 'User',
        icon: <User size={20} />,
        navLink: '/user',
        access: 'admin'
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
                navLink: '/sales/transaction',
                access: 'admin'
            },
            {
                id: 'subscription',
                title: 'Subscription',
                icon: <Circle size={12} />,
                navLink: '/sales/subscription',
                access: 'admin'
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
