import { axiosClient } from '../client';

interface CreateOtpCodeDto {
	success: boolean;
	reason: string;
	retryDelay: number;
}

interface SignInDto {
	data: {
		success: boolean;
		reason: string;
		user: {
			phone: number;
			firstname: string;
			middlename: string;
			lastname: string;
			email: string;
			city: string;
		};
		token: string;
	};
}

export const createOtpCode = async (phone: string): Promise<CreateOtpCodeDto> => {
	return await axiosClient.post(`/auth/otp`, { phone });
};

export const signIn = async (phone: string, code: number): Promise<SignInDto> => {
	return await axiosClient.post(`/users/signin`, {
		phone,
		code,
	});
};
