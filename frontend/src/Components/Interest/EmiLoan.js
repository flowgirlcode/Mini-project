import React, { useState } from 'react'
import styled from "styled-components";
import chart from 'chart.js/auto';


function EmiLoan() {
  const [Principal, setPrincipal] = useState("100000");
  const [AnnualRate, setAnnualRate] = useState("1");
  const [Period, setPeriod] = useState("12");

  const [EMI, setEMI] = useState("");
  const [TotalPayment, setTotalPayment] = useState("");
  const [TotalInterest, setTotalInterest] = useState("");
  const [chartInstance, setChartInstance] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const principal = parseFloat(Principal);
    const annualRate = parseFloat(AnnualRate);
    const period = parseFloat(Period);

    const monthlyRate = (annualRate / 12) / 100;
    const n = period;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    setEMI(emi.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));

    const yValues = [principal, totalInterest];
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
            text: 'Principal and Interest Breakdown'
          }
        }
      });
      setChartInstance(newChartInstance);
    }
  }

  return (
    <CalStyled>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <caption><h1>Calculator</h1></caption>
          <label htmlFor='pri'>Principal </label><br />
          <input type="number" id="pri" placeholder="100000" defaultValue={Principal} onChange={(e) => setPrincipal(e.target.value)} /><br />
          <label htmlFor='rate'>Annual Rate (%)</label><br />
          <input type="number" id="rate" placeholder="1" defaultValue={AnnualRate} onChange={(e) => setAnnualRate(e.target.value)} /><br />
          <label htmlFor='period'>Period (months)</label><br />
          <input type="number" id="period" placeholder="12" defaultValue={Period} onChange={(e) => setPeriod(e.target.value)} /><br />
          <button>Calculate</button>
        </form>
        <div className='chart'>
          <canvas id="myChart"></canvas>
        </div>
      </div>
      <div className="res">
        <div>
          EMI<span id="output">{"₹" + EMI}</span>
        </div>
        <div>
          Total Interest<span id="totalInterest">{"₹" + TotalInterest}</span>
        </div>
        <div>
          Total Payment<span id="totalPayment">{"₹" + TotalPayment}</span>
        </div>
      </div>
    </CalStyled>
  )
}

const CalStyled = styled.div`
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body {
  display: flex;
  gap: 0.2rem;
  height: 50vh;
  background: linear-gradient(to bottom, #fff, #676767);
}

.form {
  display: flex;
  margin: 40px;
  border: 1px solid #bbb;
  padding: 5px;
  border-radius: 5px;
  align-items: center;
  justify-self: center;
}

.chart {
  background-color: #ddd;
  border: none;
  padding: 10px;
  margin: 10px 10px 10px 0px;
  height: 50vh;
}

form {
  flex: 1;
  margin: 10px;
}

form label {
  padding: 5px;
  margin: 10px;
}

select, input {
  margin: 10px;
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  background-color: #eee;
  border: 1px solid white;
  box-shadow: 0px 10px 0px 0px #ddd;
}

button {
  font-size: large;
  margin: 10px;
  width: 90%;
  padding: 10px 10px;
  border-radius: 10px;
  color: white;
  background-color: green;
  border: none;
  box-shadow: 0px 10px 0px 0px rgba(0, 0, 0, 0.7);
}

.res {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  align-items: end;
  justify-self: center;
  margin: 0px 40px;
  font-size: large;
  color: black;
  background-color: #eee;
  font-weight: bold;
}

.res div {
  padding: 10px;
  margin: 5px 0;
  border-bottom: 1px solid #ccc;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}

span {
  margin-left: 80%;
  border-radius: 5px;
}
`

export default EmiLoan
