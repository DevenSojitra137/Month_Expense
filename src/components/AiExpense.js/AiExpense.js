import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useUserStore from '../../store/useUserStore';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'framer-motion';

const AiExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [chartData, setChartData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({
    title: '',
    amount: 0,
    date: '',
  });

  const { userId } = useUserStore();

  useEffect(() => {
    fetchExpenses();
  }, [userId]);

  useEffect(() => {
    updateChartData();
  }, [expenses, selectedYear, selectedMonth]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      if (!userId) {
        throw new Error('User ID is not set');
      }
      const response = await axios.get(`http://localhost:8000/api/v2/expense/getexpense/${userId}`);
      if (response.data.success && response.data.data.expenses) {
        setExpenses(response.data.data.expenses);
      } else {
        throw new Error(response.data.message || 'No expenses found in the response');
      }
      setError(null);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch expenses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const updateChartData = () => {
    let filteredExpenses = expenses.filter(expense =>
      new Date(expense.date).getFullYear().toString() === selectedYear
    );

    if (selectedMonth !== 'all') {
      filteredExpenses = filteredExpenses.filter(expense =>
        new Date(expense.date).getMonth().toString() === selectedMonth
      );
    }

    const monthlyData = Array(12).fill(0).map((_, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'short' }),
      amount: 0
    }));

    let total = 0;
    filteredExpenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const month = expenseDate.getMonth();
      monthlyData[month].amount += expense.amount;
      total += expense.amount;
    });

    setChartData(monthlyData);
    setTotalExpense(total);
  };

  const handleUpdateClick = (expense) => {
    setSelectedExpense(expense);
    setUpdatedExpense({
      title: expense.title,
      amount: expense.amount,
      date: expense.date.split('T')[0],
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/v2/expense/updateExpense/${selectedExpense._id}`, updatedExpense);
      if (response.data.success) {
        const updatedExpenses = expenses.map(exp =>
          exp._id === selectedExpense._id ? { ...exp, ...updatedExpense } : exp
        );
        setExpenses(updatedExpenses);
        setUpdateModalOpen(false);
      } else {
        throw new Error(response.data.message || 'Failed to update expense');
      }
    } catch (err) {
      console.error('Error updating expense:', err);
      setError(err.message || 'Failed to update expense. Please try again.');
    }
  };

  const handleDeleteClick = async (expenseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v2/expense/deleteExpense/${expenseId}`);
      console.log('Deleted Expense ID:', expenseId);
      setExpenses(expenses.filter(exp => exp._id !== expenseId));
      console.log('Delete Response:', response);
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError(`Failed to delete expense. ${err.response?.status === 404 ? 'Expense not found.' : 'Please try again.'}`);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v2/expense/generatePDF/${userId}`, {
        responseType: 'blob',
      });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(pdfBlob, 'expense_report.pdf');
      setError(null);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(err.response?.data?.message || 'Failed to generate PDF. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const years = ['2024', '2023', '2022', '2021'];
  const months = [
    { value: 'all', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-white flex justify-center items-center h-screen"
    >
      Loading expenses...
    </motion.div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-red-500 flex flex-col justify-center items-center h-screen"
    >
      <p>{error}</p>
      <p>User ID: {userId || 'Not set'}</p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gray-900 text-white"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-4 flex items-center justify-between"
      >
        <div>
          <label className="mr-2">Filter by year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white text-black p-2 rounded"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold">Total Expense</h2>
          <p className="text-2xl font-bold text-purple-400">₹{totalExpense.toFixed(2)}</p>
        </motion.div>
        <div>
          <label className="mr-2">Filter by month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white text-black p-2 rounded"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-4 flex justify-center m-5"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownloadPDF}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Download Expense Report (PDF)'}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-4 bg-purple-100 p-4 rounded-lg"
      >
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <AnimatePresence>
        {expenses
          .filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear().toString() === selectedYear &&
              (selectedMonth === 'all' || expenseDate.getMonth().toString() === selectedMonth);
          })
          .map(expense => (
            <motion.div
              key={expense._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-2 bg-gray-800 p-4 rounded"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-700 p-2 rounded mr-4"
                  >
                    <div>{new Date(expense.date).toLocaleString('default', { month: 'short' })}</div>
                    <div>{new Date(expense.date).getFullYear()}</div>
                    <div className="text-2xl font-bold">
                      {new Date(expense.date).getDate()}
                    </div>
                  </motion.div>
                  <div className="text-xl">{expense.title}</div>
                </div>
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-purple-700 px-4 py-2 rounded-full text-white font-bold mr-4"
                  >
                    ₹{expense.amount.toFixed(2)}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdateClick(expense)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Update
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteClick(expense._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {updateModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg"
            >
              <h2 className="text-xl font-bold mb-4 text-black">Update Expense</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={updatedExpense.title}
                    onChange={(e) => setUpdatedExpense({ ...updatedExpense, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (in ₹)</label>
                  <input
                    type="number"
                    id="amount"
                    value={updatedExpense.amount}
                    onChange={(e) => setUpdatedExpense({ ...updatedExpense, amount: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (in ₹)</label>
                  <input
                    type="number"
                    id="amount"
                    value={updatedExpense.amount}
                    onChange={(e) => setUpdatedExpense({ ...updatedExpense, amount: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={updatedExpense.date}
                    onChange={(e) => setUpdatedExpense({ ...updatedExpense, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setUpdateModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2">Cancel</button>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save changes</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AiExpense;