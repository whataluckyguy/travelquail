import profile from "../../views/app/profile";
import {
    USER_PROFILE,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_ERROR,
    ALL_USER_PROFILE,
    ALL_USER_PROFILE_SUCCESS,
    ALL_USER_PROFILE_ERROR,
    PROFILE_TABLE,
    PROFILE_TABLE_SUCCESS,
    PROFILE_TABLE_ERROR,
    USER_PROFILE_DELETE,
    USER_PROFILE_DELETE_SUCCESS,
    USER_PROFILE_DELETE_ERROR,
    PROFILE_EDIT,
    PROFILE_EDIT_SUCCESS,
    PROFILE_EDIT_ERROR,
    USER_PROFILE_UPDATE,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_ERROR,
    PROFILE_DOCUMENT,
    PROFILE_DOCUMENT_SUCCESS,
    PROFILE_DOCUMENT_ERROR,
    PROFILE_TRIP,
    PROFILE_TRIP_SUCCESS,
    PROFILE_TRIP_ERROR

}
    from "../actions"


const INIT_STATE = {

    userProfile: [],
    loading: false,
    error: '',
    profileTable: [],
    selectedProfileData: [],
    profileDocTable: [],
    profileTripTable:[]

};
/* console.log("payloaddd",INIT_STATE.userProfile)
 */
const profileUser = (state = INIT_STATE, action) => {


    switch (action.type) {
        case USER_PROFILE:
            return { ...state, loading: true, error: '' };
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case USER_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ALL_USER_PROFILE:
            return { ...state, loading: true, error: '' };
        case ALL_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userProfile: action.payload

            };
        case ALL_USER_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case PROFILE_TABLE:
            return { ...state, loading: true, error: '' };
        case PROFILE_TABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileTable: action.payload

            };
        case PROFILE_TABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case USER_PROFILE_DELETE:
            return { ...state, loading: true, error: '' };
        case USER_PROFILE_DELETE_SUCCESS:

            return {
                ...state,
                loading: false,
                profileTable: state.profileTable.filter(p => p.id !== action.payload)

            };
        case USER_PROFILE_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case PROFILE_EDIT:
            return { ...state, loading: true, error: '' };
        case PROFILE_EDIT_SUCCESS:

            return {
                ...state,
                loading: false,
                selectedProfileData: action.payload

            };
        case PROFILE_EDIT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case USER_PROFILE_UPDATE:
            return { ...state, loading: true, error: '' };
        case USER_PROFILE_UPDATE_SUCCESS:

            return {
                ...state,
                loading: false,


            };
        case USER_PROFILE_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case PROFILE_DOCUMENT:
            return { ...state, loading: true, error: '' };
        case PROFILE_DOCUMENT_SUCCESS:

            return {
                ...state,
                loading: false,
                profileDocTable: action.payload

            };
        case PROFILE_DOCUMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case PROFILE_TRIP:
            return { ...state, loading: true, error: '' };
        case PROFILE_TRIP_SUCCESS:

            return {
                ...state,
                loading: false,
                profileTripTable: action.payload

            };
        case PROFILE_TRIP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return { ...state };
    }
};
export default profileUser;