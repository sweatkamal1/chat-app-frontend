import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedUser?._id) { // Check if selectedUser is available
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/message/${selectedUser._id}`);
                    dispatch(setMessages(res.data));
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]); // Include dispatch in dependencies

}

export default useGetMessages;
