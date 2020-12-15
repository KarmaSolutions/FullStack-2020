import React, { useState } from "react";

const WithdrawView = (props) => {
    const { withdrawMoney } = props;
    const [amount, setAmount] = useState();

    return (
        <div className="modify-user-info-container">
            <p>Please enter the amount of money you want to withdraw.</p>
            <input type="number" className="amount-input" onChange={(e) => {
                setAmount(e.target.value);
                }
            }/>
            <button className="myButton" onClick={() => {
                withdrawMoney(amount);
                }
            }> 
                Withdraw
            </button>
        </div>
    )
}

export default WithdrawView;
