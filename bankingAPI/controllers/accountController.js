import accountModel from "../models/accountModel.js";

export const createUserId = async () => {
    const accounts = await accountModel.find({});
    let biggestId = 0;
    if (accounts) {
        const userIds = accounts.map((user) => user.id);
        userIds.forEach((id) => {
            if (id > biggestId) biggestId = id;
        });
    }
    return (biggestId + 1);
};

export const addNewAccount = async (req, res) => {
    const userId = await createUserId();
    const {
        name,
        password,
        balance,
        fund_requests,
    } = req.body;
    const account = {
        name,
        password,
        id: userId,
        balance,
        fund_requests,
    };
    const accountData = new accountModel(account);
    await accountData.save();
    res.json(`Welcome ${account.name}! ` +
    `Your account has been created with a balance of ${account.balance}€.`);
};

export const getAccountBalance = async (req, res) => {
    const account = await accountModel.findOne({ id: req.params.id });
    if (account) {
        res.json(`The user with ID ${req.params.id} has a balance of ${account.balance}€.`);
    } else {
        res.status(404).end();
    }
};

export const getAllAccounts = async (req, res) => {
    const accounts = await accountModel.find();
    if (accounts) {
        res.json(accounts);
    } else {
        res.status(404).end();
    }
};

export const withdrawFunds = async (req, res) => {
    const accountInfo = {
        id: req.params.id,
        amount: parseInt(req.params.amount, 10),
        password: req.body.password,
    };
    const account = await accountModel.findOne({ id: accountInfo.id });
    if (account) {
        if (accountInfo.password === account.password) {
            if (account.balance >= accountInfo.amount) {
                const newAccount = await accountModel.findOneAndUpdate({ id: accountInfo.id },
                    { balance: (account.balance - accountInfo.amount) },
                    { new: true });
                res.json(`Successfully withdrew ${accountInfo.amount}€! ` +
                `You now have ${newAccount.balance}€ left.`);
            } else {
                res.json("You don't have enough money for this transaction.");
            }
        } else {
            res.json("Incorrect password.");
        }
    } else {
        res.json(`Account with the ID ${accountInfo.id} doesn't exist.`);
    }
};

export const depositFunds = async (req, res) => {
    const accountInfo = {
        id: req.params.id,
        amount: parseInt(req.params.amount, 10),
        password: req.body.password,
    };
    const account = await accountModel.findOne({ id: accountInfo.id });
    if (account) {
        if (accountInfo.password === account.password) {
            const newAccount = await accountModel.findOneAndUpdate({ id: accountInfo.id },
                { balance: (account.balance + accountInfo.amount) },
                { new: true });
            res.json(`Successfully deposited ${accountInfo.amount}€! ` +
            `You now have ${newAccount.balance}€ on your account.`);
        } else {
            res.json("Incorrect password.");
        }
    } else {
        res.json(`Account with the ID ${accountInfo.id} doesn't exist.`);
    }
};
