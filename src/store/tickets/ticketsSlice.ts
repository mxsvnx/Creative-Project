import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../index';
import { type Place } from '@api/services/films';

export interface TicketPlace extends Place {
	index: number;
}

export interface TicketsState {
	hall: string;
	date: string;
	time: string;
	places: TicketPlace[];
}

const initialState: TicketsState = {
	hall: '',
	date: '',
	time: '',
	places: [],
};

export const ticketSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		setHall: (state, action: PayloadAction<string>) => {
			state.hall = action.payload;
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload;
		},
		setTime: (state, action: PayloadAction<string>) => {
			state.time = action.payload;
		},
		setPlaces: (state, action: PayloadAction<TicketPlace>) => {
			if (state.places.find((e) => e.index === action.payload.index)) {
				state.places = state.places.filter((e) => e.index !== action.payload.index);
			} else {
				state.places.push(action.payload);
			}
		},
		clearPlaces: (state) => {
			state.places = [];
		},
	},
});

export const { setDate, setHall, setTime, setPlaces, clearPlaces } = ticketSlice.actions;
export const selectTickets = (state: RootState): TicketsState => state.tickets;
export default ticketSlice.reducer;
