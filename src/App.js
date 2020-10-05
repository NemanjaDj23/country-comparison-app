import React, { PureComponent } from "react";

import Dashboard from "./screens/Dashboard/Dashboard";
import Login from "./screens/Login/Login";

export default class App extends PureComponent {
    static credentials = {
        username: "admin",
        password: "admin",
    };

    state = {
        loggedIn: false,
        loginError: "",
    };

    handleLogin = (username, password) => {
        if (username === App.credentials.username && password === App.credentials.password) {
            this.setState({ loggedIn: true, loginError: "" });
        } else {
            this.setState({ loggedIn: false, loginError: "Wrong username or password!" });
        }
    };

    handleLogout = () => {
        this.setState({ loggedIn: false });
    };

    render() {
        return (
            <div className="container">
                {this.state.loggedIn ? (
                    <Dashboard onLogout={this.handleLogout} />
                ) : (
                    <Login onLogin={this.handleLogin} loginError={this.state.loginError} />
                )}
            </div>
        );
    }
}
