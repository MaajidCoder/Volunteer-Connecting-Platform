import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar } from 'lucide-react';

export default function Home() {
    return (
        <div className="text-center py-20 animate-fade-in">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Make an Impact on Campus
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Discover volunteer opportunities, apply to events, and track your community service hours starting today.
            </p>
            <div className="flex justify-center gap-4 mb-20">
                <Link to="/events" className="btn-primary text-lg px-8 py-3">Explore Events</Link>
                <Link to="/register" className="btn-outline text-lg px-8 py-3 hover:bg-gray-100">Join Now</Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                <div className="card p-6 border-t-4 border-t-primary-500">
                    <Heart className="w-10 h-10 text-primary-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Find Your Cause</h3>
                    <p className="text-gray-600">Browse through various volunteering events organized by college clubs and departments.</p>
                </div>
                <div className="card p-6 border-t-4 border-t-primary-500">
                    <Calendar className="w-10 h-10 text-primary-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Easy Application</h3>
                    <p className="text-gray-600">Apply to events with just one click and manage your schedule effortlessly.</p>
                </div>
                <div className="card p-6 border-t-4 border-t-primary-500">
                    <Users className="w-10 h-10 text-primary-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Track Impact</h3>
                    <p className="text-gray-600">Log your hours automatically and get recognized for your contributions to the community.</p>
                </div>
            </div>
        </div>
    );
}
