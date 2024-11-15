import React, { useEffect, useState ,useRef} from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat'
import { useGlobalContext } from '../../context/globalContext'
import {useReactToPrint} from 'react-to-print'

const IncomeTable = () => {
    const componentPDF =useRef();
    const {getIncomes,incomes} =useGlobalContext()
    useEffect(() => {
        getIncomes()
  
    }, [])
   
    const generatePDF =useReactToPrint({
        content:()=>componentPDF.current,
        documentTitle:"UserData",
        onAfterPrint:()=>alert("Data Saved in PDF")
    });

    return (
        <TableStyled >
            <div className='scroll'>
            <div ref={componentPDF} style={{width:'100%'}}>
            <h1>Income Summary</h1>

            <button onClick={generatePDF}>Export as PDF</button>

                <table className='table  ' >
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
                        {incomes.map(income => (
                                  
                            <tr key={income._id}>
                                <td>{income.title}</td>
                                <td>{income.amount}</td>
                                <td>{dateFormat(income.date)}</td>
                                <td>{income.type}</td>
                                <td>{income.category}</td>
                                <td>{income.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
         
        </TableStyled>
    )
}
const TableStyled=styled.div` 

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


export default IncomeTable