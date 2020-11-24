import React, { useState } from "react";

const EditUser = (props) => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    const { editUser } = props;
    const onSubmit = (event) => {
        event.preventDefault();
        editUser(name, password);
    }

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={onSubmit}>
                <p>Name:</p>
                <input className="form-input" id="name" onChange = {(e) => setName(e.target.value)}/>
                <p>Password:</p>
                <input className="form-input" type="password" id="password" onChange = {(e) => setPassword(e.target.value)} />
                <br />
                <button style={{width:"250px", marginTop:"20px"}} className="myButton" type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default EditUser;