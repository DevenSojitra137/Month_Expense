import React, { useState } from "react";
import "./ExpenseFrom.css";
import axios from "axios";

export default function ExpenseForm(props) {


  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };



  const submitHandler = async (data) => {
    data.preventDefault();

    

      const response = await axios.post("/api/v2/expense/insertExpense",{
        title:enteredTitle,
        amount:enteredAmount,
        date:enteredDate
      } );


    

    console.log(data);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");

    
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="">Amount</label>
          <input
            type="number"
            min="0.00"
            step="1"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label htmlFor="">Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2024z-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-expense__actions">
          <button type="submit" >Add Expense</button>
          <button type="submit" onClick={props.onCancle}>Cancle</button>
        </div>
      </div>
    </form>
  );
}
