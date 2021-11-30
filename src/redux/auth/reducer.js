import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_MYPROFILE,
  UPDATE_MYPROFILE_SUCCESS,
  UPDATE_MYPROFILE_ERROR
} from '../actions';
import { getCurrentUser } from '../../helpers/Utils';
import { isAuthGuardActive, currentUser } from '../../constants/defaultValues';

const INIT_STATE = {
  currentUser: isAuthGuardActive ? currentUser : getCurrentUser(),
  forgotUserMail: '',
  updatemyprofiledata:'',
  password: [],
  loading: false,
  error: '',
};


export default (state = INIT_STATE, action) => {
  /* console.log(' state error', state.error) */
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: action.payload.msg,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.msg,
      };
      case UPDATE_MYPROFILE:
        return { ...state, loading: false, error: '' };
        case UPDATE_MYPROFILE_SUCCESS:
      return {
        ...state,
        loading: true,
        updatemyprofiledata: action.payload,
        error: '',
      };
      case UPDATE_MYPROFILE_ERROR:
        return {
          ...state,
          loading: true,
          updatemyprofiledata:'',
          error: '',
        };
    case FORGOT_PASSWORD:
      return { ...state, loading: false, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: true,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: false, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: true,
        password: action.payload,
        
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        password: '',
       
        error: action.payload.msg,
      };
    case REGISTER_USER:
      return { ...state, /*  currentUser: action.payload, */ loading: false, error: '' };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        /* currentUser: action.payload, */
        error: action.payload.msg,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload.msg,
        
      };
      
    case LOGOUT_USER:
      return { ...state, currentUser: null, error: '' };
    default:
      return { ...state };
  }
};
