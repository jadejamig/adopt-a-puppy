'use client'

import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from '../store/index';
import { useGetPetsQuery, useLazyGetPetsQuery, useDeletePetsMutation } from '../store/petApi';
import { resetFilters, setFilteredPets, setInputFilter, setPets, resetSelectedPets, setIsSelecting, removePets } from "../store/petSlice";
import Filter from "./Filter";
import Petv2 from "./Petv2";
import { Pet } from '../store/petApi';
import AddPet from './AddPet';
import { toast } from 'sonner';

const AdminPetList = () => {
    const [input, setInput] = useState('');
    
    const [getPets, { data, isError, isLoading }] = useLazyGetPetsQuery();
    const [deletePets, {data: deleteData, isError: deleteError, isLoading: deleteLoading}] = useDeletePetsMutation();
    
    const dummyBreeds = {label: 'Breed', options: ['Golden Retriever', 'Bull Terrier', 'Poodle', 'Border Collie', 'Beagle', 'Chihuahua', 'Labrador', 'Pug', 'German Shepherd']}
    const dummyAge = {label: 'Age', options: ['Puppy', 'Adult', 'Senior']}
    const dummySize = {label: 'Size', options: ['Small', 'Medium', 'Large']}
    const dummyGender = {label: 'Gender', options: ['Male', 'Female']}

    const filters = [dummyBreeds, dummyAge, dummySize, dummyGender]

    const dispatch = useAppDispatch();

    const { filteredPets, selectedPets, isSelecting } = useAppSelector((state: RootState) => state.petSlice);

    useEffect(() => {
        dispatch(resetSelectedPets());
        dispatch(setIsSelecting(false));
        getPets();
    }, [dispatch])

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

    function isPetSelected(pet: Pet) {
        return selectedPets.some(selectedPet => selectedPet.id === pet.id);
    }

    async function handleDeletePets() {
        await deletePets(selectedPets.map((pet) => pet.id));
    }

    useEffect(() => {
        if (deleteData) {
            toast.success(`Successfully removed ${selectedPets.length > 1 ? selectedPets.length : '' } ${selectedPets.length === 1 ? selectedPets[0].name : 'pets'}`);
            dispatch(removePets(selectedPets.map((pet) => pet.id)));
            dispatch(resetSelectedPets());
            dispatch(setFilteredPets());
            dispatch(setIsSelecting(false));
        }
    }, [deleteData, dispatch])
    
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
                    className="p-4 w-full rounded-lg focus:outline-none active:outline-none"
                    />
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
            <div className="flex flex-col gap-4 md:flex-[0.7] w-full h-full ">
                <div className='flex flex-col sm:flex-row justify-between items-center w-full'>
                    <div className='flex gap-2 items-center w-full py-4 pr-4 font-semibold text-zinc-500 text-base sm:text-xl'>
                        <p>Pets for adoption</p>
                        <p className='text-sm sm:text-base'>({filteredPets.length})</p>
                    </div>
                    <div className='flex gap-2 items-start sm:items-center justify-start sm:justify-end w-full'>
                        <AddPet />
                        <button
                            onClick={() => {
                                dispatch(resetSelectedPets())
                                dispatch(setIsSelecting(!isSelecting))
                            }}
                            type='button'
                            className='px-4 lg:px-8 py-2 text-sm lg:text-base bg-white rounded-lg text-zinc-500 font-semibold shadow-md hover:bg-zinc-50 hover:text-zinc-600'
                        >
                            {isSelecting ? 'Cancel' : 'Select'}
                        </button>
                        <button
                            disabled={selectedPets.length === 0 || !isSelecting}
                            onClick={handleDeletePets}
                            type='button'
                            className={`
                                flex items-center justify-center gap-2 px-4 lg:px-8 py-2 text-sm lg:text-base
                                bg-white rounded-lg text-main font-semibold shadow-md hover:bg-zinc-50 disabled:text-zinc-200 disabled:hover:bg-white`}
                        >   
                            {isSelecting && <span className='text-base'>{`(${selectedPets.length})`}</span>}
                            <p>Delete</p>
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-2 min-[1100px]:grid-cols-3 gap-4 w-full h-full '>
                    {filteredPets?.map((pet: Pet) => (
                        pet.image && <div key={pet.id} className={`relative flex justify-center items-start rounded-lg ${isPetSelected(pet) && isSelecting ? 'outline outline-2 outline-main' : ''}`}>
                            <Petv2 {...pet} />
                            {isSelecting && <RadioButtonCheckedIcon className={`h-4 w-4 absolute bottom-2 right-2 ${isPetSelected(pet) ? 'text-main' : 'text-slate-500'}`} />}
                            
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
    )
}

export default AdminPetList