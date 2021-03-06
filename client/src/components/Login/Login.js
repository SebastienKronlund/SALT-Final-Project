import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Context from "../../contexts/UserContext.js";
import axios from "axios";

import Header from "../static/Header";
import Background from "../static/Background";
import Footer from "../static/Footer";

import "./login.css";

const Login = () => {
	const setUserInfo = useContext(Context).setUserInfo;

	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [loginErrors, setLoginErrors] = useState("");
	const history = useHistory();

	const submitLoginForm = () => {
		axios
			.get("http://localhost:1337/api/mongoDB")
			.then((res) => res.data)
			.then((data) => {
				const fetchedUser = data.filter(
					(user) => user.username.toLowerCase() === inputUsername.toLowerCase()
				)[0];

				if (fetchedUser) {
					console.log("Login success!");
					setUserInfo(fetchedUser);
					history.push("/home");
				} else {
					throw Error("Invalid username or password!");
				}
			})
			.catch((err) => {
				console.log("Error while logging in: ", err.message);
				setLoginErrors("Invalid username or password!");
			});

		setIsLoggingIn(false);
		setInputUsername("");
		setInputPassword("");
	};

	const VerifyUser = async (e) => {
		e.preventDefault();
		setLoginErrors("");
		setIsLoggingIn(true);

		console.log("Logging in");

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password: inputPassword }),
		};

		const check = await fetch(
			`http://localhost:1337/api/mongoDB/userLogin/?username=${inputUsername}`,
			requestOptions
		);
		console.log(check.status);

		if (check.status === 205) {
			console.log("Success in Login");
			submitLoginForm();
		} else {
			setLoginErrors("Invalid username or password!");
			setIsLoggingIn(false);
			setInputUsername("");
			setInputPassword("");
			console.log("Failed in Login");
		}
	};

	return (
		<>
			<Header />
			<Background />
			<section className="login-page">
				<h2 className="login-welcome">Welcome, please sign in below</h2>
				<div className="login-container">
					<form className="login-form" onSubmit={(e) => VerifyUser(e)}>
						<p className="small-text error">{loginErrors === "" ? "" : loginErrors}</p>
						<legend className="login-legend">{isLoggingIn ? "Logging In.." : "Login"}</legend>
						<input
							className="login-input"
							type="text"
							placeholder="Username"
							value={inputUsername}
							onChange={(e) => setInputUsername(e.currentTarget.value)}
							required
						/>
						<input
							className="login-input"
							type="password"
							placeholder="Password"
							value={inputPassword}
							onChange={(e) => setInputPassword(e.currentTarget.value)}
							required
						/>
						<button className="login-button" type="submit" disabled={isLoggingIn}>
							Submit
						</button>
					</form>
					<Link to="/create-user" className="login-alt">
						<p>Or click here if you don’t already have an account</p>
					</Link>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Login;
