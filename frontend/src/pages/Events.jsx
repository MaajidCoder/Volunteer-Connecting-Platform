import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/events').then(res => {
            setEvents(res.data.data);
            setLoading(false);
        }).catch(err => {
            toast.error('Failed to load events');
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-center py-20 text-gray-500 text-lg">Loading events...</div>;

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Opportunities</h1>
                    <p className="text-gray-500">Discover and join events that matter.</p>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-16 text-gray-500 card bg-gray-50 border-dashed">
                    <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg">No events found. Check back later!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event._id} className="card p-6 flex flex-col h-full border-t-4 border-t-transparent hover:border-t-primary-500 transition-all duration-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow">{event.description}</p>
                            
                            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center text-sm text-gray-700">
                                    <Calendar className="w-4 h-4 mr-3 text-primary-500" />
                                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <MapPin className="w-4 h-4 mr-3 text-primary-500" />
                                    {event.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-700">
                                    <Users className="w-4 h-4 mr-3 text-primary-500" />
                                    {event.requiredVolunteers} Volunteers required
                                </div>
                            </div>
                            <Link to={`/events/${event._id}`} className="btn-outline text-center w-full mt-auto block hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200">
                                View Details & Apply
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
