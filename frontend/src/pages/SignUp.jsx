import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState(''); // New state for first name
    const [lastName, setLastName] = useState('');   // New state for last name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
        .get('http://localhost:5000/api/auth/register')
        .then((res) => {
            // Handle fetched users if necessary
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/api/auth/register', { firstName, lastName, email,  password }) 
            .then(() => {
                alert('Registration Successful');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                fetchUsers();
                navigate('/login');
            })
            .catch((error) => {
                if (error.response) {
                    //eroooooors later change or comment
                    console.log('Error response:', error.response);
                    console.log('Status code:', error.response.status);
                    console.log('Response data:', error.response.data);
                } else if (error.request) {
                    
                    console.log('No response received:', error.request);
                } else {
                    
                    console.log('Error message:', error.message);
                }
            });
    };
    
    

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' onSubmit={handleSubmit}>
                    
                    <label>First Name</label>
                    <br />
                    <input
                        className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <br /><br />
                    
                    
                    <label>Last Name</label>
                    <br />
                    <input
                        className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <br /><br />

                    
                    <label>Email</label>
                    <br />
                    <input
                        className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <br /><br />
                    
                    
                    
                    {/* Password Input */}
                    <label>Password</label>
                    <br />
                    <input
                        className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <br /><br />
                    
                    {/* Button */}
                    <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>
                        Sign Up
                    </button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white'>Sign Up</h2>
            </div>
        </div>
    );
}

export default SignUp;
