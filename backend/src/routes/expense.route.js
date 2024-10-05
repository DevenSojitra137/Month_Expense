import {Router} from "express";
import {insertExpense, updateExpense, deleteExpense} from "../controller/expense.controller.js";


const router = Router()

router.route("/insertExpense").post(insertExpense)
router.route("/updateExpense/:expenseId").put(updateExpense);
router.route("/deleteExpense/:expenseId").put(deleteExpense);


export default router