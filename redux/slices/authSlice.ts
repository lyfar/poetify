import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { AuthState } from '@/types/auth';

const initialState: AuthState = {
	isAuthorised: false,
};

export const logOut = createAsyncThunk('auth/logOut', async () => {
	return { success: true };
});

export const preloadedAuthState = (
	isAuthorised: boolean = false
): AuthState => ({
	isAuthorised,
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsAuthorised(state, action) {
			state.isAuthorised = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logOut.fulfilled, (state) => {
			state.isAuthorised = false;
		});
	},
});

export const { setIsAuthorised } = authSlice.actions;
export default authSlice.reducer;
