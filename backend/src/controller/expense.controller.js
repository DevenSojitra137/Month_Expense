import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expense.model.js";

const insertExpense = asyncHandler(async (req, res) => {
  const { title, amount ,date } = req.body;
  console.log("Request Body:", req.body);

  if (
    [title, amount, date].some(
      (field) => field === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const expense = await Expense.create({
    title,
    amount,
    date
  });

  
  return res
    .status(201)
    .json(new ApiResponse(200, expense, "data insert successfully!!"));
});

const updateExpense = asyncHandler(async (req, res) => {
  const { title, amount, date } = req.body;
  const { expenseId } = req.params; 

  console.log("Request Body:", req.body);

  if ([title, amount, date].some((field) => !field || field === "")) {
    return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
  }

  try {
  
    const expense = await Expense.findById(expenseId);

    if (!expense) {
      throw new ApiError(400, "expense not found");
    }

    
    expense.title = title;
    expense.amount = amount;
    expense.date = date;

    await expense.save();

    return res
      .status(200)
      .json(new ApiResponse(200, expense, "Expense updated successfully!"));

  } catch (error) {
    console.error("Error updating expense:", error);
    return res.status(500).json(new ApiResponse(500, {}, "Error updating data"));
  }
});


const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  try {
    // Find and delete the expense by ID
    const expense = await Expense.findByIdAndDelete(expenseId);

    // Check if the expense was found and deleted
    if (!expense) {
      throw new ApiError(404, "Expense not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Expense deleted successfully!"));

  } catch (error) {
    console.error("Error deleting expense:", error); // Update error message
    return res.status(500).json(new ApiResponse(500, {}, "Error deleting data"));
  }
});






export {
  insertExpense,
  updateExpense,
  deleteExpense
}