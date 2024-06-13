'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from '../store/index';
import { useGetPetsQuery } from '../store/petApi';
import { resetFilters, setFilteredPets, setPets } from "../store/petSlice";
import Filter from "./Filter";
import Petv2 from "./Petv2";

const PetList = () => {
    const {data, isError, isLoading} = useGetPetsQuery();
    
    const dummyBreeds = {label: 'Breed', options: ['Golden Retriever', 'Bull Terrier', 'Poodle', 'Border Collie', 'Beagle', 'Chihuahua', 'Labrador', 'Pug', 'German Shepherd']}
    const dummyAge = {label: 'Age', options: ['Puppy', 'Adult', 'Senior']}
    const dummySize = {label: 'Size', options: ['Small', 'Medium', 'Large']}
    const dummyGender = {label: 'Gender', options: ['Male', 'Female']}

    const filters = [dummyBreeds, dummyAge, dummySize, dummyGender]
    const dispatch = useAppDispatch();

    const { filteredPets } = useAppSelector((state: RootState) => state.petSlice);

    useEffect(() => {
        if (data) {
            dispatch(setPets(data.pets));
            dispatch(setFilteredPets());
        }
    }, [data, dispatch])

    function handleClearFilters() {
        dispatch(resetFilters());
        dispatch(setFilteredPets());
    }
    
    return (
    <div className='flex flex-col md:flex-row items-start justify-center w-full h-full px-6 pt-6 pb-10 gap-6'>
        <div className='flex md:flex-[0.3] flex-col gap-4 w-full h-full'>
            {filters.map((filter) => (
                <div key={filter.label} className="flex flex-col w-full">
                    <Filter {...filter} />
                </div>
            ))}
            <div className='flex flex-col gap-y-2 justify-between items-center w-full'>
                <button
                    type='button'
                    className='w-full'
                    onClick={handleClearFilters}
                >
                    <div className='flex justify-center items-center gap-2 p-4 w-full rounded-full bg-white shadow-md'>
                        <p className='text-base font-semibold text-main'>Clear Filters</p>
                        <DeleteIcon className='h-5 w-5 text-main' />
                    </div>
                </button>
            </div>
        </div>
        {isLoading && 
            <div className="flex md:flex-[0.7] w-full h-full ">
                <div className='flex flex-row gap-6 w-full'>
                    <Skeleton className='h-[250px] w-full rounded-lg' />
                </div>
            </div>
        }
        {isError && <div>Error Fetching Pets</div>}  
        {data && (
            <div className="flex md:flex-[0.7] w-full h-full ">
                <div className='grid grid-cols-2 min-[1100px]:grid-cols-3 gap-4 w-full h-full '>
                    {filteredPets?.map((pet: any) => (
                        <div key={pet.id} className="flex justify-center items-start rounded-lg">
                            <Petv2 {...pet}/>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
    )
    }

export default PetList