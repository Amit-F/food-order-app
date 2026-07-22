import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Invite = () => {

    const { backendUrl, token, user } = useContext(ShopContext);
    const [inviteLink, setInviteLink] = useState('');

    const generateInvite = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/household/invite', {}, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.success) {
                setInviteLink(`${window.location.origin}/join/${response.data.code}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (!user) {
        return <p className='pt-14 text-center'>Please log in as a cook to generate an invite.</p>
    }

    if (user.role !== 'cook') {
        return <p className='pt-14 text-center'>Only the cook can generate invites.</p>
    }

    return (
        <div className='flex flex-col items-center gap-4 pt-14'>
            <p className='text-2xl prata-regular'>Invite your significant other</p>
            <button onClick={generateInvite} className='px-8 py-2 font-light text-white bg-black'>Generate Invite Link</button>
            {inviteLink && (
                <div className='flex flex-col items-center gap-2 mt-4 text-center'>
                    <p>Share this link (expires in 7 days):</p>
                    <p className='px-4 py-2 break-all border border-gray-300'>{inviteLink}</p>
                </div>
            )}
        </div>
    )
}

export default Invite
