import React from 'react'
import { NavLink } from 'react-router-dom'

const Mainleout = ({ children }) => {
    return (
        <div className='flex flex-wrap flex-col'>
            <header className='container'>
                <nav className='max-w-[1400px] p-5 mx-auto flex justify-between'>
                    <h1 className='text-3xl text-blue-600 font-bold cursor-pointer'>Logo</h1>
                    <div className='flex items-center gap-8 font-semibold text-xl text-blue-500'>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/about'>About</NavLink>
                    </div>
                    <button className='bg-blue-600 text-white py-2 px-5 text-lg font-semibold rounded-md capitalize'>button</button>
                </nav>
            </header>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default Mainleout
