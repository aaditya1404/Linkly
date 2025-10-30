import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between p-8 fixed w-full bg-black'>
            <div>
                <p>Linkly</p>
            </div>
            <ul className='flex items-center gap-4'>
                <li><Link href={"/sign-up"}>Sign Up</Link></li>
                <li><Link href={"/sign-in"}>Sign In</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
