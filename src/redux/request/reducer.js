import {
    REQUEST_DATA,
    REQUEST_DATA_SUCCESS,
    REQUEST_DATA_ERROR,
    USER_REQUEST,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_ERROR,
    REQUEST_TABLE,
    REQUEST_TABLE_SUCCESS,
    REQUEST_TABLE_ERROR,
    USER_REQUEST_DELETE,
    USER_REQUEST_DELETE_SUCCESS,
    USER_REQUEST_DELETE_ERROR
}
    from "../actions"


const INIT_STATE = {

    reqData: [],
    loading: false,
    error: '',
    requestTableData: []
};
/* console.log("payloaddd",INIT_STATE.userProfile)
 */
const userRequest = (state = INIT_STATE, action) => {


    switch (action.type) {
        case REQUEST_DATA:
            return { ...state, loading: true, error: '' };
        case REQUEST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                reqData: action.payload

            };
        case REQUEST_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case USER_REQUEST:
            return { ...state, loading: true, error: '' };
        case USER_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,


            };
        case USER_REQUEST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case REQUEST_TABLE:
            return { ...state, loading: true, error: '' };
        case REQUEST_TABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                requestTableData: action.payload

            };
        case REQUEST_TABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case USER_REQUEST_DELETE:
            return { ...state, loading: true, error: '' };
        case USER_REQUEST_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                requestTableData: state.requestTableData.filter(r => r.id !== action.payload)

            };
        case USER_REQUEST_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return { ...state };
    }
};
export default userRequest;