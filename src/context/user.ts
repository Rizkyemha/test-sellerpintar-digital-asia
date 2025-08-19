import { createContext, useContext } from "react";

interface UserContextType {
	username: string | null;
	role: string | null;
}

export const UserContext = createContext<UserContextType>({
	username: "",
	role: "",
});

export const useUser = () => {
	return useContext(UserContext);
};
