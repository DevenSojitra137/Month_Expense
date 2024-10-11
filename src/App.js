import AiExpense from "./components/AiExpense.js/AiExpense";
import ExpenseItem from "./components/Expenses/ExpenseItem";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";
import { useEffect } from "react";



function App() {

  
  
  const [expenses, setExpenses] = useState(Dummy_expenses);

  const addExpenseHandler = (expenses) => {
    setExpenses((prevExpense) => [expenses, ...prevExpense]);
  };
  
  return (
    <>
      <div>
        <NewExpense onAddExpense={addExpenseHandler} />
       
        <AiExpense />

        
      </div>
    </>
  );
}

export default App;
