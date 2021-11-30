import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { NotificationManager } from '../../components/common/react-notifications';

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

import {
    requestData,
    requestDataSuccess,
    requestDataError,
    requestUser,
    requestUserSuccess,
    requestUserError,
    requestTable,
    requestTableSuccess,
    requestTableError,
    requestDelete,
    requestDeleteSuccess,
    requestDeleteError
}
    from "./actions"

import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import { API_URL } from "../../apiUrl"



export function* watchRequestData() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(REQUEST_DATA, RequestDataDetails);
}


function* RequestDataDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    console.log(payload.id)
    try {
        const url = `${API_URL}/request/trip/${payload.id}`;
        const reqdata = yield call(() => axios.get(url))

        console.log(reqdata, "response request data");
        if (reqdata.status === 200) {

            yield put(requestDataSuccess(reqdata.data.data))



        } else if (reqdata.status === 206) {
            yield put(requestDataError(reqdata.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchUserRequest() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_REQUEST, userRequestDetails);
}

const userRequestDetailsAsync = async (data) => {
    // eslint-disable-next-line no-return-await
    await axios.post(`${API_URL}/request/initiate`, data)

        .then((req) => {
            console.log("req", req)
            if (req.status === 200) {

                NotificationManager.success(req.data.msg, 'Request Submitted', 3000, null, null, '');

            } else if (req.status === 206) {

                NotificationManager.warning(req.data.msg, 'Error in submiting Request as Traveller or flight sectors not present.Please update your trip details!', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'request Error', 3000, null, null, ''));
}





function* userRequestDetails({ payload }) {
    /*  console.log("payload", payload.doc) */
    const {
        trip_id,
        type,
        flight_ids,
        travellers_ids,
        date,
        details
    } = payload.request

    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
    user_id = getCurrentUser().admin_id
    try {
        const request = {
            user_id, trip_id, type, flight_ids, travellers_ids, date, details
        }

        const req = yield call(userRequestDetailsAsync, request);


        console.log("request success", req)
        yield put(requestUserSuccess(req.data.data));
    } catch (e) {
        yield put(requestUserError(e))
        /* console.log("e", e) */
    }

}

export function* watchRequestTable() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(REQUEST_TABLE, RequestTableDetails);
}


function* RequestTableDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/table/request/${payload.id}`;
        const request = yield call(() => axios.get(url))

        console.log(request, "response");
        if (request.status === 200) {

            yield put(requestTableSuccess(request.data.data))



        } else if (request.status === 206) {
            yield put(requestTableError(request.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchRequestDelete() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_REQUEST_DELETE, RequestDeleteDetails);
}


function* RequestDeleteDetails({ payload }) {
    console.log("payload", payload.id)
    try {
        const url = `${API_URL}/request/${payload.id}`;
        const request = yield call(() => axios.delete(url))

        console.log(request, "response");
        if (request.status === 200) {

            yield put(requestDeleteSuccess(payload.id))


        } else if (request.status === 206) {
            yield put(requestDeleteError(request.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}




export default function* rootSaga() {
    yield all([
        fork(watchRequestData),
        fork(watchUserRequest),
        fork(watchRequestTable),
        fork(watchRequestDelete)

    ]);
}
