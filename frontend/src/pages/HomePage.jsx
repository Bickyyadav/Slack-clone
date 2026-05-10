import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
    return (
        <div className='bg-red-500'>
            <button onClick={() => toast("hi there")}>Toast</button>
            <button onClick={() => { throw new Error("My first Sentry error!") }}>Error</button>
        </div>
    )
}

export default HomePage
