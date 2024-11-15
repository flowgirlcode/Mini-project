import {dashboard, expenses, transactions, trend,calci, graphIcon, categoryIcon, monthIcon} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Incomes",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Incomes Transactions",
        icon: transactions,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Expenses Transactions",
        icon: transactions,
        link: "/dashboard",
    },
   
  
    {
        id: 6,
        title: "Monthly Transactions",
        icon: monthIcon,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "category expenses",
        icon: categoryIcon,
        link: "/dashboard",
    },
    {
        id: 8,
        title: "Track",
        icon: graphIcon,
        link: "/dashboard",
    },
    // {
    //     id: 9,
    //     title: "YearMonth",
    //     icon: monthIcon,
    //     link: "/dashboard",
    // },
    {
        id: 9,
        title: "Interest Calculator",
        icon: calci,
        link: "/dashboard",
    },
]