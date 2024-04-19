// LoginForm.js

import React, { useState } from 'react';
import './LoginForm.css'; // Importujemy plik z naszymi stylami

function LoginForm({ onLogin, switchToExtendedRegistration }) {
    const [formData, setFormData] = useState({
        nickname: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(formData);
    };

    return (
        <form className="login-form">
            <div className="form-group">
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="Nickname"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <div className="form-group">
                <span className="extended-registration" onClick={switchToExtendedRegistration}>Don't have an account?</span>
            </div>
            <div className="form-group">
                <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </form>
    );
}

export default LoginForm;
