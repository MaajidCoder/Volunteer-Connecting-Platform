import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Calendar, MapPin, Users, HeartHandshake, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/events/${id}`).then(res => {
            setEvent(res.data.data);
            setLoading(false);
        }).catch(err => {
            toast.error('Failed to load event');
            navigate('/events');
        });
    }, [id, navigate]);

    const handleApply = async () => {
        if (!user) {
            toast.error('Please login to apply');
            return navigate('/login');
        }
        
        try {
            await axios.post('/applications', { eventId: id });
            toast.success('Successfully applied to event!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to apply');
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse">Loading event details...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 animate-fade-in">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 font-medium hover:text-primary-600 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to events
            </button>
            
            <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-10 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 relative z-10 leading-tight">{event.title}</h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-6 text-primary-100 relative z-10 font-medium">
                        <span className="flex items-center bg-primary-900/30 px-4 py-2 rounded-lg">
                            <Calendar className="w-5 h-5 mr-3 text-primary-300"/> 
                            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center bg-primary-900/30 px-4 py-2 rounded-lg">
                            <MapPin className="w-5 h-5 mr-3 text-primary-300"/> 
                            {event.location}
                        </span>
                    </div>
                </div>
                
                <div className="p-10">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center">
                            <Users className="w-10 h-10 p-2 bg-primary-50 text-primary-600 rounded-full mr-4" />
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Volunteers Required</p>
                                <p className="text-xl font-bold text-gray-900">{event.requiredVolunteers} People</p>
                            </div>
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">About the opportunity</h3>
                    <p className="text-gray-700 leading-relaxed max-w-3xl whitespace-pre-wrap text-lg">{event.description}</p>
                    
                    <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                        <div className="text-gray-600">
                            Organized by <strong className="text-gray-900 text-lg block mt-1">{event.organizerId?.name || 'Someone'}</strong>
                        </div>
                        {user?.role === 'volunteer' && (
                            <button onClick={handleApply} className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 flex items-center font-bold text-lg px-8 py-4 rounded-xl transition duration-300 transform hover:-translate-y-1">
                                <HeartHandshake className="w-6 h-6 mr-3" /> Apply Now
                            </button>
                        )}
                        {!user && (
                            <button onClick={() => navigate('/login')} className="bg-primary-600 hover:bg-primary-700 text-white flex items-center shadow-lg font-bold text-lg px-8 py-4 rounded-xl transition-colors">
                                Login to Apply
                            </button>
                        )}
                        {user?.role === 'organizer' && (
                            <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-6 py-4 rounded-xl font-medium">
                                Organizers cannot apply for events
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
