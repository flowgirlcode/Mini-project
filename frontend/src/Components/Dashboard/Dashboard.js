import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import Limit from '../Form/Limit';

function Dashboard() {
    const { incomes, expenses, getIncomes,totalBalance, getExpenses } = useGlobalContext();
    const [budgetAmount, setBudgetAmount] = useState(() => {
        return parseFloat(localStorage.getItem('budgetAmount')) || 0;
    });

    const [alert, setAlert] = useState(false);


    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);
    

    useEffect(() => {
        localStorage.setItem('budgetAmount', budgetAmount.toString());
    }, [budgetAmount]);


    const currentMonthIn = incomes.filter(income => {
        const incomeDate = new Date(income.date);
        const currentDate = new Date();
        return incomeDate.getMonth() === currentDate.getMonth() && incomeDate.getFullYear() === currentDate.getFullYear();
    });
    const totalMonthIncome = currentMonthIn.reduce((total, income) => total + income.amount, 0);

    const currentMonthExp = expenses.filter(expense => {
        const expDate = new Date(expense.date);
        const currentDate = new Date();
        return expDate.getMonth() === currentDate.getMonth() && expDate.getFullYear() === currentDate.getFullYear();
    });
    const totalMonthExp = currentMonthExp.reduce((total, expense) => total + expense.amount, 0);

    const balance = totalMonthIncome - totalMonthExp;

    const handleBudgetChange = (amount) => {
        setBudgetAmount(amount);
    
    };
    
    useEffect(() => {
        if (totalMonthExp > budgetAmount && budgetAmount > 0) {
            setAlert(true);
            const timer = setTimeout(() => {
                setAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [totalMonthExp, budgetAmount]);
    
    const expensePercentage = (totalMonthExp / budgetAmount) * 100;

    const remainingBudget = budgetAmount - totalMonthExp;

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Budget Tracking</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <div>
                            <Limit onBudgetChange={handleBudgetChange} />
                        </div>
                        <div className="amount-con">
                            <div className="income">
                                <h2>Income</h2>
                                <p>₹{totalMonthIncome.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="expense">
                                <h2>Expense</h2>
                                <p>₹{totalMonthExp.toLocaleString('en-IN')}</p>
                                <ProgressBarContainer>
                                    <ProgressBar progress={expensePercentage} />
                                </ProgressBarContainer>
                            </div>
                            <div className="balance">
                                <h2>Balance</h2>
                                <p>₹{balance.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="balance">
                                <h2> Overall Balance</h2>
                                <p>{'₹'+totalBalance().toLocaleString('en-IN')}</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">
                            Min <span>Income</span>Max
                        </h2>
                        <div className="salary-item">
                            <p>₹{Math.min(...currentMonthIn.map(item => item.amount))}</p>
                            <p>₹{Math.max(...currentMonthIn.map(item => item.amount))}</p>
                        </div>
                        <h2 className="salary-title">
                            Min <span>Expense</span>Max
                        </h2>
                        <div className="salary-item">
                            <p>₹{Math.min(...currentMonthExp.map(item => item.amount))}</p>
                            <p>₹{Math.max(...currentMonthExp.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 300px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(2, 2fr);
                gap: 2rem;
                margin-top: 2rem;

                .income,
                .expense,
                .balance {
                    background: whitesmoke;
                    border: 2px solid #fff;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    padding:  20px;

                    p {
                        font-size: 2rem;
                        font-weight: 500;
                    }
                }

                .balance {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;

                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 3rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .salary-title {
                font-size: 1.2rem;

                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item {
                border: 2px solid #fff;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

const ProgressBarContainer = styled.div`
    background-color: #f3f3f3;
    border-radius: 8px;
    border: 1px solid var(--primary-color);
    overflow: hidden;
`;

const ProgressBar = styled.div`
    width: ${({ progress }) => progress}%;
    height: 10px;
    background-color: ${({ progress }) => (progress > 100 ? '#ff4d4f' : '#52c41a')};
`;

export default Dashboard;
