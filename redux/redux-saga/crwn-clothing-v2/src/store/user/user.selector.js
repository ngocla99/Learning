import { createSelector } from 'reselect';

export const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector([selectUserReducer], (user) => user.currentUser);

export const selectErrorSignUp = createSelector([selectUserReducer], (user) => {
    if (!user.errorSignUp) return;
    if (user.errorSignUp.code === 'auth/email-already-in-use') return 'Cannot create user, email already in use';

    return 'user creation encountered an error';
});
