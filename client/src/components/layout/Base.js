import React from 'react'
import { Link } from 'react-router-dom';

export const Base = () => {
    return (
        <div>
            <h2>Welcome</h2>
            <h4>details...</h4>
            <Link to='/login'>
            <button>Login</button>
            </Link>
            <Link to='/register'>
            <button>Register</button>
            </Link>
        </div>
    )
}
