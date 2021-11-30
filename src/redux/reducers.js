import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import profileUser from "./userProfile/reducer"
import tripUser from "./userTrip/reducer"
import DocUser from "./userDocuments/reducer"
import userRequest from "./request/reducer"

const reducers = combineReducers({
  
  authUser,
  menu,
  settings,
/*   todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp, */
  profileUser,
  tripUser,
  DocUser,
  userRequest
});

export default reducers;
