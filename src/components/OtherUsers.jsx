// import React from 'react'
// import OtherUser from './OtherUser';
// import useGetOtherUsers from '../hooks/userGetOtherUsers';
// import {useSelector} from "react-redux";


// const OtherUsers = () => {
//     // my custom hook
//     useGetOtherUsers();
//     const {otherUsers} = useSelector(store=>store.user);
//     if (!otherUsers) return; // early return in react
     
//     return (
//         <div className='overflow-auto flex-1'>
//             {
//                 otherUsers?.map((user)=>{
//                     return (
//                         <OtherUser key={user._id} user={user}/>
//                     )
//                 })
//             }
            
//         </div>
//     )
// }

// export default OtherUsers



import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/userGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    // Custom hook to fetch other users
    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);

    // Ensure otherUsers is an array before using map
    if (!Array.isArray(otherUsers)) return null; // Early return with null to avoid rendering issues

    return (
        <div className='overflow-auto flex-1'>
            {otherUsers.map(user => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
};

export default OtherUsers;
