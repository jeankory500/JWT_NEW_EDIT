import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export default function PrivatePage() {
    const { store, actions } = useContext(Context);
    const isAuthenticated = store.token && store.token !== "" && store.token !== undefined;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);  // Added dependency to re-run effect when `isAuthenticated` changes

    useEffect(() => {
        if (isAuthenticated) {
            actions.private_route();
        }
    }, [isAuthenticated, actions]); // Added dependencies

    return (  // Added parentheses to ensure the following JSX is returned properly
        <div>
            <h1>You are logged in</h1>
        </div>
    );
}
