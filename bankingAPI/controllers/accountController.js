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
    if (name && password && balance) {
        const account = {
            name,
            password,
            id: userId,
            balance: parseInt(balance, 10),
            fund_requests,
        };
        const accountData = new accountModel(account);
        await accountData.save();
        res.json(account);
    } else {
        res.status(400).json({ error: "Invalid parameters." });
    }
};

export const getAccountBalance = async (req, res) => {
    const account = await accountModel.findOne({ id: req.params.id });
    if (account) {
        res.json(account);
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

export const editUser = async (req, res) => {
    const accountInfo = {
        id: req.params.id,
        name: req.body.name,
        password: req.body.password,
    };
    const account = await accountModel.findOne({ id: accountInfo.id });
    if (account) {
        if (accountInfo.name && accountInfo.password) {
            const newAccount = await accountModel.findOneAndUpdate({ id: accountInfo.id },
                {
                    name: accountInfo.name,
                    password: accountInfo.password,
                },
                { new: true });
            res.json(newAccount);
        } else {
            res.status(400).json({
                account,
                error: "Invalid parameters.",
            });
        }
    } else {
        res.json(`Account with the ID ${accountInfo.id} doesn't exist.`);
    }
};

export const withdrawFunds = async (req, res) => {
    const accountInfo = {
        id: req.params.id,
        amount: parseInt(req.body.amount, 10),
    };
    const account = await accountModel.findOne({ id: accountInfo.id });
    if (account) {
        if (account.balance >= accountInfo.amount) {
            const newAccount = await accountModel.findOneAndUpdate({ id: accountInfo.id },
                { balance: (account.balance - accountInfo.amount) },
                { new: true });
            res.json(newAccount);
        } else {
            res.json({
                account,
                error: "You don't have enough money for this transaction.",
            });
        }
    } else {
        res.json(`Account with the ID ${accountInfo.id} doesn't exist.`);
    }
};

export const depositFunds = async (req, res) => {
    const accountInfo = {
        id: req.params.id,
        amount: parseInt(req.body.amount, 10),
    };
    const account = await accountModel.findOne({ id: accountInfo.id });
    if (account) {
        const newAccount = await accountModel.findOneAndUpdate({ id: accountInfo.id },
            { balance: (account.balance + accountInfo.amount) },
            { new: true });
        res.json(newAccount);
    } else {
        res.json(`Account with the ID ${accountInfo.id} doesn't exist.`);
    }
};
