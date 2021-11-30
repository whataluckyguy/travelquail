import React, { Fragment, useState, useEffect, useRef,useMemo } from 'react';
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import { useParams, Link } from "react-router-dom";
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
import CustomTable from "../../../containers/ui/ReactTableCards";
import ProfileModal from '../profileModal';
import DocumentModal from '../documentModal';
import { getCurrentUser } from '../../../helpers/Utils';
import { allUserTrip } from "../../../redux/userTrip/actions";
import { CustomSelect } from "../customSelect";
import { requestData, requestUser } from "../../../redux/request/actions";
import { watchSelectedTrip } from '../../../redux/userTrip/saga';









const Flightrefund = ({ history, allUserTripAction, userTrip, requestDataAction, reqData, requestUserAction, loading }) => {

    /*   const [name, setName] = useState("");
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [company, setCompany] = useState("");
      const [department, setDepartment] = useState("")
      const [flightShow, setFlightShow] = useState(false);
  
   */

      const tripCol = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                cellClass: 'list-item-heading',
                Cell: (props) => <>{props.value}</>,
            },

            {
                Header: 'Start Date',
                accessor: d => `${d.startDate ? moment(d.startDate).format("D/M/YYYY") : "-"}`,
                cellClass: 'text-muted  w-50',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'End Date',
                accessor: d => `${d.endDate ? moment(d.endDate).format("D/M/YYYY") : "-"}`,
                cellClass: 'text-muted w-50',
                Cell: (props) => <>{props.value}</>,
            },
            /*  {
                 Header: 'Sectors',
                 accessor: "",
                 cellClass: 'text-muted ',
                 Cell: (props) => <>{props.value}</>,
             }, */
            {
                Header: 'Travellers',
                accessor: d => `${d.profile.split(',').length}`,
                cellClass: 'text-muted ',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Status',
                accessor: d => `${new Date(d.endDate) > new Date() ? "Upcoming" : "Historic"}`,
                cellClass: 'text-muted ',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'View',
                accessor: 'id',
                cellClass: 'text-muted ',
                Cell: (props) => <><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Trips/edit/${props.value}`} >View</Link></>,
            },

        ],
        []
    );
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
        // const user_id = getCurrentUser().id
        let user_id = getCurrentUser().id
        if(getCurrentUser().roles=== 3 ||getCurrentUser().roles=== 2 )
         user_id = getCurrentUser().admin_id
        allUserTripAction(user_id, history)
    }


    useEffect(() => {
        allTripData()

    }, [])

    const docInsert = (docs) => {
       
        const docOptions = []

        docs.forEach(doc => {
            docOptions.push({ id: doc.id, value: doc.doc_type, label: doc.doc_type })

        })
        return docOptions
        
       
    }
    

    const flyerInsert = (flyers) => {

        const flyerOptions = []

        flyers.forEach(fly => {
            flyerOptions.push({ id: fly.id, value: fly.flyer_number, label: fly.flyer_number })

        })
        return flyerOptions
        
    }


    const flightSectorsData = reqData.flightSector
    const flightOptions = []
    if (flightSectorsData) {
        flightSectorsData.forEach(f => {
            flightOptions.push({ id: f.id, value: f.id, label:`${f.departure_airport} ---> ${f.arrival_airport}` })

        })
    }
    const travellersData = reqData.profiles
    const travellerOptions = []
    if (travellersData) {
        travellersData.forEach(t => {
            travellerOptions.push({ id: t.id, value: t.id, label: `${t.first_name} ${t.middle_name} ${t.last_name}` })
        })
    }
    console.log("travlllers option", travellerOptions)
    console.log("flight sector", flightOptions)

    const initialValues = {
        user_id: getCurrentUser().id,
        trip_id: reqData.id,
        type: 11,
        company: reqData.company,
        department: reqData.department,
        date: new Date(),
        flight_ids: [],
        flightSector: reqData.flightSector ? reqData.flightSector : [],
        travellers_ids: [],
        details: reqData.profiles ? reqData.profiles.map(p =>
            ({ profile_id: p.id, profile_name: `${p.first_name} ${p.middle_name} ${p.last_name}`,notes:"",  })
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
        console.log(values, "requested data full")
      /*   setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            resetForm()
            setSubmitting(false);
        }, 1000); */
    };

    const options = [
        { value: 'change', label: 'Change' },
        { value: 'Cancellation', label: 'Cancellation', },

    ];

    const mealOptions = [
        { value: 'YES', label: 'Yes' },
        { value: 'No', label: 'No', },
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
                                <IntlMessages id="Airline / airport complaint" />
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
                                                    <Field className="form-control" name="company" disabled/>
                                                  
                                                </FormGroup>
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Department" />
                                                    </Label>
                                                    <Field className="form-control" name="department" disabled/>

                                                </FormGroup>





                                                <>
                                                    <FormGroup className="error-l-150 ">
                                                        <Label className="d-block">Select flight sector(s) for refund request</Label>
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

                                                                const { push, remove, form } = fieldArrayprops;

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
                                                        <Label className="d-block">Select travellers for refund request</Label>
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
                                                                            if (values.travellers_ids.includes(p.profile_id)) {

                                                                                return (
                                                                                    <Fragment key={`p${index}`}>

                                                                                        <h4 className="mt-2">Traveller(s) to Refund Flight Money</h4>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>Profile Name</Label>
                                                                                            <Field
                                                                                                className="form-control"
                                                                                                value={p.profile_name}
                                                                                                name={`details[${index}].profile_name`}
                                                                                                    disabled
                                                                                            />
                                                                                        </FormGroup>
                                                                                        {/* <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Primary Travel Document" />
                                                                                                {console.log(p.documents,"document options ")}
                                                                                            </Label>
                                                                                            <FormikReactSelect
                                                                                                name={`details[${index}].travel_documents`}
                                                                                                value={p.documents.find(obj => obj.value === p.travel_documents)}
                                                                                                options={p.documents}
                                                                                                onChange={setFieldValue}
                                                                                                onBlur={setFieldTouched}
                                                                                            />
                                                                                        </FormGroup>
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Frequent Flyer Account" />
                                                                                            </Label>
                                                                                            <FormikReactSelect
                                                                                                name={`details[${index}].frequent_flyer`}
                                                                                                value={p.flyer.find(obj => obj.value === p.frequent_flyer)}
                                                                                                options={p.flyer}
                                                                                                onChange={setFieldValue}
                                                                                                onBlur={setFieldTouched}
                                                                                            />
                                                                                        </FormGroup> */}
                                                                                       
                                                                                        {/* <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Select" />
                                                                                            </Label>
                                                                                            <FormikReactSelect
                                                                                                name={`details[${index}].cancel`}
                                                                                                value={options.find(obj => obj.value === p.cancel)}
                                                                                                options={options}
                                                                                                onChange={setFieldValue}
                                                                                                onBlur={setFieldTouched}
                                                                                            />
                                                                                        </FormGroup> */}
                                                                                        <FormGroup className="form-group has-float-label">
                                                                                            <Label>
                                                                                                <IntlMessages id="Notes" />
                                                                                            </Label>
                                                                                            <textarea
                                                                                            className="form-control"
                                                                                                name={`details[${index}].notes`}
                                                                                                value={specialOptions.find(obj => obj.value === p.notes)}
                                                                                                options={specialOptions}
                                                                                                onChange={setFieldValue}
                                                                                                onBlur={setFieldTouched}
                                                                                            />
                                                                                        </FormGroup>
                                                                                     <p><i>Please provide ticket number / PNR of ticket to be refunded</i></p>             
                                                                                    </Fragment>
                                                                                )
                                                                            }

                                                                        }) :
                                                                        <Button className="btn-block" color="primary mb-3" onClick={()=>push({})}>
                                                                            Traveller(s) to complaint
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
                                <h3 className="text-center"  >Trips on which this profile is travelling</h3><br />
                                <Button color="primary my-2" className="btn-block" onClick={() => setProfileModal(true)}>
                                    Create New Profile<sup> +</sup>
                                </Button>
                                <CustomTable columns={tripCol} data={userTrip} />
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
                                <CustomTable columns={tripCol} data={userTrip} />
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


export default connect(mapStateToProps, { allUserTripAction: allUserTrip, requestDataAction: requestData, requestUserAction: requestUser })(Flightrefund)


