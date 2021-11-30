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

export const userDoc = (doc, history) => ({
    type: USER_DOCUMENTS,
    payload: { doc, history },
});
export const userDocSuccess = (doc) => ({
    type: USER_DOCUMENTS_SUCCESS,
    payload: doc,
});
export const userDocError = (error) => ({
    type: USER_DOCUMENTS_ERROR,
    payload: { },
    error
});


export const allUserDoc = (alldoc, history) => ({
    type:  ALL_USER_DOCUMENTS,
    payload: { alldoc, history },
});
export const allUserDocSuccess = (doc) => ({
    type: ALL_USER_DOCUMENTS_SUCCESS,
    payload: doc,
});
export const allUserDocError = (error) => ({
    type: ALL_USER_DOCUMENTS_ERROR,
    payload: {},
    error
});

export const DocTable = (id, history) => ({
    type:  DOCUMENTS_TABLE,
    payload: { id, history },
});
export const DocTableSuccess = (id) => ({
    type: DOCUMENTS_TABLE_SUCCESS,
    payload: id,
});
export const DocTableError = (error) => ({
    type: DOCUMENTS_TABLE_ERROR,
    payload: {},
    error
});

export const userDelete = (id, history) => ({
    type:  USER_DOCUMENTS_DELETE,
    payload: { id, history },
});
export const userDeleteSuccess = (id) => ({
    type: USER_DOCUMENTS_DELETE_SUCCESS,
    payload: id,
});
export const userDeleteError = (error) => ({
    type: USER_DOCUMENTS_DELETE_ERROR,
    payload: {},
    error
});

export const userEdit = (id, history) => ({
    type:  DOCUMENTS_EDIT,
    payload: { id, history },
});
export const userEditSuccess = (id) => ({
    type: DOCUMENTS_EDIT_SUCCESS,
    payload: id,
});
export const userEditError = (error) => ({
    type: DOCUMENTS_EDIT_ERROR,
    payload: {},
    error
});

export const userDocUpdate = (doc, history) => ({
    type: USER_DOCUMENTS_UPDATE,
    payload: { doc, history },
});
export const userDocUpdateSuccess = (doc) => ({
    type: USER_DOCUMENTS_UPDATE_SUCCESS,
    payload: doc,
});
export const userDocUpdateError = (error) => ({
    type: USER_DOCUMENTS_UPDATE_ERROR,
    payload: { },
    error
});