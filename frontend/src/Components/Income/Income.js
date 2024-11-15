import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

    useEffect(() => {
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>{'₹' + totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
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
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
   

    .total-income{ 
        
        display: flex;
        margin-bottom: 5px;
        justify-content: center;
        align-items: center;
        background: white;//rgba(252, 246, 249, 0.78);//#FCF6F9;
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
    .income-content{
       

        display: flex;
        gap: 1rem;
        .incomes{
            flex: 1;
            overflow-y: auto; 
             max-height: 500px;
        }
    }
    
`;

export default Income