'use client'
import React from 'react'
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { useAppSelector } from "../store/hooks";
import { RootState } from '../store/index';

const PetProfile = () => {
    const { selectedPet } = useAppSelector((state: RootState) => state.petSlice);

    return (
    <div className='flex flex-col gap-4 max-w-6xl items-center justify-start w-full h-full pt-28 bg-bg'>
        {selectedPet && (
        <div className='flex'>
            <div className="w-[400px] min-[1100px]:w-[250px] shadow-sm">
                <AspectRatio ratio={1 / 1}>
                    <Image fill src={selectedPet.image} alt={selectedPet.name} className="rounded-t-lg object-cover" />
                </AspectRatio>
            </div>
            <div>
                Hello my name is {selectedPet?.name}
            </div>
        </div>
        )}
    </div>  
    )
}

export default PetProfile