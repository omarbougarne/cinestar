import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Movies from './pages/Movies'; 
import AddMovie from './pages/AddMovies'; 

function App() {
    const isUserSignedIn = !!localStorage.getItem('token');

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/movies' element={isUserSignedIn ? <Movies /> : <Navigate to='/login' />} /> 
                {isUserSignedIn && <Route path='/add-movie' element={<AddMovie />} />}
            </Routes>
        </div>
    );
}

export default App;
