import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        fetchApplications();
    }, [user]);

    const fetchApplications = () => {
        axios.get('/applications').then(res => {
            setApplications(res.data.data);
            setLoading(false);
        }).catch(err => {
            toast.error('Failed to load dashboard data');
            setLoading(false);
        });
    };

    const handleUpdateStatus = async (appId, status) => {
        try {
            await axios.put(`/applications/${appId}`, { status });
            toast.success(`Application marked as ${status}`);
            fetchApplications();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || err.message || 'Failed to update status');
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;

    const renderVolunteerDashboard = () => (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Applications</h2>
             {applications.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">You haven't applied to any events yet.</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-medium">
                                <th className="p-4">Event</th>
                                <th className="p-4">Date applied</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {applications.map(app => (
                                <tr key={app._id} className="hover:bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900 border-b border-gray-100">
                                      <Link to={`/events/${app.eventId?._id}`} className="hover:text-primary-600 hover:underline">{app.eventId?.title || 'Unknown Event'}</Link>
                                    </td>
                                    <td className="p-4 text-gray-600 border-b border-gray-100">{new Date(app.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 border-b border-gray-100">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                            app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            app.status === 'attended' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    const renderOrganizerDashboard = () => (
        <div>
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold">Received Applications</h2>
               <Link to="/create-event" className="btn-primary py-2 px-4 shadow-sm hover:shadow-md">Create New Event</Link>
            </div>
            
            {applications.length === 0 ? (
                <div className="card p-8 text-center text-gray-500 bg-gray-50 border-dashed border-2">
                    No applications received yet.
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map(app => (
                        <div key={app._id} className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-primary-500">
                            <div>
                                <h4 className="font-bold text-lg mb-1">{app.volunteerId?.name || 'Unknown Volunteer'}</h4>
                                <p className="text-gray-600 text-sm">{app.volunteerId?.email}</p>
                                <p className="text-primary-600 text-sm mt-1 font-medium">Applied for: {app.eventId?.title || 'Unknown Event'}</p>
                            </div>
                            <div className="flex md:flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    app.status === 'attended' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {app.status}
                                </span>
                                {app.status === 'pending' && (
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={() => handleUpdateStatus(app._id, 'approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200" title="Approve">
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleUpdateStatus(app._id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200" title="Reject">
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-8 animate-fade-in">
            <div className="flex items-center gap-5 mb-10 pb-8 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-4xl font-extrabold uppercase shadow-md">
                    {user?.name?.charAt(0)}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome, {user?.name}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="capitalize px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 tracking-wide">{user?.role}</span>
                        <span className="text-gray-500 text-sm">{user?.email}</span>
                    </div>
                </div>
            </div>

            {user?.role === 'volunteer' ? renderVolunteerDashboard() : renderOrganizerDashboard()}
        </div>
    );
}
