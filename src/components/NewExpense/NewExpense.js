import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";


const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const SaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => setIsEditing(true);
  const stopEditingHandler = () => setIsEditing(false);

  return (
    <motion.div
      className="new-expense"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ExpenseForm
              onSaveExpenseData={SaveExpenseDataHandler}
              onCancel={stopEditingHandler}
            />
          </motion.div>
        ) : (
          <motion.button
            key="button"
            onClick={startEditingHandler}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Expenses
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewExpense;