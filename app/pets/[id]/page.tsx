'use client'
import React, { useEffect } from 'react'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from '../../store/index';
import { setSelectedPet } from "../../store/petSlice";
import { useGetPetQuery } from '../../../app/store/petApi';
import Link from 'next/link'

const PetProfile = ({ params }: { params: { id: string } }) => {
    const {data, isError, isLoading} = useGetPetQuery(params.id);

    const stats = [
        {
            label: 'Breed',
            value: data?.pet.breed, 
        },
        {
            label: 'Age',
            value: data?.pet.age, 
        },
        {
            label: 'Size',
            value: data?.pet.size, 
        },
        {
            label: 'Gender',
            value: data?.pet.gender, 
        },
    ]

    const dispatch = useAppDispatch();

    return (
    <div className='flex flex-col gap-4 max-w-6xl items-center justify-start w-full h-full pt-28 pb-6 rounded-b-lg bg-bg px-6'>
        {data && (
        <div className='flex flex-col md:flex-row w-full gap-4'>
            <div className="flex-1 flex justify-center items-center p-10 md:p-0 w-full md:w-[400px] shadow-sm">
                <AspectRatio ratio={1 / 1}>
                    <Image fill src={data.pet.image} alt={data.pet.name} className="rounded-lg object-cover" />
                </AspectRatio>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center gap-10'>
                <div className='text-6xl sm:text-7xl md:text-8xl font-black font-oleo text-main'>
                    {data.pet.name}
                </div>
                <div className='grid grid-cols-2 gap-4 text-base w-full justify-center items-center'>
                    {stats.map((stat) => (
                        <div key={stat.label} className='flex gap-2 justify-center items-center'>
                            <div className='font-semibold text-zinc-500'>{stat.label}:</div>
                            <div className='text-zinc-500'>{stat.value}</div>
                        </div>
                    ))}
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='font-semibold text-zinc-500'>Vaccination:</div>
                        <div className='px-2 py-1 bg-emerald-500 text-xs rounded-full text-white'>complete</div>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='font-semibold text-zinc-500'>Special needs:</div>
                        <div className='px-2 py-1 bg-emerald-500 text-xs rounded-full text-white'>none</div>
                    </div>
                </div>
                <div className='flex text-wrap justify-center text-zinc-600 text-sm items-center w-full text-center p-6 bg-slate-100 rounded-lg'>
                    {`Hi I'm ${data.pet.name}, I'm a very good ${data.pet.gender === 'Male' ? 'boy' : 'girl'} and I'm ${data.pet.age} 
                    years old. I was born in ${data.pet.location}. I am very friendly and loves to play. I am also great with children and other dogs.`}
                </div>
                <button
                        type='button'
                        className='px-4 lg:px-8 py-2 text-sm lg:text-base text-main font-semibold outline outline-2 outline-main rounded-full hover:outline-offset-1 hover:outline-main duration-100'
                    >
                        <Link href='/pets'>
                           {`Let's be friends 🐾`}
                        </Link>
                    </button>
            </div>
        </div>
        )}
    </div>  
    )
}

export default PetProfile