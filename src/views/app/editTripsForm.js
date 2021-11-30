import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Button,
    CardTitle,
} from 'reactstrap';

import Airport from "./airport.json"
import {
    FormikReactSelect,
    FormikDatePicker,
} from './FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import CustomTable from '../../containers/ui/ReactTableCards';
import products from "../../data/products";
import ProfileModal from './profileModal';
import DocumentModal from './documentModal';
import { allUserProfile } from '../../redux/userProfile/actions';
import { requestTable } from '../../redux/request/actions';
import { getCurrentUser } from '../../helpers/Utils';
import { CustomSelect } from "./customSelect";

import { userTripUpdate, tripEditData, tripDocument, tripProfile } from "../../redux/userTrip/actions"






const TripEdit = ({ tripEditDataAction, selectedTripData, userProfile, allUserProfileAction, history, loading, UserTripAction, tripDocumentAction, tripProfileAction, tripDocTable, tripProfileTable, userTripUpdateAction,userRequestAction }) => {

    const [documentModal, setDocumentModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    const { id } = useParams();
    /*    const [profileOptions, setProfileOptions] = useState([]) */



    const AirportData = []
    Airport.map(obj => {
        /* eslint-disable no-param-reassign */
        obj.label = `${obj.name}, (${obj.code}), ${obj.country}`;
        obj.value = `${obj.name}, (${obj.code}), ${obj.country}`;
        AirportData.push(obj);
    })
    
    console.log(AirportData);
    const getEditData = () => {
        tripEditDataAction(id, history)
    }
    const allProfileData = () => {
        let user_id = getCurrentUser().id
        if(getCurrentUser().roles=== 3 ||getCurrentUser().roles=== 2 )
        user_id = getCurrentUser().admin_id
        allUserProfileAction(user_id, history)
    }

    const allRequestData = () => {
        const user_id = getCurrentUser().id
        userRequestAction(user_id, history)
    }

    const tripDocData = () => {
        tripDocumentAction(id, history)
    }

    const tripProfileData = () => {
        tripProfileAction(id, history)
    }


    useEffect(() => {
        getEditData()
        allProfileData()
        tripDocData()
        tripProfileData()
        allRequestData()

    }, [])


    const profileOptions = []
    userProfile.forEach(p => {
        profileOptions.push({ id: p.id, value: `${p.first_name} ${p.middle_name} ${p.last_name}`, label: `${p.first_name} ${p.middle_name} ${p.last_name}` })
    })

    /* } */



    console.log("profile data VAL", selectedTripData.profile)
    const initialValues = {
        id: selectedTripData.id,
        user_id: selectedTripData.user_id,
        name: selectedTripData.name,
        startDate: selectedTripData.startDate,
        endDate: selectedTripData.endDate,
        company: selectedTripData.company,
        department: selectedTripData.department,
        flightSector: selectedTripData.flightSector,
        profile: selectedTripData.profile ? selectedTripData.profile.split(',') : [],
        accommodation: selectedTripData.accommodation,
        transportation: selectedTripData.transportation,
        food_beverage: selectedTripData.food_beverage,
        insurance: selectedTripData.insurance,
        other: selectedTripData.other,

    }

    console.log("INITIAL VALUES", initialValues)

    const onSubmit = (values, { resetForm, setSubmitting }) => {
        const payload = {
            ...values,

        };
        if (!loading) {
            userTripUpdateAction(values, history)
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
        {value: "Aegean Airlines", label: "Aegean Airlines"},
        {value : "Aer Lingus",label :"Aer Lingus"},
        {value : "Aerolineas Argentinas",label :"Aerolineas Argentinas"},
        {value : "Aeromexico",label :"Aeromexico"},
        {value : "Air Arabia",label :"Air Arabia"},
        {value : "Air Astana",label :"Air Astana"},
        {value : "Air Australia",label :"Air Australia"},
        {value: "Air Baltic", label: "Air Baltic"},
        {value : "Air Belgium",label :"Air Belgium"},
        {value : "Air Canada",label :"Air Canada"},
        {value : "Air Caraibes",label :"Air Caraibes"},
        {value : "Air China",label :"Air China"},
        {value : "Air Corsica",label :"Air Corsica"},
        {value : "Air Dolomiti",label :"Air Dolomiti"},
        {value: "Air Europa", label: "Air Europa"},
        {value : "Air France",label :"Air France"},
        {value : "Air India",label :"Air India"},
        {value : "Air India Express",label :"Air India Express"},
        {value: "Air Macau", label: "Air Macau)"},
        {value: "Air Malta", label: "Air Malta"},
        {value: "Air Mauritius", label: "Air Mauritius"},
        {value: "Air Namibia", label: "Air Namibia"},
        {value: "Air New Zealand", label: "Air New Zealand"},
        {value: "Air North", label: "Air North)"},
        {value: "Air Seoul", label: "Air Seoul"},
        {value: "Air Serbia", label: "Air Serbia"},
        {value: "Air Tahiti Nui", label: "Air Tahiti Nui"},
        {value: "Air Transat", label: "Air Transat"},
        {value: "Air Vanuatu", label: "Air Vanuatu"},
        {value: "AirAsiaX", label: "AirAsiaX"},
        {value: "Aircalin", label: "Aircalin"},
        {value: "Alaska Airlines", label: "Alaska Airlines"},
        {value: "Alitia", label: "Alitia"},
        {value: "Allegiant", label: "Allegiant"},
        {value: "American Airlines", label: "American Airlines"},
        {value: "ANA", label: "ANA"},
        {value: "Asian", label: "Asian"},
        {value: "Austrian", label: "Austrian"},
        {value: "Azerbaijan Hava Yollary", label: "Azerbaijan Hava Yollary"},
        {value: "Azores Airlines", label: "Azores Airlines"},
        {value: "Azul", label: "Azul"},
        {value: "Bamboo Airways", label: "Bamboo Airways"},
        {value: "Bangkok Airways", label: "Bangkok Airways"},
        {value : "British Airways",label :"British Airways"},
        {value: "Brussels Airlines", label: "Brussels Airlines"},
        {value: "Caribbean Airlines", label: "Caribbean Airlines"},
        {value : "Cathay Pacific",label :"Cathay Pacific"},
        {value: "Cathay Dragon", label: "Cathay Dragon"},
        {value: "Cayman Airways", label: "Cayman Airways"},
        {value : "CEBU Pacific Air",label :"CEBU Pacific Air"},
        {value: "China Airlines", label: "China Airlines"},
        {value: "China Eastern", label: "China Eastern"},
        {value : "China Southern",label :"China Southern"},
        {value: "Condor", label: "Condor"},
        {value: "Copa Airlines", label: "Copa Airlines"},
        {value : "Croatia Airlines",label :"Croatia Airlines"},
        {value: "Czech Airlines", label: "Czech Airlines"},
        {value: "Delta", label: "Delta"},
        {value : "EasyJet",label :"EasyJet"},
        {value: "Edelweiss Air", label: "Edelweiss Air"},
        {value: "Egyptair", label: "Egyptair"},
        {value : "EL AL",label :"EL AL"},
        {value: "Emirates", label: "Emirates"},
        {value: "Ethopia Airlines", label: "Ethopia Airlines"},
        {value : "Etihad",label :"Etihad"},
        {value: "Eurowings", label: "Eurowings"},
        {value: "EVA Air", label: "EVA Air"},
        {value : "Fiji Airways",label :"Fiji Airways"},
        {value: "Finnair", label: "Finnair"},
        {value: "Flydubai", label: "Flydubai"},
        {value : "FlyOne",label :"FlyOne"},
        {value: "French bee", label: "French bee"},
        {value: "Frontier", label: "Frontier"},
        {value : "Garuda Indonesia",label :"Garuda Indonesia"},
        {value: "Gol", label: "Gol"},
        {value: "Gulf Air", label: "Gulf Air)"},
        {value : "Hainan Airlines",label :"Hainan Airlines"},
        {value: "Hawaiian Airlines", label: "Hawaiian Airlines"},
        {value: "Helvetic Airways", label: "Helvetic Airways"},
        {value : "HK Express",label :"HK Express"},
        {value: "Hong Kong Airlines", label: "Hong Kong Airlines"},
        {value: "Iberia", label: "Iberia"},
        {value : "Icelandair",label :"Icelandair"},
        {value: "IndiGo Airlines", label: "IndiGo Airlines"},
        {value: "InterJet", label: "InterJet"},
        {value : "Japan Airlines",label :"Japan Airlines"},
        {value: "Jeju Air", label: "Jeju Air"},
        {value: "Jet2", label: "Jet2"},
        {value : "JetBlue",label :"JetBlue"},
        {value: "Jetstar", label: "Jetstar"},
        {value: "Jin Air", label: "Jin Air"},
        {value : "Kenya Airways",label :"Kenya Airways"},
        {value: "KLM", label: "KLM"},
        {value: "Korean Air", label: "Korean Air"},
        {value : "Kulula",label :"Kulula"},
        {value: "La Compagnie", label: "La Compagnie"},
        {value: "LATAM", label: "LATAM"},
        {value : "Lion Airlines",label :"Lion Airlines"},
        {value: "LOT Polish Airlines", label: "LOT Polish Airlines"},
        {value: "Lufthansa", label: "Lufthansa"},
        {value : "Luxair",label :"Luxair"},
        {value: "Luxair", label: "Luxair"},
        {value: "Malaysia Airlines", label: "Malaysia Airlines"},
        {value : "Mango",label :"Mango"},
        {value: "Middle East-Airlines", label: "Middle East-Airlines"},
        {value: "Nok Air", label: "Nok Air"},
        {value : "Nordwind Airlines",label :"Nordwind Airlines"},
        {value: "Norwegian Air International", label: "Norwegian Air International"},
        {value: "Norwegian Air Shuttle", label: "Norwegian Air Shuttle"},
        {value : "Norwegian Air Sweden",label :"Norwegian Air Sweden"},
        {value: "Norwegian Air Uk", label: "Norwegian Air Uk"},
        {value: "Oman Air", label: "Oman Air"},
        {value : "Pakistan International Airlines",label :"Pakistan International Airlines"},
        {value: "Peach", label: "Peach"},
        {value: "Peagasus Airlines", label: "Peagasus Airlines"},
        {value : "Phillippine Airlines",label :"Phillippine Airlines"},
        {value: "Porter", label: "Porter"},
        {value: "Qantas", label: "Qantas"},
        {value : "Qatar Airwaya",label :"Qatar Airwaya"},
        {value: "Regional Express", label: "Regional Express"},
        {value: "Rossiya-Russian Airlines", label: "Rossiya-Russian Airlines"},
        {value : "Royal Air Maroc",label :"Royal Air Maroc"},
        {value: "Royal Brunei", label: "Royal Brunei"},
        {value: "Royal Jordanian", label: "Royal Jordanian"},
        {value : "RwandAir",label :"RwandAir"},
        {value: "Ryanair", label: "Ryanair"},
        {value: "S7 Airlines", label: "S7 Airlines"},
        {value : "SAS",label :"SAS"},
        {value: "Saudia", label: "Saudia"},
        {value: "Scoot Airlines", label: "Scoot Airlines"},
        {value : "Shanghai Arlines",label :"Shanghai Arlines"},
        {value: "Skylanes", label: "Skylanes"},
        {value: "South African Airways", label: "South African Airways"},
        {value : "Southwest",label :"Southwest"},
        {value: "SpiceJet", label: "SpiceJet"},
        {value: "Spirit", label: "Spirit"},
        {value : "Spring Airlines",label :"Spring Airlines"},
        {value: "Spring Japan", label: "Spring Japan"},
        {value: "SriLankan Airlines", label: "SriLankan Airlines"},
        {value : "Sun Country",label :"Sun Country"},
        {value: "Sunclass Airlines", label: "Sunclass Airlines"},
        {value: "Sunwing", label: "Sunwing"},
        {value : "SWISS",label :"SWISS"},
        {value: "Swoop", label: "Swoop"},
        {value: "TAAG", label: "TAAG"},
        {value : "TACA",label :"TACA"},
        {value: "TAP Portugal", label: "TAP Portugal"},
        {value: "THAI", label: "THAI"},
        {value : "tigeria Australia",label :"tigeria Australia"},
        {value: "Transavia Airlines", label: "Transavia Airlines"},
        {value: "TUI UK", label: "TUI UK"},
        {value : "TUIfly",label :"TUIfly"},
        {value: "Tunis Air", label: "Tunis Air"},
        {value: "Turkish Airlines", label: "Turkish Airlines"},
        {value : "Ukraine International",label :"Ukraine International"},
        {value: "United", label: "United"},
        {value: "Ural Airlines", label: "Ural Airlines"},
        {value : "UTair Aviation",label :"UTair Aviation"},
        {value: "Uzbekistan Airways", label: "Uzbekistan Airways"},
        {value: "Vietnam Airlines", label: "Vietnam Airlines"},
        {value : "Virgin Atlantic",label :"Virgin Atlantic"},
        {value: "Virgin Australia", label: "Virgin Australia"},
        {value: "Vistara", label: "Vistara"},
        {value : "Viva Aerobus",label :"Viva Aerobus"},
        {value: "Volaris", label: "Volaris"},
        {value: "Volotea", label: "Volotea"},
        {value : "Vueling Airlines",label :"Vueling Airlines"},
        {value: "WestJet", label: "WestJet"},
        {value: "Wizzair", label: "Wizzair"},
        {value : "Xiamen Airlines",label :"Xiamen Airlines"},
        {value: "Other, please specify", label: "Other, please specify"}
    ];



    const docCol = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'document_name',
                cellClass: 'list-item-heading',
                Cell: (props) => <>{props.value}</>,
            },

            {
                Header: 'Category',
                accessor: 'document_category',
                cellClass: 'text-muted  w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Sub-category',
                accessor: 'document_subcategory',
                cellClass: 'text-muted ',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Validity',
                accessor: d => `${new Date(d.valid_to) > new Date() ? "Valid" : "Expired"}`,
                cellClass: 'text-muted ',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Expiry',
                accessor: d => `${moment(d.valid_to).format("DD/MM/YYYY")}`,
                cellClass: 'text-muted ',
                Cell: (props) => <>{props.value}</>,
            }
            ,
            {
                Header: 'View',
                accessor: 'id',
                cellClass: 'text-muted ',
                Cell: (props) =>  <div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Documents/edit/${props.value}`} >View</Link></div>,
            }

        ],
        []
    );

    const profileCol = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: d => `${d.first_name} ${d.middle_name} ${d.last_name}`,
                cellClass: 'list-item-heading',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Company',
                accessor: d => `${d.company}`,
                cellClass: 'list-item-heading',
                Cell: (props) => <>{props.value}</>,
            },
            
            {
                Header: 'Department',
                accessor: d => `${d.department}`,
                cellClass: 'list-item-heading',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Status',
                accessor: d => `NA`,
                cellClass: 'list-item-heading',
                Cell: (props) => <>{props.value}</>,
            },
            /* {
              Header: 'Last Updated',
              accessor: 'status',
              cellClass: 'text-muted',
              Cell: (props) => <>{props.value}</>,
            }, */

            // {
            //     Header: 'Joining Date',
            //     accessor: d => `${d.joining_date ? new Date(d.joining_date).toDateString() : "-"} `,
            //     cellClass: 'text-muted',
            //     Cell: (props) => <>{props.value}</>,
            // },
            // {
            //     Header: 'Leaving Date',
            //     accessor: d => `${d.leaving_date ? new Date(d.leaving_date).toDateString() : "-"}`,
            //     cellClass: 'text-muted ',
            //     Cell: (props) => <>{props.value}</>,
            // },
            {
                Header: 'View',
                accessor: 'id',
                cellClass: 'text-muted ',
                Cell: (props) =><div className="d-flex"><Link size="md" className="btn btn-warning buttoneditdelcss mr-2" to={`/app/Profile/edit/${props.value}`} >View</Link></div>,
            },
           /*  {
                Header: 'Frequent Flyer a/c',
                accessor: 'flyer_count',
                cellClass: 'text-muted ',
                Cell: (props) => <>{props.value}</>,
            }, {
                Header: 'Travel Docs',
                accessor: 'travel_document_count',
                cellClass: 'text-muted',
                Cell: (props) => <>{props.value}</>,
            },
 */

        ],
        []
    );

    const defaultSorted = [{
        dataField: 'title',
        order: 'desc'
    }];

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            
            .required('Please enter your Trip name'),
        startDate: Yup.date().required('Please enter trip start date'),
        endDate: Yup.date().required('Please enter trip end date'),
        company: Yup.string()
            .min(2, 'Too Short!')
            
            .required('Please enter your company name'),
        department: Yup.string()
            .min(2, 'Too Short!')
            
            .required('Please enter your department name'),

        flightSector: Yup.array()
            /* .min(1, 'Atleast one profile travelling is required') */
            .required('Atleast one flight sector is required')
            .of(
                Yup.object().shape({
                    airline: Yup.string()
                        .min(2, 'Too Short!')
                        
                        .required('Please enter your airline name'),
                    departure_airport: Yup.string()
                        .min(2, 'Too Short!')
                        
                        .required('Please enter your departure airport'),
                    departure_date: Yup.date().required('Please enter your departure date'),
                    arrival_airport: Yup.string()
                        .min(2, 'Too Short!')
                        
                        .required('Please enter your arrival airport'),
                    arrival_date: Yup.date().required('Please enter your arrival date'),
                    pnr: Yup.string()
                        .min(2, 'Too Short!')
                        
                        .required('Please enter your pnr number'),

                })

            )

        ,
        profile: Yup.array().of(Yup.string()
            /*   .min(1, 'Atleast one profile travelling is required') */
            .required('Atleast one profile travelling is required'))
    });

    const handleProfile = () => {

        confirmAlert({
            customUI: ({ onClose }) => {


                return (
                    <div className='custom-ui card-shadow'>
                        <h1>Are you sure?</h1>
                        <p>You want to switch to adding profile ? Your Changes to trips will be lost!</p>
                        <Button type="button"
                            className="mr-2"
                           
                           onClick={() => {
                          history.push('/app/Profile/create')
                              onClose();
            }}
                        >Yes, Add Profile!
                            
                </Button>
                        <Button type="button" onClick={onClose}>No</Button>

                    </div>
                );
            }
        });
    }

    const handleDocuments = () => {

        confirmAlert({
            customUI: ({ onClose }) => {


                return (
                    <div className='custom-ui card-shadow'>
                        <h1>Are you sure?</h1>
                        <p>You want to switch to adding documents ? Your Changes to profile will be lost!</p>
                        <Button type="button"
                            className="mr-2"
                           
                           onClick={() => {
                          history.push('/app/Documents/create')
                              onClose();
            }}
                        >Yes, Add Document!
                            
                </Button>
                        <Button type="button" onClick={onClose}>No</Button>

                    </div>
                );
            }
        });
    }



    return (
        <>
            <Row className="mb-4">
                <Colxx md="5" xxs="12">
                    <Card className="mb-5">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="Edit your trip" />
                            </CardTitle>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={SignupSchema}
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
                                            <Field className="form-control" name="name" />
                                            {errors.name && touched.name ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.name}
                                                </div>
                                            ) : null}

                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label className="d-block">
                                                <IntlMessages id="Start Date" />
                                            </Label>
                                            <FormikDatePicker
                                                name="startDate"
                                                value={values.startDate ? moment(values.startDate).toDate(): ""}
                                                onBlur={setFieldTouched}
                                                onChange={setFieldValue}
                                                minDate={new Date()}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                            {errors.startDate && touched.startDate ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.startDate}
                                                </div>
                                            ) : null}

                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label className="d-block">
                                                <IntlMessages id="End Date" />
                                            </Label>
                                            <FormikDatePicker
                                                name="endDate"
                                                value={values.endDate ? moment(values.endDate).toDate(): ""}
                                                onBlur={setFieldTouched}
                                                onChange={setFieldValue}
                                                minDate={values.startDate}
                                                dateFormat="dd/MM/yyyy"
                                            />
                                            {errors.endDate && touched.endDate ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.endDate}
                                                </div>
                                            ) : null}

                                        </FormGroup>

                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Company" />
                                            </Label>
                                            <Field className="form-control" name="company" />
                                            {errors.company && touched.company ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.company}
                                                </div>
                                            ) : null}

                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Department" />
                                            </Label>
                                            <Field className="form-control" name="department" />
                                            {errors.department && touched.department ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.department}
                                                </div>
                                            ) : null}

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
                                                                const flightErrors = errors.flightSector?.length && errors.flightSector[index] || {};
                                                                const flightTouched = touched.flightSector?.length && touched.flightSector[index] || {};
                                                                return (
                                                                    <Fragment key={flight.index}>

                                                                        <h4>Flight sector {index + 1}</h4>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Airline" />
                                                                            </Label>
                                                                            <FormikReactSelect
                                                                                name={`flightSector[${index}].airline`}
                                                                                id="airline"
                                                                                value={options.find(obj => obj.value === flight.airline)}
                                                                                options={options}
                                                                                onChange={setFieldValue}
                                                                                onBlur={setFieldTouched}
                                                                            />
                                                                            {flightErrors.airline && flightTouched.airline ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flightErrors.airline}
                                                                                </div>
                                                                            ) : null}

                                                                        </FormGroup>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Departure Airport" />
                                                                            </Label>
                                                                            <FormikReactSelect
                                                                                name={`flightSector[${index}].departure_airport`}
                                                                                id="departure_airport"
                                                                                value={AirportData.find(obj => obj.value === flight.departure_airport)}
                                                                                options={AirportData}
                                                                                onChange={setFieldValue}
                                                                                onBlur={setFieldTouched}
                                                                            />
                                                                            {flightErrors.departure_airport && flightTouched.departure_airport ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flightErrors.departure_airport}
                                                                                </div>
                                                                            ) : null}
                                                                        </FormGroup>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label className="d-block">
                                                                                <IntlMessages id="Departure Date & Time" />
                                                                            </Label>
                                                                            <FormikDatePicker
                                                                                name={`flightSector[${index}].departure_date`}
                                                                                value={moment(flight.departure_date).toDate()}
                                                                                onBlur={setFieldTouched}
                                                                                onChange={setFieldValue}
                                                                                minDate={new Date()}
                                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                                showTimeInput

                                                                            />
                                                                            {flightErrors.departure_date && flightTouched.departure_date ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flightErrors.departure_date}
                                                                                </div>
                                                                            ) : null}

                                                                        </FormGroup>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Arrival Airport" />
                                                                            </Label>
                                                                            <FormikReactSelect
                                                                                name={`flightSector[${index}].arrival_airport`}
                                                                                id="arrival_airport"
                                                                                value={AirportData.find(obj => obj.value === flight.arrival_airport)}
                                                                                options={AirportData}
                                                                                onChange={setFieldValue}
                                                                                onBlur={setFieldTouched}
                                                                            />
                                                                            {flightErrors.arrival_airport && flightTouched.arrival_airport ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flightErrors.arrival_airport}
                                                                                </div>
                                                                            ) : null}

                                                                        </FormGroup>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label className="d-block">
                                                                                <IntlMessages id="Arrival Date & Time" />
                                                                            </Label>
                                                                            <FormikDatePicker
                                                                                name={`flightSector[${index}].arrival_date`}
                                                                                value={moment(flight.arrival_date).toDate()}
                                                                                onBlur={setFieldTouched}
                                                                                onChange={setFieldValue}
                                                                                minDate={flight.departure_date}
                                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                                showTimeInput

                                                                            />
                                                                            {flightErrors.arrival_date && flightTouched.arrival_date ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flightErrors.arrival_date}
                                                                                </div>
                                                                            ) : null}

                                                                        </FormGroup>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="PNR" />
                                                                            </Label>
                                                                            <Field className="form-control" name={`flightSector[${index}].pnr`} value={flight.pnr} />
                                                                            {flightErrors.pnr && flightTouched.pnr ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flightErrors.pnr}
                                                                                </div>
                                                                            ) : null}

                                                                        </FormGroup>
                                                                        {/* <Button className="mb-3 mr-2" onClick={() => push({})}>Add Sector</Button> */}
                                                                        {
                                                                            flightSector.length === index+1 ?  <Button className="mb-3 mr-2 btn-block" color="primary" onClick={() => push('')}>
                                                                            Add flight sector<sup> +</sup>
                                                                        </Button>: null
                                                                        }
                                                                       {/*  {index > 0 ? */}
                                                                            <Button className="mb-3" onClick={() => remove(index)}>Delete</Button> {/* : ""} */}

                                                                    </Fragment>
                                                                )
                                                            }) : <Button className="btn-block" color="primary mt-2" onClick={() => push({})}>
                                                                Update Flight Sector<sup> +</sup>
                                                            </Button>

                                                    )


                                                }
                                            }


                                        </FieldArray>


                                        <FieldArray name="profile">
                                            {
                                                (ProfileArrayprops) => {

                                                    const { push, remove, form } = ProfileArrayprops;
                                                    /* const { values } = form; */
                                                    const { profile } = form.values;

                                                    return (
                                                        profile && profile.length > 0 ?
                                                            profile.map((p, index) => {
                                                                return (
                                                                    <Fragment key={`p${index}`}>
                                                                        { console.log("Profile Options -> ", profileOptions) }
                                                                        <h4>Profile {index + 1}</h4>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Select Profile" />
                                                                            </Label>
                                                                            <CustomSelect
                                                                                name={`profile[${index}]`}
                                                                                id="profile"                                                                                
                                                                                options={profileOptions}
                                                                                onChange={setFieldValue}
                                                                                onBlur={setFieldTouched}
                                                                                value={profileOptions.find(obj => obj.id === parseInt(p, 10))}
                                                                            />
                                                                            {errors.profile && touched.profile ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {errors.profile}
                                                                                </div>
                                                                            ) : null}
                                                                        </FormGroup>

                                                                        <Button className="mb-3 mr-2" onClick={() => push('')}>Add Profile</Button>
                                                                       {/*  {index > 0 ? */}
                                                                            <Button className="mb-3" onClick={() => remove(index)}>Delete</Button> {/* : ""} */}

                                                                    </Fragment>
                                                                )
                                                            }) : <Button className="btn-block" color="primary mb-3" onClick={() => push('')}>
                                                                Update Profile Travelling<sup> +</sup>
                                                            </Button>

                                                    )


                                                }
                                            }


                                        </FieldArray>

                                        <FormGroup className="form-group has-float-label">
                                            <Label>Accommodation</Label>
                                            <Field
                                                className="form-control"
                                                name="accommodation"
                                                component="textarea"
                                                value={values.accommodation}
                                                placeholder="Insert Notes for your own reference"
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>Transportation</Label>
                                            <Field
                                                className="form-control"
                                                name="transportation"
                                                component="textarea"
                                                value={values.transportation}
                                                placeholder="Insert Notes for your own reference"
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>Food & Beverages</Label>
                                            <Field
                                                className="form-control"
                                                name="food_beverage"
                                                component="textarea"
                                                value={values.food_beverage}
                                                placeholder="Insert Notes for your own reference"
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>Insurance</Label>
                                            <Field
                                                className="form-control"
                                                name="insurance"
                                                component="textarea"
                                                value={values.insurance}
                                                placeholder="Insert Notes for your own reference"
                                            />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label">
                                            <Label>Other</Label>
                                            <Field
                                                className="form-control"
                                                name="other"
                                                component="textarea"
                                                value={values.other}
                                                placeholder="Insert Notes for your own reference"
                                            />
                                        </FormGroup>

                                        <Button color="primary" type="submit">
                                            {isSubmitting ? "loading..." : "Submit"}
                                        </Button>
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
                                <h3 className="text-center"  >Profiles on this trip</h3><br />
                                <Button color="primary my-2" className="btn-block" onClick={() => setProfileModal(true)}>
                                    Create new profile<sup> +</sup>
                                </Button>

                                <CustomTable columns={profileCol} data={tripProfileTable} />
                            </CardTitle>
                        </CardBody>
                    </Card>

                    <Card className="mt-5">
                        <CardBody>
                            <CardTitle>
                                <h3 className="text-center"  >Documents saved in this trip</h3><br />
                                <Button color="primary my-2" className="btn-block" onClick={() =>  setDocumentModal(true)}>
                                    Create new document<sup> +</sup>
                                </Button>
                                <CustomTable columns={docCol} data={tripDocTable} />
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
const mapStateToProps = ({ profileUser, tripUser }) => {
    const { selectedTripData, tripDocTable, tripProfileTable, loading } = tripUser
    const { userProfile } = profileUser;

    return { selectedTripData, tripDocTable, tripProfileTable, userProfile, loading };


};

export default connect(mapStateToProps, { tripEditDataAction: tripEditData, allUserProfileAction: allUserProfile, userTripUpdateAction: userTripUpdate, tripDocumentAction: tripDocument, tripProfileAction: tripProfile,userRequestAction:requestTable })(TripEdit);

