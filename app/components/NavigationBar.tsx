import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Link from 'next/link';
import React from 'react';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentUserType } from '../store/petSlice';
interface NavigationBarProps {
    children?: React.ReactNode
}

const NavigationBar = ({ children }: NavigationBarProps) => {
    const dispatch = useAppDispatch();
    const userType = useAppSelector((state: RootState) => state.petSlice.currentUserType);

    const userTypeOptions = [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
    ];
    return (
        <div className='fixed z-10 top-0 flex w-full max-w-6xl justify-between items-center p-6 shadow-md bg-white'>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        {userType === 'admin' ? <ManageAccountsIcon className='h-7 w-7 text-main'/> : <AccountCircleIcon className='h-7 w-7 text-main'/>}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            userTypeOptions.map((option) => (
                                <DropdownMenuItem key={option.label}>
                                    <button
                                        className='flex w-full justify-center text-center'
                                        onClick={() => {
                                            dispatch(setCurrentUserType(option.value as 'user' | 'admin'));
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                    <RadioButtonCheckedIcon className={`h-4 w-4 ${option.value === userType ? 'text-green-500' : 'text-slate-500'}`} />
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <Link href='/' className='text-main text-4xl font-main'>Adopt a Puppy</Link>
            </div>
            <div className='flex justify-center items-center h-6 w-6 bg-main rounded-full p-1'>
                <Link href='/pets'>
                    <SearchRoundedIcon className='h-5 w-5 text-white cursor-pointer'/>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default NavigationBar