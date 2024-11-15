import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { Bar } from 'react-chartjs-2';

const Track = () => {
  const { getYearExpenses, getYearIncomes, YearIncomes, YearExpenses } = useGlobalContext();

  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    getYearExpenses(selectYear, selectMonth);
    getYearIncomes(selectYear, selectMonth);
  }, [selectYear, selectMonth]);

  const YearChange = (event) => {
    setSelectYear(parseInt(event.target.value));
  };

  const MonthChange = (month) => {
    setSelectMonth(parseInt(month));
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };


  const filterIncomes = YearIncomes.filter(item => {
    return item._id.year === selectYear && item._id.month === selectMonth;
  });

  const filterExpenses = YearExpenses.filter(item => {
    return item._id.year === selectYear && item._id.month === selectMonth;
  });

  const groupTransactionsByCategory = (transactions) => {
    const groupedTransactions = {};
    transactions.forEach(transaction => {
      const { category, amount } = transaction;
      if (!groupedTransactions[category]) {
        groupedTransactions[category] = 0;
      }
      groupedTransactions[category] += amount;
    });
    return groupedTransactions;
  };


  const groupedExpenses = groupTransactionsByCategory(filterExpenses.flatMap(month => month.expenses));
  const groupedIncomes = groupTransactionsByCategory(filterIncomes.flatMap(month => month.incomes));

  const chartDataExpense = {
    labels: Object.keys(groupedExpenses),
    datasets: [{
      label: 'Expenses',
      data: Object.values(groupedExpenses),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
      hoverBorderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1

    }]
  };
  const chartDataIncomes = {
    labels: Object.keys(groupedIncomes),
    datasets: [{
      label: 'Incomes',
      data: Object.values(groupedIncomes),
      backgroundColor: 'rgba(0, 255, 0, 0.2)', 
      borderColor: 'rgba(0, 255,0, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 255, 0, 0.4)',
      hoverBorderColor: 'rrgba(0, 255, 0, 1)',
      borderWidth: 1
    }]
  };

  return (
    <MonthStyled>
      <div>
        <select onChange={YearChange} value={selectYear}>
          {Array.from({ length: 10 }, (_, index) => (
            <option key={selectYear - index} value={selectYear - index}>
              {selectYear - index}
            </option>
          ))}
        </select>
        <div>
          {Array.from({ length: 12 }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => MonthChange(index + 1)}
              style={{ marginRight: '10px' }}
              className={selectMonth === index + 1 ? 'active' : ''}
            >
              {getMonthName(index + 1)}
            </button>
          ))}
        </div>
      </div>
     
        <h2>{selectYear} - {selectMonth}</h2>
        
      <div className='transactions'>
      <div className="expense" >
      <h3>Expenses</h3>

        <Bar data={chartDataExpense} options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }} />
      </div>
      <div className="incomes" >
      <h3>Income</h3>

        <Bar data={chartDataIncomes} options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }} />
      </div>
       
      </div>
      
    </MonthStyled>
  );
};
const MonthStyled = styled.div`

  margin: 20px;
  padding: 20px;

  * {
    margin: 0;
    padding: 0px;
    box-sizing: border-box;
  }
 
  select{
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
.transactions{
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  /* overflow-y: scroll;
  max-height: 1000px; */
}
.expense{
  flex: 1;
  height:40vh;
  width: 50%;
}
/* .expense {
    border-right: 1px solid #ccc;
  } */

.incomes{
  flex: 1;
  height:40vh;
  width: 50%;
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


  h2, h3, ul {
    margin: 10px;
  }




  .expenses {
    border-right: 1px solid #ccc;
  }
`;

export default Track ;