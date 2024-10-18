import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSession = () => {
    const [movies, setMovies] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [movieId, setMovieId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch movies and rooms from the backend
        const fetchMoviesAndRooms = async () => {
            try {
                const token = localStorage.getItem('token');
                const movieResponse = await axios.get('http://localhost:5000/api/movies', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const roomResponse = await axios.get('http://localhost:5000/api/rooms', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMovies(movieResponse.data);
                setRooms(roomResponse.data);
            } catch (error) {
                console.error('Error fetching movies or rooms:', error);
            }
        };
        fetchMoviesAndRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const sessionData = { movieId, roomId, startTime, endTime };
            const response = await axios.post('http://localhost:5000/api/sessions', sessionData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setSuccess('Session created successfully!');
            setError(null);
            // Clear form
            setMovieId('');
            setRoomId('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error creating session:', error);
            setError('Failed to create session. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Session</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="movie">Movie</label>
                    <select
                        id="movie"
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                        required
                    >
                        <option value="">Select a movie</option>
                        {movies.map((movie) => (
                            <option key={movie._id} value={movie._id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="room">Room</label>
                    <select
                        id="room"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                    >
                        <option value="">Select a room</option>
                        {rooms.map((room) => (
                            <option key={room._id} value={room._id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="startTime">Start Time</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="endTime">End Time</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Add Session</button>
            </form>
        </div>
    );
};

export default AddSession;
