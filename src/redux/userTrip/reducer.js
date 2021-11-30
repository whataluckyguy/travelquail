import {
    USER_TRIP,
    USER_TRIP_SUCCESS,
    USER_TRIP_ERROR,
    ALL_USER_TRIP,
    ALL_USER_TRIP_SUCCESS,
    ALL_USER_TRIP_ERROR,
    TRIP_TABLE,
    TRIP_TABLE_SUCCESS,
    TRIP_TABLE_ERROR,
    USER_TRIP_DELETE,
    USER_TRIP_DELETE_SUCCESS,
    USER_TRIP_DELETE_ERROR,
    TRIP_EDIT,
    TRIP_EDIT_SUCCESS,
    TRIP_EDIT_ERROR,
    TRIP_DOCUMENT,
    TRIP_DOCUMENT_SUCCESS,
    TRIP_DOCUMENT_ERROR,
    TRIP_PROFILE,
    TRIP_PROFILE_SUCCESS,
    TRIP_PROFILE_ERROR,
    USER_TRIP_UPDATE,
    USER_TRIP_UPDATE_SUCCESS,
    USER_TRIP_UPDATE_ERROR

}
    from "../actions"


const INIT_STATE = {

    userTrip: [],
    loading: false,
    error: '',
    tripTable: [],
    selectedTripData: [],
    tripDocTable: [],
    tripProfileTable: []
};
console.log("reduccer data", INIT_STATE)

const tripUser = (state = INIT_STATE, action) => {


    switch (action.type) {
        case USER_TRIP:
            return { ...state, loading: true, error: '' };
        case USER_TRIP_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case USER_TRIP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ALL_USER_TRIP:
            return { ...state, loading: true, error: '' };
        case ALL_USER_TRIP_SUCCESS:
            return {
                ...state,
                loading: false,
                userTrip: action.payload

            };
        case ALL_USER_TRIP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case TRIP_TABLE:
            return { ...state, loading: true, error: '' };
        case TRIP_TABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                tripTable: action.payload

            };
        case TRIP_TABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case USER_TRIP_DELETE:
            return { ...state, loading: true, error: '' };
        case USER_TRIP_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                tripTable: state.tripTable.filter(p => p.id !== action.payload)

            };
        case USER_TRIP_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case TRIP_EDIT:
            return { ...state, loading: true, error: '' };
        case TRIP_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedTripData: action.payload

            };
        case TRIP_EDIT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case TRIP_DOCUMENT:
            return { ...state, loading: true, error: '' };
        case TRIP_DOCUMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                tripDocTable: action.payload

            };
        case TRIP_DOCUMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case TRIP_PROFILE:
            return { ...state, loading: true, error: '' };
        case TRIP_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                tripProfileTable: action.payload

            };
        case TRIP_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case USER_TRIP_UPDATE:
            return { ...state, loading: true, error: '' };
        case USER_TRIP_UPDATE_SUCCESS:

            return {
                ...state,
                loading: false,


            };
        case USER_TRIP_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return { ...state };
    }
};
export default tripUser;