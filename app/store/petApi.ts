import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Data {
    pets: Pet[]
}

interface Data2 {
    pet: Pet
}
export interface Pet {
    id: string
    name: string
    age: string
    ageLabel: string
    breed: string
    gender: string
    location: string
    image: string
    size: string
}

export const petApi = createApi({ 
    reducerPath: 'pets',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
    }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getPets: builder.query<Data, void>({
            query: () => 'pet',
        }),
        getPet: builder.query<Data2, string>({
            query: (id) => `pet/${id}`,
        }),
        addPet: builder.mutation<Data2, Pet>({
            query: (pet) => ({
                url: 'pet',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: pet,
            })
        }),
        deletePets: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: 'pet',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: ids,
            })
        }),
        deletePet: builder.mutation<void, string>({
            query: (id) => ({
                url: `pet/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }),
        updatePet: builder.mutation<Data2, Pet>({
            query: (pet) => ({
                url: `pet/${pet.id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: pet,
            })
        }),
    }),
});

export const { 
    useGetPetsQuery, 
    useGetPetQuery, 
    useLazyGetPetsQuery, 
    useLazyGetPetQuery, 
    useAddPetMutation,
    useDeletePetsMutation,
    useDeletePetMutation,
    useUpdatePetMutation,
} = petApi;