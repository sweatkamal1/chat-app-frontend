// import Signup from './components/Signup';
// import './App.css';
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import { useEffect, useState } from 'react';
// import {useSelector,useDispatch} from "react-redux";
// import io from "socket.io-client";
// import { setSocket } from './redux/socketSlice';
// import { setOnlineUsers } from './redux/userSlice';
// import { BASE_URL } from '.';

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<HomePage/>
//   },
//   {
//     path:"/signup",
//     element:<Signup/>
//   },
//   {
//     path:"/login",
//     element:<Login/>
//   },

// ])

// function App() { 
//   const {authUser} = useSelector(store=>store.user);
//   const {socket} = useSelector(store=>store.socket);
//   const dispatch = useDispatch();

//   useEffect(()=>{
//     if(authUser){
//       const socketio = io("https://chat-app-backend-weld-beta.vercel.app/", {
//           query:{
//             userId:authUser._id
//           }
//       });
//       dispatch(setSocket(socketio));

//       socketio?.on('getOnlineUsers', (onlineUsers)=>{
//         dispatch(setOnlineUsers(onlineUsers))
//       });
//       return () => socketio.close();
//     }else{
//       if(socket){
//         socket.close();
//         dispatch(setSocket(null));
//       }
//     }

//   },[authUser]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router}/>
//     </div>

//   );
// }

// export default App;


import Signup from './components/Signup';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
]);

function App() { 
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io("https://chat-app-backend-weld-beta.vercel.app/", {
        query: {
          userId: authUser._id
        },
        transports: ['websocket', 'polling'] // Ensuring both transports are enabled
      });

      // Dispatch socket to Redux store
      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("connect_error", (err) => {
        console.error("Connection Error:", err);
      });

      return () => {
        socketio.disconnect(); // More appropriate cleanup
      };
    } else {
      if (socket) {
        socket.disconnect(); // Using disconnect instead of close
        dispatch(setSocket(null));
      }
    }
  }, [authUser, socket, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
