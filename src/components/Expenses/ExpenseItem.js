import React from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
// import Card from "../UI/Card";
import { useState } from "react";

export default function ExpenseItem(props) {
  const [title, settitle] = useState(props.title);
  const handleClick = (event) => {
    settitle("We are Bharatiya");
    event.preventDefault();
  };

  return (
    <>
      <li>
        <div className="expense-item">
          <ExpenseDate date={props.date} />
          <div className="expense-item__description">
            <h2>{title}</h2>
            <div className="expense-item__price">${props.amount}</div>
          </div>
        </div>
      </li>
    </>
  );
}
