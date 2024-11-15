import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "https://mini-project-backend-u0jd.onrender.com";



const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const [MonthIncomes, setMonthIncomes] = useState([])
    const [MonthExpenses, setMonthExpenses] = useState([])
    const [YearIncomes, setYearIncomes] = useState([])
    const [YearExpenses, setYearExpenses] = useState([])
  

    const [username, setUsername] = useState('');
    const getUsername = async () => {
        try {
          const response = await axios.get(`${BASE_URL}get-username`);
          console.log("Response from get-username API:", response.data); // Log the response data
          setUsername(response.data.username);
          setError(null);
          console.log("Username set in state:", response.data.username); // Log the username set in state
        } catch (error) {
          console.error("Error fetching username:", error); // Log the error
          setError(error.response?.data?.message || "Error fetching username");
        } 
    };
    
    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }
    
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
   /////
    const getMonthIncomes = async () => {
        const response = await axios.get(`${BASE_URL}month-incomes`)
        setMonthIncomes(response.data)
        console.log(response.data)
    }
    const getYearIncomes = async (year,month) => {
        const response = await axios.get(`${BASE_URL}year-incomes/${year}/${month}`)
        setYearIncomes(response.data)
        console.log(response.data)
    }
    const totalMonthIncome = () => {
        let totalMonthIncome = 0;
        MonthIncomes.forEach((MonthIncome) =>{
            totalMonthIncome = totalMonthIncome + MonthIncome.amount;
        })

        return totalMonthIncome;
    }
  /// 

    

    //calculate expenses
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    const totalExpenses = () => {
        
        let totalExpenses = 0;
        expenses.forEach((expense) =>{
            totalExpenses = totalExpenses + expense.amount;
        })

        return totalExpenses;
    }
///
    const getMonthExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}month-expenses`);
            setMonthExpenses(response.data);
            setError(null)
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const getYearExpenses = async (year, month) => {
        try {
            const response = await axios.get(`${BASE_URL}year-expenses/${year}/${month}`);
            setYearExpenses(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const totalMonthExpenses = () => {
        let totalMonthExpenses = 0;
        MonthExpenses.forEach((MonthExpense) =>{
            totalMonthExpenses = totalMonthExpenses + MonthExpense.amount;
        })

        return totalMonthExpenses;
    }
   
///

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 5)
    }

  

    return (
      
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,

            getYearExpenses, 
            getYearIncomes,
            YearExpenses,
            YearIncomes,
            getMonthIncomes,
            getMonthExpenses,
            MonthExpenses,
            MonthIncomes,
            totalMonthIncome,
            totalMonthExpenses,
    

            setError,

            username,
            getUsername,

        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
} 
