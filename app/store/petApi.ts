import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Data {
    pets: Pet[]
}

interface Data2 {
    pet: Pet
}
export interface Pet {
    id: number
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
    endpoints: (builder) => ({
        getPets: builder.query<Data, void>({
            query: () => 'pet',
        }),
        getPet: builder.query<Data2, string>({
            query: (id) => `pet/${id}`,
        }),
    }),
});

export const { useGetPetsQuery, useGetPetQuery } = petApi;