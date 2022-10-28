import USER_ACTION_TYPES from './user.types';

export const USER_INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    errorSignIn: null,
    errorSignUp: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload, isLoading: false, errorSignUp: null };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, errorSignIn: payload, isLoading: false };
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return { ...state, errorSignUp: payload, isLoading: false };
        default:
            return state;
    }
};
