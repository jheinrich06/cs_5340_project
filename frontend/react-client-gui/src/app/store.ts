import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	AnyAction,
	CombinedState,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logger from "redux-logger";

const combinedReducer = combineReducers({
	auth: authReducer,
});

const rootReducer = (
	state:
		| CombinedState<{
				auth: {
					user: any;
					isError: boolean;
					isSuccess: boolean;
					isLoading: boolean;
					message: string;
				};
		  }>
		| undefined,
	action: AnyAction
) => {
	if (action.type === "auth/logout") {
		state = undefined;
	}
	return combinedReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
