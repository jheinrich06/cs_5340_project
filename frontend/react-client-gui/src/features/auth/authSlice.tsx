import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AuthModel } from "../../models/auth.model";
import { ChangePasswordModel } from "../../models/change-password.model";
import { LoginModel } from "../../models/login.model";
import { RegistrationModel } from "../../models/registration.model";
import authService from "./authService";

const user: any = "";

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async (user: RegistrationModel, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			let message = "Unknown Error";
			if (error instanceof Error)
				message =
					(error.message && error.name && error.stack) ||
					error.message ||
					error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
// Update User Details
export const editUserDetails = createAsyncThunk<
	AuthModel,
	AuthModel,
	{ state: RootState }
>("auth/edit", async (editData: AuthModel, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await authService.updateUserDetails(editData, token);
	} catch (error) {
		let message = "Unknown Error";
		if (error instanceof Error)
			message =
				(error.message && error.name && error.stack) ||
				error.message ||
				error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Update User Password

export const editUserPassword = createAsyncThunk<
	AuthModel,
	ChangePasswordModel,
	{ state: RootState }
>("auth/change-password", async (editData: ChangePasswordModel, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await authService.updateUserPassword(editData, token);
	} catch (error) {
		let message = "Unknown Error";
		if (error instanceof Error)
			message =
				(error.message && error.name && error.stack) ||
				error.message ||
				error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Login user
export const login = createAsyncThunk(
	"auth/login",
	async (userData: LoginModel, thunkAPI) => {
		try {
			return await authService.login(userData);
		} catch (error) {
			let message = "Unknown Error";
			if (error instanceof Error)
				message =
					(error.message && error.name && error.stack) ||
					error.message ||
					error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
		logout: (state) => {
			// From here we can take action only at this "auth" state
			// But, as we have taken care of this particular "logout" action
			// in rootReducer, we can use it to CLEAR the complete Redux Store's state
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state: { isLoading: boolean }) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof action.payload === "string") {
					state.message = action.payload;
				}
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof action.payload === "string") {
					state.message = action.payload;
				}
				state.user = null;
			})
			.addCase(editUserDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editUserDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(editUserDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof action.payload === "string") {
					state.message = action.payload;
				}
			})
			.addCase(editUserPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editUserPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(editUserPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof action.payload === "string") {
					state.message = action.payload;
				}
			});
	},
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
