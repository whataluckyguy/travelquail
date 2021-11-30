import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";

import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import axios from 'axios';
import Dropzone from "react-dropzone";
import * as Yup from 'yup';
import BootstrapTable from 'react-bootstrap-table-next';

import { Formik, Form, Field, FieldArray } from 'formik';
import 'react-phone-number-input/style.css';
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
} from './FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import products from "../../data/products";
import { getCurrentUser } from '../../helpers/Utils';
import { allUserProfile } from '../../redux/userProfile/actions';
import { allUserTrip } from "../../redux/userTrip/actions";
import { userDoc } from "../../redux/userDocuments/actions"
import { CustomSelect } from "./customSelect";
import { NotificationManager } from '../../components/common/react-notifications';





const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'https://httpbin.org/post',
};
const dropzoneConfig = {
    thumbnailHeight: 160,
    autoProcessQueue: true,
    maxFilesize: 2,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-file-preview mb-3">
            <div className="d-flex flex-row ">
                <div className="p-0 w-30 position-relative">
                    <div className="dz-error-mark">
                        <span>
                            <i />{' '}
                        </span>
                    </div>
                    <div className="dz-success-mark">
                        <span>
                            <i />
                        </span>
                    </div>
                    <div className="preview-container">
                        {/*  eslint-disable-next-line jsx-a11y/alt-text */}
                        <img data-dz-thumbnail className="img-thumbnail border-0" />
                        <i className="simple-icon-doc preview-icon" />
                    </div>
                </div>
                <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                    <div>
                        {' '}
                        <span data-dz-name />{' '}
                    </div>
                    <div className="text-primary text-extra-small" data-dz-size />
                    <div className="dz-progress">
                        <span className="dz-upload" data-dz-uploadprogress />
                    </div>
                    <div className="dz-error-message">
                        <span data-dz-errormessage />
                    </div>
                </div>
            </div>
            <a href="#/" className="remove" data-dz-remove>
                {' '}
                <i className="glyph-icon simple-icon-trash" />{' '}
            </a>
        </div>
    ),
    headers: { 'My-Awesome-Header': 'header value' },
};

const dropzoneStyle = {
    width: "100%",
    height: "auto",
    borderWidth: 2,
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "dashed",
    borderRadius: 5,
}

