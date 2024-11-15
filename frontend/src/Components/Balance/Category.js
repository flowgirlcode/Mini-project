import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Category = () => {
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

  const calTotalExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const calTotalIncome = (incomes) => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  const filterIncomes = YearIncomes.filter(item => {
    return item._id.year === selectYear && item._id.month === selectMonth;
  });

  const filterExpenses = YearExpenses.filter(item => {
    return item._id.year === selectYear && item._id.month === selectMonth;
  });

  const totalExpense = filterExpenses.length > 0 ? calTotalExpense(filterExpenses[0]?.expenses) : 0;
  const totalIncome = filterIncomes.length > 0 ? calTotalIncome(filterIncomes[0]?.incomes) : 0;

  const calculateSavings = () => {
    return (totalIncome - totalExpense).toFixed(2);
  };

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

  const renderCategoryRows = (groupedTransactions) => {
    return Object.entries(groupedTransactions).map(([category, amount]) => (
      <tr key={category}>
        <td>{category}</td>
        <td>₹{amount.toFixed(2)}</td>
      </tr>
    ));
  };

  const groupedExpenses = groupTransactionsByCategory(filterExpenses.flatMap(month => month.expenses));
  const groupedIncomes = groupTransactionsByCategory(filterIncomes.flatMap(month => month.incomes));

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
      <div>
        <h2>{selectYear} - {selectMonth}</h2>
        <h3>😃🎉You Saved: ₹{calculateSavings()} </h3>
        <div className="transactions">
          <div className="expenses">
            <h3>Expenses</h3>
            <table className='table'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderCategoryRows(groupedExpenses)}
              </tbody>
            </table>
            <p>Total Expense:₹{totalExpense}</p>
          </div>
          <div className="incomes">
            <h3>Incomes</h3>
            <table className='table'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderCategoryRows(groupedIncomes)}
              </tbody>
            </table>
            <p>Total Income: ₹{totalIncome}</p>
          </div>
        </div>
      </div>
    </MonthStyled>
  );
};
const MonthStyled = styled.div`

overflow-x: hidden;
    overflow-y: scroll;
    max-height: 700px;
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
.table{
overflow: auto;

}
  table {
  
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px;
}
 .incomes p{
  color:green;
 }
 .expenses p{
  color:red;
 }


th {
  background-color: #ddd;
  text-align: left;
  padding: 8px;
  color: #222260;

}


td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
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

  .transactions {
    width: 100%;
    display: flex;
    gap: 20px;
    overflow: auto;
  }

  .expenses, .incomes {
    flex: 1;
  }

  .expenses {
    border-right: 1px solid #ccc;
  }
`;

export default Category;