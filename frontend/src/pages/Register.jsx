import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'volunteer'
    });

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success('Registration successful!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 card p-8 border-t-4 border-t-primary-600 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
            <p className="text-center text-gray-500 mb-8">Join the Volunteer Platform</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" required className="input-field" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" required className="input-field" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" required className="input-field" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">I want to...</label>
                    <select name="role" className="input-field" value={formData.role} onChange={handleChange}>
                        <option value="volunteer">Volunteer for events</option>
                        <option value="organizer">Organize events (Clubs/Faculty)</option>
                    </select>
                </div>
                <button type="submit" className="btn-primary w-full py-3 mt-4 text-lg">Register</button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Login</Link>
            </p>
        </div>
    );
}
