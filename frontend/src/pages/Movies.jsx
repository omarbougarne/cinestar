

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/movies', {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [navigate]);

    return (
        <div>
            <h1>Movies</h1>
            {movies.length === 0 ? (
                <p>No movies available or loading...</p>
            ) : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie._id}>
                            <h2>{movie.title}</h2>
                            <p>{movie.genre}</p>
                            <p>{movie.description}</p>
                            {movie.image ? (
   <img 
       src={`http://localhost:5000/${movie.image}`} 
       alt={movie.title} 
       style={{ width: '200px', height: 'auto' }} 
   />
) : (
   <img 
       src="/path/to/placeholder-image.jpg" 
       alt="placeholder" 
       style={{ width: '200px', height: 'auto' }} 
   />
)}

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Movies;