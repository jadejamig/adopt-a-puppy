'use client'
import AdminPetList from '../components/AdminPetList'
import PetList from '../components/PetList'
import { useAppSelector } from '../store/hooks'
import { RootState } from '../store/index'

const Pets = () => {
    const userType = useAppSelector((state: RootState) => state.petSlice.currentUserType);
    return (
        <div className='flex flex-col gap-4 max-w-6xl items-center justify-start w-full h-full pt-28 bg-bg'>
            {userType === 'user' ? <PetList/> : <AdminPetList/>}
        </div>  
    )
}

export default Pets