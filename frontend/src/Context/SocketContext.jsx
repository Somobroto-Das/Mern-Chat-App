import { createContext, useState, useEffect, useContext } from "react";
import { UseAuthContext } from "./authcontext.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = UseAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("https://chat-app-production-ne3l.onrender.com/", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};