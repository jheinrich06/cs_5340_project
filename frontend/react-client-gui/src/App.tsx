import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import AuthDashboard from "./pages/authDashboard";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Router>
				<div className="container">
					<main>
						<Routes>
							<Route path="/user" element={<AuthDashboard />} />
							<Route path="/" element={<LoginPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
						</Routes>
					</main>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
