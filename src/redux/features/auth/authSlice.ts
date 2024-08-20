import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";


type TInitialState = {
    user: null | object,
    token: null | string
}

const initialState: TInitialState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: object, token: string }>) => {
            const { user, token } = action.payload;
            state.user = user
            state.token = token
        },
        logoutUser: (state) => {
            state.user = null
            state.token = null
        }
    }
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token
export const useCurrentUser = (state: RootState) => state.auth.user