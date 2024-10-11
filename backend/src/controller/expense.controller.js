import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import {User} from "../models/user.model.js";
import mongoose from "mongoose";

const insertExpense = asyncHandler(async (req, res) => {
  const { title, amount, date } = req.body;
  const { userId } = req.params; 

  console.log("Request Body:", req.body);

  if ([title, amount, date].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const expense = await Expense.create({
    title,
    amount,
    date,
    user_id: userId,
  });

  
  user.expenses.push(expense._id);
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, expense, "Expense inserted successfully!"));
});

const updateExpense = asyncHandler(async (req, res) => {
  const { title, amount, date } = req.body;
  const { expenseId } = req.params;

  console.log("Request Body:", req.body);

  if ([title, amount, date].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  const expense = await Expense.findById(expenseId);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  expense.title = title;
  expense.amount = amount;
  expense.date = date;

  await expense.save();

  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully!"));
});


const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  const expense = await Expense.findByIdAndDelete(expenseId);
  
  console.log(expense);
  
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  
  const deletedUser =  await User.findByIdAndUpdate(expense.user_id, {
    $pull: { expenses: expense._id },
  });

  console.log(expenseId);
  
  return res
    .status(200)
    .json(new ApiResponse(200, deletedUser, "Expense deleted successfully!"));
});



const getUserWithExpenses = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId).populate("expenses");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User with expenses retrieved successfully"));
});


const getAllExpenses = asyncHandler(async (req, res) => {
  try {
    const expenses = await Expense.find().populate("user_id", "username email");
    res.status(200).json(new ApiResponse(200, expenses, "All expenses retrieved successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, {}, "Error retrieving expenses"));
  }
});






export {
  insertExpense,
  updateExpense,
  deleteExpense,
  getUserWithExpenses,
  getAllExpenses
}