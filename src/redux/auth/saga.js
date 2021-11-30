import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { auth } from '../../helpers/Firebase';
import { NotificationManager } from '../../components/common/react-notifications';


import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

import { adminRoot, currentUser } from '../../constants/defaultValues';
import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import {API_URL} from "../../apiUrl"


export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password, history) =>
  // eslint-disable-next-line no-return-await
  await axios.post(`${API_URL}/user/login`, { email, password })
    /*  .signInWithEmailAndPassword(email, password) */
    .then((user) => {
      console.log("user", user)
      if (user.status === 200) {
        console.log(user.data.data)
        setCurrentUser(user.data.data);
        put(loginUserSuccess(user.data.msg));
        NotificationManager.success(user.data.msg, 'Sucessfully Logged In', 3000, null, null, '');
        history.push(adminRoot)
      } else if (user.status === 206) {
        put(loginUserError(user.data.msg))
        NotificationManager.warning(user.data.msg, 'Login User', 3000, null, null, '');
      }
    })
    .catch((error) => NotificationManager.warning(error, 'Login Error', 3000, null, null, ''));

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  /*  try { */
  const loginUser = yield call(loginWithEmailPasswordAsync, email, password, history);
  
  /*  if (!loginUser.message) {
     const item = { uid: loginUser.user.uid, ...currentUser };
     setCurrentUser(item);
     yield put(loginUserSuccess(item));
     history.push(adminRoot);
   } else {
     yield put(loginUserError(loginUser.message));
   }
 } catch (error) {
   yield put(loginUserError(error));
 } */
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (name, mobile, email, password) =>

  // eslint-disable-next-line no-return-await
  await axios.post(`${API_URL}/user/register`, { name, mobile, email, password })
    /* .createUserWithEmailAndPassword(name,mobile, email, password) */
    .then((user) => {
      /*  console.log("user", user) */
      if (user.status === 200) {
        put(registerUserSuccess(user.data))
        NotificationManager.success(user.data.msg, 'Registeration Succesfull', 3000, null, null, '');
      } else if (user.status === 206) {
        put(registerUserError(user.data.msg))
        NotificationManager.warning(user.data.msg, 'Registered User', 3000, null, null, '');
      }

    })
    .catch((error) => {
      /*  console.log(error, "err") */
      NotificationManager.warning(error, 'Registeration Error', 3000, null, null, '')
    });

function* registerWithEmailPassword({ payload }) {
  /* console.log("value", payload) */
  const { name, mobile, email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      name, mobile, email, password
      
    );
    console.log("register", registerUser)
    /*  if (!registerUser.message) {
       const item = { uid: registerUser.user.id,};
      
        setCurrentUser(item);
       yield put(registerUserSuccess(item));
       history.push(adminRoot);
     } else {
       yield put(registerUserError(registerUser.message));
     } */
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push("/");
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await

  await axios.post(`${API_URL}/user/forgotpassword`, { email })
    /* .createUserWithEmailAndPassword(name,mobile, email, password) */
    .then((user) => {
      /*  console.log("user", user) */
      if (user.status === 200) {
        NotificationManager.success(user.data.msg, 'Email Sent', 3000, null, null, '');
      } else if (user.status === 206) {
        NotificationManager.warning(user.data.msg, 'Error Occured', 3000, null, null, '');
      }

    })
    .catch((error) => {
      /*  console.log(error, "err") */
      NotificationManager.warning(error, 'Registeration Error', 3000, null, null, '')
    });
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  /* console.log("email", email) */
  /*  try { */
  const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
  /*  if (!forgotPasswordStatus) {
     yield put(forgotPasswordSuccess('success'));
   } else {
     yield put(forgotPasswordError(forgotPasswordStatus.message));
   }
 } catch (error) {
   yield put(forgotPasswordError(error));
 } */
}


export function* watchUpdateMyProfile() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, updatemyprofile);
}

const UpdateMyProfileAsync = async ({email})=>{
await axios.post(`${API_URL}/user/updatemyprofile`, { email })
.then((user) => {
  /*  console.log("user", user) */
  if (user.status === 200) {
    NotificationManager.success(user.data.msg, 'Profile Updated Successfully', 3000, null, null, '');
  } else if (user.status === 206) {
    NotificationManager.warning(user.data.msg, 'Internal Server Error', 3000, null, null, '');
  }

})
.catch((error) => {
  /*  console.log(error, "err") */
  NotificationManager.warning(error, 'Registeration Error', 3000, null, null, '')
});
}

function* updatemyprofile({ payload }) {
  const { email } = payload.updatemyprofile;
  /* console.log("email", email) */
  /*  try { */
  const updatemyprofileStatus = yield call(UpdateMyProfileAsync, email);
  /*  if (!forgotPasswordStatus) {
     yield put(forgotPasswordSuccess('success'));
   } else {
     yield put(forgotPasswordError(forgotPasswordStatus.message));
   }
 } catch (error) {
   yield put(forgotPasswordError(error));
 } */
}


export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (user_id, old_password, new_password) => {
  // eslint-disable-next-line no-return-await
  await axios.post(`${API_URL}/user/resetpassword`, {user_id, old_password, new_password })
    /* .createUserWithEmailAndPassword(name,mobile, email, password) */
    .then((user) => {
      /*  console.log("user", user) */
      if (user.status === 200) {
        NotificationManager.success(user.data.msg, 'Reset Successful', 3000, null, null, '');
      } else if (user.status === 206) {
        NotificationManager.warning(user.data.msg, 'Reset Error', 3000, null, null, '');
      }

    })
    .catch((error) => {
      /*  console.log(error, "err") */
      NotificationManager.warning(error, 'Reset Error', 3000, null, null, '')
    });
};

function* resetPassword({ payload }) {
  const {old_password, new_password } = payload.reset;
  /*  try { */
   /*  console.log('aaa',payload.reset) */
    const user_id = getCurrentUser().id
  const resetPasswordStatus = yield call(
    resetPasswordAsync,
    user_id,  old_password, new_password
  );
  /*  if (!resetPasswordStatus) {
     yield put(resetPasswordSuccess('success'));
   } else {
     yield put(resetPasswordError(resetPasswordStatus.message));
   }
 } catch (error) {
   yield put(resetPasswordError(error));
 } */
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchUpdateMyProfile),
    fork(watchResetPassword),
  ]);
}
