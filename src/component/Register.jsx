import React, {useState, useEffect} from "react";
import {Route, Redirect} from 'react-router-dom';
import Home from './Home';
import jwt_decode from "jwt-decode";
import '../App.css';

const Register = () => {
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
            body: JSON.stringify({email: username, password: password, coin: 100, favoris: [], bet: []})
        };
        const response = await fetch('http://localhost:3003/register', requestOptions);
        const data = await response.json();
        if (data.accessToken != null) {
            setUser(data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.accessToken));
            localStorage.setItem("email", username);
            localStorage.setItem("password", password);
            const decoded = jwt_decode(data.accessToken);
            localStorage.setItem("id", decoded.sub);
        }

        if (data === "Email already exists") {
            alert("Email already exists");
        }
    };

    if (user) {
        return (
            <div>
                <Route exact path="/register">
                    <Redirect to="/home"/> : <Home/>
                </Route>
            </div>
        );
    }

    return (
        <div className="container">

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
                <button type="submit">Create account</button>
            </form>
        </div>
    );
};

export default Register;