import React, { PureComponent } from "react";

import "./Login.scss";

export default class Login extends PureComponent {
    state = {
        username: "",
        password: "",
    };

    handleLogin = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.username, this.state.password);
        this.setState({ username: "", password: "" });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <>
                <h1>Country Comparison</h1>
                {this.props.loginError && (
                    <div className="login-error" role="alert">
                        {this.props.loginError}
                    </div>
                )}
                <form className="login-form" onSubmit={this.handleLogin}>
                    <h2>Login</h2>
                    <input
                        className="login-form__input"
                        type="text"
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChange}
                        placeholder="Username"
                    />
                    <input
                        className="login-form__input"
                        type="text"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Password"
                    />
                    <button type="submit" className="login-form__btn">
                        Login
                    </button>
                </form>
            </>
        );
    }
}
