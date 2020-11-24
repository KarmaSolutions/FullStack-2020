import React, { useState } from "react";
import "../style.css";

const CreateNewUser = (props) => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [balance, setBalance] = useState();

    const { addNewUser } = props;
    const onSubmit = (event) => {
        event.preventDefault();
        addNewUser(name, password, balance);
    }
/*
    const onChangeText = (e) => {
        if (e.target.value.includes("@")) {
            setText(e.target.value);
        } else {
            e.target.value = "";
        }
    }
*/
    return (
        <div>
            <h1>Create a new user</h1>
            <form onSubmit={onSubmit}>
                <p>Name:</p>
                <input className="form-input" id="name" onChange = {(e) => setName(e.target.value)}/>
                <p>Password:</p>
                <input className="form-input" type="password" id="password" onChange = {(e) => setPassword(e.target.value)} />
                <p>Deposit:</p>
                <input className="form-input" type="number" id="balance" onChange = {(e) => setBalance(e.target.value)} />
                <br />
                <button style={{width:"250px", marginTop:"20px"}} className="myButton" type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default CreateNewUser;