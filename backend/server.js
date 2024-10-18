const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const roomRoutes = require('./routes/room.routes');
const sessionRoutes = require('./routes/session.routes');
const path = require('path')
dotenv.config();
connectDB()
const port = process.env.PORT || 8080;




const app = express();
app.use(express.json());
app.use(cors()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/sessions', sessionRoutes);
app.listen(port, () => console.log(`Server started on port ${port}`));
