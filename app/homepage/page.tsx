'use client'
import Link from 'next/link'
import NewPets from '../components/NewPets'
import Image from 'next/image'
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const HomePage = () => {
    return (
        <div className='flex flex-col max-w-6xl items-center justify-start w-full h-full'>
            <div className='flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-2 px-6 md:px-10 pt-48 pb-28 bg-slate-50 rounded-t-lg'>
                <div className='flex flex-col gap-8 flex-1 justify-center items-center md:items-start'>
                    <h1 className='text-4xl min-[425px]:text-5xl lg:text-7xl font-bold text-main text-center md:text-start'>Help us find a loving home</h1>
                    <button
                        type='button'
                        className='px-4 lg:px-8 py-2 text-sm lg:text-base text-main font-semibold outline outline-2 outline-main rounded-full hover:outline-offset-1 hover:outline-main duration-100'
                    >
                        <Link href='/pets'>
                            Adopt a Puppy
                        </Link>
                    </button>
                </div>
                <div className=''>
                    <img src='/dogsmile2.jpeg' alt='dogsmile' className='rounded-2xl shadow-md' />
                </div>
            </div>
            <NewPets />
            <div className='flex w-full bg-slate-50 py-10 px-6 items-center justify-center'>
                <a 
                    href='https://github.com/jadejamig/adopt-a-puppy'
                    target='_blank'
                    className='flex gap-2 font-semibold text-main'
                >
                    <GitHubIcon className='h-5 w-5 text-main' />
                    View code in github
                    
                    <OpenInNewIcon className='h-5 w-5 text-main' />
                    
                </a>
            </div>
        </div>  
    )
}

export default HomePage