import express from "express";
import {
    addNewAccount,
    getAccountBalance,
    getAllAccounts,
    withdrawFunds,
    depositFunds,
    editUser,
} from "../controllers/accountController.js";

const router = express.Router();

router.post("/new", addNewAccount);
router.put("/withdraw/:id", withdrawFunds);
router.put("/deposit/:id", depositFunds);
router.put("/user/:id/edit", editUser);
router.get("/user/:id", getAccountBalance);
router.get("/allusers", getAllAccounts);

export default router;
