import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [file, setFile] = useState(null); // Holds the selected file
    const navigate = useNavigate();

    // File change handler
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile); 
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('description', description);
        formData.append('releaseDate', releaseDate);
        formData.append('videoUrl', videoUrl);
        formData.append('image', file); 

        try {
            
            const token = localStorage.getItem('token'); 

            // Make the API request
            const response = await axios.post('http://localhost:5000/api/movies', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });

            console.log('Movie created:', response.data);
            navigate('/movies'); 
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Movie</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required 
            />
            <button type="submit">Add Movie</button>
        </form>
    );
};

export default AddMovie;
