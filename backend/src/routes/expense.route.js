import {Router} from "express";
import {insertExpense, updateExpense, deleteExpense , getUserWithExpenses , getAllExpenses ,   generatePDF
} from "../controller/expense.controller.js";


const router = Router()

router.route("/insertExpense/:userId").post(insertExpense)
router.route("/updateExpense/:expenseId").put(updateExpense);
router.route("/deleteExpense/:expenseId").delete(deleteExpense);
router.route("/getexpense/:userId").get(getUserWithExpenses);
router.route("/allexpenses").get(getAllExpenses); 
router.route("/generatePDF/:userId").get(generatePDF);



export default router