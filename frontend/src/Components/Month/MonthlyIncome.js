import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
const IncomesByMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
 const { getMonthIncomes,MonthIncomes}= useGlobalContext()
  useEffect(() => {
    getMonthIncomes()
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

  const calculateTotalIncome = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
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
            {MonthIncomes
              .filter(month => month._id === selectedMonth)
              .map(month => (
                month.incomes.map(income => (
                  <li key={income._id}>
                    {`${income.title}: ₹${income.amount.toFixed(2)}`}
                    </li>
                ))
              ))}
          </ul>
          <p>Total Income: ₹{calculateTotalIncome(
            MonthIncomes.find(month => month._id === selectedMonth)?.incomes || []
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
    
}
h2,ul{
    margin: 10px;
}

`


export default IncomesByMonth;
