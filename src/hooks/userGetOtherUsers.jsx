// import React, { useEffect } from 'react';
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setOtherUsers } from '../redux/userSlice';

// const useGetOtherUsers = () => {
//     const dispatch = useDispatch();
//     const { authUser } = useSelector(store => store.user);  // Assuming you store user info including token

//     useEffect(() => {
//         const fetchOtherUsers = async () => {
//             try {
//                 axios.defaults.withCredentials = true;
                
//                 // Add token to Authorization header if it exists
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${authUser?.token}`,  // assuming token is part of authUser
//                     },
//                 };
                
//                 const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user`, config);
//                 console.log("other users -> ", res);
//                 dispatch(setOtherUsers(res.data));
//             } catch (error) {
//                 console.log("Error fetching users:", error);
//             }
//         }
//         if (authUser) {
//             fetchOtherUsers();
//         }
//     }, [authUser, dispatch]);

// }

// export default useGetOtherUsers;


import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            if (!authUser) return; // Check if authUser is available

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${authUser.token}`, // assuming token is part of authUser
                    },
                    withCredentials: true, // set this here for each request
                };

                const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/user`, config);
                console.log("Other users -> ", res.data);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error("Error fetching users:", error.response?.data || error.message);
            }
        };

        fetchOtherUsers();
    }, [authUser, dispatch]);
}

export default useGetOtherUsers;
