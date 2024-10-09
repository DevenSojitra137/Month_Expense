import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useUserStore from '../../store/useUserStore';

const AiExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useUserStore();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        console.log('Fetching expenses for userId:', userId); // Log the userId being used

        if (!userId) {
          throw new Error('User ID is not set');
        }

        const response = await axios.get(`http://localhost:8000/api/v2/expense/getexpense/${userId}`);
        console.log('API Response:', response.data); // Log the full API response

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

    fetchExpenses();
  }, [userId]);

  useEffect(() => {
    const filteredExpenses = expenses.filter(expense => 
      new Date(expense.date).getFullYear().toString() === selectedYear
    );

    const monthlyData = Array(12).fill(0).map((_, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'short' }),
      amount: 0
    }));

    filteredExpenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const month = expenseDate.getMonth();
      monthlyData[month].amount += expense.amount;
    });

    setChartData(monthlyData);
  }, [expenses, selectedYear]);

  const years = ['2024', '2023', '2022', '2021'];

  if (loading) return <div className="text-white">Loading expenses...</div>;
  if (error) return (
    <div className="text-red-500">
      <p>{error}</p>
      <p>User ID: {userId || 'Not set'}</p>
    </div>
  );

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="mb-4">
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

      <div className="mb-4 bg-purple-100 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        {expenses
          .filter(expense => new Date(expense.date).getFullYear().toString() === selectedYear)
          .map(expense => (
            <div key={expense._id} className="mb-2 bg-gray-800 p-4 rounded">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-700 p-2 rounded mr-4">
                    <div>{new Date(expense.date).toLocaleString('default', { month: 'short' })}</div>
                    <div>{new Date(expense.date).getFullYear()}</div>
                    <div className="text-2xl font-bold">
                      {new Date(expense.date).getDate()}
                    </div>
                  </div>
                  <div className="text-xl">{expense.title}</div>
                </div>
                <div className="bg-purple-700 px-4 py-2 rounded-full text-white font-bold">
                  ${expense.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AiExpense;