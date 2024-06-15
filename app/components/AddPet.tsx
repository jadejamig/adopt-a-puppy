import { Button } from "@/components/ui/button";
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
import AddIcon from '@mui/icons-material/Add';
import { Loader } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from '../store/index';
import { useAddPetMutation } from '../store/petApi';
import { addPet, setFilteredPets } from '../store/petSlice';

const AddPet = () => {
    const dispatch = useAppDispatch();
    const { pets } = useAppSelector((state: RootState) => state.petSlice);

    const [addPetDB, { data, isError, isLoading }] = useAddPetMutation();

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

    async function handleAddPet() {
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
        const id = pets.length + 1;
        const ageLabel = parseInt(age) < 2 ? 'Puppy' : parseInt(age) < 5 ? 'Adult' : 'Senior';
        const pet = {
            id: id.toString(),
            name: name,
            age: age,   
            ageLabel: ageLabel,
            breed: breed,
            gender: capitalize(lowercasedGender),
            location: location,
            image: image,
            size: capitalize(lowercasedSize),
        }

        await addPetDB(pet);        
    }

    useEffect(() => {
        if (data) {
            resetFields();
            dispatch(addPet(data.pet));
            dispatch(setFilteredPets());
            toast.success(`Successfully added ${name}`)
            setOpen(false);
        }
    }, [dispatch, data])

    useEffect(() => {
        if (isError) {
            toast.error('Error adding pet', {description: 'Please try again'})
        }
    }, [isError])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type='button'
                    className='px-4 py-2 text-sm lg:text-base bg-white rounded-lg text-main font-semibold shadow-md hover:bg-zinc-50 hover:text-red-600'
                >
                    <AddIcon className='h-5 w-5 font-bold'/>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Enter doggo details 🐶</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                </div>
                <DialogFooter>
                    <Button 
                    onClick={handleAddPet}
                    type="button" 
                    className="flex w-full justify-center items-center"
                    disabled={disableSubmit() || isLoading}
                    >
                        Submit
                        {isLoading && <Loader className="animate-spin ml-2 h-5 w-5" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddPet