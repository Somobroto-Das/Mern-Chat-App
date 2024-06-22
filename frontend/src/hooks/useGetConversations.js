import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/user");
				if (!res.ok) {
					// Handle HTTP errors
					const errorText = await res.text();
					throw new Error(`Error ${res.status}: ${errorText}`);
				}
				const data = await res.json();
				setConversations(data);
			} catch (error) {
				// Catch network or JSON parsing errors
				toast.error(`Failed to fetch conversations: ${error.message}`);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
