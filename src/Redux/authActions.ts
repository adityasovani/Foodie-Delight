// src/actions/authActions.js

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SESSION = 'SESSION';

export const loginSuccess = (user: any,) => ({
    type: LOGIN_SUCCESS,
    payload: { user }
});

export const setSession = (session: any) => ({
    type: SESSION,
    payload: { session }
});

export const logout = () => ({
    type: LOGOUT
});
