import readline from "readline-sync";
let accounts = [];
console.log("Welcome to Karma banking CLI!");

const printHelp = () => {
    // Tämä pitää vielä korjata
    console.log("I’m glad to help you :) Here’s a list of commands you can use! \n\
    Accounts \n\
    create_account -- > Opens dialog for creating an account. \n\
    close_account -- > Opens a dialog for closing an account. \n\
    modify_account -- > Opens a dialog for modifying an account. \n\
    does_account_exist -- > Opens a dialog for checking if the account exists. \n\
    log_in -- > Opens a dialog for logging in. \n\
    logout -- > Opens a dialog for logging out. \n\
    Funds \n\
    withdraw_funds -- > Opens a dialog for withdrawing funds. \n\
    deposit_funds -- > Opens a dialog for depositing funds. \n\
    transfer_funds -- > Opens a dialog for transferring funds to another account. \n\
    Requests \n\
    request_funds -- > Opens a dialog for requesting another user for funds. \n\
    funds_requests -- > Shows all the requests for the account funds. \n\
    accept_fund_request -- > Opens a dialog for accepting a fund request.")
}
const addAccount = (name, password, id, deposit) => {
    const account = {
        name,
        id,
        deposit,
        password,
        fund_requests: [],
    };
    accounts = [...accounts, account];
}

const listAccounts = () => {
    console.log("------------------");
    console.log("List of accounts:")
    console.log("Amount of accounts: " + accounts.length);
    accounts.forEach((user) => console.log(user.id + ". " + user.name + ". " + user.deposit + " euros."));
    console.log("------------------");
}
// Säilö käyttäjät JSONArrayhin !!!


const createUserId = () => {
    const userIds = accounts.map(user => user.id);
    let biggestId = 0;
    userIds.forEach((id) => {
        if (id > biggestId ) biggestId = id;
    })
    return (biggestId + 1);
}

const createAccount = () => {
    console.log("----------------------------------");
    console.log("--------CREATE AN ACCOUNT---------");
    console.log("----------------------------------");
    const name = readline.question("What is your name? ");
    console.log(`Hello ${name}! Welcome to Karma Banking!`);
    const password = readline.question("Please enter a password: ");
    let deposit = readline.question("How much money would you like to deposit? (Minimum is 10) ");
    deposit = parseInt(deposit);

    while (deposit < 10 || Number.isNaN(deposit)) {
        console.log("Unfortunately we can't open an account with less than 10 euros deposited.");
        deposit = readline.question("Please enter a number of 10 or more: ");
        if (deposit === "exit") break;
        deposit = parseInt(deposit);
    }

    const userId = createUserId();

    addAccount(name, password, userId, deposit);
    console.log(`Good job ${name}! You now have an account (ID: ${userId}) with a balance of ${deposit}.`);
    listAccounts();
}

const withdrawFunds = () => {
    let id = 0;
    let user = [];
    let password = "";
    let withdrawAmount = 0;

    console.log("Okay, let’s whip up some cash for you from these ones and zeroes.");
    id = readline.question("What is your account ID? ");
    id = parseInt(id);
    while (!accounts.find(acc => acc.id === id)) {
        console.log("Unfortunately we can't find an account with the ID " + id + ".");
        id = readline.question("Please give a valid ID (or type exit to go back to the menu): ");
        if (id === "exit") return;
        id = parseInt(id);
    }
    user = accounts.find(acc => acc.id === id);

    password = readline.question("Please enter your password: ");
    while (user.password !== password) {
        password = readline.question("Incorrect password. Please try again: ");
        // Jos käyttäjä on päättänyt laittaa salasanaksi exit, käy huonosti!
        if (password === "exit") {
            return;
        }
    }
    console.log(`Welcome ${user.name}!`);
    withdrawAmount = readline.question(`How much do you want to withdraw? (Current balance: ${user.deposit})`);
    withdrawAmount = parseInt(withdrawAmount);
    while (withdrawAmount > user.deposit) {
        withdrawAmount = readline.question("Unfortunately you don't have that much money. Try again: ");
        if (withdrawAmount === "exit") {
            return;
        }
    }
    // TÄSTÄ JATKUU PERJANTAINA 

}

addAccount("Lassi", "cheekymonkey", 1, 24);
listAccounts();
while (true) {
    const input = readline.question("Enter a command. (Type help to see a list of commands.)");
    if (input === "exit") {
        break;
    } else if (input === "help") {
        printHelp();
    } else if (input === "create_account") {
        createAccount();
    } else if (input === "withdraw_funds") {
        withdrawFunds();
    } else {
        console.log(`${input} isn't a valid command. Please try again.`)
    }
}