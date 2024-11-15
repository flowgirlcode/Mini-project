import { Button } from 'bootstrap';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
const Limit = ({onBudgetChange}) => {
  const [budgetAmount, setBudgetAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleBudgetChange = (e) => {
    const budget=e.target.value
    setBudgetAmount(budget);
    onBudgetChange(budget);

  };
  const handleSetBudget = () => {
    console.log('Budget Amount:', budgetAmount);
    console.log('Selected Date:', selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Limitstyled>
      <div className="input-control">
        <label>Monthly Limit:</label>

        <input
          type="number"
          name="budgetAmount"
          placeholder="Enter budget"
          value={budgetAmount}
          onChange={handleBudgetChange}
          required
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Select Date"
          selected={selectedDate}
          onChange={handleDateChange}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          showMonthYearDropdown
          dropdownMode="select"
        />
          <div className="submit-btn">
        <button onClick={handleSetBudget}>Set Budget</button>
      </div>
      </div>
    
      </Limitstyled>
  );
};

const Limitstyled =styled.div`
   margin-top: 10px;
   display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    border: 1px solid #222;
    input, textarea {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid rgba(252, 246, 249, 0.78);
        background:white;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
        color: black;//rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }
label{
  padding: 5px;
}
   .submit-btn  button {
    margin: 10px 0px;
    display: inline-block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: lightgreen;
    color: black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  button{
      &:hover{
          background: var(--color-green);

          color: white;
          font-size: 15px;
      }
  }
`
export default Limit;
