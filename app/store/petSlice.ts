import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from './petApi';

export interface PetState {
    pets: Pet[];
    filteredPets: Pet[];
    selectedPets: Pet[];
    currentOpenedFilter: string;
    breedFilter: string[];
    ageFilter: string[];
    sizeFilter: string[];
    genderFilter: string[];
}

const initialState: PetState = {
    pets: [],
    filteredPets: [],
    selectedPets: [],
    currentOpenedFilter: '',
    breedFilter: [],
    ageFilter: [],
    sizeFilter: [],
    genderFilter: [],
};


const petSlice = createSlice({
    name: 'petSlice',
    initialState,
    reducers: {
      setCurrentOpenedFilter: (state, action: PayloadAction<string>) => {
        state.currentOpenedFilter = action.payload;
      },
      setPets: (state, action: PayloadAction<Pet[]>) => {
        state.pets = action.payload;
      },
      setSelectedPets: (state, action: PayloadAction<Pet[]>) => {
        state.selectedPets = action.payload;
      },
      setBreedFilter: (state, action: PayloadAction<string[]>) => {
        state.breedFilter = action.payload;
      },
      setAgeFilter: (state, action: PayloadAction<string[]>) => {
        state.ageFilter = action.payload;
      },
      setSizeFilter: (state, action: PayloadAction<string[]>) => {
        state.sizeFilter = action.payload;
      },
      setGenderFilter: (state, action: PayloadAction<string[]>) => {
        state.genderFilter = action.payload;
      },
      setFilteredPets: (state) => {
        state.filteredPets = state.pets.filter((pet) => {
          return (
            (state.breedFilter.length === 0 || state.breedFilter.includes(pet.breed)) &&
            (state.ageFilter.length === 0 || state.ageFilter.includes(pet.ageLabel)) &&
            (state.sizeFilter.length === 0 || state.sizeFilter.includes(pet.size)) &&
            (state.genderFilter.length === 0 || state.genderFilter.includes(pet.gender))
          );
        });
      },
      resetFilters: (state) => {
        state.breedFilter = [];
        state.ageFilter = [];
        state.sizeFilter = [];
        state.genderFilter = [];
        state.currentOpenedFilter = '';
      },
    },
});

export const { 
    setCurrentOpenedFilter, 
    setPets, 
    setSelectedPets,
    setBreedFilter,
    setAgeFilter,
    setSizeFilter,
    setGenderFilter,
    resetFilters,
    setFilteredPets,
} = petSlice.actions;

export default petSlice.reducer;