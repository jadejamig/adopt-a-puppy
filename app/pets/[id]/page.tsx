'use client'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { useGetPetQuery } from '../../../app/store/petApi';

const PetProfile = ({ params }: { params: { id: string } }) => {

    const {data, isError, isLoading} = useGetPetQuery(params.id);

    const [stats, setStats] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const router = useRouter();

    useEffect(() => {
        
        if (data) {
            const tempStats = [
                {
                    label: 'Breed',
                    value: data?.pet.breed, 
                },
                {
                    label: 'Age',
                    value: data?.pet.age, 
                },
                {
                    label: 'Size',
                    value: data?.pet.size, 
                },
                {
                    label: 'Gender',
                    value: data?.pet.gender, 
                },
            ]
            setStats(tempStats)
        }
    }, [data])

    function resetFields() {
        setName('');
        setContact('');
        setAddress('');
    }

    return (
    <div className='flex flex-col gap-4 max-w-6xl items-center justify-start w-full h-screen pt-28 rounded-b-lg bg-bg '>
        {data && 
            <div className='flex justify-start items-center w-full px-6' onClick={() => router.push('/pets')}>   
                <ArrowBackIosIcon className='h-4 w-4 text-main cursor-pointer' />
                <p className='text-main text-sm cursor-pointer font-semibold'>Back to Pets</p>
            </div>
        }
        {isError && 
            <div className="flex flex-col text-2xl gap-2 font-semibold items-center justify-center w-full h-full py-28">
                Error 404 Pet not found
                <div className="flex gap-2 text-sm items-center justify-center cursor-pointer text-muted-foreground font-normal">
                    <ArrowBackIosIcon className='h-4 w-4 text-main'/>
                    <Link href='/pets' className="text-main font-semibold">Go back to pet list</Link>
                </div>
            </div>}
        {isLoading && 
            <div className='flex flex-col items-center justify-center w-full h-full py-28'>
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-main"></div>
                    </div>
                </div>
            </div>
        }
        {data && (
        <div className='flex flex-col md:flex-row w-full gap-4 px-6 pb-6 bg-bg'>
            <div className="flex-1 flex justify-center items-center p-10 md:p-0 w-full md:w-[400px] shadow-sm">
                <AspectRatio ratio={1 / 1}>
                    <Image fill src={data.pet.image} alt={data.pet.name} className="rounded-lg object-cover" />
                </AspectRatio>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center gap-10'>
                <div className='text-6xl sm:text-7xl md:text-8xl font-black font-oleo text-main'>
                    {data.pet.name}
                </div>
                <div className='grid grid-cols-2 gap-4 text-base w-full justify-center items-center'>
                    {stats.map((stat) => (
                        <div key={stat.label} className='flex gap-2 justify-center items-center'>
                            <div className='font-semibold text-zinc-500'>{stat.label}:</div>
                            <div className='text-zinc-500'>{stat.value}</div>
                        </div>
                    ))}
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='font-semibold text-zinc-500'>Vaccination:</div>
                        <div className='px-2 py-1 bg-emerald-500 text-xs rounded-full text-white'>complete</div>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='font-semibold text-zinc-500'>Special needs:</div>
                        <div className='px-2 py-1 bg-emerald-500 text-xs rounded-full text-white'>none</div>
                    </div>
                </div>
                <div className='flex text-wrap justify-center italic text-zinc-600 text-sm items-center w-full text-center p-6 bg-slate-100 rounded-lg'>
                    {`Hi I'm ${data.pet.name}, I'm a very good ${data.pet.gender === 'Male' ? 'boy' : 'girl'} and I'm ${data.pet.age} 
                    years old. I was born in ${data.pet.location}. I am very friendly and loves to play. I am also great with children and other dogs.`}
                </div> 
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type='button'
                                className='px-4 lg:px-8 py-2 text-sm lg:text-base text-main font-semibold outline outline-2 outline-main rounded-full hover:outline-offset-1 hover:outline-main duration-100'
                            >
                                {`Adopt me 🐾`}
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Adopting {data.pet.name}</DialogTitle>
                            <DialogDescription>
                                {`Please note that we will be doing a home visit to make sure that ${data.pet.name} is in good hands.`}
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Name
                                </Label>
                                <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}   
                                placeholder="John Smith"
                                className="col-span-3 capitalize"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Address
                                </Label>
                                <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Main St"
                                className="col-span-3 capitalize"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Contact No.
                                </Label>
                                <Input
                                id="contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="123-456-7890"
                                className="col-span-3"
                                />
                            </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button 
                                    onClick={() => {
                                        if (!name || !contact || !address) {
                                            toast.error('Please fill in all the fields')
                                        } else {
                                            resetFields();
                                            toast.success(`Such an amazing hooman!`, {
                                                description: `Thank you for taking interest in adopting ${data.pet.name}. Please keep your lines open, we'll reach out to you soon.`,
                                                duration: 6000,
                                                icon: <div className='h-10 w-10'>🐶</div>,
                                            })
                                        }
                                    }}
                                    type="button" 
                                    className="flex w-full justify-center items-center bg-main hover:bg-main/80"
                                    disabled={!name || !contact || !address}
                                    >
                                        Submit
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
            </div>
        </div>
        )}
    </div>  
    )
}

export default PetProfile