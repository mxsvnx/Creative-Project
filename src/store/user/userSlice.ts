import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../index';

interface UserState {
	token: string;
}

const initialState: UserState = {
	token: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
	},
});

export const { setToken } = userSlice.actions;
export const selectUser = (state: RootState): string => state.user.token;
export default userSlice.reducer;
