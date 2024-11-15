import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">Total Expense: <span>{'₹'+totalExpenses()}</span></h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expense">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description, type} = expense;
                            console.log(expense)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
       // background: transparent;
        background:white;//rgba(252, 246, 249, 0.78);//#FCF6F9;
        border: 2px solid green;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
       border-radius: 10px;
        padding: 3px;
        font-size: 1.5rem;
        gap: 1rem;
        span{
            font-size: 2rem;
            font-weight: 400;
            color: var(--color-green);
            padding: 2px;
        }
    }
    .expense-content{
        display: flex;
        gap: 1rem;
        .expense{
            flex: 1;
            overflow-y: auto; 
             max-height: 500px;
        }
    }
`;

export default Expenses