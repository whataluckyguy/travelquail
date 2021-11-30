import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import userProfileSagas from "./userProfile/saga";
import userTripSagas from "./userTrip/saga";
import userDocSagas from "./userDocuments/saga";
import userRequestSagas from "./request/saga"

export default function* rootSaga() {
  yield all([
    authSagas(),
   /*  todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(), */
    userProfileSagas(),
    userTripSagas(),
    userDocSagas(),
    userRequestSagas()
  ]);
}
