import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    name: String,
    password: String,
    id: Number,
    balance: Number,
    fund_requests: Array,
});

const accountModel = mongoose.model("account", accountSchema);
mongoose.set("useFindAndModify", false);

export default accountModel;
