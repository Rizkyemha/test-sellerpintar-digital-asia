import { createContext, useContext } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	userRole: string | null;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	userRole: null,
	isLoading: true,
});

export const useAuth = () => {
	return useContext(AuthContext);
};
