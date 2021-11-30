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

export const UserTrip = (trip, history) => ({
    type: USER_TRIP,
    payload: { trip, history },
});
export const userTripSuccess = (trip) => ({
    type: USER_TRIP_SUCCESS,
    payload: trip,
});
export const userTripError = (error) => ({
    type: USER_TRIP_ERROR,
    payload: { },
    error
});


export const allUserTrip = (alltrip, history) => ({
    type:  ALL_USER_TRIP,
    payload: { alltrip, history },
});
export const allUserTripSuccess = (trip) => ({
    type: ALL_USER_TRIP_SUCCESS,
    payload: trip,
});
export const allUserTripError = (error) => ({
    type: ALL_USER_TRIP_ERROR,
    payload: {},
    error
});

export const TripTable = (trip, history) => ({
    type:  TRIP_TABLE,
    payload: { trip, history },
});
export const TripTableSuccess = (trip) => ({
    type:  TRIP_TABLE_SUCCESS,
    payload: trip,
});
export const TripTableError = (error) => ({
    type: TRIP_TABLE_ERROR,
    payload: {},
    error
});

export const userTripDelete = (id, history) => ({
    type:  USER_TRIP_DELETE,
    payload: { id, history },
});
export const userTripDeleteSuccess = (id) => ({
    type:  USER_TRIP_DELETE_SUCCESS,
    payload: id,
});
export const userTripDeleteError = (error) => ({
    type: USER_TRIP_DELETE_ERROR,
    payload: {},
    error
});

export const tripEditData = (id, history) => ({
    type: TRIP_EDIT,
    payload: { id, history },
});
export const tripEditDataSuccess = (selectedtrip) => ({
    type: TRIP_EDIT_SUCCESS,
    payload: selectedtrip,
});
export const tripEditDataError = (error) => ({
    type: TRIP_EDIT_ERROR,
    payload: {},
    error
});

export const tripDocument = (id, history) => ({
    type: TRIP_DOCUMENT,
    payload: { id, history },
});
export const tripDocumentSuccess = (tripDoc) => ({
    type: TRIP_DOCUMENT_SUCCESS,
    payload: tripDoc,
});
export const tripDocumentError = (error) => ({
    type: TRIP_DOCUMENT_ERROR,
    payload: {},
    error
});

export const tripProfile = (id, history) => ({
    type: TRIP_PROFILE,
    payload: { id, history },
});
export const tripProfileSuccess = (profile) => ({
    type: TRIP_PROFILE_SUCCESS,
    payload: profile,
});
export const tripProfileError = (error) => ({
    type: TRIP_PROFILE_ERROR,
    payload: {},
    error
});


export const userTripUpdate = (trip, history) => ({
    type: USER_TRIP_UPDATE,
    payload: { trip, history },
});
export const userTripUpdateSuccess = (trip) => ({
    type: USER_TRIP_UPDATE_SUCCESS,
    payload: trip,
});
export const userTripUpdateError = (error) => ({
    type: USER_TRIP_UPDATE_ERROR,
    payload: {},
    error
});