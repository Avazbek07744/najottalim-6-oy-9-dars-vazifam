import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert('Username is not valid');
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'black';
            return false;
        }
        return true;
    }

    function hendelSubmit(e) {
        e.preventDefault()
        let isValid = validate();
        const userForm = {
            'username': usernameRef.current.value,
            'password': passwordRef.current.value
        }
        setLoading(true)
        fetch(`${import.meta.env.VITE_API}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userForm)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message == 'User Not found') {
                    alert("Username yoki parol noto'g'ri");
                }

                if (data.id) {
                    localStorage.setItem('token', data.accessToken)
                    localStorage.setItem('user', JSON.stringify(data))
                    navigate('/')
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
                <input className='w-full p-2 border rounded-md' ref={passwordRef} type="password" placeholder='Enter password...' />
                <button disabled={loading} className='bg-blue-500 py-2 w-full rounded-md text-white text-xl'>{loading ? 'Loading...' : 'Login'}</button>
                <Link to='/register'>Register ga o'tish</Link>
            </form>
        </div>
    )
}

export default Login
