
import { LOGIN_SUCCESS, LOGOUT, SESSION } from './authActions';

const initialState = {
    user: null,
    session: null
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                session: null
            };
        case SESSION:
            return {
                ...state,
                session: action.payload.session
            };
        default:
            return state;
    }
};

export default authReducer;

