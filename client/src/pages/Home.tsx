import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/utils/firebase';
import api from '@/utils/api';


function Home() {

    const [openMenu, setOpenMenu] = useState<Boolean>(false);
    const [openModal, setOpenModal] = useState<Boolean>(false);

    const googleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result?.user?.getIdToken();
            const response = await api.post("/auth/login", {
                token
            })
            console.log(response)
            console.log(result?.user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen w-full bg-white text-slate-900'>
            <header className='sticky top-0 z-50 border-b border-slate-100 bg-white-80 backdrop-blur'>
                <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6'>

                    <div className='flex items-center gap-2'>

                        <img src={logo} alt="Sellora Ai" className='w-6 h-6  rounded-sm object-contain' />

                        <span className='text-lg font-semibold tracking-tight'>
                            Sellora Ai
                        </span>

                    </div>

                    <div className='hidden md:flex items-center gap-3'>
                        <Button onClick={() => setOpenModal(true)}
                            className='bg-indigo-600 hover:bg-indigo-700 cursor-pointer'>
                            Sign In
                        </Button>
                    </div>

                    <button className='md:hidden w-6 h-6' onClick={() => setOpenMenu(!openMenu)}>
                        {
                            openMenu ? <X /> : <Menu />
                        }
                    </button>

                </div>

                {
                    openMenu && (
                        <div className='md:hidden'>
                            <div className='flex flex-col gap-4 border-t border-slate-100 px-4  py-4 sm:px-6 md:hidden'>
                                <Button
                                    onClick={() => setOpenModal(!openModal)}
                                    className='w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer'>
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    )
                }
            </header>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className='sm:max-w-sm'>
                    <DialogHeader className='items-center text-center'>

                        <img src={logo} className='w-10 h-10 rounded-md object-contain' alt="Logo" />

                        <DialogTitle className='mt-2 text-lg font-semibold'>
                            Sellora Ai
                        </DialogTitle>
                    </DialogHeader>

                    <Button
                        onClick={googleAuth}
                        variant='outline' className='mt-2 w-full gap-2 cursor-pointer'>
                        <FcGoogle className='w-4 h-4' />
                        Sign in with Google
                    </Button>

                    <p className='mt-2 text-center text-sm text-slate-400'>
                        Secure Authentication by Firebase
                    </p>

                </DialogContent>

            </Dialog>
        </div>
    )
}

export default Home