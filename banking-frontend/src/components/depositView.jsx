import React, { useState } from "react";

const DepositView = (props) => {
    const { depositMoney } = props;
    const [amount, setAmount] = useState();

    return (
        <div className="modify-user-info-container">
            <p>Please enter the amount of money you want to deposit.</p>
            <input type="number" className="amount-input" onChange={(e) => {
                setAmount(e.target.value);
                }
            }/>
            <button className="myButton" onClick={() => {
                depositMoney(amount);
                }
            }> 
                Deposit
            </button>
        </div>
    )
}

export default DepositView;
