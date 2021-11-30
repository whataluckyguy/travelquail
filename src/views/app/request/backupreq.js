import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import moment from "moment";
import { Formik, Form, Field, FieldArray } from 'formik';
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,
} from 'reactstrap';
import {
    FormikReactSelect,
    FormikDatePicker,
    FormikCheckboxGroup
} from '../FormikFields';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';

import { ReactTableDivided, ReactTableWithPaginationCard } from "../../../containers/ui/ReactTableCards";
import ProfileModal from '../profileModal';
import DocumentModal from '../documentModal';
import { getCurrentUser } from '../../../helpers/Utils';
import { allUserTrip } from "../../../redux/userTrip/actions";
import { CustomSelect } from "../customSelect";
import { requestData, requestUser } from "../../../redux/request/actions";
import { watchSelectedTrip } from '../../../redux/userTrip/saga';









const Mealrequest = ({ history, allUserTripAction, userTrip, requestDataAction, reqData, requestUserAction, loading }) => {



    const [flightShow, setFlightShow] = useState(false);
    const [ProfileShow, setProfileShow] = useState(false);
    const [documentModal, setDocumentModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    /*  const [profileDocument, setProfileDocument] = useState([]) */





    const handleFlightSector = () => {
        setFlightShow(true)
    }
    const handleProfile = () => {
        setProfileShow(true)
    }

    const allTripData = () => {
        const user_id = getCurrentUser().id
        allUserTripAction(user_id, history)
    }


    useEffect(() => {
        allTripData()

    }, [])

    const flightSectorsData = reqData.flightSector
    const flightOptions = []
    if (flightSectorsData) {
        flightSectorsData.forEach(f => {
            flightOptions.push({ id: f.id, value: f.id, label:`${f.departure_airport} ---> ${f.arrival_airport}` })

        })
    }
    const travellersData = reqData.flightSector
    const travellerOptions = []
    if (travellersData) {
        travellersData.forEach(t => {
            travellerOptions.push(...JSON.parse(t.profiletrip))
        })
    }


    const initialValues = {
        user_id: getCurrentUser().id,
        trip_id: reqData.id,
        type: 2,
        company: reqData.company,
        department: reqData.department,
        date: new Date(),
        flight_ids: [],
        flightSector: reqData.flightSector ? reqData.flightSector : [],
        travellers_ids: [],
        details: travellersData ? travellerOptions.map(p =>
            ({ profile_id: p.id, profile_name: `${p.value}`, meal_preference: "", notes: "" })
        ) : [],


    }

    const onSubmit = (values, { resetForm, setSubmitting }) => {
        const payload = {
            ...values,

        };
        if (!loading) {
            requestUserAction(values, history)
            resetForm()
            setSubmitting(false);
        }
        /* setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            resetForm()
            setSubmitting(false);
        }, 1000); */
    };

    const options = [
        { value: 'Air India', label: 'Air India' },
        { value: 'Vistara', label: 'Vistara', },
        { value: 'Jet Airways', label: 'Jet Airways' },
        { value: 'Indigo', label: 'Indigo' },

    ];

    const mealOptions = [
        { value: 'Vegetarian', label: 'Vegetarian' },
        { value: 'Jain', label: 'Jain (If offered by Airline)', },
        { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
        { value: 'Halal', label: 'Halal (If offered by Airline)' },
        { value: 'Kosher', label: 'Kosher (If offered by Airline)' },
        { value: 'Dibetic', label: 'Dibetic (If offered by Airline)' },
        { value: 'Dibetic', label: 'Dibetic (If offered by Airline)' },
        { value: 'Child Meal', label: 'Child Meal' },
        { value: 'Baby Meal', label: 'Baby Meal (If offered by Airline)' },
        { value: 'Fruit Platter', label: 'Fruit Platter' },
        { value: 'Other', label: 'Other' },

    ];
    const seatingOptions = [
        { value: 'Regular', label: 'Regular (Aisle/Window)' },
        { value: 'First Row', label: 'First Row (Aisle/Window)', },
        { value: 'Emergency Exit', label: 'Emergency Exit (Aisle/Window)' },
        { value: 'Cot/Bassinet', label: 'Cot/Bassinet (Aisle/Window) (If offered by Airline)' },
        { value: 'Seating with other Passengers', label: 'Seating with other Passengers' },
        { value: 'Other', label: 'Other' },


    ];
    const specialOptions = [
        { value: 'Bassinet', label: 'Bassinet' },
        { value: 'Wheelchair', label: 'Wheelchair', },
        { value: 'Unaccompanied Minor', label: 'Unaccompanied Minor' },
        { value: 'Other', label: 'Other' },


    ];
    const bagOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2', },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: 'Other', label: 'Other' },


    ];

    const tripOptions = []

    userTrip.forEach(p => {
        tripOptions.push({ id: p.id, value: p.name, label: p.name })

    })


    return (
        <>
            <Row className="mb-4">
                <Colxx md="5" xxs="12">
                    <Card className="mb-5">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="Request Details" />
                            </CardTitle>

                            <Formik

                                initialValues={initialValues}
                                /*  validationSchema={SignupSchema} */
                                onSubmit={onSubmit}
                                enableReinitialize={true}
                            >
                                {({
                                    handleSubmit,
                                    setFieldValue,
                                    setFieldTouched,
                                    handleChange,
                                    handleBlur,
                                    values,
                                    errors,
                                    touched,
                                    isSubmitting,

                                }) => (
                                    <Form className="av-tooltip tooltip-label-bottom">

                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Trip Name" />
                                            </Label>

                                            <CustomSelect
                                                name="trip_id"
                                                id="trip_id"
                                                value={tripOptions.find(obj => obj.id === values.trip_id)}
                                                options={tripOptions}
                                                // 
                                                onChange={(opt, e) => {

                                                    setFieldValue(opt, e);
                                                    requestDataAction(e, history)

                                                }}
                                                onBlur={setFieldTouched}

                                            />



                                        </FormGroup>
                                        {values.trip_id ?
                                            <>
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Company" />
                                                    </Label>
                                                    <Field className="form-control" name="company" />

                                                </FormGroup>
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Department" />
                                                    </Label>
                                                    <Field className="form-control" name="department" />

                                                </FormGroup>




                                                <>
                                                    <FormGroup className="error-l-150 ">
                                                        <Label className="d-block">Select Flight Sectors</Label>
                                                        <FormikCheckboxGroup
                                                            inline
                                                            name="flight_ids"
                                                            id="flight_ids"
                                                            label="Select Flight Sectors?"
                                                            value={values.flight_ids}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                            options={flightOptions}
                                                        />

                                                    </FormGroup>
                                                    <FieldArray name="flightSector">
                                                        {
                                                            (fieldArrayprops) => {
                                                                console.log("fieldArrayprops", fieldArrayprops)
                                                                const { push, remove, form } = fieldArrayprops;
                                                                /* const { values } = form; */
                                                                const { flightSector } = form.values;

                                                                return (
                                                                    flightSector && flightSector.length > 0 ?
                                                                        flightSector.map((flight, index) => {
                                                                            if (values.flight_ids.includes(flight.id)) {
                                                                                return (
                                                                                    <Fragment key={flight.pnr}>
                                                                                        <h4>Details for sector {index+1} </h4>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Airline" />
                                                                                            </Label>
                                                                                       <Field className="form-control" id="airline" name={`flightSector[${index}].airline`} disabled />
                                                                                        </FormGroup>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Departure Airport" />
                                                                                            </Label>                                                                              
                                                                                    <Field className="form-control" id="departure_airport" name={`flightSector[${index}].departure_airport`} disabled />
                                                                                        </FormGroup>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label className="d-block">
                                                                                                <IntlMessages id="Departure Date & Time" />
                                                                                            </Label>
                                                                                          <Field className="form-control" id="departure_airport"  value={flight.departure_date !== "" ? moment(flight.departure_date).format("D/M/YYYY h:mm:ss a") : flight.departure_date} dateFormat="dd/MM/yyyy" name={`flightSector[${index}].departure_date`} disabled />
                                                                                        </FormGroup>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Arrival Airport" />
                                                                                            </Label>
                                                                                        <Field className="form-control" id="arrival_airport" name={`flightSector[${index}].arrival_airport`} disabled />
                                                                                        </FormGroup>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label className="d-block">
                                                                                                <IntlMessages id="Arrival Date & Time" />
                                                                                            </Label>
                                                                                            {/* <FormikDatePicker
                                                                                                name={`flightSector[${index}].arrival_date`}
                                                                                                value={flight.arrival_date !== "" ? moment(flight.arrival_date).toDate() : flight.arrival_date}
                                                                                                onBlur={setFieldTouched}
                                                                                                onChange={setFieldValue}
                                                                                                minDate={flight.departure_date}
                                                                                                dateFormat="dd/MM/yyyy"
                                                                                                showTimeInput
                                                                                            /> */}
                                                                                            <Field className="form-control" id="departure_airport"  value={flight.departure_date !== "" ? moment(flight.arrival_date).format("D/M/YYYY h:mm:ss a") : flight.arrival_date} dateFormat="dd/MM/yyyy" name={`flightSector[${index}].arrival_date`} disabled />
                                                                                        </FormGroup>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="PNR" />
                                                                                            </Label>
                                                                                            <Field className="form-control" name={`flightSector[${index}].pnr`} value={flight.pnr} disabled/>
                                                                                        </FormGroup>
                                                                                    </Fragment>
                                                                                )
                                                                            }

                                                                        }) :
                                                                            <Button className="btn-block" color="primary mt-2" onClick={() => push({})}>
                                                                                Sector(s) to check in
                                                                            </Button>

                                                                )

                                                            }
                                                        }


                                                    </FieldArray>
                                                </>
                                                <>
                                                    <FormGroup className="error-l-150 ">
                                                        <Label className="d-block">Select Travellers</Label>
                                                        <FormikCheckboxGroup
                                                            inline
                                                            name="travellers_ids"
                                                            id="travellers_ids"
                                                            label="Select Travellers?"
                                                            value={values.travellers_ids}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                            options={travellerOptions}
                                                        />

                                                    </FormGroup>
                                                    <FieldArray name="details">
                                                        {
                                                            (ProfileArrayprops) => {

                                                                const { push, remove, form } = ProfileArrayprops;
                                                                /* const { values } = form; */
                                                                const { details } = form.values;

                                                                return (
                                                                    details && details.length > 0 ?
                                                                        details.map((p, index) => {
                                                                            if (values.travellers_ids.includes(p.profile_name)) {

                                                                                return (
                                                                                    <Fragment key={`p${index}`}>

                                                                                        <h4 className="mt-2">Traveller(s) to check in</h4>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>Profile Name</Label>
                                                                                            <Field
                                                                                                className="form-control"
                                                                                                value={p.profile_name}
                                                                                                name={`details[${index}].profile_name`}

                                                                                            />
                                                                                        </FormGroup>


                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Meal Preference" />
                                                                                            </Label>
                                                                                            <FormikReactSelect
                                                                                                name={`details[${index}].meal_preference`}
                                                                                                value={mealOptions.find(obj => obj.value === p.meal_preference)}
                                                                                                options={mealOptions}
                                                                                                onChange={setFieldValue}
                                                                                                onBlur={setFieldTouched}
                                                                                            />

                                                                                        </FormGroup>

                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>Notes</Label>
                                                                                            <Field
                                                                                                className="form-control"
                                                                                                name={`details[${index}].notes`}
                                                                                                component="textarea"
                                                                                                value={p.notes}
                                                                                                placeholder="Insert Notes"
                                                                                            />
                                                                                        </FormGroup>

                                                                                        {/*  <Button className="mb-3 mr-2" onClick={() => push('')}>Add Profile</Button>
                                                                        {index > 0 ?
                                                                            <Button className="mb-3" onClick={() => remove(index)}>Delete</Button> : ""} */}

                                                                                    </Fragment>
                                                                                )
                                                                            }
                                                                        })
                                                                        :
                                                                        <Button className="btn-block" color="primary mb-3" onClick={() => push({})}>
                                                                            Traveller(s) to check in
                                                                    </Button>

                                                                )


                                                            }
                                                        }


                                                    </FieldArray>
                                                </>


                                                <Button color="primary" type="submit">
                                                    {isSubmitting ? "loading..." : "Submit Request"}
                                                </Button>
                                            </>
                                            : ""}
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Colxx>
                <Colxx md="7" xxs="12">
                    <Card >
                        <CardBody>
                            <CardTitle>
                                <h3 className="text-center"  >Request Related to this Trip</h3><br />
                                {/* <Button color="primary my-2" className="btn-block" onClick={() => setProfileModal(true)}>
                                    Create New Profile<sup> +</sup>
                                </Button> */}

                                <ReactTableWithPaginationCard />
                            </CardTitle>
                        </CardBody>
                    </Card>

                    <Card className="mt-5">
                        <CardBody>
                            <CardTitle>
                                <h3 className="text-center"  >Documents Saved in this Trip</h3><br />
                                <Button color="primary my-2" className="btn-block" onClick={() => setDocumentModal(true)}>
                                    Create New Document<sup> +</sup>
                                </Button>
                                <ReactTableWithPaginationCard />
                            </CardTitle>
                        </CardBody>
                    </Card>

                </Colxx>


            </Row>
            <ProfileModal isOpen={profileModal} toggle={() => setProfileModal(!profileModal)} />
            <DocumentModal isOpen={documentModal} toggle={() => setDocumentModal(!documentModal)} />

        </>
    );
}

const mapStateToProps = ({ tripUser, userRequest }) => {

    const { userTrip } = tripUser;
    const { reqData, loading } = userRequest;
    console.log("reqdata", reqData)

    return { userTrip, reqData, loading };

};


export default connect(mapStateToProps, { allUserTripAction: allUserTrip, requestDataAction: requestData, requestUserAction: requestUser })(Mealrequest)


