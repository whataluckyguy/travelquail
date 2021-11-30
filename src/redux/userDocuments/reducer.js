import {
    USER_DOCUMENTS,
    USER_DOCUMENTS_SUCCESS,
    USER_DOCUMENTS_ERROR,
    ALL_USER_DOCUMENTS,
    ALL_USER_DOCUMENTS_SUCCESS,
    ALL_USER_DOCUMENTS_ERROR,
    DOCUMENTS_TABLE,
    DOCUMENTS_TABLE_SUCCESS,
    DOCUMENTS_TABLE_ERROR,
    USER_DOCUMENTS_DELETE,
    USER_DOCUMENTS_DELETE_SUCCESS,
    USER_DOCUMENTS_DELETE_ERROR,
    DOCUMENTS_EDIT,
    DOCUMENTS_EDIT_SUCCESS,
    DOCUMENTS_EDIT_ERROR,
    USER_DOCUMENTS_UPDATE,
    USER_DOCUMENTS_UPDATE_SUCCESS,
    USER_DOCUMENTS_UPDATE_ERROR
}
    from "../actions"


const INIT_STATE = {

    userDocument: [],
    loading: false,
    error: '',
    docTable: [],
    selectedDocument: []
};
/* console.log("payloaddd",INIT_STATE.userProfile)
 */
const DocUser = (state = INIT_STATE, action) => {


    switch (action.type) {
        case USER_DOCUMENTS:
            return { ...state, loading: true, error: '' };
        case USER_DOCUMENTS_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case USER_DOCUMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ALL_USER_DOCUMENTS:
            return { ...state, loading: true, error: '' };
        case ALL_USER_DOCUMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                userDocument: action.payload

            };
        case ALL_USER_DOCUMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case DOCUMENTS_TABLE:
            return { ...state, loading: true, error: '' };
        case DOCUMENTS_TABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                docTable: action.payload

            };
        case DOCUMENTS_TABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case USER_DOCUMENTS_DELETE:
            return { ...state, loading: true, error: '' };
        case USER_DOCUMENTS_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                docTable: state.docTable.filter(p => p.id !== action.payload)


            };
        case USER_DOCUMENTS_DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case DOCUMENTS_EDIT:
            return { ...state, loading: true, error: '' };
        case DOCUMENTS_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedDocument: action.payload


            };
        case DOCUMENTS_EDIT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case USER_DOCUMENTS_UPDATE:
            return { ...state, loading: true, error: '' };
        case USER_DOCUMENTS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,

            };
        case USER_DOCUMENTS_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return { ...state };
    }
};
export default DocUser;