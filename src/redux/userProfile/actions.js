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

export const UserProfile = (profile, history) => ({
    type: USER_PROFILE,
    payload: { profile, history },
});
export const userProfileSuccess = (profile) => ({
    type: USER_PROFILE_SUCCESS,
    payload: profile,
});
export const userProfileError = (error) => ({
    type: USER_PROFILE_ERROR,
    payload: { },
    error
});


export const allUserProfile = (allprofile, history) => ({
    type: ALL_USER_PROFILE,
    payload: { allprofile, history },
});
export const allUserProfileSuccess = (profile) => ({
    type: ALL_USER_PROFILE_SUCCESS,
    payload: profile,
});
export const allUserProfileError = (error) => ({
    type: ALL_USER_PROFILE_ERROR,
    payload: {},
    error
});

export const ProfileTable = (profile, history) => ({
    type: PROFILE_TABLE,
    payload: { profile, history },
});
export const ProfileTableSuccess = (profile) => ({
    type: PROFILE_TABLE_SUCCESS,
    payload: profile,
});
export const ProfileTableError = (error) => ({
    type: PROFILE_TABLE_ERROR,
    payload: {},
    error
});

export const ProfileDelete = (id, history) => ({
    type: USER_PROFILE_DELETE,
    payload: { id, history },
});
export const ProfileDeleteSuccess = (id) => ({
    type: USER_PROFILE_DELETE_SUCCESS,
    payload: id,
});
export const ProfileDeleteError = (error) => ({
    type: USER_PROFILE_DELETE_ERROR,
    payload: {},
    error
});

export const ProfileEditData = (id, history) => ({
    type: PROFILE_EDIT,
    payload: { id, history },
});
export const ProfileEditDataSuccess = (selectedProfile) => ({
    type: PROFILE_EDIT_SUCCESS,
    payload: selectedProfile,
});
export const ProfileEditDataError = (error) => ({
    type: PROFILE_EDIT_ERROR,
    payload: {},
    error
});

export const userProfileUpdate = (profile, history) => ({
    type: USER_PROFILE_UPDATE,
    payload: { profile, history },
});
export const userProfileUpdateSuccess = (Profile) => ({
    type: USER_PROFILE_UPDATE_SUCCESS,
    payload: Profile,
});
export const userProfileUpdateError = (error) => ({
    type: USER_PROFILE_UPDATE_ERROR,
    payload: {},
    error
});

export const profileDocument = (id, history) => ({
    type: PROFILE_DOCUMENT,
    payload: { id, history },
});
export const profileDocumentSuccess = (profileDoc) => ({
    type: PROFILE_DOCUMENT_SUCCESS,
    payload: profileDoc,
});
export const profileDocumentError = (error) => ({
    type: PROFILE_DOCUMENT_ERROR,
    payload: {},
    error
});

export const profileTrip = (id, history) => ({
    type: PROFILE_TRIP,
    payload: { id, history },
});
export const profileTripSuccess = (Trip) => ({
    type: PROFILE_TRIP_SUCCESS,
    payload: Trip,
});
export const profileTripError = (error) => ({
    type: PROFILE_TRIP_ERROR,
    payload: {},
    error
});