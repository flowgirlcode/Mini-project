import React, { useState } from 'react'
import styled from "styled-components";
import chart from'chart.js/auto';
function Calculator() {
const[Principal,setPrincipal]=useState("100000");
const[AnnualRate,setAnnualRate]=useState("1");
const[PeriodUnit,setPeriodUnit]=useState("");
const[Period,setPeriod]=useState("1");

const[SimpleInterest,setSimpleInterest]=useState("");
const[Total,setTotal]=useState("");
const [chartInstance, setChartInstance] = useState(null);



    const handleSubmit=(event)=>{
        event.preventDefault();
        let rate=parseFloat(AnnualRate)
        let period=parseFloat(Period)
        if(PeriodUnit==='Month'){
            rate=(rate/12)/100;
        }else if(PeriodUnit==='Week'){
            rate=(rate/52)/100;
        }else if(PeriodUnit==='Days'){
            rate=(rate/365)/100;
        }else if (PeriodUnit === 'Year') {
            rate = rate / 100; 
        }
       
        const interest=(Principal*rate*period);
        const total=interest+parseFloat(Principal)
        setSimpleInterest(interest.toFixed(2));
        setTotal(total.toFixed(2));
         const yValues = [Principal, interest];
        if (chartInstance) {
            chartInstance.data.datasets[0].data = yValues;
            chartInstance.update();
          } else {
            const ctx = document.getElementById('myChart').getContext('2d');
            const newChartInstance = new chart(ctx, {
              type: 'pie',
              data: {
                labels: ['Principal', 'Interest'],
                datasets: [{
                  backgroundColor: ["lightgreen", "green"],
                  data: yValues
                }]
              },
              options: {
                title: {
                  display: true,
                  text: 'Interest and Principal'
                }
              }
            });
            setChartInstance(newChartInstance);
          }

    }
   
  return (
    
    
    <CalStyled>
        <div class="form">
        <form onSubmit={handleSubmit}> 

        <caption><h1>Interest</h1></caption>
        <label htmlFor='Pri' >Prncipal </label><br/>
        <input type="number" id="pri" placeholder="10000"defaultValue={Principal}  onChange={(e)=>setPrincipal(e.target.value)}/><br/>
        <label htmlFor='rate' >Annual rate</label> <br/>
        <input type="number" id="rate"  placeholder=" " defaultValue={AnnualRate}onChange={(e)=>setAnnualRate(e.target.value)}/><br/>
        <label htmlFor='PeriodUnit' >Period Unit</label><br/>
        <select name="period" id="periodUnit"onChange={(e)=>setPeriodUnit(e.target.value)}>
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Week">Week</option>
            <option value="Days">Days</option>

        </select><br/>
        <label htmlFor='Period' >Period value</label><br/>
        <input type="number" id="period" placeholder=" " defaultValue={Period}onChange={(e)=>setPeriod(e.target.value)}/><br/>
       
        <button >Calculate</button>
    </form>
<div className='chart'>
<canvas id="myChart"></canvas>

</div>

    </div>
         <div class="res">

        <div>
          Interest<span id="output">{"₹"+SimpleInterest}</span>
        </div>
        <div>
           <p> Prncipal<span id="Amt">{"₹"+Principal}</span></p>
        </div>
        <div>
            Total<span id="tot">{"₹"+Total}</span>
        </div>

    </div>
</CalStyled>

  )
}
const CalStyled=styled.div`
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    
    }
   
    body{
        display: flex;
        gap: 0.2rem;
        height: 50vh;
        background: linear-gradient(to bottom, #fff, #676767)
    }
    
    .form{
        display: flex;
        margin:  40px;
        border: 1px solid #bbb;
        padding: 5px;
        border-radius: 5px;
        align-items: center;
        justify-self: center;
            
       
    }
    .chart{
        background-color: #ddd;
         border: none;
        padding: 10px;
        margin: 10px 10px 10px 0px ;
        height: 50vh;
    }
    form{
        flex: 1;
        margin: 10px;
    }
    form label{
        padding:5px;
        margin: 10px;
        
    }
    select,input{
        margin: 10px;
        width: 90%;
        padding: 10px;
        border-radius: 5px;
        background-color: #eee;
 
        border: 1px solid white;
        box-shadow: 0px 10px 0px 0px #ddd;
       
    }
    button{
    font-size: large;
        margin: 10px;
        width: 90%;
       padding: 10px 10px;
        border-radius: 10px;
        color: white;
        background-color:green;
        border: none;
        box-shadow: 0px 10px 0px 0px rgba(0,0,0,0.7);

    
    }
    .res{
        border: 1px solid #ddd;

        padding: 10px;
        border-radius: 5px;
        align-items:end;
        justify-self: center;
        margin:0px 40px;
        font-size: large;
        color: black;
       background-color: #eee;
       font-weight: bold;
     
       
    }
    
    .res div{
        padding: 5px;
        margin:5px 20px ;
        border-bottom: 1px solid #aaa;
        justify-content: center ;
     
    
      
    }
    
    span{
    margin-left: 80%;
    border-radius: 5px;
    
    }
    
`

export default Calculator