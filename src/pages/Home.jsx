import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loader, setLoader] = useState(false)
    const formRef = useRef()
    const usernameRef = useRef()
    const priceRef = useRef()
    const descRef = useRef()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/api/products/private/all`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [token])

    function handleDelete(id) {
        setLoader(true)
        fetch(`${import.meta.env.VITE_API}/api/products/private/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                let copied = [...products]
                copied = copied.filter((product) => {
                    return product.id !== id
                })
                setProducts(copied)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoader(false)
            })
    }

    function handleAddCard(e) {
        e.preventDefault()
        const user = {
            'name': usernameRef.current.value,
            'price': priceRef.current.value,
            'description': descRef.current.value
        }
        fetch(`${import.meta.env.VITE_API}/api/products/private`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.id) {
                    setProducts([...products,data])
                    formRef.current.reset()
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div>
            <form ref={formRef} className='w-[500px] mx-auto border border-blue-900 p-6 rounded-md text-center'>
                <input ref={usernameRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' type="text" placeholder='Enter name' />
                <input ref={priceRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' type="text" placeholder='Enter price' />
                <textarea ref={descRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md resize-none' placeholder='Enter description'></textarea>
                <button disabled={loader} onClick={handleAddCard} className='text-white bg-blue-500 px-7 py-2 mt-3 rounded-md w-max capitalize'>{loader ? 'loader...' : 'add card'}</button>
            </form>
            <div className='flex flex-wrap gap-4 justify-center my-20'>
                {
                    products.length > 0 && products.map((product) => {
                        return (
                            <div key={product.id} className='border border-blue-800 p-5 w-56 rounded-md flex flex-col gap-3 '>
                                <h2 className='font-semibold text-xl'>{product.name}</h2>
                                <h2 className='font-semibold text-xl'>{product.price}</h2>
                                <h2 className='font-semibold text-xl'>{product.description}</h2>
                                <button disabled={loader} onClick={() => { handleDelete(product.id) }} className='text-white bg-red-500 px-7 py-2 rounded-md w-max capitalize'>{loader ? 'loader...' : 'delete'}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home