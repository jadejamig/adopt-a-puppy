'use client'

import DeleteIcon from '@mui/icons-material/Delete';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from '../store/index';
import { useGetPetsQuery } from '../store/petApi';
import { resetFilters, setFilteredPets, setInputFilter, setPets } from "../store/petSlice";
import Filter from "./Filter";
import Petv2 from "./Petv2";

const PetList = () => {
    const [input, setInput] = useState('');

    const {data, isError, isLoading} = useGetPetsQuery();
    
    const dummyBreeds = {label: 'Breed', options: ['Golden Retriever', 'Bull Terrier', 'Poodle', 'Border Collie', 'Beagle', 'Chihuahua', 'Labrador', 'Pug', 'German Shepherd']}
    const dummyAge = {label: 'Age', options: ['Puppy', 'Adult', 'Senior']}
    const dummySize = {label: 'Size', options: ['Small', 'Medium', 'Large']}
    const dummyGender = {label: 'Gender', options: ['Male', 'Female']}

    const filters = [dummyBreeds, dummyAge, dummySize, dummyGender]
    const dispatch = useAppDispatch();

    const { filteredPets } = useAppSelector((state: RootState) => state.petSlice);

    useEffect(() => {
        dispatch(setInputFilter(input));
        dispatch(setFilteredPets());
    }, [dispatch, input])

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
            <div className="flex justify-between items-center w-full rounded-lg bg-white shadow-md ">
                <div className="flex flex-[0.8] justify-start items-center w-full">
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text" 
                        placeholder="Search for a pet" 
                        className="p-4 w-full rounded-lg focus:outline-none active:outline-none"/>
                </div>
                
                <div className="flex flex-[0.2] h-full justify-end items-center text-right pr-4">
                    <SearchRoundedIcon className='h-7 w-7 text-main cursor-pointer' />
                </div>
                
            </div>
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
                <div className='grid grid-cols-2 min-[1100px]:grid-cols-3 gap-4 w-full h-full'>
                    {
                        Array.from({length: 10}).map((_, i) => (
                            <div key={i} className="flex justify-center items-start rounded-lg">
                                <Skeleton width={240} height={300}/>
                            </div>
                        ))
                    }
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