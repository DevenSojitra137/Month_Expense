import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useUserStore from "../../store/useUserStore.js";
import './NewExpense.js'

const ExpenseForm = (props) => {
  const { userId } = useUserStore();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!enteredTitle.trim()) newErrors.title = "Title is required";
    if (!enteredAmount || parseFloat(enteredAmount) <= 0) newErrors.amount = "Amount must be greater than 0";
    if (!enteredDate) newErrors.date = "Date is required";
    else {
      const selectedDate = new Date(enteredDate);
      const minDate = new Date("2019-01-01");
      const maxDate = new Date("2024-12-31");
      if (selectedDate < minDate || selectedDate > maxDate) {
        newErrors.date = "Date must be between 2019-01-01 and 2024-12-31";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
    if (errors.title) setErrors({ ...errors, title: "" });
  };

  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
    if (errors.amount) setErrors({ ...errors, amount: "" });
  };

  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
    if (errors.date) setErrors({ ...errors, date: "" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    if (validateForm()) {
      try {
        const response = await axios.post(`http://localhost:8000/api/v2/expense/insertExpense/${userId}`, {
          title: enteredTitle,
          amount: parseFloat(enteredAmount),
          date: enteredDate,
        });
        
        console.log(response.data);
        
        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
        
        props.onSaveExpenseData({
          title: enteredTitle,
          amount: parseFloat(enteredAmount),
          date: new Date(enteredDate),
        });

        window.location.reload();
      } catch (error) {
        console.error("Error submitting expense:", error);
        setSubmitError("Failed to submit expense. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <motion.form
      onSubmit={submitHandler}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {submitError && (
        <div className="error-message">{submitError}</div>
      )}
      <div className="new-expense__controls">
        <motion.div
          className="new-expense__control"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </motion.div>
        <motion.div
          className="new-expense__control"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <p className="error-text">{errors.amount}</p>}
        </motion.div>
        <motion.div
          className="new-expense__control"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2024-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <p className="error-text">{errors.date}</p>}
        </motion.div>
      </div>
      <motion.div
        className="new-expense__actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.button
          type="button"
          onClick={props.onCancel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Submitting...' : 'Add Expense'}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ExpenseForm;