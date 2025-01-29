import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';

// Define the User type based on your new API response
type User = {
	empID: string;
	email?: string; // Optional, as it's not in the new API response but may exist
	username?: string; // Optional, for consistency
	roles: string;
	employeeName: string;
	mobileNumber: string;
	dateOfBirth: string;
	dateOfJoining: string;
	token?: string; // Not included in your API, but kept for future compatibility
	error?: string; // Optional property for error messages
};

// Define the shape of the AuthContext
interface AuthContextType {
	user?: User;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<{ status: number; message?: string }>;
	logout: () => void;
	saveSession: (user: User) => void;
	removeSession: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using AuthContext
export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
}

const authSessionKey = '_AUTH_SESSION';

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | undefined>(
		localStorage.getItem(authSessionKey)
			? JSON.parse(localStorage.getItem(authSessionKey) || '{}')
			: undefined
	);

	const saveSession = useCallback((user: User) => {
		localStorage.setItem(authSessionKey, JSON.stringify(user));
		setUser(user);
	}, []);

	const removeSession = useCallback(() => {
		localStorage.removeItem(authSessionKey);
		setUser(undefined);
	}, []);

	const login = async (email: string, password: string): Promise<{ status: number; message?: string }> => {
		try {
			// Call your login API
			const response = await axios.post('https://arvindwfm.clay.in:5077/api/Login/Getlogin', {
				email,
				password,
			});
			const data = response.data;
			if (data.isSuccess) {
				const employeeDetails = data.getEmployeeDetailsbyEmpId;

				const userData: User = {
					empID: employeeDetails.empID,
					roles: employeeDetails.role,
					employeeName: employeeDetails.employeeName,
					mobileNumber: employeeDetails.mobileNumber,
					dateOfBirth: employeeDetails.dateOfBirth,
					dateOfJoining: employeeDetails.dateOfJoining,
				};

				console.log('userdata', userData);
				saveSession(userData); // Save user session
				return { status: 200, message: data.message };
			}

			return { status: 400, message: data.message || 'Login failed. Invalid response from server.' };
		} catch (error: unknown) {
			const axiosError = error as AxiosError;
			console.error('Login failed:', axiosError);

			return {
				status: axiosError.response?.status || 500,
				message: axiosError.response?.data?.message || 'Login failed. Please try again.',
			};
		}
	};

	const logout = useCallback(() => {
		removeSession();
	}, [removeSession]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: Boolean(user),
				login,
				logout,
				saveSession,
				removeSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
