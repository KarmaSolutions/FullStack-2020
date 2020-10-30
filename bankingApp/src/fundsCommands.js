import readline from "readline-sync";
import {runInNewContext} from "vm";
import * as fs from "fs";
import {getAccountList, changeAccountInfo, validateUser, doesAccountExist} from "./accountCommands.js";
import { request } from "http";

const withdrawFunds = () => {
    let user = [];
    let withdrawAmount = 0;

    console.log("Okay, let’s whip up some cash for you from these ones and zeroes.");
    user = validateUser();

    if (user !== false) {
        console.log(`Welcome ${user.name}!`);
        withdrawAmount = readline.question("How much do you want to withdraw?" +
        `(Current balance: ${user.balance})`);
        withdrawAmount = parseInt(withdrawAmount);
        while (withdrawAmount > user.balance) {
            console.log("Unfortunately you don't have that much money.");
            withdrawAmount = readline.question("Try again: ");
            if (withdrawAmount === "exit") {
                return;
            }
        }
        user.balance -= withdrawAmount;
        changeAccountInfo(user);
        console.log(`Awesome, you can now enjoy your ${withdrawAmount}€ in cash! ` +
        `There’s still ${user.balance}€ in your account, safe with us.`);
    }
};

const depositFunds = () => {
    let user = [];
    let depositAmount = 0;

    console.log("Okay, let’s convert your cash in to some delicious ones and zeroes.");
    user = validateUser();

    if (user !== false) {
        console.log(`Welcome ${user.name}!`);
        depositAmount = readline.question("How much money do you want to deposit?" +
        `(Current balance: ${user.balance})`);
        depositAmount = parseInt(depositAmount);
        user.balance += depositAmount;
        changeAccountInfo(user);
        console.log(`Awesome, we removed ${depositAmount}€ from existence and stored them ` +
        `into our system. Your new account balance is ${user.balance}€!`);
    };
};

const transferFunds = () => {
    console.log("Okay, let’s slide these binary treats in to someone elses pockets.");

    const user = validateUser();
    if (user !== false) {
        console.log(`Welcome ${user.name}!`);
        let transferAmount = readline.question("How much do you want to transfer?" +
        `(Current balance: ${user.balance})`);
        transferAmount = parseInt(transferAmount);
        while (transferAmount > user.balance) {
            console.log("Unfortunately you don't have that much money.");
            transferAmount = readline.question("Try again: ");
            if (transferAmount === "exit") {
                return;
            }
        }
        let accounts = getAccountList();
        let userIdToTransfer = readline.question("What is the ID of the account " +
        "you want to transfer these funds to?");
        userIdToTransfer = parseInt(userIdToTransfer);
        while (!accounts.find(acc => acc.id === userIdToTransfer)) {
            console.log(`Unfortunately we can't find an account with the ID ${userIdToTransfer}.`);
            userIdToTransfer = readline.question("Please give a valid ID " +
            "(or type exit to go back to the menu): ");
            if (userIdToTransfer === "exit") return;
            userIdToTransfer = parseInt(userIdToTransfer);
        }
        user.balance -= transferAmount;
        changeAccountInfo(user);

        const userToTransfer = accounts.find(acc => acc.id === userIdToTransfer);
        userToTransfer.balance += transferAmount;
        changeAccountInfo(userToTransfer);

        console.log(`Awesome. We sent ${transferAmount}` +
        `€ to an account with the ID of ${userIdToTransfer}.`);
    }
};

const requestFunds = (loggedIn) => {
    let requestAmount = 0;
    let userRequested;
    let fundRequest; // fundRequest will have both the id of the requester and requestAmount

    if (!Number.isNaN(loggedIn)) {
        console.log("So you want request funds from someone?");
        let id = doesAccountExist();
        let accounts = getAccountList();
        while (id === false) {
            id = doesAccountExist();
        }
        requestAmount = readline.question("Okay, we found an account with that ID. " +
        "How much money do you want to request? ");
        while (Number.isNaN(requestAmount)) {
            requestAmount = readline.question("Please enter a number: ");
            requestAmount = parseInt(requestAmount);
        }
        fundRequest = `${loggedIn}: ${requestAmount}`;
        userRequested = accounts.find(acc => acc.id === id);
        userRequested.fund_requests.push(fundRequest);
        changeAccountInfo(userRequested);
        console.log(`Awesome! We’ll request ${fundRequest} euros from the user with ID ${id}.`)
    } else console.log("Please log in first.");
};

const listFundRequests = (loggedIn) => {
    if (!Number.isNaN(loggedIn)) {
        const accounts = getAccountList();
        const user = accounts.find(acc => acc.id === loggedIn);
        const fundRequests = user.fund_requests.slice(0);
        console.log("Here’s all the requests that are out for your funds.");
        fundRequests.forEach(element => {
            let splitRequest = element.split(",");
            splitRequest = splitRequest[0].split(": ");
            console.log(`${splitRequest[1]}€ from user ${splitRequest[0]}.`);
        });
    } else console.log("Please log in first.");
};

const acceptFundRequests = (loggedIn) => {
    if (!Number.isNaN(loggedIn)) {
        const accounts = getAccountList();
        let user = accounts.find(acc => acc.id === loggedIn);
        let userToTransfer = [];
        let fundRequests = user.fund_requests.slice(0);
        let splitRequest;
        let confirmation = "";
        let currentRequestAmount = 0;
        let currentRequestId = 0;
        if (user.fund_requests.length !== 0) {
            fundRequests.forEach(req => {
                splitRequest = req.split(",");
                splitRequest = splitRequest[0].split(": ");

                currentRequestId = parseInt(splitRequest[0]);
                currentRequestAmount = parseInt(splitRequest[1]);

                confirmation = readline.question("We found a request for your funds of " +
                `${currentRequestAmount} euros to user ${currentRequestId}. ` +
                `Your current balance is: ${user.balance}. Type yes to accept this request: `);

                if (confirmation === "yes" && user.balance >= currentRequestAmount) {
                    user.balance -= currentRequestAmount;
                    // Make a new array of all the fund requests that are not the current one
                    user.fund_requests = user.fund_requests.filter((req2) => req2 !== req);

                    userToTransfer = accounts.find(acc => acc.id === currentRequestId);
                    userToTransfer.balance += currentRequestAmount;
                    changeAccountInfo(userToTransfer);
                    console.log(`Request has been paid to the user with ID ${userToTransfer.id}.`);
                } else if (confirmation === "yes" && user.balance < currentRequestAmount) {
                    console.log("You don't have enough money for this transaction.");
                }
            });
            // Update the user info to put in the remaining requests and balance.
            changeAccountInfo(user);
            console.log("Scrolled through all the requests. Returning to main menu.");
        }
    } else console.log("Please log in first.");
};

export {
    withdrawFunds,
    depositFunds,
    transferFunds,
    requestFunds,
    listFundRequests,
    acceptFundRequests,
};
