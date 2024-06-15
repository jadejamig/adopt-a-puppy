import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from '../store/index';
import { useGetPetQuery, useUpdatePetMutation } from '../store/petApi';
import { setFilteredPets, setIsSelecting, updatePet } from '../store/petSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface UpdatePetProps {
    params: { id: string }
}

const UpdatePet = ({ params }: UpdatePetProps) => {
    const dispatch = useAppDispatch();
    const { pets } = useAppSelector((state: RootState) => state.petSlice);

    const {data: petData, isError: petError, isLoading: petLoading} = useGetPetQuery(params.id);

    const [updatePetDB, { data: updateData, isError: updateError, isLoading: updateLoading }] = useUpdatePetMutation();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [open, setOpen] = useState(false);

    const fields = ['name', 'age', 'breed', 'gender', 'location', 'image', 'size']
    const placeholders = ['Barky', '2', 'Labrador', 'Male', 'New York', 'https://images.unsplash.com/photo', 'Medium']
    const values = [name, age, breed, gender, location, image, size]
    const valueSetters = [setName, setAge, setBreed, setGender, setLocation, setImage, setSize]

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function disableSubmit() {
        return !name || !age || !breed || !gender || !location || !image || !size;
    }

    function resetFields() {
        setName('');
        setAge('');
        setBreed('');
        setGender('');
        setLocation('');
        setImage('');
        setSize('');
    }

    async function handleUpdatePet() {
        const lowercasedGender = gender.toLocaleLowerCase();
        const lowercasedSize = size.toLocaleLowerCase();

        if (lowercasedGender !== 'male' && lowercasedGender !== 'female') {
            toast.error('Invalid gender', {description: 'The only options are Male and Female'});
            return;
        }
        if (lowercasedSize !== 'small' && lowercasedSize !== 'medium' && lowercasedSize !== 'large') {
            toast.error('Invalid size', {description: 'The only options are Small, Medium, and Large'});
            return;
        }

        const ageLabel = parseInt(age) < 2 ? 'Puppy' : parseInt(age) < 5 ? 'Adult' : 'Senior';
        const pet = {
            id: params.id,
            name: name,
            age: age,   
            ageLabel: ageLabel,
            breed: breed,
            gender: capitalize(lowercasedGender),
            location: location,
            image: image,
            size: capitalize(lowercasedSize),
        }

        await updatePetDB(pet);        
    }
    
    function assignFields() {
        if (petData) {
            setName(petData.pet.name);
            setAge(petData.pet.age);
            setBreed(petData.pet.breed);
            setGender(petData.pet.gender);
            setLocation(petData.pet.location);
            setImage(petData.pet.image);
            setSize(petData.pet.size);
        }
    }

    useEffect(() => {
        assignFields();
    }, [petData])

    useEffect(() => {
        if (updateData) {
            resetFields();
            dispatch(updatePet(updateData.pet));
            dispatch(setFilteredPets());
            toast.success(`Successfully updated ${name}`)
            setOpen(false);
            dispatch(setIsSelecting(false));
        }
    }, [dispatch, updateData])

    useEffect(() => {
        if (updateError) {
            toast.error('Error updating pet', {description: 'Please try again'})
        }
    }, [updateError])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                type='button'
                className={`cursor-pointer text-xs bg-white hover:bg-slate-200 rounded-md 
                    px-2 py-1 text-slate-500 hover:text-slate-700 font-semibold absolute top-2 right-2`}
                >
                    Edit
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update doggo details 🐶 {params.id}</DialogTitle>
                </DialogHeader>
                {petLoading && <div className="">
                    {fields.map((field, index) => (
                        <div key={field}>
                            <Skeleton height={30} className='mb-2'/>
                        </div>
                    ))}
                </div>}
                {petData && <div className="grid gap-4 py-4">
                    {fields.map((field, index) => (
                        <div key={field} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                {capitalize(field)}
                            </Label>
                            <Input
                            id={field}
                            type={field === 'age' ? 'number' : ''}
                            value={values[index]}
                            onChange={(e) => valueSetters[index](e.target.value)}   
                            placeholder={placeholders[index]}
                            className="col-span-3 capitalize"
                            />
                        </div>
                    ))}
                </div>}
                <DialogFooter>
                    <Button 
                    onClick={handleUpdatePet}
                    type="button" 
                    className="flex w-full justify-center items-center"
                    disabled={disableSubmit() || updateLoading}
                    >
                        Update
                        {updateLoading && <Loader className="animate-spin ml-2 h-5 w-5" />}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default UpdatePet