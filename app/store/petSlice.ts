import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet } from './petApi';

export interface PetState {
    pets: Pet[];
    filteredPets: Pet[];
    selectedPet: Pet | null;
    currentOpenedFilter: string;
    breedFilter: string[];
    ageFilter: string[];
    sizeFilter: string[];
    genderFilter: string[];
    inputFilter: string;
}

const initialState: PetState = {
    pets: [],
    filteredPets: [],
    selectedPet: null,
    currentOpenedFilter: '',
    breedFilter: [],
    ageFilter: [],
    sizeFilter: [],
    genderFilter: [],
    inputFilter: '',
};


// function filterObjectsByString(pets: Pet[], search: string) {
//   return pets.filter(pet => {
//       // Check all properties dynamically
//       for (const key in pet) {
//           if (pet.hasOwnProperty(key) && typeof pet[key] === 'string') {
//               if (pet[key].toLowerCase().includes(search.toLowerCase())) {
//                   return true;
//               }
//           }
//       }
//       return false;
//   });
// }

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
} = petSlice.actions;

export default petSlice.reducer;