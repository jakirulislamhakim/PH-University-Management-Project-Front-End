import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
    userId: string,
    userRole: string,
    iat: number,
    exp: number
}

type TInitialState = {
    user: null | TUser,
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
        setUser: (state, action: PayloadAction<{ user: TUser, token: string }>) => {
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

export const currentUserToken = (state: RootState) => state.auth.token
export const currentUser = (state: RootState) => state.auth.user