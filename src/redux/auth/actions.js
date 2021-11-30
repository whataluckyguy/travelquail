// eslint-disable-next-line import/no-cycle
import { date } from 'yup';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_MYPROFILE_ERROR,
  UPDATE_MYPROFILE_SUCCESS,
  UPDATE_MYPROFILE,
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
 
export const updatemyprofile = () => ({
  type: UPDATE_MYPROFILE,
  payload: date,
});

export const updatemyprofileSuccess = () => ({
  type: UPDATE_MYPROFILE_SUCCESS,
  payload: date,
});

export const updatemyprofileError = (message) => ({
  type: UPDATE_MYPROFILE_ERROR,
  payload: {message},
});

export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = (reset, history ) => ({
  type: RESET_PASSWORD,
  
  payload: { reset, history },
 
});
export const resetPasswordSuccess = (reset) => ({
  
  type: RESET_PASSWORD_SUCCESS,
  payload: reset,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },

});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});
