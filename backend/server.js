const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes')
dotenv.config();
connectDB()
const port = process.env.PORT || 8080;




const app = express();
app.use(express.json());
app.use(cors()); 
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.listen(port, () => console.log(`Server started on port ${port}`));
