// pages/SessionList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SessionList = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);

    const fetchSessions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/sessions', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSessions(response.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
            setError('Error fetching sessions.');
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    return (
        <div>
            <h2>Sessions</h2>
            {error && <p>{error}</p>}
            <ul>
                {sessions.map((session) => (
                    <li key={session._id}>
                        Movie: {session.movie.title} | Room: {session.room.name} | 
                        Start: {new Date(session.startTime).toLocaleString()} | 
                        End: {new Date(session.endTime).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SessionList;
