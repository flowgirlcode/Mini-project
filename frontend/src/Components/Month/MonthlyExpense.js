import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { expenses } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';

const ExpensesByMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const {MonthExpenses,getMonthExpenses}= useGlobalContext()
  useEffect(() => {
     getMonthExpenses()
  }, []);

  const handleMonthButtonClick = (month) => {
    setSelectedMonth(month);
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };

  const calculateTotalExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };



  return (
  <MonthStyled>
      <div>
        {Array.from({ length: 12 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleMonthButtonClick(index + 1)}
            style={{ marginRight: '10px' }}
          >
            {getMonthName(index + 1)}
          </button>
        ))}
      </div>
      {selectedMonth && (
        <div className='card'>
          <h2>{` ${getMonthName(selectedMonth)}`}</h2>
          <ul>
            {MonthExpenses
              .filter(month => month._id === selectedMonth)
              .map(month => (
                month.expenses.map(expense => (
                  <li key={expense._id}>{`${expense.title}: ₹${expense.amount.toFixed(2)} `}</li>
               

                ))
              ))}
          </ul>
          <p>Total Expense: ₹{calculateTotalExpense(
            MonthExpenses.find(month => month._id === selectedMonth)?.expenses || []
          ).toFixed(2)}</p>
        </div>
      )}
    </MonthStyled>
  );
};

const MonthStyled =styled.div`
margin: 20px;
padding: 20px;
*{
    margin: 0;
    padding: 0px;
    box-sizing: border-box;
}
button {
  margin: 10px;
  display: inline-block;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  justify-content: space-between;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  background-color: lightgreen;

}
.card{
    margin: 30px 0px;
    border: 2px solid grey;
    padding: 10px;
    border-radius:10px ;
    width: 100%;
    
}
h2,ul{
    margin: 10px;
}

`

export default ExpensesByMonth;