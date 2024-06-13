'use client'
import React from 'react'
import { Pet } from '../store/petApi'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "../store/hooks";
import { setSelectedPet } from "../store/petSlice";


const Petv2 = (pet : Pet) => {
    const router = useRouter();

    return (
        <div 
            onClick={() => {
                router.push(`/pets/${pet.id}`)
            }}
            className="w-[400px] min-[1100px]:w-[250px] shadow-sm cursor-pointer"
        >
            <AspectRatio ratio={1 / 1}>
                <Image fill src={pet.image} alt={pet.name} className="rounded-t-lg object-cover" />
            </AspectRatio>
            <div className='flex flex-col justify-center items-center w-full gap-1 text-center py-2 bg-white rounded-b-lg'>  
                <h1 className='text-sm font-semibold'>{`${pet.name}, ${pet.age} years old`}</h1>
                <h1 className='text-sm text-zinc-500'>{`${pet.breed} (${pet.location})`}</h1>
            </div>
        </div>
    )
}

export default Petv2