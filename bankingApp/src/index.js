import readline from "readline-sync";
import * as fs from "fs";
import {
    createAccount,
    listAccounts,
    doesAccountExist,
    modifyAccount,
    logIn,
    logOut,
} from "./accountCommands.js";

import {
    withdrawFunds,
    depositFunds,
    transferFunds,
    requestFunds,
    listFundRequests,
    acceptFundRequests,
} from "./fundsCommands.js";

let loggedIn = NaN;

console.log("Welcome to Karma banking CLI!");

const printHelp = () => {
    console.log("\n\ " +
    "------------------------------------------------------------------------------------- \n\ " +
    "Accounts \n\ " +
    "create_account -- > Opens dialog for creating an account. \n\ " +
    // "close_account -- > Opens a dialog for closing an account. \n\ " + 
    "modify_account -- > Opens a dialog for modifying an account. \n\ " +
    "does_account_exist -- > Opens a dialog for checking if the account exists. \n\ " +
     "log_in -- > Opens a dialog for logging in. \n\ " +
     "logout -- > Opens a dialog for logging out. \n\ " +
    "------------------------------------------------------------------------------------- \n\ " +
    "Funds \n\ " +
    "withdraw_funds -- > Opens a dialog for withdrawing funds. \n\ " +
    "deposit_funds -- > Opens a dialog for depositing funds. \n\ " +
    "transfer_funds -- > Opens a dialog for transferring funds to another account. \n\ " +
    "------------------------------------------------------------------------------------- \n\ " +
    "Requests \n\ " +
     "request_funds -- > Opens a dialog for requesting another user for funds. \n\ " +
     "funds_requests -- > Shows all the requests for the account funds. \n\ " +
     "accept_fund_request -- > Opens a dialog for accepting a fund request.");
};

listAccounts();
while (true) {
    console.log("-------------------------------------------------------");
    const input = readline.question("Enter a command. (Type help to see a list of commands.)");
    if (input === "exit") {
        break;
    } else if (input === "help") {
        printHelp();
    } else if (input === "create_account") {
        createAccount();
    } else if (input === "withdraw_funds") {
        withdrawFunds();
    } else if (input === "deposit_funds") {
        depositFunds();
    } else if (input === "transfer_funds") {
        transferFunds();
    } else if (input === "does_account_exist") {
        doesAccountExist();
    } else if (input === "modify_account") {
        modifyAccount();
    } else if (input === "log_in") {
        loggedIn = logIn();
    } else if (input === "log_out") {
        loggedIn = logOut(loggedIn);
    } else if (input === "request_funds") {
        requestFunds(loggedIn);
    } else if (input === "fund_requests") {
        listFundRequests(loggedIn);
    } else if (input === "accept_fund_request") {
        acceptFundRequests(loggedIn);
    } else {
        console.log(`${input} isn't a valid command. Please try again.`)
    }
}
