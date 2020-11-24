import React, { useState } from "react";

const AccountInfoComponent = (props) => {
    const { route, setRoute, getData } = props;
    const [text, setText] = useState();

    return (
        <div className="account-info">
            <p>Enter user ID:
                <input type="number" className="id-input" onChange = {(e) => {
                    setText(`user/${e.target.value}`);
                }}
                />
                <button className="myButton" onClick = {() => {
                        setRoute(text);
                        getData(text);
                    }
                }
                >GO</button>
            </p>
            <p>Current User ID: {route ? <b>{route.split("/")[1]}</b> : "Undefined"}</p>
        </div>
    )
}

export default AccountInfoComponent;