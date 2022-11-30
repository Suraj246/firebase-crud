import React from 'react'
import { GoogleButton } from 'react-google-button'
// import { UserAuth } from './AuthContext'
import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"


const SignIn = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        signInWithPopup(auth, provider)
            .then((data) => {
                setUser(data.user.email)
                navigate('/')
                localStorage.setItem('email', data.user.email)

            })
    }
    console.log(user)
    useEffect(() => {
        setUser(localStorage.getItem('email'))
    }, [])

    return (
        <div className="login">
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    )
}

export default SignIn
