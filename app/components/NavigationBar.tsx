import React from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link'
interface NavigationBarProps {
    children?: React.ReactNode
}
const NavigationBar = ({ children }: NavigationBarProps) => {
    return (
        <div className='fixed z-10 top-0 flex w-full max-w-6xl justify-between items-center p-6 shadow-md bg-white'>
            <div>
                <MenuRoundedIcon className='h-6 w-6 text-main'/>
            </div>
            <div>
                <Link href='/' className='text-main text-4xl font-main'>Adopt a Puppy</Link>
            </div>
            <div className='flex justify-center items-center h-6 w-6 bg-main rounded-full p-1'>
                <SearchRoundedIcon className='h-5 w-5 text-white'/>
            </div>
            {children}
        </div>
    )
}

export default NavigationBar