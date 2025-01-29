import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/common';
import type { User } from '@/types';
import config from '@/config';

export default function useLogin() {
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const { isAuthenticated, saveSession } = useAuthContext();

	const redirectUrl = useMemo(
		() =>
			location.state && location.state.from
				? location.state.from.pathname
				: '/',
		[location.state]
	);

	const login = async ({ email, password }: User) => {
		setLoading(true);
		try {
			// Replace with your API endpoint
			const res = await fetch(`${config.API_URL}/Login/GetLogin`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				throw new Error('Failed to connect to the API');
			}

			const data = await res.json();

			// Check for API response success
			if (data.isSuccess) {
				const employeeDetails = data.getEmployeeDetailsbyEmpId;

				// Save session in the authentication context or local storage
				saveSession({
					empID: employeeDetails.empID,
					employeeName: employeeDetails.employeeName,
					roles: employeeDetails.role,
					mobileNumber: employeeDetails.mobileNumber,
					dateOfBirth: employeeDetails.dateOfBirth,
					dateOfJoining: employeeDetails.dateOfJoining,
				});

				// Redirect user to the intended route or fallback to "/"
				navigate(redirectUrl);
			} else {
				throw new Error(data.message || 'Login failed');
			}
		} catch (error: any) {
			console.error('Login Error:', error.message);
			alert(error.message); // Replace with your UI error-handling mechanism
		} finally {
			setLoading(false);
		}
	};

	return { loading, login, redirectUrl, isAuthenticated };
}
