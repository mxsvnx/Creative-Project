import { axiosClient } from '@api/client';

interface Ticket {
	filmId: string;
	row: number;
	column: number;
	seance: {
		date: string;
		time: string;
	};
	phone: string;
}

interface Orders {
	orderNumber: number;
	tickets: Ticket[];
	phone: string;
	status: string;
}

export interface GetAllTicketsDto {
	orders: Orders[];
}

export const getAllTickets = async (token: string): Promise<{ data: GetAllTicketsDto }> => {
	return axiosClient.get('/cinema/orders', { headers: { Authorization: `Bearer ${token}` } });
};

export const cancelOrder = async (token: string, orderId: string) => {
	return axiosClient.put('/cinema/orders/cancel', { orderId }, { headers: { Authorization: `Bearer ${token}` } });
};
