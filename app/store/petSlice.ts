import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from './petApi';

export interface PetState {
    pets: Pet[];
    filteredPets: Pet[];
    selectedPet: Pet | null;
    selectedPets: Pet[];
    currentOpenedFilter: string;
    breedFilter: string[];
    ageFilter: string[];
    sizeFilter: string[];
    genderFilter: string[];
    inputFilter: string;
    currentUserType: 'admin' | 'user';
    isSelecting: boolean;
}

const initialState: PetState = {
    pets: [],
    filteredPets: [],
    selectedPet: null,
    selectedPets: [],
    currentOpenedFilter: '',
    breedFilter: [],
    ageFilter: [],
    sizeFilter: [],
    genderFilter: [],
    inputFilter: '',
    currentUserType: 'user',
    isSelecting: false,
};

export function filterPetsByString(pets: Pet[], search: string) {
  return pets.filter(pet => {
      // Check all properties dynamically
      Object.entries(pet).forEach(([_, value]) => {
          if (typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase())) {
              return true;
          }
        })
      return false;
  });
}

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
      setSelectedPet: (state, action: PayloadAction<string>) => {
        state.selectedPet = state.pets.find((pet) => pet.id.toString() === action.payload) ?? null;
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
        const initialFilteredPets = state.pets.filter((pet) => {
          return (
            (state.breedFilter.length === 0 || state.breedFilter.includes(pet.breed)) &&
            (state.ageFilter.length === 0 || state.ageFilter.includes(pet.ageLabel)) &&
            (state.sizeFilter.length === 0 || state.sizeFilter.includes(pet.size)) &&
            (state.genderFilter.length === 0 || state.genderFilter.includes(pet.gender))
          );
        });
        console.log(initialFilteredPets)
        console.log(state.inputFilter)

        if (state.inputFilter === '') {
          state.filteredPets = initialFilteredPets
          return
        }

        state.filteredPets = initialFilteredPets.filter(pet => {
          var match = false;
          // Check all properties dynamically
          Object.entries(pet).forEach(([key, value]) => {
              if (match)
                return
              if (typeof value === 'string' && value.toLowerCase().includes(state.inputFilter.toLowerCase())) {
                match = true
              }
          })
          
          if (match)
            return true

          return false
        });
        console.log(state.filteredPets)
      },
      resetFilters: (state) => {
        state.breedFilter = [];
        state.ageFilter = [];
        state.sizeFilter = [];
        state.genderFilter = [];
        state.currentOpenedFilter = '';
        state.inputFilter = '';
      },
      setInputFilter: (state, action: PayloadAction<string>) => {
        state.inputFilter = action.payload;
      },
      setCurrentUserType: (state, action: PayloadAction<'admin' | 'user'>) => {
        state.currentUserType = action.payload;
      },
      setSelectedPets: (state, action: PayloadAction<Pet>) => {
        // check if the pet is already in the selectedPets array
        const isPetInSelectedPets = state.selectedPets.some(pet => pet.id === action.payload.id);
        if (isPetInSelectedPets) {
          // remove the pet from the selectedPets array
          state.selectedPets = state.selectedPets.filter(pet => pet.id !== action.payload.id);
        } else {
          // add the pet to the selectedPets array
          state.selectedPets.push(action.payload);
        }
      },
      resetSelectedPets: (state) => {
        state.selectedPets = [];
      },
      setIsSelecting: (state, action: PayloadAction<boolean>) => {
        state.isSelecting = action.payload;
      },
      addPet: (state, action: PayloadAction<Pet>) => {
        state.pets = [action.payload, ...state.pets];
      },
      removePets: (state, action: PayloadAction<string[]>) => {
        state.pets = state.pets.filter(pet => !action.payload.includes(pet.id));
      },
    },
});

export const { 
    setCurrentOpenedFilter, 
    setPets, 
    setSelectedPet,
    setBreedFilter,
    setAgeFilter,
    setSizeFilter,
    setGenderFilter,
    resetFilters,
    setFilteredPets,
    setInputFilter,
    setCurrentUserType,
    setSelectedPets,
    resetSelectedPets,
    setIsSelecting,
    addPet,
    removePets,
} = petSlice.actions;

export default petSlice.reducer;