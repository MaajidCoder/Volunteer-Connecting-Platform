import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreateEvent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        requiredVolunteers: 1
    });

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/events', formData);
            toast.success('Event created successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to create event');
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 animate-fade-in">
            <div className="card p-10 border-t-8 border-t-primary-500 shadow-xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create New Event</h2>
                <p className="text-gray-500 mb-8 border-b border-gray-100 pb-6">Fill in the details to publish a volunteering opportunity.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Event Title</label>
                        <input type="text" name="title" required className="input-field bg-gray-50 py-3" placeholder="E.g., Campus Beach Cleanup" value={formData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                        <textarea name="description" required rows="4" className="input-field bg-gray-50 py-3 resize-none" placeholder="Describe the activities, requirements, and goal." value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date</label>
                            <input type="date" name="date" required className="input-field bg-gray-50 py-3" value={formData.date} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Location</label>
                            <input type="text" name="location" required className="input-field bg-gray-50 py-3" placeholder="E.g., North Campus Area" value={formData.location} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Required Volunteers</label>
                        <input type="number" name="requiredVolunteers" min="1" required className="input-field bg-gray-50 py-3 w-32" value={formData.requiredVolunteers} onChange={handleChange} />
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-gray-100 text-right">
                        <button type="button" onClick={() => navigate('/dashboard')} className="btn-outline px-6 py-3 mr-4 text-base font-semibold">Cancel</button>
                        <button type="submit" className="btn-primary px-8 py-3 text-base shadow-lg shadow-primary-500/30">Publish Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
