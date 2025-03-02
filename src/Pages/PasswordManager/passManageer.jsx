import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar.jsx';
import './passManager.css';

const PassManager = () => {
    const [userId, setUserId] = useState(null);
    const [passwords, setPasswords] = useState([]);
    const [newPassword, setNewPassword] = useState({ name: '', password: '' });

    // Function to get the current user
    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await axios.get('http://localhost:5000/api/currentUser', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in headers
                }
            });
            console.log('Current User Response:', response.data); // Log the response data
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const currentUser = await getCurrentUser();
                console.log('Fetched User:', currentUser); // Log the fetched user
                setUserId(currentUser.id);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchPasswords = async () => {
            if (userId) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:5000/api/passwords?userId=${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setPasswords(response.data);
                } catch (error) {
                    console.error('Error fetching passwords:', error.response ? error.response.data : error.message);
                }
            }
        };
        fetchPasswords();
    }, [userId]);

    const addPassword = async () => {
        if (!userId) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/passwords', { userId, ...newPassword }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Password added:', newPassword);
            setNewPassword({ name: '', password: '' }); // Reset input fields

            // Fetch updated passwords
            const response = await axios.get(`http://localhost:5000/api/passwords?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPasswords(response.data);
        } catch (error) {
            console.error('Error adding password:', error.response ? error.response.data : error.message);
        }
    };

    const deletePassword = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/passwords/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const response = await axios.get(`http://localhost:5000/api/passwords?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPasswords(response.data);
        } catch (error) {
            console.error('Error deleting password:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="passManager-container">
            <Navbar />
            <div className="pass-content-container">
                <h2>Password Manager</h2>
                <input
                    type="text"
                    placeholder="Password Name"
                    value={newPassword.name}
                    onChange={(e) => setNewPassword({ ...newPassword, name: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newPassword.password}
                    onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                />
                <div className="addbtn-passManager">
                    <button onClick={addPassword}>Add Password</button>
                </div>
                

                <ul>
                    {passwords.length > 0 ? (
                        passwords.map(password => (
                            <li key={password.id}>
                                <strong>{password.name}:</strong> {password.password} {/* Show password name with password */}
                                <button onClick={() => deletePassword(password.id)}>Delete</button>
                            </li>
                        ))
                    ) : (
                        <li>No passwords found.</li>
                    )}
                </ul>

            </div>
        </div>
    );
};

export default PassManager;