const DocumentForm = ({ allUserProfileAction, userProfile, allUserTripAction, userTrip, history, userDocAction, loading }) => {



    /*  const [frequentFlyerShow, setFrequentFlyerShow] = useState(false);
     const [TravelDocShow, setTravelDocShow] = useState(false);
 
     const handleFrequentFlyer = () => {
         setFrequentFlyerShow(true)
     }
     const handleTravelDocuments = () => {
         setTravelDocShow(true)
     } */

    const allProfileData = () => {
        let user_id = getCurrentUser().id
        if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
        user_id = getCurrentUser().admin_id
        allUserProfileAction(user_id, history)
    }


    const allTripData = () => {
        let user_id = getCurrentUser().id
        if(getCurrentUser().roles=== 3 || getCurrentUser().roles=== 2)
        user_id = getCurrentUser().admin_id
        allUserTripAction(user_id, history)
    }



    useEffect(() => {
        allProfileData()
        allTripData()

    }, [])
    const profileforemp = []
    const tripforemp = []

    userProfile.map(p=>{if(p.id===getCurrentUser().profile_id)
       {
        profileforemp.push({ id: p.id, value: `${p.first_name} ${p.middle_name} ${p.last_name}`, label: `${p.first_name} ${p.middle_name} ${p.last_name}` })
        }
       })
   
    userTrip.map(t=>{if(t.profile.includes(getCurrentUser().profile_id))
        {
            tripforemp.push({ id: t.id, value: t.name, label: t.name })
         }
        })
        console.log("profile",profileforemp)
        console.log("Trip",tripforemp)
    const [trip_profile_document] = useState("")
    const [companyValues, setCompanyValues] = useState();
    const [subcategoryOptions, setSubcategoryOptions] = useState();


    console.log("sub", subcategoryOptions)


    const initialValues = {
        trip_profile_document,
        trip_profile_name: "",
        document_name: "",
        document_category: "",
        document_subcategory: "",
        valid_from: "",
        valid_to: "",
        dropzone: [],


    }



    const onSubmit = (values, { resetForm, setSubmitting }) => {
        const payload = {
            ...values,

        };
        
        if (values.dropzone.length === 0) {
            NotificationManager.warning("Please enter atleast one document", 'Add Document', 3000, null, null, '');
        } else {
           
           /*  setTimeout(() => {
                alert(JSON.stringify(payload, null, 2));
                resetForm()
                setSubmitting(false);
            }, 1000); */
                userDocAction(values, history)
                resetForm()
                setSubmitting(false);
           
        }

      
    };

    const documentType = [
        { value: 'Trip', label: 'Trip' },
        { value: 'Profile', label: 'Profile', },

    ];
    const title = [
        { value: 'Mr', label: 'Mr' },
        { value: 'Mrs', label: 'Mrs', },
        { value: 'Miss', label: 'Miss' },
        { value: 'Ms', label: 'Ms' },
        { value: 'Mstr', label: 'Mstr' },
        { value: 'Prof', label: 'Prof' },
        { value: 'Dr', label: 'Dr' },

    ];
    const DocumentsCategoryProfile = [
        { value: 'Traveller ID', label: 'Traveller id' },
        {value : "Ticket / reservation",label :'Ticket / reservation'},
        { value: 'Travel visa / Residency', label: 'Travel visa / residency', },
        { value: 'Travel insurance', label: 'Travel insurance' },
        { value: "Forms & Declaration", label: "Forms & declaration" },
        { value: "Other document", label: "Other document" }

    ];
    const DocumentsCategoryTrip = [
        { value: 'Travel visa / Residency', label: 'Travel visa / residency', },
        { value: 'Travel insurance', label: 'Travel insurance' },
        { value: "Forms & Declaration", label: "Forms & declaration" },
        { value: "Other document", label: "Other document" }

    ];


    const subTravel = [
        { value: 'Passport', label: 'Passport' },
        { value: 'Aadhaar Card', label: 'Aadhaar Card' },
        { value: 'Voter ID', label: 'Voter ID' },
        { value: 'Other', label: 'Other, please specify' }

    ]
    const subTicket = [
        { value: 'E-ticket', label: 'E-ticket' },
        { value: 'Boarding Pass', label: 'Boarding Pass' },
        { value: 'Hotel Booking', label: 'Hotel Booking' },
        { value: 'Car / Vehicle Booking', label: 'Car / Vehicle Booking' },
        { value: 'Other', label: 'Other, please specify' }

    ]
    const subVisa = [
        { value: 'OCI / PIO', label: 'OCI / PIO' },
        { value: 'Permanent Residency Card', label: 'Permanent Residency Card' },
        { value: 'Multiple Entry Visa', label: 'Multiple Entry Visa' },
        { value: 'Single Entry Visa', label: 'Single Entry Visa' },
        { value: 'COVID passport', label: 'Covid passport' },
        { value: 'Other', label: 'Other, please specify' }

    ]
    const subInsurance = [
        { value: 'Term Travel Insurance', label: 'Term Travel Insurance' },
        { value: 'Trip Travel Insurance', label: 'Trip Travel Insurance' },
        { value: 'Other', label: 'Other, please specify' }

    ]
    const subForm = [
        { value: 'Government Form / Declaration', label: 'Government Form / Declaration' },
        { value: 'Airline Form Declaration', label: 'Airline Form Declaration' },
        { value: 'Health Declaration', label: 'Health Declaration' },
        { value: 'Covid-19 Certificate', label: 'Covid-19 Certificate' },
        { value: 'Other', label: 'Other, please specify' }

    ]
    const subOther = [
        { value: 'Luggage Tag', label: 'Luggage Tag' },
        { value: 'Lost Baggage Form', label: 'Lost Baggage Form' },
        { value: 'Complaints / feedback form', label: 'Complaints / feedback form' },
        { value: 'Other', label: 'Other, please specify' }

    ]

    const profileOptions = []
    const tripOptions = []



    /*   console.log("user trip and profile", userTrip, userProfile) */

    userTrip.forEach(p => {
        tripOptions.push({ id: p.id, value: p.name, label: p.name })

    })

    userProfile.forEach(p => {
        profileOptions.push({ id: p.id, value: `${p.first_name} ${p.middle_name} ${p.last_name}`, label: `${p.first_name} ${p.middle_name} ${p.last_name}` })

    })



    const eventHandlers = {

        addedfiles: (files) => {
            let images = []

            for (let i = 0; i < files.length; i++) {
                images.push(files[i])

                /* console.log("images", files[i]) */
            }

            images.forEach((img) => {
                const formData = new FormData()
                formData.append(`file`, img)
                formData.append('upload_preset', 'lyxrkznz');

                return axios.post("https://api.cloudinary.com/v1_1/dx6zgsncl/upload", formData)
                    .then(res => {
                        initialValues.dropzone.push({ public_id: res.data.public_id, url: res.data.secure_url })


                    })
                    .catch(err => console.log(err))

            })



        }


    }


    const SignupSchema = Yup.object().shape({
        trip_profile_document: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please enter your Trip / Profile Document'),
        /* trip_profile_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please enter your Trip / Profile name'), */
        document_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please enter your Document name'),
        document_category: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please enter your Document category'),
        document_subcategory: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Please enter your Document subcategory'),
        valid_from: Yup.date().required('Please enter your documents validity starting date'),
        valid_to: Yup.date().required('Please enter your document expiry date'),

      dropzone: Yup.array()
             .min(1, 'Atleast one document is required')

          /*     .of(
                Yup.object().shape({
                    public_id: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Please enter your Document!'),
                    url: Yup.string()
                        .min(2, 'Too Short!')
                        .max(100, 'Too Long!')
                        .required('Please enter your Document'),

                })

            )
            .required('Atleast one document is required')

        , */

    });



    return (


        <>
            <Row className="mb-4 d-flex justify-content-center">
                <Colxx xxs="12" md="6">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="Document Details" />
                            </CardTitle>

                            <Formik
                                initialValues={initialValues}

                                validationSchema={SignupSchema}
                                onSubmit={onSubmit}

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
                                    onValueChange,


                                }) => (

                                    <Form className="av-tooltip tooltip-label-bottom">
                                        <Row>
                                            <Colxx xxs="12">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Trip / Profile Document" />
                                                    </Label>
                                                    <FormikReactSelect
                                                        name="trip_profile_document"
                                                        id="trip_profile_document"
                                                        value={documentType.find(obj => obj.value === values.trip_profile_document)}
                                                        options={documentType}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}


                                                    />
                                                    {errors.trip_profile_document && touched.trip_profile_document ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.trip_profile_document}
                                                        </div>
                                                    ) : null}

                                                </FormGroup>
                                            </Colxx >
                                        </Row>
                                        {values.trip_profile_document && values.trip_profile_document ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                            <IntlMessages id="Trip / Profile Name" />
                                                        </Label>
                                                       {getCurrentUser().roles !== 3
                                                       ?
                                                       <CustomSelect
                                                       name="trip_profile_name"
                                                       id="trip_profile_name"
                                                       value={values.trip_profile_document === "Trip" ? tripOptions.find(obj => obj.id === values.trip_profile_name) : profileOptions.find(obj => obj.id === values.trip_profile_name)}
                                                       options={values.trip_profile_document === "Trip" ? tripOptions : profileOptions}
                                                       onChange={setFieldValue}
                                                       onBlur={setFieldTouched}
                                                   />
                                                :
                                                     <CustomSelect
                                                       name="trip_profile_name"
                                                       id="trip_profile_name"
                                                       value={values.trip_profile_document === "Trip" ? tripforemp.find(obj => obj.id === values.trip_profile_name) : profileforemp.find(obj => obj.id === values.trip_profile_name)}
                                                       options={values.trip_profile_document === "Trip" ? tripforemp : profileforemp}
                                                       onChange={setFieldValue}
                                                       onBlur={setFieldTouched}
                                                       />
                                                }
                                                        {errors.trip_profile_name && touched.trip_profile_name ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.trip_profile_name}
                                                            </div>
                                                        ) : null}
                                                    </FormGroup>
                                                </Colxx >

                                            </Row> : ""}
                                        {setCompanyValues(values.trip_profile_name === "Trip" ? userTrip.find(t => t.id === values.trip_profile_name) : userProfile.find(t => t.id === values.trip_profile_name))}
                                        {companyValues &&
                                            <>
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <FormGroup className="form-group has-float-label">



                                                            <Label>
                                                                <IntlMessages id="Company" />
                                                            </Label>
                                                            <Field className="form-control" name="company" value={companyValues.company} ></Field>



                                                        </FormGroup>
                                                    </Colxx>

                                                </Row>
                                                <Row>
                                                    <Colxx xxs="12">
                                                        <FormGroup className="form-group has-float-label">


                                                            <Label>
                                                                <IntlMessages id="Department" />
                                                            </Label>
                                                            <Field className="form-control" name="department" value={companyValues.department} />



                                                        </FormGroup>
                                                    </Colxx>

                                                </Row>
                                            </>
                                        }
                                        <Row>
                                            <Colxx xxs="12">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Document Name" />
                                                    </Label>
                                                    <Field className="form-control" name="document_name" value={values.document_name} />
                                                    {errors.document_name && touched.document_name ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.document_name}
                                                        </div>
                                                    ) : null}

                                                </FormGroup>
                                            </Colxx>

                                        </Row>
                                        
                                       {values.trip_profile_document !== "Trip" ?
                                     
                                        <Row>
                                            <Colxx xxs="12">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Document Category" />
                                                    </Label>
                                                    <FormikReactSelect

                                                        name="document_category"
                                                        id="document_category"
                                                        value={DocumentsCategoryProfile.find(obj => obj.value === values.document_category)}
                                                        options={DocumentsCategoryProfile}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                    />
                                                    {errors.document_category && touched.document_category ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.document_category}
                                                        </div>
                                                    ) : null}

                                                </FormGroup>

                                            </Colxx>
                                        </Row>:
                                        <Row>
                                        <Colxx xxs="12">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Document Category" />
                                                </Label>
                                                <FormikReactSelect

                                                    name="document_category"
                                                    id="document_category"
                                                    value={DocumentsCategoryTrip.find(obj => obj.value === values.document_category)}
                                                    options={DocumentsCategoryTrip}
                                                    onChange={setFieldValue}
                                                    onBlur={setFieldTouched}
                                                />
                                                {errors.document_category && touched.document_category ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.document_category}
                                                    </div>
                                                ) : null}

                                            </FormGroup>

                                        </Colxx>
                                    </Row>
}                                                           
                                        {values.document_category === "Traveller ID" ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>

                                                            <IntlMessages id="Document Sub-Category" />
                                                        </Label>

                                                        <FormikReactSelect
                                                            name="document_subcategory"
                                                            id="document_subcategory"
                                                            value={subTravel.find(obj => obj.value === values.document_subcategory)}
                                                            options={subTravel}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.document_subcategory && touched.document_subcategory ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.document_subcategory}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>

                                                </Colxx>
                                            </Row> : ""}
                                            {values.document_category === "Ticket / reservation" ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>

                                                            <IntlMessages id="Document Sub-Category" />
                                                        </Label>

                                                        <FormikReactSelect
                                                            name="document_subcategory"
                                                            id="document_subcategory"
                                                            value={subTicket.find(obj => obj.value === values.document_subcategory)}
                                                            options={subTicket}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.document_subcategory && touched.document_subcategory ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.document_subcategory}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>

                                                </Colxx>
                                            </Row> : ""}
                                        {values.document_category === "Travel visa / Residency" ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>

                                                            <IntlMessages id="Document Sub-Category" />
                                                        </Label>

                                                        <FormikReactSelect
                                                            name="document_subcategory"
                                                            id="document_subcategory"
                                                            value={subVisa.find(obj => obj.value === values.document_subcategory)}
                                                            options={subVisa}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.document_subcategory && touched.document_subcategory ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.document_subcategory}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>

                                                </Colxx>
                                            </Row> : ""}
                                        {values.document_category === "Travel insurance" ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>

                                                            <IntlMessages id="Document Sub-Category" />
                                                        </Label>

                                                        <FormikReactSelect
                                                            name="document_subcategory"
                                                            id="document_subcategory"
                                                            value={subInsurance.find(obj => obj.value === values.document_subcategory)}
                                                            options={subInsurance}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.document_subcategory && touched.document_subcategory ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.document_subcategory}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>

                                                </Colxx>
                                            </Row> : ""}
                                        {values.document_category === "Forms & Declaration" ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>

                                                            <IntlMessages id="Document Sub-Category" />
                                                        </Label>

                                                        <FormikReactSelect
                                                            name="document_subcategory"
                                                            id="document_subcategory"
                                                            value={subForm.find(obj => obj.value === values.document_subcategory)}
                                                            options={subForm}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.document_subcategory && touched.document_subcategory ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.document_subcategory}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>

                                                </Colxx>
                                            </Row> : ""}
                                        {values.document_category === "Other document" ?
                                            <Row>

                                                <Colxx xxs="12">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>

                                                            <IntlMessages id="Document Sub-Category" />
                                                        </Label>

                                                        <FormikReactSelect
                                                            name="document_subcategory"
                                                            id="document_subcategory"
                                                            value={subOther.find(obj => obj.value === values.document_subcategory)}
                                                            options={subOther}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.document_subcategory && touched.document_subcategory ? (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.document_subcategory}
                                                            </div>
                                                        ) : null}

                                                    </FormGroup>

                                                </Colxx>
                                            </Row> : ""}
                                        
                                        {values.document_subcategory === "Other" ?
                                        <Row>
                                         <Colxx xxs="12">
                                        <FormGroup className="form-group has-float-label">
                                         <Label>
                                          <IntlMessages id="Document Sub-Category" />
                                            </Label>
                                             <Field className="form-control" value={values.document_subcategory_other} name="document_subcategory_other" />
                                             </FormGroup>
                                            </Colxx >
                                           </Row> : null}
                                           <Row>
                                            <Colxx xxs="6">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label className="d-block">
                                                        <IntlMessages id="Valid From" />
                                                    </Label>
                                                    <FormikDatePicker
                                                        name="valid_from"
                                                        value={values.valid_from}
                                                        onBlur={setFieldTouched}
                                                        onChange={setFieldValue}
                                                        maxDate={new Date()}
                                                        dateFormat="dd/MM/yyyy"


                                                    />
                                                    {errors.valid_from && touched.valid_from ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.valid_from}
                                                        </div>
                                                    ) : null}

                                                </FormGroup>
                                            </Colxx>
                                            <Colxx xxs="6">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label className="d-block">
                                                        <IntlMessages id="Valid To" />
                                                    </Label>
                                                    <FormikDatePicker
                                                        name="valid_to"
                                                        value={values.valid_to}
                                                        onBlur={setFieldTouched}
                                                        onChange={setFieldValue}
                                                        minDate={new Date()}
                                                        dateFormat="dd/MM/yyyy"


                                                    />
                                                    {errors.valid_to && touched.valid_to ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.valid_to}
                                                        </div>
                                                    ) : null}

                                                </FormGroup>
                                            </Colxx>
                                        </Row>
                                        <Row>
                                            <Colxx xxs="12">
                                                <DropzoneComponent
                                                     
                                                    name="dropzone"
                                                    config={dropzoneComponentConfig}
                                                    djsConfig={dropzoneConfig}
                                                    eventHandlers={eventHandlers}
                                                    value={values.dropzone}
                                                />
                                                {errors.dropzone && touched.dropzone ? (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.dropzone}
                                                    </div>
                                                ) : null}

                                            </Colxx>
                                        </Row>

                                        <Button color="primary" type="submit" className="mt-3" /* disabled={values.dropzone?"disabled":""} */>
                                            {isSubmitting ? "Submit" : "Submit"}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Colxx>


            </Row>


        </>
    );
}

const mapStateToProps = ({ profileUser, tripUser, DocUser }) => {
    const { userProfile } = profileUser;
    const { userTrip } = tripUser;
    const { loading } = DocUser

    /* console.log("useeeee", tripUser) */
    return { userProfile, userTrip, loading };


};

export default connect(mapStateToProps, { allUserProfileAction: allUserProfile, allUserTripAction: allUserTrip, userDocAction: userDoc })(DocumentForm)

