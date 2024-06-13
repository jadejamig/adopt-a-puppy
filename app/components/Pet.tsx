import React from 'react'
import { Pet as PetSchema } from '../store/petApi'
import Image from 'next/image'

const Pet = (pet : PetSchema) => {
  return (
    <div className='flex flex-col gap-2 items-center justify-start w-full rounded-lg pb-2 bg-white shadow-sm'>
        <div className='h-56 w-56'>
            <Image src={pet.image} alt='dog' className='rounded-t-lg object-cover h-56 w-56' />
        </div>
        <div className='flex flex-col justify-center items-center w-full gap-1 text-center'>  
            <h1 className='text-sm font-semibold'>{`${pet.name}, ${pet.age} years old`}</h1>
            <h1 className='text-sm text-zinc-500'>{`${pet.breed} (${pet.location})`}</h1>
        </div>
    </div>
  )
}

export default Pet