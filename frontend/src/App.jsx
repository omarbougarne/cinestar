import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
// import Home from './pages/Home'
// import Account from './pages/Account'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Home />} />
        {isUserSignedIn && <Route path='/account' element={<Account />} />} */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;