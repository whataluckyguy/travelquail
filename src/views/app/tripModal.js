import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import { Formik, Form, Field, FieldArray } from "formik";
import Select from 'react-select';
import * as Yup from "yup";
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Airport from "./airport.json"
import { FormikReactSelect, FormikDatePicker } from "./FormikFields";
import IntlMessages from "../../helpers/IntlMessages";
import { allUserProfile } from "../../redux/userProfile/actions";
import { UserTrip } from "../../redux/userTrip/actions";
import { NotificationManager } from '../../components/common/react-notifications';
import { CustomSelect } from "./customSelect";

const TripModal = (props) => {
  console.log("props", props);
  /*   const [name, setName] = useState("");
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [company, setCompany] = useState("");
      const [department, setDepartment] = useState("")
      const [flightShow, setFlightShow] = useState(false);
  
   */

  const [flightShow, setFlightShow] = useState(false);
  const [ProfileShow, setProfileShow] = useState(false);

  const AirportData = []
  Airport.map(obj => {
      /* eslint-disable no-param-reassign */
      obj.label = `${obj.name}, (${obj.code}), ${obj.country}`;
      obj.value = `${obj.name}, (${obj.code}), ${obj.country}`;
      AirportData.push(obj);
  })

  const handleFlightSector = () => {
    setFlightShow(true);
  };
  const handleProfile = () => {
    setProfileShow(true);
  };

  const initialValues = {
    name: "",
    startDate: "",
    endDate: "",
    company: "",
    department: "",
    flightSector: [
      {
        airline: "",
        departure_airport: "",
        departure_date: "",
        arrival_airport: "",
        arrival_date: "",
        pnr: "",
      },
    ],
    profile: [""],
    accommodation: "",
    transportation: "",
    food_beverages: "",
    insurance: "",
    other: "",
  };

  const profileOptions = [];
  /*   const profileSelect = (e) => { */

  props.userProfile.forEach((p) => {
    /*   console.log("ids", profileOptions) */
    profileOptions.push({
      id: p.id,
      value: `${p.first_name} ${p.middle_name} ${p.last_name}`,
      label: `${p.first_name} ${p.middle_name} ${p.last_name}`,
    });
  });

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const payload = {
      ...values,
    };
    // setTimeout(() => {
    //   alert(JSON.stringify(payload, null, 2));
    //   resetForm();
    //   setSubmitting(false);
    // }, 1000);

    if (!props.loading && values.flightSector.length === 0) {

      NotificationManager.warning("Please enter atleast one flight sector details", 'Add Flight Sector', 3000, null, null, '');
  }else {
      /* setTimeout(() => {
          alert(JSON.stringify(payload, null, 2));
          resetForm()
          setSubmitting(false);
      }, 1000); */
      props.UserTripAction(values, props.history)
      resetForm()
      setSubmitting(false);
  }

  };

  const options = [
    { value: "Aegean Airlines", label: "Aegean Airlines" },
    { value: "Aer Lingus", label: "Aer Lingus" },
    { value: "Aerolineas Argentinas", label: "Aerolineas Argentinas" },
    { value: "Aeromexico", label: "Aeromexico" },
    { value: "Air Arabia", label: "Air Arabia" },
    { value: "Air Astana", label: "Air Astana" },
    { value: "Air Australia", label: "Air Australia" },
    { value: "Air Baltic", label: "Air Baltic" },
    { value: "Air Belgium", label: "Air Belgium" },
    { value: "Air Canada", label: "Air Canada" },
    { value: "Air Caraibes", label: "Air Caraibes" },
    { value: "Air China", label: "Air China" },
    { value: "Air Corsica", label: "Air Corsica" },
    { value: "Air Dolomiti", label: "Air Dolomiti" },
    { value: "Air Europa", label: "Air Europa" },
    { value: "Air France", label: "Air France" },
    { value: "Air India", label: "Air India" },
    { value: "Air India Express", label: "Air India Express" },
    { value: "Air Macau", label: "Air Macau)" },
    { value: "Air Malta", label: "Air Malta" },
    { value: "Air Mauritius", label: "Air Mauritius" },
    { value: "Air Namibia", label: "Air Namibia" },
    { value: "Air New Zealand", label: "Air New Zealand" },
    { value: "Air North", label: "Air North)" },
    { value: "Air Seoul", label: "Air Seoul" },
    { value: "Air Serbia", label: "Air Serbia" },
    { value: "Air Tahiti Nui", label: "Air Tahiti Nui" },
    { value: "Air Transat", label: "Air Transat" },
    { value: "Air Vanuatu", label: "Air Vanuatu" },
    { value: "AirAsiaX", label: "AirAsiaX" },
    { value: "Aircalin", label: "Aircalin" },
    { value: "Alaska Airlines", label: "Alaska Airlines" },
    { value: "Alitia", label: "Alitia" },
    { value: "Allegiant", label: "Allegiant" },
    { value: "American Airlines", label: "American Airlines" },
    { value: "ANA", label: "ANA" },
    { value: "Asian", label: "Asian" },
    { value: "Austrian", label: "Austrian" },
    { value: "Azerbaijan Hava Yollary", label: "Azerbaijan Hava Yollary" },
    { value: "Azores Airlines", label: "Azores Airlines" },
    { value: "Azul", label: "Azul" },
    { value: "Bamboo Airways", label: "Bamboo Airways" },
    { value: "Bangkok Airways", label: "Bangkok Airways" },
    { value: "British Airways", label: "British Airways" },
    { value: "Brussels Airlines", label: "Brussels Airlines" },
    { value: "Caribbean Airlines", label: "Caribbean Airlines" },
    { value: "Cathay Pacific", label: "Cathay Pacific" },
    { value: "Cathay Dragon", label: "Cathay Dragon" },
    { value: "Cayman Airways", label: "Cayman Airways" },
    { value: "CEBU Pacific Air", label: "CEBU Pacific Air" },
    { value: "China Airlines", label: "China Airlines" },
    { value: "China Eastern", label: "China Eastern" },
    { value: "China Southern", label: "China Southern" },
    { value: "Condor", label: "Condor" },
    { value: "Copa Airlines", label: "Copa Airlines" },
    { value: "Croatia Airlines", label: "Croatia Airlines" },
    { value: "Czech Airlines", label: "Czech Airlines" },
    { value: "Delta", label: "Delta" },
    { value: "EasyJet", label: "EasyJet" },
    { value: "Edelweiss Air", label: "Edelweiss Air" },
    { value: "Egyptair", label: "Egyptair" },
    { value: "EL AL", label: "EL AL" },
    { value: "Emirates", label: "Emirates" },
    { value: "Ethopia Airlines", label: "Ethopia Airlines" },
    { value: "Etihad", label: "Etihad" },
    { value: "Eurowings", label: "Eurowings" },
    { value: "EVA Air", label: "EVA Air" },
    { value: "Fiji Airways", label: "Fiji Airways" },
    { value: "Finnair", label: "Finnair" },
    { value: "Flydubai", label: "Flydubai" },
    { value: "FlyOne", label: "FlyOne" },
    { value: "French bee", label: "French bee" },
    { value: "Frontier", label: "Frontier" },
    { value: "Garuda Indonesia", label: "Garuda Indonesia" },
    { value: "Gol", label: "Gol" },
    { value: "Gulf Air", label: "Gulf Air)" },
    { value: "Hainan Airlines", label: "Hainan Airlines" },
    { value: "Hawaiian Airlines", label: "Hawaiian Airlines" },
    { value: "Helvetic Airways", label: "Helvetic Airways" },
    { value: "HK Express", label: "HK Express" },
    { value: "Hong Kong Airlines", label: "Hong Kong Airlines" },
    { value: "Iberia", label: "Iberia" },
    { value: "Icelandair", label: "Icelandair" },
    { value: "IndiGo Airlines", label: "IndiGo Airlines" },
    { value: "InterJet", label: "InterJet" },
    { value: "Japan Airlines", label: "Japan Airlines" },
    { value: "Jeju Air", label: "Jeju Air" },
    { value: "Jet2", label: "Jet2" },
    { value: "JetBlue", label: "JetBlue" },
    { value: "Jetstar", label: "Jetstar" },
    { value: "Jin Air", label: "Jin Air" },
    { value: "Kenya Airways", label: "Kenya Airways" },
    { value: "KLM", label: "KLM" },
    { value: "Korean Air", label: "Korean Air" },
    { value: "Kulula", label: "Kulula" },
    { value: "La Compagnie", label: "La Compagnie" },
    { value: "LATAM", label: "LATAM" },
    { value: "Lion Airlines", label: "Lion Airlines" },
    { value: "LOT Polish Airlines", label: "LOT Polish Airlines" },
    { value: "Lufthansa", label: "Lufthansa" },
    { value: "Luxair", label: "Luxair" },
    { value: "Luxair", label: "Luxair" },
    { value: "Malaysia Airlines", label: "Malaysia Airlines" },
    { value: "Mango", label: "Mango" },
    { value: "Middle East-Airlines", label: "Middle East-Airlines" },
    { value: "Nok Air", label: "Nok Air" },
    { value: "Nordwind Airlines", label: "Nordwind Airlines" },
    {
      value: "Norwegian Air International",
      label: "Norwegian Air International",
    },
    { value: "Norwegian Air Shuttle", label: "Norwegian Air Shuttle" },
    { value: "Norwegian Air Sweden", label: "Norwegian Air Sweden" },
    { value: "Norwegian Air Uk", label: "Norwegian Air Uk" },
    { value: "Oman Air", label: "Oman Air" },
    {
      value: "Pakistan International Airlines",
      label: "Pakistan International Airlines",
    },
    { value: "Peach", label: "Peach" },
    { value: "Peagasus Airlines", label: "Peagasus Airlines" },
    { value: "Phillippine Airlines", label: "Phillippine Airlines" },
    { value: "Porter", label: "Porter" },
    { value: "Qantas", label: "Qantas" },
    { value: "Qatar Airwaya", label: "Qatar Airwaya" },
    { value: "Regional Express", label: "Regional Express" },
    { value: "Rossiya-Russian Airlines", label: "Rossiya-Russian Airlines" },
    { value: "Royal Air Maroc", label: "Royal Air Maroc" },
    { value: "Royal Brunei", label: "Royal Brunei" },
    { value: "Royal Jordanian", label: "Royal Jordanian" },
    { value: "RwandAir", label: "RwandAir" },
    { value: "Ryanair", label: "Ryanair" },
    { value: "S7 Airlines", label: "S7 Airlines" },
    { value: "SAS", label: "SAS" },
    { value: "Saudia", label: "Saudia" },
    { value: "Scoot Airlines", label: "Scoot Airlines" },
    { value: "Shanghai Arlines", label: "Shanghai Arlines" },
    { value: "Skylanes", label: "Skylanes" },
    { value: "South African Airways", label: "South African Airways" },
    { value: "Southwest", label: "Southwest" },
    { value: "SpiceJet", label: "SpiceJet" },
    { value: "Spirit", label: "Spirit" },
    { value: "Spring Airlines", label: "Spring Airlines" },
    { value: "Spring Japan", label: "Spring Japan" },
    { value: "SriLankan Airlines", label: "SriLankan Airlines" },
    { value: "Sun Country", label: "Sun Country" },
    { value: "Sunclass Airlines", label: "Sunclass Airlines" },
    { value: "Sunwing", label: "Sunwing" },
    { value: "SWISS", label: "SWISS" },
    { value: "Swoop", label: "Swoop" },
    { value: "TAAG", label: "TAAG" },
    { value: "TACA", label: "TACA" },
    { value: "TAP Portugal", label: "TAP Portugal" },
    { value: "THAI", label: "THAI" },
    { value: "tigeria Australia", label: "tigeria Australia" },
    { value: "Transavia Airlines", label: "Transavia Airlines" },
    { value: "TUI UK", label: "TUI UK" },
    { value: "TUIfly", label: "TUIfly" },
    { value: "Tunis Air", label: "Tunis Air" },
    { value: "Turkish Airlines", label: "Turkish Airlines" },
    { value: "Ukraine International", label: "Ukraine International" },
    { value: "United", label: "United" },
    { value: "Ural Airlines", label: "Ural Airlines" },
    { value: "UTair Aviation", label: "UTair Aviation" },
    { value: "Uzbekistan Airways", label: "Uzbekistan Airways" },
    { value: "Vietnam Airlines", label: "Vietnam Airlines" },
    { value: "Virgin Atlantic", label: "Virgin Atlantic" },
    { value: "Virgin Australia", label: "Virgin Australia" },
    { value: "Vistara", label: "Vistara" },
    { value: "Viva Aerobus", label: "Viva Aerobus" },
    { value: "Volaris", label: "Volaris" },
    { value: "Volotea", label: "Volotea" },
    { value: "Vueling Airlines", label: "Vueling Airlines" },
    { value: "WestJet", label: "WestJet" },
    { value: "Wizzair", label: "Wizzair" },
    { value: "Xiamen Airlines", label: "Xiamen Airlines" },
    { value: "Other, please specify", label: "Other, please specify" },
  ];

  const columns = [
    {
      dataField: "id",
      text: "Identity",
      sort: true,
    },
    {
      dataField: "title",
      text: "Product Name",
      sort: true,
    },
    {
      dataField: "category",
      text: "Product Price",
      sort: true,
    },
    {
      dataField: "category",
      text: "Product Price",
      sort: true,
    },
    {
      dataField: "category",
      text: "Product Price",
      sort: true,
    },
    {
      dataField: "category",
      text: "Product Price",
      sort: true,
    },
    {
      dataField: "category",
      text: "Product Price",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "title",
      order: "desc",
    },
  ];

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your Trip name"),
    startDate: Yup.date().required("Please enter trip start date"),
    endDate: Yup.date().required("Please enter trip end date"),
    company: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your company name"),
    department: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your department name"),

    flightSector: Yup.array()
      /* .min(1, 'Atleast one profile travelling is required') */

      .required("Atleast one flight sector is required")
      .of(
        Yup.object().shape({
          profiletrip: Yup.string()
          .required('Please select profile'),
          airline: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Please enter your airline name"),
          departure_airport: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Please enter your departure airport"),
          departure_date: Yup.date().required(
            "Please enter your departure date"
          ),
          arrival_airport: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Please enter your arrival airport"),
          arrival_date: Yup.date().required("Please enter your arrival date"),
          pnr: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Please enter your pnr number"),
        })
      ),

  
  });
  return (
    <>
      <Modal {...props} wrapClassName="modal-right">
        <ModalHeader>Create new trip</ModalHeader>
        <ModalBody>
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
                    value={values.startDate}
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
                    value={values.endDate}
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

                {flightShow ? (
                  <FieldArray name="flightSector">
                    {(fieldArrayprops) => {
                      console.log("fieldArrayprops", fieldArrayprops);
                      const { push, remove, form } = fieldArrayprops;
                      /* const { values } = form; */
                      const { flightSector } = form.values;

                      return (
                        flightSector &&
                        flightSector.map((flight, index) => {
                          const flightErrors =
                            (errors.flightSector?.length &&
                              errors.flightSector[index]) ||
                            {};
                          const flightTouched =
                            (touched.flightSector?.length &&
                              touched.flightSector[index]) ||
                            {};
                          return (
                            <Fragment key={`flight${index}`}>
                              <h4>Flight sector {index + 1}</h4>
                              <FormGroup className="form-group has-float-label">
                                 <Label>
                                  <IntlMessages id="Select Profile" />
                                  </Label>
                                  <Select
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  name={`flightSector[${index}].profiletrip`}
                                  id="profiletrip"   
                                  isMulti    
                                 onChange={(selectedOption) =>setFieldValue( `flightSector[${index}].profiletrip`, selectedOption.map((item) => item) ) }                                                                  
                                options={profileOptions}
                                 onBlur={setFieldTouched}
                                 value={profileOptions.find(obj => obj.value === flight.profiletrip)}
                                />
                               {errors.profile && touched.profile ? (
                                <div className="invalid-feedback d-block">
                                {errors.profile}
                                </div>
                                 ) : null}
                               </FormGroup>
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
                                {flightErrors.airline &&
                                flightTouched.airline ? (
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
                                  value={options.find(obj => obj.value === flight.departure_airport)}
                                  options={AirportData}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {flightErrors.departure_airport &&
                                flightTouched.departure_airport ? (
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
                                  value={flight.departure_date}
                                  onBlur={setFieldTouched}
                                  onChange={setFieldValue}
                                  minDate={new Date()}
                                  dateFormat="dd/MM/yyyy HH:mm"
                                  showTimeInput
                                />
                                {flightErrors.departure_date &&
                                flightTouched.departure_date ? (
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
                                  value={options.find(obj => obj.value === flight.arrival_airport)}
                                  options={AirportData}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {flightErrors.arrival_airport &&
                                flightTouched.arrival_airport ? (
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
                                  value={flight.arrival_date}
                                  onBlur={setFieldTouched}
                                  onChange={setFieldValue}
                                  minDate={flight.departure_date}
                                  dateFormat="dd/MM/yyyy HH:mm"
                                  showTimeInput
                                />
                                {flightErrors.arrival_date &&
                                flightTouched.arrival_date ? (
                                  <div className="invalid-feedback d-block">
                                    {flightErrors.arrival_date}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="PNR" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name={`flightSector[${index}].pnr`}
                                  value={flight.pnr}
                                 
                                />
                                {flightErrors.pnr && flightTouched.pnr ? (
                                  <div className="invalid-feedback d-block">
                                    {flightErrors.pnr}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {flightSector.length === index + 1 ? (
                                <Button
                                  className="mb-3 mr-2 btn-block"
                                  color="primary"
                                  onClick={() => push("")}
                                >
                                  Add flight sector<sup> +</sup>
                                </Button>
                              ) : null}

                            
                              {index > 0 ? (
                                <Button
                                  className="btn-block mb-3"
                                  onClick={() => remove(index)}
                                >
                                  Delete
                                </Button>
                              ) : (
                                ""
                              )}
                            </Fragment>
                          );
                        })
                      );
                    }}
                  </FieldArray>
                ) : (
                  <Button
                    className="btn-block mb-3"
                    color="primary mt-2"
                    onClick={handleFlightSector}
                  >
                    Add flight sector<sup> +</sup>
                  </Button>
                )}
                {/* {ProfileShow ? (
                  <FieldArray name="profile">
                    {(ProfileArrayprops) => {
                      const { push, remove, form } = ProfileArrayprops;
                    
                      const { profile } = form.values;

                      return profile.map((p, index) => {
                        console.log("***********************************");
                        console.log(ProfileArrayprops);
                        console.log("***********************************");

                        return (
                          <Fragment key={p}>
                            <h4>Profile {index + 1}</h4>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="Select Profile" />
                              </Label>
                              <FormikReactSelect
                                name={`profile[${index}]`}
                                id="profile"
                                value={profileOptions.find(
                                  (obj) => obj.value === p
                                )}
                                options={profileOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.profile && touched.profile ? (
                                <div className="invalid-feedback d-block">
                                  {errors.profile}
                                </div>
                              ) : null}
                            </FormGroup>
                            {index === 0 ? (
                              <Button
                                className="mb-3 mr-2 btn-block"
                                color="primary"
                                onClick={() => push("")}
                              >
                                Add profile travelling<sup> +</sup>
                              </Button>
                            ) : null}
          
                            {index > 0 ? (
                              <Button
                                className="mb-3"
                                onClick={() => remove(index)}
                              >
                                Delete
                              </Button>
                            ) : (
                              ""
                            )}
                          </Fragment>
                        );
                      });
                    }}
                  </FieldArray>
                ) : (
                  <>
                    {" "}
                    <br />{" "}
                    <Button
                      className="btn-block"
                      color="primary mb-3"
                      onClick={handleProfile}
                    >
                      Add profile travelling<sup> +</sup>
                    </Button>
                  </>
                )} */}
                <FormGroup className="form-group has-float-label">
                  <Label>Accommodation</Label>
                  <Field
                    className="form-control"
                    name="Accommodation"
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
                    name="food_beverages"
                    component="textarea"
                    value={values.food_beverages}
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

                <Button color="primary" type="submit" className="mt-3 mr-2">
                  {isSubmitting ? "loading..." : "Submit"}
                </Button>
                <Button
                  className="mt-3"
                  color="primary"
                  onClick={() => props.toggle()}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

// export default TripModal;
const mapStateToProps = ({ profileUser, tripUser }) => {
  const { userProfile } = profileUser;
  const { loading } = tripUser;
  /*    console.log("useeeee", userProfile) */
  return { userProfile, loading };
};

export default connect(mapStateToProps, {
  allUserProfileAction: allUserProfile,
  UserTripAction: UserTrip,
})(TripModal);
