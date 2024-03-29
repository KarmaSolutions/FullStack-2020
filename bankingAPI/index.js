import * as fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const filePath = "../bankingApp/accounts.json"
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get the accountlist from accounts.json in the bankingApp directory
const getAccountList = () => {
    let accounts = [];
    try {
        const jsonString = fs.readFileSync(filePath);
        accounts = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
        return;
    }
    return accounts;
};

const createUserId = () => {
    const accounts = getAccountList();
    const userIds = accounts.map((user) => user.id);
    let biggestId = 0;
    userIds.forEach((id) => {
        if (id > biggestId) biggestId = id;
    });
    return (biggestId + 1);
};

// Update the accountlist from accounts.json in the bankingApp directory
const updateAccountList = (newAccounts) => {
    const jsonString = JSON.stringify(newAccounts);
    fs.writeFileSync(filePath, jsonString, err => {
        if (err) {
            console.log("Error writing file", err);
        } else {
            console.log("Successfully wrote file");
        }
    });
};

// Create a new user on the Banking CLI
app.post("/bank/user", (req, res) => {
    const accounts = getAccountList();
    const newId = createUserId();

    const account = {
        name: req.body.name,
        password: req.body.password,
        id: newId,
        balance: req.body.balance,
        fund_requests: [],
    };

    const newAccounts = [...accounts, account];
    if (updateAccountList(newAccounts)) {
        res.send(account);
    } else {
        res.send("Error creating account:" + res.error);
    }
});

// Get the balance of given account from the Banking CLI
app.get("/bank/:id/balance", (req, res) => {
    const accounts = getAccountList();
    const account = accounts.find((user) => user.id === parseInt(req.params.id, 10));
    if (account) {
        res.json(account);
    } else {
        res.json({ error: `User with the ID ${req.params.id} can't be found.` });
    }
});

// Withdraw funds from the given user
app.put("/bank/:user_id/withdraw", (req, res) => {
    const accounts = getAccountList();
    const userId = parseInt(req.params.user_id, 10);
    let account = accounts.find((a) => a.id === userId);
    // console.log(req.body);
    // console.log(req.params.user_id);
    if (account) {
        if (account.balance >= req.body.amount) {
            account.balance -= req.body.amount;

            let newAccounts = accounts.filter((acc) => acc.id !== userId);
            newAccounts = [...newAccounts, account];
            updateAccountList(newAccounts);
            res.json(account);
        } else {
            res.json("You don't have enough money for this transaction.");
        }
    } else {
        res.json("No such ID found.");
    }
});

// Deposit funds to the given user
app.put("/bank/:user_id/deposit", (req, res) => {
    const accounts = getAccountList();
    const userId = parseInt(req.params.user_id, 10);
    let account = accounts.find((a) => a.id === userId);
    // console.log(req.body);
    // console.log(req.params.user_id);
    if (account) {
        account.balance += req.body.amount;

        let newAccounts = accounts.filter((acc) => acc.id !== userId);
        newAccounts = [...newAccounts, account];
        updateAccountList(newAccounts);
        res.json(account);
    } else {
        res.json("No such ID found.");
    }
});

// Tätä käytetään demovaiheessa, voi olla erittäin hyödyllinen debuggausvaiheessa.
app.use((req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log(`BODY: ${req.body}`);
    console.log(`QUERY: ${req.query}`);
    console.log("-----------------");
    next(); // Eteenpäin seuraavaan funktioon
});
app.listen(5000);
