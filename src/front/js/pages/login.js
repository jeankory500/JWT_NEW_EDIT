import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";    

export default function Login() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      await actions.login(email, password);
    } catch (e) {
      setError("An error occurred during login. Please try again.");
      console.error(e);
    }
  };

  useEffect(() => {
    // Redirect if token exists
    if (store.token && store.token !== "" && store.token !== undefined) navigate("/");
  }, [store.token, navigate]);

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      {
        store.token && store.token !== "" && store.token !== undefined 
        ? "You are logged in with this token " + store.token
        : (
          <div>
            <form onSubmit={handleSubmit}>
              {error && <p style={{color: 'red'}}>{error}</p>}
              <label>
                Email: 
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit">Login</button>
            </form>
            <button onClick={() => navigate("/signup")}>Register</button>
          </div>
        )
      }
    </div>
  );
}
