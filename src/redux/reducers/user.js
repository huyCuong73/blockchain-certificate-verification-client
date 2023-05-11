import { INIT_STATE } from "../initialState/initialState";

const userReducer = (state = INIT_STATE.user, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                user: null,
                isFetching: true,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                isFetching: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                isFetching: false,
                error: action.payload,
            };

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                user: null,
                isFetching: false,
                error: false,
            };
        default:
            return { ...state };
    }
}

export default userReducer