import * as fs from "fs";
import express from "express";
import mongoose from "mongoose";
import accountRouter from "../routes/accountRouter.js"; // Default exportti

const app = express();
const mongoUrl = "mongodb://localhost:27017/accountdb";

// async function connectMongoose() {} || Näinkin voi kirjoittaa allaolevan rivin.
const connectMongoose = async () => {
    await mongoose.connect(
        mongoUrl,
        { useNewUrlParser: true, useUnifiedTopology: true },
    );
};

connectMongoose();
app.use(express.json());
app.use("/bank/", accountRouter);

// Tätä käytetään demovaiheessa, voi olla erittäin hyödyllinen debuggaamisessa.
app.use((req, res, next) => {
    console.log(`METHOD: ${req.method}`);
    console.log(`PATH: ${req.path}`);
    console.log(`BODY: ${req.body}`);
    console.log(`QUERY: ${req.query}`);
    console.log("-----------------");
    next(); // Eteenpäin seuraavaan funktioon
});

app.listen(5000, () => {
    console.log("Listening to port 5000");
});
