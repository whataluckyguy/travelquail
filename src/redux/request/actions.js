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

export const requestData = (id, history) => ({
    type: REQUEST_DATA,
    payload: { id, history },
});
export const requestDataSuccess = (request) => ({
    type: REQUEST_DATA_SUCCESS,
    payload: request,
});
export const requestDataError = (error) => ({
    type: REQUEST_DATA_ERROR,
    payload: { },
    error
});

export const requestUser = (request, history) => ({
    type: USER_REQUEST,
    payload: { request, history },
});
export const requestUserSuccess = (request) => ({
    type: USER_REQUEST_SUCCESS,
    payload: request,
});
export const requestUserError = (error) => ({
    type: USER_REQUEST_ERROR,
    payload: { },
    error
});

export const requestTable = (id, history) => ({
    type: REQUEST_TABLE,
    payload: { id, history },
});
export const requestTableSuccess = (id) => ({
    type: REQUEST_TABLE_SUCCESS,
    payload: id,
});
export const requestTableError = (error) => ({
    type: REQUEST_TABLE_ERROR,
    payload: { },
    error
});

export const requestDelete = (id, history) => ({
    type: USER_REQUEST_DELETE,
    payload: { id, history },
});
export const requestDeleteSuccess = (id) => ({
    type:USER_REQUEST_DELETE_SUCCESS,
    payload: id,
});
export const requestDeleteError = (error) => ({
    type: USER_REQUEST_DELETE_ERROR,
    payload: { },
    error
});