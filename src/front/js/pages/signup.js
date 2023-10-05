import React, { useState, useContext } from "react";  // Import useContext
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();  // Prevent default form submission

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {  // Ensure proper environment variable naming and URL formatting
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 201) {
                navigate("/login");
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};
