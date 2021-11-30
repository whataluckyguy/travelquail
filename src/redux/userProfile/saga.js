import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { NotificationManager } from '../../components/common/react-notifications';

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

import {
    UserProfile,
    userProfileSuccess,
    userProfileError,
    allUserProfile,
    allUserProfileSuccess,
    allUserProfileError,
    ProfileTable,
    ProfileTableSuccess,
    ProfileTableError,
    ProfileDelete,
    ProfileDeleteSuccess,
    ProfileDeleteError,
    ProfileEditData,
    ProfileEditDataSuccess,
    ProfileEditDataError,
    userProfileUpdate,
    userProfileUpdateSuccess,
    userProfileUpdateError,
    profileDocument,
    profileDocumentSuccess,
    profileDocumentError,
    profileTrip,
    profileTripSuccess,
    profileTripError
}
    from "./actions"

import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import {API_URL} from "../../apiUrl"



export function* watchUserProfile() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_PROFILE, userProfileDetails);
}

const userProfiledetailsAsync = async (data) => {


    // eslint-disable-next-line no-return-await

    await axios.post(`${API_URL}/userprofile`, data)

        .then((profile) => {
            console.log("user", profile)
            if (profile.status === 200) {

                /*  put(userProfileSuccess(profile.data))
                 console.log("succes",  put(userProfileSuccess(profile.data))) */
                NotificationManager.success(profile.data.msg, 'Profile Created', 3000, null, null, '');

            } else if (profile.status === 206) {
                /* put(userProfileError(profile.data.msg))
                console.log("succes",  put(userProfileError(profile.data.msg))) */
                NotificationManager.warning(profile.data.msg, 'Company Email is already registered', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'Profile Error', 3000, null, null, ''));
}



function* userProfileDetails({ payload }) {
    const { title,
        first_name,
        middle_name,
        last_name,
        company,
        department,
        joining_date,
        leaving_date,
        rank,
        employee_id,
        company_number,
        personal_number,
        company_email,
        personal_email,
        emergency_name,
        emergency_number,
        frequentFlyer,
        travel_documents
    } = payload.profile

    const { history } = payload;
    /* console.log("profile", payload) */
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
    user_id = getCurrentUser().admin_id
    try {
        const profiledata = {
            user_id, title, first_name, middle_name, last_name, company, department, joining_date, leaving_date, rank, employee_id,
            company_number, personal_number, company_email, personal_email, emergency_name, emergency_number, frequentFlyer, travel_documents
        }
        const getProfile = yield call(userProfiledetailsAsync, profiledata);

        console.log("getprofile", getProfile)
        yield put(userProfileSuccess(getProfile.data.data));
    } catch (e) {
        yield put(userProfileError(e))
         console.log("e", e)
    }

}

export function* watchAllUserProfile() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(ALL_USER_PROFILE, alluserProfileDetails);
}


function* alluserProfileDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/userprofile/${payload.allprofile}`;
        const allProfiles = yield call(() => axios.get(url))

        console.log(allProfiles, "response");
        if (allProfiles.status === 200) {

            yield put(allUserProfileSuccess(allProfiles.data.data))


        } else if (allProfiles.status === 206) {
            yield put(allUserProfileError(allProfiles.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}

export function* watchProfileTable() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(PROFILE_TABLE, ProfileTableDetails);
}


function* ProfileTableDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/table/profile/${payload.profile}`;
        const profiles = yield call(() => axios.get(url))

        console.log(profiles, "response");
        if (profiles.status === 200) {

            yield put(ProfileTableSuccess(profiles.data.data))



        } else if (profiles.status === 206) {
            yield put(ProfileTableError(profiles.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchProfileDelete() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_PROFILE_DELETE, ProfileDeleteDetails);
}


function* ProfileDeleteDetails({ payload }) {


    console.log("paylod", payload.id)
    try {
        const url = `${API_URL}/userprofile/${payload.id}`;
        const profiles = yield call(() => axios.delete(url))

        console.log(profiles, "response");
        if (profiles.status === 200) {

            yield put(ProfileDeleteSuccess(payload.id))


        } else if (profiles.status === 206) {
            yield put(ProfileDeleteError(profiles.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}


export function* watchSelectedProfile() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(PROFILE_EDIT, selectedProfileDetails);
}


function* selectedProfileDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/userprofile/edit/${payload.id}`;
        const selectedProfile = yield call(() => axios.get(url))

        console.log(selectedProfile, "response");
        if (selectedProfile.status === 200) {

            yield put(ProfileEditDataSuccess(selectedProfile.data.data))


        } else if (selectedProfile.status === 206) {
            yield put(ProfileEditDataError(selectedProfile.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}


export function* watchUserProfileUpdate() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_PROFILE_UPDATE, userProfileUpdateDetails);
}

const userProfileUpdatedetailsAsync = async (data) => {


    // eslint-disable-next-line no-return-await  
    await axios.post(`${API_URL}/userprofile/update`, data)

        .then((profile) => {
            console.log("user", profile)
            if (profile.status === 200) {

                
                NotificationManager.success(profile.data.msg, 'Profile Updated', 3000, null, null, '');

            } else if (profile.status === 206) {
                
                NotificationManager.warning(profile.data.msg, 'Error in Updating profile', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'Profile Error', 3000, null, null, ''));
}



function* userProfileUpdateDetails({ payload }) {
    const { 
        id,
        user_id,
        title,
        first_name,
        middle_name,
        last_name,
        company,
        department,
        joining_date,
        leaving_date,
        rank,
        employee_id,
        company_number,
        personal_number,
        company_email,
        personal_email,
        emergency_name,
        emergency_number,
        frequentFlyer,
        travel_documents
    } = payload.profile

    const { history } = payload;
    /* console.log("profile", payload) */
    
    try {
        const profiledata = {
            id, user_id,title, first_name, middle_name, last_name, company, department, joining_date, leaving_date, rank, employee_id,
            company_number, personal_number, company_email, personal_email, emergency_name, emergency_number, frequentFlyer, travel_documents
        }
        const getProfile = yield call(userProfileUpdatedetailsAsync, profiledata);

        console.log("getprofile", getProfile)
        yield put(userProfileUpdateSuccess(getProfile.data.data));
    } catch (e) {
        yield put(userProfileUpdateError(e))
        /*  console.log("e", e) */
    }

}

export function* watchprofileDocuments() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(PROFILE_DOCUMENT, profileDocumentDetails);
}


function* profileDocumentDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/userprofile/documents/${payload.id}`;
        const ProfileDoc = yield call(() => axios.get(url))

       /*  console.log(ProfileDoc, "response"); */
        if (ProfileDoc.status === 200) {

            yield put(profileDocumentSuccess(ProfileDoc.data.data))


        } else if (ProfileDoc.status === 206) {
            yield put(profileDocumentError(ProfileDoc.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}

export function* watchprofileTrip() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(PROFILE_TRIP, profileTripDetails);
}


function* profileTripDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/userprofile/trips/${payload.id}`;
        const ProfileTrip = yield call(() => axios.get(url))

       /*  console.log(ProfileDoc, "response"); */
        if (ProfileTrip.status === 200) {

            yield put(profileTripSuccess(ProfileTrip.data.data))


        } else if (ProfileTrip.status === 206) {
            yield put(profileTripError(ProfileTrip.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}



export default function* rootSaga() {
    yield all([
        fork(watchUserProfile),
        fork(watchAllUserProfile),
        fork(watchProfileTable),
        fork(watchProfileDelete),
        fork(watchSelectedProfile),
        fork(watchUserProfileUpdate),
        fork(watchprofileDocuments),
        fork(watchprofileTrip)

    ]);
}
