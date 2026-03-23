import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 card p-8 border-t-4 border-t-primary-600 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-center text-gray-500 mb-8">Login to your account</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" required className="input-field" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" required className="input-field" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary w-full py-3 mt-4 text-lg">Login</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Register</Link>
            </p>
        </div>
    );
}
