import { configureStore } from '@reduxjs/toolkit';
import user from './user/userSlice';
import tickets from './tickets/ticketsSlice';

export const store = configureStore({
	reducer: {
		user,
		tickets,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
