const UserInfo = (props) => {
    const user = props;
    const singleUser = () => {
        return ( 
            !user.error ? 
                <div className="user-info-single">
                    <h2>{user.id}. {user.name}</h2>
                    <p className="user-balance">{user.balance}€</p>
                    <p>Fund requests: {user.fund_requests}</p>
                </div>
            : 
                <div className="user-info-single">
                    <h2>{user.account.id}. {user.account.name}</h2>
                    <p className="user-balance">{user.account.balance}€</p>
                    <p>Fund requests: {user.account.fund_requests}</p>
                <p style={{color:"red"}}>You don't have enough money for this transaction.</p>
                </div>
        )
    }
    
    const allUsers = () => {
        if (user){
            return (
                    Object.values(user).map((singleUser, index) => {
                        return (
                            <div className="user-info" key={index}>
                                <h3>{singleUser.name}</h3>
                                <p className="user-balance">{singleUser.balance}€</p>
                                <p>Fund requests: {singleUser.fund_requests}</p>
                            </div>
                        )
                    })
                    
            )
        }
    }
    return user ? user[1] ? allUsers() : singleUser() : <div className="user-info">Please enter a valid ID."</div>;
}

export default UserInfo;