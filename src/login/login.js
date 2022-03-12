import React, {useState, useEffect} from "react";
import {Route, Redirect, Link} from 'react-router-dom';
import Home from '../component/Home';
import jwt_decode from "jwt-decode";
import '../App.css';

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: username, password: password})
        };
        const response = await fetch('http://localhost:3003/login', requestOptions);
        const data = await response.json();
        if (data.accessToken != null) {
            setUser(data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.accessToken));
            localStorage.setItem("email", username);
            localStorage.setItem("password", password);
            const decoded = jwt_decode(data.accessToken);
            localStorage.setItem("id", decoded.sub);
        }
    };

    if (user) {
        return (
            <div>
                <Route exact path="/">
                    <Redirect to="/home"/> : <Home/>
                </Route>
            </div>
        );
    }

    return (
        <div class="container">

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email Address: </label>
                <input
                    type="text"
                    value={username}
                    placeholder="enter a username"
                    onChange={({target}) => setUsername(target.value)}
                />
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="enter a password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">sign in</button>
                <Link class="lien" to={`/register`}>
                    <button type="submit" style={{"margin-left": "10px"}}>sign up</button>
                </Link>
            </form>
        </div>
    );
};

export default App;