import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    function hendelSubmit(e) {
        e.preventDefault()
        const userForm = {
            'username': usernameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        }
        setLoading(true)
        fetch(`${import.meta.env.VITE_API}/api/auth/signup`, { // <-- fixed here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'User registered successfully!') {
                    formRef.current.reset()
                    navigate('/login');
                }

                if (data.message === 'Failed! Username is already in use!' || data.message === 'Failed! Email is already in use!') {
                    alert(data.message);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <form ref={formRef} onSubmit={hendelSubmit} className='w-1/3 p-5 flex flex-col mx-auto gap-5 border border-blue-500 rounded-md mt-10'>
                <input className='w-full p-2 border rounded-md' ref={usernameRef} type="text" placeholder='Enter username...' />
                <input className='w-full p-2 border rounded-md' ref={emailRef} type="text" placeholder='Enter email...' />
                <input className='w-full p-2 border rounded-md' ref={passwordRef} type="password" placeholder='Enter password...' />
                <button disabled={loading} className='bg-blue-500 py-2 w-full rounded-md text-white text-xl'>{loading ? 'Loading...' : 'Register'}</button>
                <Link to='/login'>Login ga o'tish</Link>
            </form>
        </div>
    )
}

export default Register
