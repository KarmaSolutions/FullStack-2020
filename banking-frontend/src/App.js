import { useState, useEffect } from "react";
import axios from "axios";
import AccountInfoComponent from "./components/accountInfo.jsx";
import UserInfo from "./components/userinfo.jsx";
import DepositView from "./components/depositView.jsx";
import WithdrawView from "./components/withdrawView.jsx";
import CreateNewUser from "./components/createNewUserView.jsx";
import EditUser from "./components/editUserView.jsx";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import "./style.css";


function App() {
  const [data, setData] = useState();
  const [route, setRoute] = useState();
  const [userModifyingSuccessful, setUserModifyingSuccessful] = useState(undefined);
  const url = "http://localhost:5000/bank";

  useEffect(() => {
    let interval = setInterval(() => {
      setUserModifyingSuccessful(undefined);
    }, 10000);
  
    return () => clearInterval(interval);
  })

  const getData = async (input) => {
    const completeUrl = `${url}/${input}`;
    const response = await axios({
      method: 'get',
      url: completeUrl,
      headers: {},
      contentType: 'application/json',
      responseType: 'json',
      data: {
      }
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setData();
      });

  };

  const depositMoney = async (amount) => {
    const response = await axios({
      method: "put",
      url : `${url}/deposit/${data.id}`,
      headers: {},
      contentType: "application/json",
      responseType: "json",
      data: {
        amount
      }
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const withdrawMoney = async (amount) => {
    const userId = route.split("/")[1];
    const response = await axios({
      method: "put",
      url : `${url}/withdraw/${userId}`,
      headers: {},
      contentType: "application/json",
      responseType: "json",
      data: {
        amount
      }
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  const addNewUser = async (name, password, balance) => {
    const response = await axios({
      method: "post",
      url: `${url}/new`,
      headers: {},
      contentType: "application/json",
      responseType: "json",
      data: {
        name,
        password,
        balance
      }
    }).then((response) => {
      setUserModifyingSuccessful(true);
      console.log(response);
    }).catch((error) => {
      setUserModifyingSuccessful(false);
      console.log(error);
    })
  }

  const editUser = async (name, password) => {
    console.log(`${url}/${route}/edit`);
    console.log(password);
    const response = await axios({
      method: "put",
      url: `${url}/${route}/edit`,
      headers: {},
      contentType: "application/json",
      responseType: "json",
      data: {
        name,
        password,
      }
    }).then((response) => {
      setUserModifyingSuccessful(true);
      setData(response.data);
      console.log(response);
    }).catch((error) => {
      setUserModifyingSuccessful(false);
      console.log(error);
    })
  }

  return (
    <div>
      <Router>
        <div className="App">
          <header>
            <nav>
              <Link to="/"> Home </Link>
              <Link to="/accountinfo" onClick={() => getData(route)}> Account Info </Link>
              <Link to="/deposit" onClick={() => getData(route)}> Deposit Funds </Link>
              <Link to="/withdraw" onClick={() => getData(route)}> Withdraw Funds </Link>
              <Link to="/allusers" onClick={() => getData("allusers")}> List users </Link>
              <Link to="/newuser" onClick={() => getData(route)}>Create User</Link>
              <Link to="/edituser" onClick={() => getData(route)}>Edit User</Link>
            </nav>
            {!window.location.pathname.includes('/allusers') ? <AccountInfoComponent
              route = {route}
              setRoute = {(inputRoute) => setRoute(inputRoute)}
              getData = {(inputRoute) => getData(inputRoute)}
            />
              : ""
            }
          </header>
          <main>
            <Route exact path="/" render={() => (
              <div> 
                <h1>Welcome to Karma Banking!</h1>
                <p>Click on the buttons on the navigation bar to get started.</p>
                <br/>
                <br/>
              </div>
            )} />

            <Route exact path="/accountinfo" render={() => (
              <div>
                <h1>Account Info</h1>
                {data !== undefined ? <UserInfo {...data} /> : <p>Please enter a valid ID.</p>}
              </div>
            )} />

            <Route exact path="/allusers" render={() => (
              <div>
                <h1>All Users</h1>
                {data !== undefined ? <UserInfo {...data} /> : <p>No users found.</p>}
              </div>
            )} />

            <Route exact path="/deposit" render={() => (
              <div>
                <h1>Deposit Funds</h1>
                {data !== undefined ? <UserInfo {...data} /> : <p>Please enter a valid ID.</p>}
                {data !== undefined ? 
                  <DepositView
                    depositMoney = {(amount) => depositMoney(amount)}
                  />
                  : "" 
                }
              </div>
            )} />
          
            <Route exact path="/withdraw" render={() => (
              <div>
                <h1>Withdraw Funds</h1>
                {data !== undefined ? <UserInfo {...data} /> : <p>Please enter a valid ID.</p>}
                {data !== undefined ? 
                  <WithdrawView
                    withdrawMoney = {(amount) => withdrawMoney(amount)}
                  /> 
                  : "" 
                }
              </div>
            )} />

            <Route exact path="/newuser" render={() => (
              <div>
                <p></p>
                  <CreateNewUser 
                    addNewUser = {(name, password, balance) => addNewUser(name, password, balance)}
                  />
                  {userModifyingSuccessful !== undefined ? userModifyingSuccessful
                  ? <p style={{color:"green", lineHeight:"20px"}}>User created successfully!</p>
                  : <p style={{color:"red", lineHeight:"20px"}}>User creation failed.</p>
                  : <p></p>}
              </div>
            )} />

            <Route exact path="/edituser" render={() => (
              <div>
                <EditUser 
                  editUser = {(name, password) => editUser(name, password)}
                />
                <h2>Current User Info:</h2>
                {data !== undefined ? <UserInfo {...data} /> : <p>Please enter a valid ID.</p>}
                {userModifyingSuccessful !== undefined ? userModifyingSuccessful
                  ? <p style={{color:"green", lineHeight:"20px"}}>User info edited successfully!</p>
                  : <p style={{color:"red", lineHeight:"20px"}}>User editing failed.</p>
                  : <p></p>}
              </div>
            )} />

          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
