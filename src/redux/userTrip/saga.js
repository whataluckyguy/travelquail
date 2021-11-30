import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { NotificationManager } from '../../components/common/react-notifications';

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

import {
    UserTrip,
    userTripSuccess,
    userTripError,
    allUserTrip,
    allUserTripSuccess,
    allUserTripError,
    TripTable,
    TripTableSuccess,
    TripTableError,
    userTripDelete,
    userTripDeleteSuccess,
    userTripDeleteError,
    tripEditData,
    tripEditDataSuccess,
    tripEditDataError,
    tripDocument,
    tripDocumentSuccess,
    tripDocumentError,
    tripProfile,
    tripProfileSuccess,
    tripProfileError,
    userTripUpdate,
    userTripUpdateSuccess,
    userTripUpdateError
}
    from "./actions"

import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import {API_URL} from "../../apiUrl"


export function* watchUserTrip() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_TRIP, userTripDetails);
}

const userTripDetailsAsync = async (data) => {
    // eslint-disable-next-line no-return-await
    await axios.post(`${API_URL}/trips/create`, data)

        .then((trip) => {
            console.log("trip", trip)
            if (trip.status === 200) {

                NotificationManager.success(trip.data.msg, 'trip Created', 3000, null, null, '');

            } else if (trip.status === 206) {

                NotificationManager.warning(trip.data.msg, 'Error in creating trip', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'trip Error', 3000, null, null, ''));
}






function* userTripDetails({ payload }) {

    const {
        name,
        startDate,
        endDate,
        company,
        department,
        flightSector,
        profile,
        accommodation,
        transportation,
        food_beverage,
        insurance,
        other,
    } = payload.trip

    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
    user_id = getCurrentUser().admin_id
    try {
        const tripData = {
            user_id, name, startDate, endDate, company, department, accommodation, transportation, food_beverage, insurance, other, profile, flightSector
        }
        const getTrip = yield call(userTripDetailsAsync, tripData);
        yield put(userTripSuccess(getTrip.data.data));
    } catch (e) {
      /*   console.log("e", e) */
        yield put(userTripError(e));
        
    }

}


export function* watchAllUserTrip() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery( ALL_USER_TRIP, alluserTripDetails);
}

function* alluserTripDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/trips/${payload.alltrip}`;
        const allTrips = yield call(() => axios.get(url))

        console.log(allTrips, "trips");
        if (allTrips.status === 200) {

           yield put(allUserTripSuccess(allTrips.data.data))


        } else if (allTrips.status === 206) {
            yield put(allUserTripError(allTrips.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}

export function* watchTripTable() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(TRIP_TABLE, TripTableDetails);
}

function* TripTableDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/table/trip/${payload.trip}`;
        const allTrips = yield call(() => axios.get(url))

        console.log(allTrips, "trips");
        if (allTrips.status === 200) {

           yield put(TripTableSuccess(allTrips.data.data))
          


        } else if (allTrips.status === 206) {
            yield put(TripTableError(allTrips.data.msg))

        }

    }
    catch (e) {
        /* console.log("e", e) */

    }
}

export function* watchTripDelete() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery( USER_TRIP_DELETE, TripDeleteDetails);
}


function* TripDeleteDetails({ payload }) {


     console.log("payload", payload.id)
    try {
        const url = `${API_URL}/trips/${payload.id}`;
        const trip = yield call(() => axios.delete(url))

        console.log(trip , "response dlete trip");
        if (trip.status === 200) {
           
           yield put(userTripDeleteSuccess(payload.id))


        } else if (trip.status === 206) {
            yield put(userTripDeleteError(trip.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchSelectedTrip() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(TRIP_EDIT, selectedTripDetails);
}


function* selectedTripDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/trips/edit/${payload.id}`;
        const selectedTrip = yield call(() => axios.get(url))

        console.log(selectedTrip, "response trip");
        if (selectedTrip.status === 200) {

            yield put(tripEditDataSuccess(selectedTrip.data.data))


        } else if (selectedTrip.status === 206) {
            yield put(tripEditDataError(selectedTrip.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}

export function* watchtripDocuments() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(TRIP_DOCUMENT, tripDocumentDetails);
}


function* tripDocumentDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/trips/documents/${payload.id}`;
        const tripDoc = yield call(() => axios.get(url))

        console.log(tripDoc, "response");
        if (tripDoc.status === 200) {

            yield put(tripDocumentSuccess(tripDoc.data.data))


        } else if (tripDoc.status === 206) {
            yield put(tripDocumentError(tripDoc.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}

export function* watchtripProfile() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(TRIP_PROFILE, tripProfileDetails);
}


function* tripProfileDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/trips/profile/${payload.id}`;
        const Profile = yield call(() => axios.get(url))

        console.log(Profile, "response");
        if (Profile.status === 200) {

            yield put(tripProfileSuccess(Profile.data.data))


        } else if (tripProfile.status === 206) {
            yield put(tripProfileError(Profile.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }
}

export function* watchUserTripUpdate() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_TRIP_UPDATE, userTripUpdateDetails);
}

const userTripUpdateDetailsAsync = async (data) => {
    // eslint-disable-next-line no-return-await
    console.log("API DATA:->", data);
    await axios.post(`${API_URL}/trips/update`, data)

        .then((trip) => {
            console.log("trip", trip)
            if (trip.status === 200) {

                NotificationManager.success(trip.data.msg, 'trip Updated', 3000, null, null, '');

            } else if (trip.status === 206) {

                NotificationManager.warning(trip.data.msg, 'Error in updatig trip', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'trip update Error', 3000, null, null, ''));
}






function* userTripUpdateDetails({ payload }) {

    const {
        id,
        user_id,
        name,
        startDate,
        endDate,
        company,
        department,
        flightSector,
        profile,
        accommodation,
        transportation,
        food_beverage,
        insurance,
        other,
    } = payload.trip
    console.log("payload", payload.trip)
    try {
        const tripData = {
           id, user_id, name, startDate, endDate, company, department, accommodation, transportation, food_beverage, insurance, other, profile, flightSector
        }
        const getTrip = yield call(userTripUpdateDetailsAsync, tripData);
        yield put(userTripUpdateSuccess(getTrip.data.data));
    } catch (e) {
      /*   console.log("e", e) */
        yield put(userTripUpdateError(e));
        
    }

}





export default function* rootSaga() {
    yield all([
        fork(watchUserTrip),
        fork(watchAllUserTrip),
        fork(watchTripTable),
        fork(watchTripDelete),
        fork(watchSelectedTrip),
        fork(watchtripDocuments),
        fork(watchtripProfile),
        fork(watchUserTripUpdate)

    ]);
}
