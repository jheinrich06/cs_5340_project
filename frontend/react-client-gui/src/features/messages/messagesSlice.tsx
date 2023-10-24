import { MessageModel } from "../../models/message.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import messagesService from "./messagesService";

const initialState = {
	messages: [] as MessageModel[],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Send message
export const sendMessage = createAsyncThunk<
	MessageModel,
	MessageModel[],
	{ state: RootState }
>("messages/send", async (messageModelData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await messagesService.sendMessage(messageModelData, token);
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

// Get Messages
export const getMessages = createAsyncThunk<
	MessageModel[],
	string,
	{ state: RootState }
>("messages/getAll", async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await messagesService.getMessages(token);
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

export const messagesSlice = createSlice({
	name: "messages",
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
			.addCase(sendMessage.pending, (state: { isLoading: boolean }) => {
				state.isLoading = true;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.messages.push(action.payload);
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof action.payload === "string") {
					state.message = action.payload;
				}
			})
			.addCase(getMessages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMessages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.messages = action.payload;
			})
			.addCase(getMessages.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				if (typeof action.payload === "string") {
					state.message = action.payload;
				}
			});
	},
});

export const { reset, logout } = messagesSlice.actions;
export default messagesSlice.reducer;
