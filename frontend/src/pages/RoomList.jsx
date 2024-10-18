// src/pages/RoomList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('http://localhost:5000/api/rooms', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    }
                });
                setRooms(response.data);
            } catch (err) {
                setError('Failed to fetch rooms. Please try again later.');
            }
        };

        fetchRooms();
    }, []);

    const handleAddRoom = () => {
        navigate('/add-room'); 
    };

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Available Rooms</h2>
            <button onClick={handleAddRoom}>Add Room</button> 
            {rooms.length === 0 ? (
                <p>No rooms available.</p>
            ) : (
                <ul>
                    {rooms.map((room) => (
                        <li key={room._id}>
                            <h3>{room.name}</h3> 
                            <p>Capacity: {room.capacity}</p> 
                            <p>Status: {room.isAvailable ? 'Available' : 'Unavailable'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoomList;
