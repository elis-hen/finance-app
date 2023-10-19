import React, { useState, useEffect } from 'react'
import '../styles/BalMain.css';
import Axios from "axios";

export default function BalMain() {

    const [expenses, setExpenses] = useState('');
    const [income, setIncome] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:3000/expenses").then((response) => {
            const sumExp = response.data[0];
            setExpenses(sumExp.value_out);
            // console.log(sumExp.sum_expenses);

        });
        Axios.get("http://localhost:3000/income").then((response) => {
            const sumInc = response.data[0];
            setIncome(sumInc.value_in);
            // console.log(sumInc.sum_income);

        });

    }, []);

    return (
        <div className='balance-main'>
            <div className='balance-item'>
                <div className='balance-field'>Earnings</div>
                <div className='balance-field'>{income}</div>
            </div>
            <div className='balance-item'>
                <div className='balance-field'>Balance</div>
                <div className='balance-field'>{income - expenses}</div>
            </div>
            <div className='balance-item'>
                <div className='balance-field'>Expenses</div>
                <div className='balance-field'>{expenses}</div>
            </div>

        </div>
    )
}
