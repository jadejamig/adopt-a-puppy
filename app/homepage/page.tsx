'use client'
import Link from 'next/link'
import NewPets from '../components/NewPets'

const HomePage = () => {
    return (
        <div className='flex flex-col gap-4 max-w-6xl items-center justify-start w-full h-full pt-28'>
            <div className='flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-2 px-6 md:px-10 py-32 bg-main/5 rounded-t-lg'>
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
                <div className='flex-1'>
                    <img src='/dogsmile2.jpeg' alt='dogsmile' className='rounded-2xl' />
                </div>
            </div>
            <NewPets />
        </div>  
    )
}

export default HomePage