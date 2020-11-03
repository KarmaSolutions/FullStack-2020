import readline from "readline-sync";
import * as fs from "fs";

function getAccountList() {
    let accounts = [];
    try {
        const jsonString = fs.readFileSync("./accounts.json");
        accounts = JSON.parse(jsonString);
    } catch (err) {
        console.log(err);
        return;
    }
    return accounts;
}

const addAccount = (name, password, id, balance) => {
    const account = {
        name,
        password,
        id,
        balance,
        fund_requests: [],
    };

    let accounts = getAccountList();
    accounts = [...accounts, account];
    const jsonString = JSON.stringify(accounts);
    fs.writeFileSync("./accounts.json", jsonString, err => {
        if (err) {
            console.log("Error writing file", err);
        } else {
            console.log("Successfully wrote file");
        }
    });
};

const closeAccount = () => {
    const accounts = getAccountList();
    const userId = parseInt(readline.question("Please give the ID of the " +
    "account you want to close: "));

    const newAccounts = accounts.filter((acc) => acc.id !== userId);
    const jsonString = JSON.stringify(newAccounts);
    fs.writeFileSync("./accounts.json", jsonString, err => {
        if (err) {
            console.log("Error writing file", err);
        } else {
            console.log("Successfully wrote file");
        }
    });
    console.log(`Account ${userId} successfully closed.`);
};

const listAccounts = () => {
    const accounts = getAccountList();
    console.log("------------------");
    console.log(`Amount of accounts: ${accounts.length}`);
    accounts.forEach((user) => console.log(`${user.id}. ${user.name}. ${user.balance} euros.`));
    console.log("------------------");
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

const changeAccountInfo = (newAccountInfo) => {
    let accounts = getAccountList();
    const account = accounts.find((user) => user.id === newAccountInfo.id);
    if (account) {
        account.name = newAccountInfo.name;
        account.id = newAccountInfo.id;
        account.password = newAccountInfo.password;
        account.balance = newAccountInfo.balance;
        account.fund_requests = newAccountInfo.fund_requests;
    }
    // Kirjoitetaan uusi tietokanta JSONArrayhyn
    const jsonString = JSON.stringify(accounts);
    fs.writeFileSync("./accounts.json", jsonString, err => {
        if (err) {
            console.log("Error writing file", err);
        } else {
            console.log("Successfully wrote file");
        }
    });
};

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
        if (deposit === "exit") return;
        deposit = parseInt(deposit);
    }

    const userId = createUserId();

    addAccount(name, password, userId, deposit);
    console.log(`Good job ${name}! You now have an account (ID: ${userId})` +
    `with a balance of ${deposit}.`);
    listAccounts();
};

const validateUser = () => {
    let id = 0;
    let user = [];
    let password = "";

    id = readline.question("What is your account ID? ");
    id = parseInt(id);
    let accounts = getAccountList();

    while (!accounts.find(acc => acc.id === id)) {
        console.log(`Unfortunately we can't find an account with the ID ${id}.`);
        id = readline.question("Please give a valid ID (or type exit to go back to the menu): ");
        if (id === "exit") return false;
        id = parseInt(id);
    }
    user = accounts.find(acc => acc.id === id);

    password = readline.question("Please enter your password: ");
    while (user.password !== password) {
        password = readline.question("Incorrect password. Please try again: ");
        // Jos käyttäjä on päättänyt laittaa salasanaksi exit, käy huonosti!
        if (password === "exit") {
            return false;
        }
    }

    return user;
};

const doesAccountExist = () => {
    let id = readline.question("What is the ID of the account? ");
    id = parseInt(id);
    const accounts = getAccountList();

    if (accounts.find(acc => acc.id === id)) {
        console.log("Awesome! This account actually exists. ");
        return id;
    }
    console.log("Mhmm, unfortunately an account with that ID does not exist.");
    return false;
};

const modifyAccount = () => {
    let user = [];
    let newName = "";

    console.log("Mhmm, you want to modify an accounts stored name. We can definitely do that!");
    user = validateUser();

    if (user !== false) {
        newName = readline.question(`Awesome, we validated you ${user.name}!` +
        "What is the new name for the account holder? ");
        while (newName === user.name) {
            console.log("Mhmm, I’m quite sure this is the same name.");
            newName = readline.question("Try typing it out again: ");
            if (newName === "exit") {
                return;
            }
        }
        user.name = newName;
        changeAccountInfo(user);
        console.log(`Ah, there we go. We will address you as ${user.name} from now on.`);
    }
};

const logIn = () => {
    const user = validateUser();
    if (user !== "false") {
        const loggedIn = user.id;
        console.log(`Welcome ${user.name}! You are now logged in.`)
        return loggedIn;
    }
    return NaN;
};

const logOut = (loggedIn) => {
    let logOutMsg = "";
    let logInId = loggedIn;

    if (Number.isNaN(logInId)) {
        console.log("No user is currently logged in.");
    } else {
        logOutMsg = readline.question("Are you sure you want to log out? (yes or no) ");

        while (logOutMsg !== "yes" && logOut !== "no") {
            logOutMsg = readline.question("Please type yes or no: ");
        }
        if (logOutMsg === "yes") {
            logInId = NaN;
            console.log("You're now logged out. See you later alligator!");
            return NaN;
        }
        return logInId;
    }
}

export {
    createAccount,
    addAccount,
    createUserId,
    listAccounts,
    getAccountList,
    changeAccountInfo,
    validateUser,
    doesAccountExist,
    modifyAccount,
    logIn,
    logOut,
    closeAccount,
};
