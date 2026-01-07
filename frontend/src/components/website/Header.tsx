import React from 'react'

const Header: React.FC = () => {
  return (
    <>
        <div className='bg-gray-100 shadow-md'>
            <div className='max-w-[90%] mx-auto py-4'>
                <nav className='flex justify-between items-center'>
                    <img src="/images/logo.png" alt="JHS Logo" className='w-14'/>
                    <ul className='flex gap-5'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                        <li>Blog</li>
                    </ul>
                    <button className=''>Login</button>
                </nav>
            </div>
        </div>
    </>
  )
}

export default Header