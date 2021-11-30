import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios";
import { NotificationManager } from '../../components/common/react-notifications';

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

import {
    userDoc,
    userDocSuccess,
    userDocError,
    allUserDoc,
    allUserDocSuccess,
    allUserDocError,
    DocTable,
    DocTableSuccess,
    DocTableError,
    userDelete,
    userDeleteSuccess,
    userDeleteError,
    userEdit,
    userEditSuccess,
    userEditError,
    userDocUpdate,
    userDocUpdateSuccess,
    userDocUpdateError
}
    from "./actions"

import { getCurrentUser, setCurrentUser } from '../../helpers/Utils';
import {API_URL} from "../../apiUrl"


export function* watchUserDocument() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_DOCUMENTS, userDocumentDetails);
}

const userDocDetailsAsync = async (data) => {
    // eslint-disable-next-line no-return-await
    await axios.post(`${API_URL}/tripDocuments`, data)

        .then((doc) => {
            console.log("doc", doc)
            if (doc.status === 200) {

                NotificationManager.success(doc.data.msg, 'Document Saved', 3000, null, null, '');

            } else if (doc.status === 206) {

                NotificationManager.warning(doc.data.msg, 'Error in saving Document', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'Document Error', 3000, null, null, ''));
}





function* userDocumentDetails({ payload }) {
    /*  console.log("payload", payload.doc) */
    const {
        trip_profile_document,
        trip_profile_name,
        document_name,
        document_category,
        document_subcategory,
        valid_from,
        valid_to,
        dropzone
    } = payload.doc

    let trip_id = null
    let profile_id = null
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
    user_id = getCurrentUser().admin_id
    if (trip_profile_document === "Trip") {
        trip_id = trip_profile_name
    }
    else { profile_id = trip_profile_name }
    /* console.log("trips and profile", trip_id, profile_id) */

    try {
        const doc = {
            user_id, trip_profile_document, trip_id, profile_id, document_name,document_category, document_subcategory, valid_from,
            valid_to, dropzone
        }

        const getDoc = yield call(userDocDetailsAsync, doc);


        console.log("getprofile", getDoc)
        yield put(userDocSuccess(getDoc.data.data));
    } catch (e) {
        yield put(userDocError(e))
        /* console.log("e", e) */
    }

}

export function* watchDocTable() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery( DOCUMENTS_TABLE, DocTableDetails);
}


function* DocTableDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/table/document/${payload.id}`;
        const documents = yield call(() => axios.get(url))

        console.log(documents, "response");
        if (documents.status === 200) {

           yield put(DocTableSuccess(documents.data.data))
           


        } else if (documents.status === 206) {
            yield put(DocTableError(documents.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchDocDelete() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery( USER_DOCUMENTS_DELETE, DocDeleteDetails);
}


function* DocDeleteDetails({ payload }) {


     console.log("paylod", payload.id)
    try {
        const url = `${API_URL}/tripDocuments/${payload.id}`;
        const profiles = yield call(() => axios.delete(url))

        console.log(profiles, "response");
        if (profiles.status === 200) {
           
           yield put(userDeleteSuccess(payload.id))


        } else if (profiles.status === 206) {
            yield put(userDeleteError(profiles.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}


export function* watchDocSelected() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(DOCUMENTS_EDIT, DocSelectedDetails);
}


function* DocSelectedDetails({ payload }) {


    /*  console.log("paylod", payload.allprofile) */
    try {
        const url = `${API_URL}/tripDocuments/edit/${payload.id}`;
        const documents = yield call(() => axios.get(url))

        console.log(documents, "selected doc");
        if (documents.status === 200) {

           yield put(userEditSuccess(documents.data.data))
           


        } else if (documents.status === 206) {
            yield put(userEditError(documents.data.msg))

        }

    }
    catch (e) {
        console.log("e", e)

    }

}

export function* watchUserUpdateDocument() {
    // eslint-disable-next-line no-use-before-define
    yield takeEvery(USER_DOCUMENTS_UPDATE, userUpdateDocumentDetails);
}

const userUpdateDocDetailsAsync = async (data) => {
    // eslint-disable-next-line no-return-await
    await axios.post(`${API_URL}/tripDocuments/update`, data)

        .then((doc) => {
            console.log("doc updated", doc )
            if (doc.status === 200) {

                NotificationManager.success(doc.data.msg, 'Document updated', 3000, null, null, '');

            } else if (doc.status === 206) {

                NotificationManager.warning(doc.data.msg, 'Error in updating Document', 3000, null, null, '');
            }
        })
        .catch((error) => NotificationManager.warning(error, 'Document Error', 3000, null, null, ''));
}





function* userUpdateDocumentDetails({ payload }) {
    /*  console.log("payload", payload.doc) */
    const {
        id,
        user_id,
        trip_profile_document,
        trip_profile_name,
        document_name,
        document_category,
        document_subcategory,
        valid_from,
        valid_to,
        dropzone
    } = payload.doc

    let trip_id = null
    let profile_id = null
    

    if (trip_profile_document === "Trip") {
        trip_id = trip_profile_name
    }
    else { profile_id = trip_profile_name }
    /* console.log("trips and profile", trip_id, profile_id) */

    try {
        const doc = {
            id,user_id, trip_profile_document, trip_id, profile_id, document_name,document_category, document_subcategory, valid_from,
            valid_to, dropzone
        }

        const getDoc = yield call(userUpdateDocDetailsAsync, doc);


        console.log("getprofile", getDoc)
        yield put(userDocUpdateSuccess(getDoc.data.data));
    } catch (e) {
        yield put(userDocUpdateError(e))
        /* console.log("e", e) */
    }

}



export default function* rootSaga() {
    yield all([
        fork(watchUserDocument),
        fork(watchDocTable),
        fork(watchDocDelete),
        fork(watchDocSelected),
        fork(watchUserUpdateDocument)


    ]);
}
