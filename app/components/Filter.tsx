'use client';
import React, { use, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
  setCurrentOpenedFilter, 
  setBreedFilter, 
  setAgeFilter, 
  setSizeFilter, 
  setGenderFilter,
  resetFilters,
  setFilteredPets,
} from '../store/petSlice';
import { RootState } from '../store';
import Close from '@mui/icons-material/Close';

interface FilterProps {
    label: string;
    options: string[];
}

const Filter = ({ label, options }: FilterProps) => {

  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { currentOpenedFilter, breedFilter, ageFilter, sizeFilter, genderFilter } = useAppSelector((state: RootState) => state.petSlice);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch])

  useEffect(() => {
    if (currentOpenedFilter === label) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [currentOpenedFilter, label])

  function handleMenuClick() {
    dispatch(setCurrentOpenedFilter(label));
    setIsOpen((prev) => !prev)
  }

  function handleItemClick(option: string) {
    if (label === 'Breed') {
      if (breedFilter.includes(option)) {
        dispatch(setBreedFilter(breedFilter.filter(filter => filter !== option)));
      } else {
        dispatch(setBreedFilter([...breedFilter, option]));
      }
    }
    if (label === 'Age') {
      if (ageFilter.includes(option)) {
        dispatch(setAgeFilter(ageFilter.filter(filter => filter !== option)));
      } else {
        dispatch(setAgeFilter([...ageFilter, option]));
      }
    }
    if (label === 'Size') {
      if (sizeFilter.includes(option)) {
        dispatch(setSizeFilter(sizeFilter.filter(filter => filter !== option)));
      } else {
        dispatch(setSizeFilter([...sizeFilter, option]));
      }
    }
    if (label === 'Gender') {
      if (genderFilter.includes(option)) {
        dispatch(setGenderFilter(genderFilter.filter(filter => filter !== option)));
      } else {
        dispatch(setGenderFilter([...genderFilter, option]));
      }
    }
    
    dispatch(setFilteredPets());
  }

  function isOptionSelected (option: string) {
    if (label === 'Breed') {
      return breedFilter.includes(option);
    }
    if (label === 'Age') {
      return ageFilter.includes(option);
    }
    if (label === 'Size') {
      return sizeFilter.includes(option);
    }
    if (label === 'Gender') {
      return genderFilter.includes(option);
    }
  }

  function getFilterLength() {
    if (label === 'Breed') {
      return breedFilter.length;
    }
    if (label === 'Age') {
      return ageFilter.length;
    }
    if (label === 'Size') {
      return sizeFilter.length;
    }
    if (label === 'Gender') {
      return genderFilter.length;
    }

    return 0;
  }

  function clearFilter() {
    if (label === 'Breed') {
      dispatch(setBreedFilter([]));
    }
    if (label === 'Age') {
      dispatch(setAgeFilter([]));
    }
    if (label === 'Size') {
      dispatch(setSizeFilter([]));
    }
    if (label === 'Gender') {
      dispatch(setGenderFilter([]));
    }
    dispatch(setFilteredPets());
  }

  return (
    <div className='flex flex-col gap-y-2 justify-between items-center w-full'>
      <button
        type='button'
        onClick={handleMenuClick}
        className='w-full'
      >
        <div className='flex justify-between items-center p-4 w-full rounded-lg bg-white shadow-md'>
          <p className='text-base font-semibold'>{label}</p>
          <div className='flex justify-end items-center gap-4'>
            <p className={`text-xs px-4 py-1 font-semibold rounded-full ${getFilterLength() > 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>{getFilterLength()}</p>
            {isOpen ? <ExpandLess className='h-6 w-6 text-gray-400' /> : <ExpandMoreIcon className='h-6 w-6 text-gray-400'/>}
          </div>
        </div>
      </button>
      { isOpen && 
        <div className='flex flex-col w-full shadow-md rounded-lg bg-white'>
          <div 
            onClick={clearFilter}
            className='flex justify-start items-center py-4 px-8 cursor-pointer bg-red-50'
          >
            <p className='cursor-pointer text-sm font-bold text-main'>
              Clear
            </p>
            {/* <Close className='h-5 w-5 text-main font-semibold' onClick={clearFilter} /> */}
          </div>
          {options.map((option) => (
            <div key={option} className='flex justify-between items-center py-4 px-8 w-full hover:bg-zinc-100 cursor-pointer' onClick={() => handleItemClick(option)}>
              <p className='text-sm'>{option}</p>
              {isOptionSelected(option) ? <RadioButtonCheckedIcon className='h-4 w-4 text-green-500' /> : <RadioButtonCheckedIcon className='h-4 w-4 text-gray-400' />}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Filter