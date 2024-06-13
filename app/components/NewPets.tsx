'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPetsQuery } from '../store/petApi';
import Pet from './Pet';

const NewPets = () => {
    const {data, isError, isLoading} = useGetPetsQuery();
return (
    <div className='bg-bg flex flex-col w-full px-6 md:p-10 gap-4'>
        <div className='flex justify-start items-center w-full'>  
            <h1 className='text-zinc-800 text-xl font-semibold'>New Pets</h1>
        </div>
        <div>
            {isLoading && 
                <div className='overflow-x-scroll rounded-lg pb-2'>
                    <div className='flex flex-row gap-6 w-full'>
                        <Skeleton className='h-[250px] w-full rounded-lg' />
                    </div>
                </div>
            }
            {isError && <div>Error Fetching Pets</div>}  
            {data && (
                <div className='overflow-x-scroll rounded-lg pb-2'>
                    <div className='flex flex-row gap-6 w-full'>
                        {data?.pets.map((pet: any) => (
                            <div key={pet.id}>
                                <Pet {...pet}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}

export default NewPets