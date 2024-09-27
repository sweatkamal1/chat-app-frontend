import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const messages = useSelector(store => store.message.messages); // Directly access messages
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages(prevMessages => [...prevMessages, newMessage]));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage); // Unsubscribe on cleanup
        };
    }, [socket, dispatch]); // Include socket and dispatch in dependencies
};

export default useGetRealTimeMessage;
