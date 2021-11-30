import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';
import visaDocumentation from './request/visaDocumentation';
import GiveRole from './role';
import flightrefund from './request/flightrefund';
// import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);
const Roles = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './role')
);

const EditProfile = React.lazy(() =>
  import(/* webpackChunkName: "user-edit-profile" */ './edit-profile')
);
const Trips = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './trips')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './profile')
);
const Request = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request')
);
const Documents = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './documents')
);
const TripForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './tripsForm')
);
const ProfileForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './profileForm')
);
const DocumentForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './documentForm')
);
const RequestView = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/requestview')
);
const Checkin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/checkin')
);
const Mealrequest = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/mealrequest')
);
const Flightrefund = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/flightrefund')
);

const Seatrequest = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/seatRequest')
);


const SpecialRequest = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/specialRequest')
);


const FlightCancel = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/flightcancel')
);

const Extrabaggage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/extraBaggage')
);
const Lostbaggage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/lostBaggage')
);

const AirlineComplaint = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './request/airlinecomplaint')
);

const Upgrade = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './request/upgrade')
);

const Missedflight = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/missedFlightAssistance')
); 

const Visadocumentation = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/visaDocumentation')
); 

const EntryRequirement = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './request/entryrequirement')
); 

const ProfileEdit = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './editProfileForm')
);

const TripEdit = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './editTripsForm')
);

const DocumentEdit = React.lazy(() =>
import(/* webpackChunkName: "viwes-blank-page" */ './editDocumentForm')
);


const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/Dashboard`} />
            <Route exact
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />

            <Route exact
              path={`${match.url}/Trips`}
              render={(props) => <Trips {...props} />}
            />
             <Route exact
              path={`${match.url}/Trips/create`}
              render={(props) => <TripForm {...props} />}
            />
            <Route exact
              path={`${match.url}/Trips/edit/:id`}
              render={(props) => <TripEdit {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
             <Route
            exact
            path={`${match.url}/edit-profile`}
            render={(props) => <EditProfile/>}
          />
          <Route
           exact
            path={`${match.url}/Role`}
            render={(props) => <GiveRole {...props}/>}
          />
            <Route exact
              path={`${match.url}/Profile`}
              render={(props) => <Profile {...props} />}
            />
            <Route exact
              path={`${match.url}/Profile/create`}
              render={(props) => <ProfileForm {...props} />}
            />
            <Route exact
              path={`${match.url}/Profile/edit/:id`}
              render={(props) => <ProfileEdit {...props} />}
            />
             <Route exact
              path={`${match.url}/Request`}
              render={(props) => <Request {...props} />}
            />
             <Route exact
              path={`${match.url}/Request/view`}
              render={(props) => <RequestView {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/checkin`}
              render={(props) => <Checkin {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/meal-request`}
              render={(props) => <Mealrequest {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/flight-refund`}
              render={(props) => <Flightrefund {...props} />}
            />
             <Route exact
              path={`${match.url}/Request/view/flight-cancel`}
              render={(props) => <FlightCancel {...props} />}
            />
             <Route exact
              path={`${match.url}/Request/view/airplane-complaint`}
              render={(props) => <AirlineComplaint {...props} />}
            />
             <Route exact
              path={`${match.url}/Request/view/upgrade-request`}
              render={(props) => <Upgrade {...props} />}
            />
             <Route exact
              path={`${match.url}/Request/view/seat-request`}
              render={(props) => <Seatrequest {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/special-request`}
              render={(props) => <SpecialRequest{...props} />}
            />
            
            <Route exact
              path={`${match.url}/Request/view/extra-baggage`}
              render={(props) => <Extrabaggage {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/lost-baggage`}
              render={(props) => <Lostbaggage {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/missed-flight-assistance`}
              render={(props) => <Missedflight {...props} />}
            />
            <Route exact
              path={`${match.url}/Request/view/visa-documentation`}
              render={(props) => <Visadocumentation {...props} />}
            />
             <Route exact
              path={`${match.url}/Request/view/entry-requirements`}
              render={(props) => <EntryRequirement {...props} />}
            />
             <Route exact
              path={`${match.url}/Documents`}
              render={(props) => <Documents {...props} />}
            />
             <Route exact
              path={`${match.url}/Documents/create`}
              render={(props) => <DocumentForm {...props} />}
            />
            <Route exact
              path={`${match.url}/Documents/edit/:id`}
              render={(props) => <DocumentEdit {...props} />}
            />
             
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
