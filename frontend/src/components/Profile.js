import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context'

const Profile = () => {
    const { user } = useContext(AuthContext);
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
            name: user.name,
            email: user.email,
            });
        }
    }, [user]);

    return (
        <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minWidth: '60%' }}>
            <h1>Profile</h1>
            <div>
                <p>Name: {formData.name}</p>
                <p>Email: {formData.email}</p>
            </div>
        </div>
    );
};

export default Profile;