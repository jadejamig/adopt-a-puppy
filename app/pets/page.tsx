'use client'
import Link from 'next/link'
import NewPets from '../components/NewPets'
import PetList from '../components/PetList'

const Pets = () => {
    return (
        <div className='flex flex-col gap-4 max-w-6xl items-center justify-start w-full h-full pt-28 bg-bg'>
            <PetList/>
        </div>  
    )
}

export default Pets