import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat'
import { useGlobalContext } from '../../context/globalContext'
import {useReactToPrint} from 'react-to-print'

const ExpenseTable = () => {
    const componentPDF =useRef();

    const { expenses, getExpenses } = useGlobalContext()
    useEffect(() => {
    getExpenses()

    }, [getExpenses])
    const generatePDF =useReactToPrint({
        content:()=>componentPDF.current,
        documentTitle:"UserData",
        onAfterPrint:()=>alert("Data Saved in PDF")
    });
    return (
    <TableStyled className='container'>
        <div className='scroll'>
            <div ref={componentPDF} style={{width:'100%'}}>
            <button onClick={generatePDF}>Export as PDF</button>
                    <h1>Expense Summary</h1>
            <table className='table  table-hover  table-condensed p-3'>
                <thead>
                    <tr>
                        <th>
                            title
                        </th>
                        <th>
                            amount
                        </th>
                        <th>
                            date
                        </th>
                        <th>
                            type
                        </th>
                        <th>
                            category
                        </th>
                        <th>
                            description
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense._id}>
                            <td>{expense.title}</td>
                            <td>{expense.amount}</td>
                            <td>{dateFormat(expense.date)}</td>
                            <td>{expense.type}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            </div>
        </div>
    </TableStyled>
    )
}

const TableStyled = styled.div` 

.scroll{
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 700px;
}
table {
 
  width: 95%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px ;
  overflow-y: scroll;
  max-height: 500px;
}
button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green);
                color: white;
                font-size: 15px;

            }
        }
h1{
    margin: 10px;
    padding: 10px;

}
button {
    position: fixed;
    top: 10px;
    right: 40px;
    margin: 10px;
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

`


export default ExpenseTable