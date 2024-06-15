import { useRouter } from 'next/navigation';
import { Pet as PetSchema } from '../store/petApi';

const Pet = (pet : PetSchema) => {
  const router = useRouter();

  return (
    <div 
      onClick={() => {
        router.push(`/pets/${pet.id}`)
    }} 
      className='flex flex-col gap-2 items-center justify-start w-full rounded-lg pb-2 bg-white shadow-sm cursor-pointer'
    >
        <div className='h-56 w-56'>
            <img src={pet.image} alt='dog' className='rounded-t-lg object-cover h-56 w-56' />
        </div>
        <div className='flex flex-col justify-center items-center w-full gap-1 text-center'>  
            <h1 className='text-sm font-semibold'>{`${pet.name}, ${pet.age} ${parseInt(pet.age) > 1 ? 'years' : 'year'} old`}</h1>
            <h1 className='text-sm text-zinc-500'>{`${pet.breed} (${pet.location})`}</h1>
        </div>
    </div>
  )
}

export default Pet