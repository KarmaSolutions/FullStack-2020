import express from "express";
import {
    addNewAccount,
    getAccountBalance,
    getAllAccounts,
    withdrawFunds,
    depositFunds,
} from "../controllers/accountController.js";

const router = express.Router();

router.post("/new", addNewAccount);
router.put("/:id/withdraw", withdrawFunds);
router.put("/:id/deposit", depositFunds);
router.get("/:id/balance", getAccountBalance);
router.get("/all", getAllAccounts);

export default router;
