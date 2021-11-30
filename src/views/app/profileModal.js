import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { connect } from 'react-redux';
import 'react-phone-number-input/style.css';
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
} from 'reactstrap';
import {
    FormikReactSelect,
    FormikDatePicker,
} from './FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
import { ReactTableDivided, ReactTableWithPaginationCard } from "../../containers/ui/ReactTableCards";
import { UserProfile } from '../../redux/userProfile/actions';






const ProfileModal = (props, { history, userProfileAction, loading }) => {



    const [frequentFlyerShow, setFrequentFlyerShow] = useState(false);
    const [TravelDocShow, setTravelDocShow] = useState(false);


    const handleFrequentFlyer = () => {
        setFrequentFlyerShow(true)
    }
    const handleTravelDocuments = () => {
        setTravelDocShow(true)
    }



    const initialValues = {
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        company: "",
        department: "",
        joining_date: "",
        leaving_date: "",
        rank: "",
        employee_id: "",
        company_number: "",
        personal_number: "",
        company_email: "",
        personal_email: "",
        emergency_name: "",
        emergency_number: "",
        frequentFlyer: [{
            miles_program: "", flyer_number: ""
        }],
        travel_documents: [],

    }

    const onSubmit = (values, { resetForm, setSubmitting }) => {
        const payload = {
            ...values,

        };
        if (!loading) {
            userProfileAction(values, history)
            resetForm()
            setSubmitting(false);
        }
       /*  setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            resetForm()
            setSubmitting(false);
        }, 1000); */
    };

  
    const options = [
        {value: "A+", label: "A+ (Azimuth Airlines)"},
        {value : "AAdvantage",label :"Advantage (American Airlines)"},
        {value : "AerClub",label :"AerClub (Aer Lingus)"},
        {value : "Aerolíneas Plus",label :"Aerolíneas Plus (Aerolíneas Argentinas)"},
        {value : "Aeroplan",label :"Aeroplan (Air Canada)"},
        {value : "Affinity Wings",label :"Affinity Wings (Arik Air)"},
        {value : "Air Algérie Plus",label :"Air Algérie Plus (Air Algérie)"},
        {value : "Air Moldova Club",label :"Air Moldova Club (Air Moldova)"},
        {value : "airBaltic Club",label :"airBaltic Club (airBaltic)"},
        {value : "Airpoints",label :"Airpoints (Air New Zealand)"},
        {value : "AirRewards",label :"AirRewards (Air Arabia)"},
        {value : "Alfursan",label :"Alfursan (Saudia)"},
        {value : "Amas Miles",label :"Amas Miles (Amaszonas)"},
        {value : "ANA Mileage Club",label :"ANA Mileage Club (ANA - All Nippon Airways)"},
        {value : "Asia Miles",label :"Asia Miles (Cathay Pacific)"},
        {value : "Asiana Club",label :"Asiana Club (Asiana Airlines)"},
        {value : "Asky Club",label :"Asky Club (Asky Airlines)"},
        {value : "Astra Miles",label :"Astra Miles (Astra Airlines)"},
        {value : "Aurora Rewards",label :"Aurora Rewards (Canadian North)"},
        {value : "Avior Plus",label :"Avior Plus (Avior Airlines)"},
        {value : "Awards + Plus",label :"Awards + Plus (PIA)"},
        {value : "Azal Miles",label :"Azal Miles (Azerbaijan Airlines)"},
        {value : "Bamboo Club",label :"Bamboo Club (Bamboo Airways)"},
        {value : "Batik Miles",label :"Batik Miles (Batik Air)"},
        {value : "Belavia Leader",label :"Belavia Leader (Belavia)"},
        {value : "BIG",label :"BIG (AirAsia)"},
        {value : "Biman Loyalty Club",label :"Biman Loyalty Club (Biman Bangladesh Airline)s"},
        {value : "BinterMás",label :"BinterMás (Binte)r"},
        {value : "Blue Flyer",label :"Blue Flyer (Med-View Airline)"},
        {value : "Blue Skies Club",label :"Blue Skies Club (Blue Islands)"},
        {value : "Blue Sky",label :"Blue Sky (MIAT)"},
        {value : "BlueMiles",label :"BlueMiles (Airblue)"},
        {value : "BolBol",label :"BolBol (Pegasus Airlines)"},
        {value : "Bonus",label :"Bonus (Aeroflot)"},
        {value : "Boomerang Club",label :"Boomerang Club (Eurowings)"},
        {value : "BRA Vänner",label :"BRA Vänner (BRA)"},
        {value : "Calm Rewards",label :"Calm Rewards (Calm Air)"},
        {value : "Caribbean Miles",label :"Caribbean Miles (Caribbean Airlines"},
        {value : "Cedar Miles",label :"Cedar Miles (MEA)"},
        {value : "Celestars",label :"Celestars (Air Burkina)"},
        {value : "Champa Muang Lao",label :"Champa Muang Lao (Lao Airlines)"},
        {value : "Clan Loganair",label :"Clan Loganair (Loganair)"},
        {value : "Club Corsair",label :"Club Corsair (Corsair)"},
        {value : "Club Premier",label :"Club Premier (AeroMexico)"},
        {value : "Club Tiare",label :"Club Tiare (Air Tahiti Nui)"},
        {value : "Club Vistara",label :"Club Vistara (Vistara)"},
        {value : "Connecting Rewards",label :"Connecting Rewards (Perimeter Aviation)"},
        {value : "ConnectMiles",label :"ConnectMiles (Copa)"},
        {value : "COSMILE",label :"COSMILE (Starlux Airlines)"},
        {value : "DanaMiles",label :"DanaMiles (Dana Air)"},
        {value : "Destinations",label :"Destinations (Air Niugini)"},
        {value : "Dream Miles",label :"Dream Miles (RwandAir)"},
        {value : "Dynasty Flyer",label :"Dynasty Flyer (China Airlines)"},
        {value : "E-Smiles",label :"E-Smiles (Air Antilles)"},
        {value : "EasternMiles",label :"EasternMiles (China Eastern)"},
        {value : "Easy to Fly!",label :"Easy to Fly! (NordStar Airlines)"},
        {value : "Egret Club",label :"Egret Club (Xiamen Airlines)"},
        {value : "EgyptAir Plus",label :"EgyptAir Plus (Egyptair)"},
        {value : "Elite Club",label :"Elite Club (Air Thanlwin)"},
        {value : "Enrich",label :"Enrich (Malaysia Airlines)"},
        {value : "Etihad Guest",label :"Etihad Guest (Etihad Airways)"},
        {value : "EuroBonus",label :"EuroBonus (SAS)"},
        {value : "Executive Club",label :"Executive Club (British Airways)"},
        {value : "Falconflyer",label :"Falconflyer (Gulf Air)"},
        {value : "Fidelys",label :"Fidelys (Tunisair)"},
        {value : "Finnair Plus",label :"Finnair Plus (Finnair)"},
        {value : "Flamingo Club",label :"Flamingo Club (LAM)"},
        {value : "FLY MORE",label :"FLY MORE (Bulgaria Air)"},
        {value : "FLY&STAMP",label :"FLY&STAMP (Air Busan)"},
        {value : "FlyerBonus",label :"FlyerBonus (Bangkok Airways)"},
        {value : "Flying Blue",label :"Flying Blue (Air France)"},
        {value : "Flying Blue",label :"Flying Blue (KLM)"},
        {value : "Flying Blue",label :"Flying Blue (Kenya Airways)"},
        {value : "Flying Returns",label :"Flying Returns (Air India)"},
        {value : "Flypass",label :"Flypass (Air Malta)"},
        {value : "FlySmiLes",label :"FlySmiLes (SriLankan Airlines)"},
        {value : "Fortune Wings Club",label :"Fortune Wings Club (Hainan Airlines)"},
        {value : "Free Flight",label :"Free Flight (Yakutia Airlines)"},
        {value : "Free Spirit",label :"Free Spirit (Spirit Airlines)"},
        {value : "Frequent Flyer",label :"Frequent Flyer (Air Timor)"},
        {value : "Frequent Flyer",label :"Frequent Flyer (Aurigny)"},
        {value : "Frequent Flyer",label :"Frequent Flyer (FlyWestair)"},
        {value : "Frequent Flyer",label :"Frequent Flyer (Qantas)"},
        {value : "Frequent Flyer Program",label :"Frequent Flyer Program (Bahamasair)"},
        {value : "Frontier Miles",label :"Frontier Miles (Frontier)"},
        {value : "GarudaMiles",label :"GarudaMiles (Garuda)"},
        {value : "GetGo",label :"GetGo (Cebu Pacific Air)"},
        {value : "Gold Points",label :"Gold Points (Bering Air)"},
        {value : "Golden Mile", label :"Golden Mile (Smartavia)"},
        {value : "Golden Panda",label :"Golden Panda (Sichuan Airlines)"},
        {value : "Green Honors",label :"Green Honors (Green Airlines)"},
        {value : "Green Miles",label :"Green Miles (Air Chathams)"},
        {value : "HappinesSMiles",label :"HappinesSMiles (Drukair)"},
        {value : "Hawaiian Miles",label :"Hawaiian Miles (Hawaiian Airlines)"},
        {value : "High Flyer Club",label :"High Flyer Club (Shree Airlines)"},
        {value : "High Flyer Rewards",label :"High Flyer Rewards (Harbour Air)"},
        {value : "Higher Flyer Rewards",label :"Higher Flyer Rewards (Alaska Seaplanes)"},
        {value : "Horizons",label :"Horizons (CAA)"},
        {value : "Hunnu Club",label :"Hunnu Club (Hunnu Air)"},
        {value : "Iberia Plus",label :"Iberia Plus (Iberia)"},
        {value : "Ibom Flyer",label :"Ibom Flyer (Ibom Air)"},
        {value : "Imi Loa",label :"Imi Loa (Mokulele Airlines)"},
        {value : "Indus Miles",label :"Indus Miles (Air Indus)"},
        {value : "Infinity MileageLands",label :"Infinity MileageLands (EVA Air)"},
        {value : "Isaruuk",label :"Isaruuk (Air Inuit)"},
        {value : "JAL Mileage Bank",label :"JAL Mileage Bank (Japan Airlines)"},
        {value : "jasmin",label :"jasmin (Nouvelair)"},
        {value : "Jazeerati",label :"Jazeerati (Jazeera Airways)"},
        {value : "JeGagne1Billet.com",label :"JeGagne1Billet.com (Air Corsica)"},
        {value : "Jo’burg Frequent Flyer Programme",label :"Jo’burg Frequent Flyer Programme (Proflight Zambia)"},
        {value : "Juneyao Club",label :"Juneyao Club (Juneyao Airlines)"},
        {value : "Kaveka",label :"Kaveka (Air Tahiti)"},
        {value : "Kestrelflyer",label :"Kestrelflyer (Air Mauritius)"},
        {value : "KrisFlyer",label :"KrisFlyer (Singapore Airlines)"},
        {value : "LATAM Pass",label :"LATAM Pass (LATAM)"},
        {value : "Le Club by AFRIJET",label :"Le Club by AFRIJET (Afrijet)"},
        {value : "LifeMiles",label :"LifeMiles (Avianca)"},
        {value : "Lotusmiles",label :"Lotusmiles (Vietnam Airlines)"},
        {value : "Loyal Wings",label :"Loyal Wings (Surinam Airways)"},
        {value : "Mabuhay Miles",label :"Mabuhay Miles (Philippine Airlines)"},
        {value : "Mahan & Miles",label :"Mahan & Miles (Mahan Air)"},
        {value : "Malindo Miles",label :"Malindo Miles (Malindo Air)"},
        {value : "Matmid Club",label :"Matmid Club (El Al)"},
        {value : "Mileage Plan",label :"Mileage Plan (Alaska Airlines)"},
        {value : "Mileage Plus",label :"Mileage Plus (United Airlines)"},
        {value : "Miles & More",label :"Miles & More (Lufthansa)"},
        {value : "Miles & More",label :"Miles & More (Swiss Air)"},
        {value : "Miles & More",label :"Miles & More (Austrain Airlines)"},
        {value : "Miles & More",label :"Miles & More (Turkish Airlines)"},
        {value : "Miles & More",label :"Miles & More (Ethiopian Airlines)"},
        {value : "Miles & More",label :"Miles & More (Air India)"},
        {value : "Miles & More",label :"Miles & More (United Airlines)"},
        {value : "Miles Plus",label :"Miles Plus (Trans Air Congo)"},
        {value : "Miles&Smiles",label :"Miles&Smiles (Turkish Airlines)"},
        {value : "Miles+Bonus",label :"Miles+Bonus (Aegean Airlines)"},
        {value : "MilleMiglia",label :"MilleMiglia (Alitalia)"},
        {value : "Mingalarbar",label :"Mingalarbar (Asian Wings Airways)"},
        {value : "My AIRDO",label :"My AIRDO (Air Do)"},
        {value : "MyCapricorne",label :"MyCapricorne (Air Austral)"},
        {value : "MyCompagnie",label :"MyCompagnie (La Compagnie)"},
        {value : "MyPoints",label :"MyPoints (Cham Wings Airlines)"},
        {value : "nasmiles",label :"nasmiles (flynas)"},
        {value : "Ndege Plus",label :"Ndege Plus (Airkenya)"},
        {value : "Nok Fan Club",label :"Nok Fan Club (Nok Air)"},
        {value : "Nomad Club",label :"Nomad Club (Air Astana)"},
        {value : "Nordwind Club",label :"Nordwind Club (Nordwind Airlines)"},
        {value : "Norwegian Reward",label :"Norwegian Reward (Norwegian)"},
        {value : "Oasis Club",label :"Oasis Club (Kuwait Airways)"},
        {value : "OK Plus",label :"OK Plus (Czech Airlines)"},
        {value : "OneWorld",label :"OneWorld (Global)"},
        {value : "Onur Extra",label :"Onur Extra (Onur Air)"},
        {value : "Orange Miles",label :"Orange Miles (Kam Air)"},
        {value : "PAA Royal",label :"PAA Royal (Precision Air)"},
        {value : "Panorama Club",label :"Panorama Club (Ukraine International Airlines)"},
        {value : "Passport Club",label :"Passport Club (Lion Air)"},
        {value : "Peace Advantage",label :"Peace Advantage (Air Peace)"},
        {value : "PhoenixMiles",label :"PhoenixMiles (Air China)"},
        {value : "PINS",label :"PINS (airBaltic)"},
        {value : "Premier Plus",label :"Premier Plus (Plus Ultra)"},
        {value : "Priority Club",label :"Priority Club (Kunming Airlines)"},
        {value : "Privilege Club",label :"Privilege Club (Qatar Airways)"},
        {value : "Préférence",label :"Préférence (Air Caraïbes)"},
        {value : "Rainbow Club",label :"Rainbow Club (Air Zimbabwe)"},
        {value : "Rapid Rewards",label :"Rapid Rewards (Southwest Airlines)"},
        {value : "Refresh Point",label :"Refresh Point (Jeju Air)"},
        {value : "Reward Club Card",label :"Reward Club Card (Ariana Afghan Airlines)"},
        {value : "Royal Club",label :"Royal Club (Buddha Air)"},
        {value : "Royal Club",label :"Royal Club (Mann Yadanarpon Airlines)"},
        {value : "Royal Orchid Plus",label :"Royal Orchid Plus (Thai Airways)"},
        {value : "Royal Plus",label :"Royal Plus (Royal Jordanian)"},
        {value : "Royal Skies",label :"Royal Skies (Royal Brunei Airlines)"},
        {value : "S7 Priority",label :"S7 Priority (S7 Airlines)"},
        {value : "Safar Flyer",label :"Safar Flyer (Royal Air Maroc)"},
        {value : "Saga Club",label :"Saga Club (Icelandair)"},
        {value : "Sama Club",label :"Sama Club (Yemenia)"},
        {value : "SATA IMAGINE",label :"SATA IMAGINE (Grupo SATA)"},
        {value : "SaudiGulf Club",label :"SaudiGulf Club (SaudiGulf)"},
        {value : "Saurya Saarathi",label :"Saurya Saarathi (Saurya Airlines)"},
        {value : "ShebaMiles",label :"ShebaMiles (Ethiopian Airlines)"},
        {value : "Sindbad",label :"Sindbad (Oman Air)"},
        {value : "Sir Turtle Rewards",label :"Sir Turtle Rewards (Cayman Airways)"},
        {value : "Sky Pearl Club",label :"Sky Pearl Club (China Southern)"},
        {value : "Sky Smile Club",label :"Sky Smile Club (Myanmar Airways)"},
        {value : "Sky Star",label :"Sky Star (US-Bangla Airlines)"},
        {value : "SkyClub",label :"SkyClub (Yeti Airlines)"},
        {value : "SkyGift",label :"SkyGift (IranAir)"},
        {value : "SkyMiles",label :"SkyMiles (Delta Air Lines)"},
        {value : "SkyMiles",label :"SkyMiles (Iraqi Airways)"},
        {value : "Skypass",label :"Skypass (Korean Air)"},
        {value : "Skywards",label :"Skyward (Emirates)"},
        {value : "Skywards",label :"Skyward (Fly Dubai)"},
        {value : "sMiles",label :"sMiles (Air Côte d\"Ivoire)"},
        {value : "Smiles",label :"Smiles (Gol)"},
        {value : "Smiles",label :"Smiles (Novoair)"},
        {value : "Solaseed Smile Club",label :"Solaseed Smile Club (Solaseed Air)"},
        {value : "SpiceClub",label :"SpiceClub (SpiceJet)"},
        {value : "SpringPass",label :"SpringPass (Spring Airlines)"},
        {value : "Star Alliance",label :"Star Alliance (Global)"},
        {value : "Star Awards",label :"Star Awards (Camair-Co)"},
        {value : "StarMiles",label :"StarMiles (CM Airlines)"},
        {value : "Status",label :"Status (Utair)"},
        {value : "SUMA",label :"SUMA (Air Europa)"},
        {value : "Sun Country Rewards",label :"Sun Country Rewards (Sun Country Airlines)"},
        {value : "SunExpress your benefits",label :"SunExpress your benefits (SunExpress)"},
        {value : "Súlubonus",label :"Súlubonus (Atlantic Airways)"},
        {value : "TAP Miles&Go",label :"TAP Miles&Go (TAP Air Portugal)"},
        {value : "Tashi Miles",label :"Tashi Miles (Bhutan Airlines)"},
        {value : "Teemane Club",label :"Teemane Club (Air Botswana)"},
        {value : "Teranga",label :"Teranga (Air Senegal)"},
        {value : "The Marco Polo Club",label :"The Marco Polo Club (Cathay Pacific)"},
        {value : "Tianhai Rhyme Club",label :"Tianhai Rhyme Club (Qingdao Airlines)"},
        {value : "TrueBlue",label :"TrueBlue (jetBlue)"},
        {value : "Tudo Azul",label :"Tudo Azul (Azul)"},
        {value : "Twiga Miles",label :"Twiga Miles (Air Tanzania)"},
        {value : "Umbi Umbi Club",label :"Umbi Umbi Club (TAAG)"},
        {value : "UzAirPlus",label :"UzAirPlus (Uzbekistan Airways)"},
        {value : "Velocity",label :"Velocity (Virgin Australia)"},
        {value : "Viajero Frecuente",label :"Viajero Frecuente (Laser Airlines)"},
        {value : "VIPorter",label :"VIPorter (Porter Airlines)"},
        {value : "Voyager",label :"Voyager (South African Airways)"},
        {value : "Vueling Club",label :"Vueling Club (Vueling)"},
        {value : "WestJet Rewards",label :"WestJet Rewards (WestJet)"},
        {value : "Wings",label :"Wings (Ural Airlines)"},
        {value : "Xiangyun Club",label :"Xiangyun Club(Okay Airways)"},
        {value : "Other",label :"Other, please specify"},
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
    const Documents = [
        { value: 'Passport', label: 'Passport' },
        { value: 'Aadhaar Card', label: 'Aadhaar Card', },
        { value: 'OCI/PIO', label: 'OCI/PIO' },
        { value: 'Permanent Residency Card', label: 'Permanent Residency Card' },
        { value: 'Visa', label: 'Visa' },
        { value: "Other", label: "Other" }
    ];


    const SignupSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Too Short!')
            .required('Please enter your first name'),

        last_name: Yup.string()
            .min(2, 'Too Short!')
            .required('Please enter your last name'),
        company: Yup.string()
            .min(2, 'Too Short!')
            .required('Please enter your company name'),
        department: Yup.string()
            .min(2, 'Too Short!')
            .required('Please enter your department name'),

        joining_date: Yup.date().required('Please enter your joining date'),
        company_number: Yup.string()
        .matches(new RegExp('[0-9]{7}')).required('"Please enter your Company number'),
       
        personal_number: Yup.string().matches(new RegExp('[0-9]{7}')).required('"Please enter your Personal number'),
        company_email: Yup.string()
            .email('Invalid email address')
            .required('Company email is required!'),
            personal_email: Yup.string()
            .email('Invalid email address'),
        emergency_name: Yup.string()
            .min(2, 'Too Short!')
            .required('Please enter an emergency name'),
        emergency_number: Yup.string().matches(new RegExp('[0-9]{7}')).required('Please enter your emergency number'),
        frequentFlyer: Yup.array()
            /* .min(1, 'Atleast one profile travelling is required') */
            .required('Atleast one frequent flyer is required')
            .of(
                Yup.object().shape({
                    miles_program: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your miles program name'),
                    flyer_number: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your frequent flyer number'),

                })

            ),
        travel_documents: Yup.array()
            /* .min(1, 'Atleast one profile travelling is required') */
            .required('Atleast one travel document is required')
            .of(
                Yup.object().shape({

                    doc_type: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your document type'),
                    title: Yup.string()
                        .min(1, 'Too Short!')
        
                        .required('Please enter your title'),
                    first_name: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your first name'),

                    last_name: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your last name'),
                    dob: Yup.date().required('Please enter your date of birth'),
                    doc_number: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your document number'),
                    issuing_country: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your document issuing country'),
                    issuing_state: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your document issuing state'),
                    issuing_date: Yup.date().required('Please enter your document issuing date'),
                    expiry_date: Yup.date().required('Please enter your document expiry date'),
                    issuing_address: Yup.string()
                        .min(2, 'Too Short!')
                        .max(150, 'Too Long!')
                        .required('Please enter your document issuing address'),
                    country: Yup.string()
                        .min(1, 'Too Short!')
                        .required('Please enter your country name'),
                    state: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter state'),

                    city: Yup.string()
                        .min(2, 'Too Short!')
                        .required('Please enter your city name'),
                    pin_code: Yup.string()
                        .required('Please enter your pin code'),


                })

            )


    });




    return (
        <>
            <Modal
                {...props}
                wrapClassName="modal-right"
                size="lg"
            >
                <ModalHeader>Create new Profile</ModalHeader>
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
                            onValueChange

                        }) => (
                            <Form className="av-tooltip tooltip-label-bottom">
                                <Row>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Title" />
                                            </Label>
                                            <FormikReactSelect
                                                name="title"
                                                id="title"
                                                value={title.find(obj => obj.value === values.title)}
                                                options={title}
                                                onChange={setFieldValue}
                                                onBlur={setFieldTouched}
                                            />

                                        </FormGroup>
                                    </Colxx >
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="First Name" />
                                            </Label>
                                            <Field className="form-control" name="first_name" onChange={handleChange} />
                                            {errors.first_name && touched.first_name ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.first_name}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx >

                                </Row>
                                <Row>

                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Middle Name" />
                                            </Label>
                                            <Field className="form-control" name="middle_name" onChange={handleChange} />
                                            {errors.middle_name && touched.middle_name ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.middle_name}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx >
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Last Name" />
                                            </Label>
                                            <Field className="form-control" name="last_name" />
                                            {errors.last_name && touched.last_name ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.last_name}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                                <Row>
                                    <Colxx xxs="6">
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
                                    </Colxx>
                                    <Colxx xxs="6">
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
                                    </Colxx>
                                </Row>
                                <Row>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label className="d-block">
                                                <IntlMessages id="Joining Date" />
                                            </Label>
                                            <FormikDatePicker
                                                name="joining_date"
                                                value={values.joining_date}
                                                onBlur={setFieldTouched}
                                                onChange={setFieldValue}
                                                dateFormat="dd/MM/yyyy"
                                                maxDate={new Date()}
                                            />
                                               {errors.joining_date && touched.joining_date ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.joining_date}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label className="d-block">
                                                <IntlMessages id="Leaving Date" />
                                            </Label>
                                            <FormikDatePicker
                                                name="leaving_date"
                                                value={values.leaving_date}
                                                onBlur={setFieldTouched}
                                                onChange={setFieldValue}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                            />

                                        </FormGroup>
                                    </Colxx>
                                </Row>
                                <Row>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Rank / Grade" />
                                            </Label>
                                            <Field className="form-control" name="rank" />

                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Employee ID" />
                                            </Label>
                                            <Field className="form-control" name="employee_id" />

                                        </FormGroup>
                                    </Colxx>
                                </Row>
                                <Row>
                                            <Colxx xxs="6">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Rank / Grade" />
                                                    </Label>
                                                    <Field className="form-control" name="rank" />
                                                    {errors.rank && touched.rank ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.rank}
                                                        </div>
                                                    ) : null}
                                                </FormGroup>
                                            </Colxx>
                                            <Colxx xxs="6">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Employee ID" />
                                                    </Label>
                                                    <Field className="form-control" name="employee_id" />
                                                </FormGroup>
                                            </Colxx>
                                        </Row>
                                <Row>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Company Number" />
                                            </Label>
                                            <PhoneInput
                                                className="form-control"
                                                name="company_number"
                                                value={values.company_number}
                                                onChange={e => setFieldValue("company_number", e)}
                                            />
                                            {errors.company_number && touched.company_number ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.company_number}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Personal Number" />
                                            </Label>
                                            <PhoneInput
                                                className="form-control"
                                                name="personal_number"
                                                value={values.personal_number}
                                                onChange={e => setFieldValue("personal_number", e)}
                                            />
                                               {errors.personal_number && touched.personal_number ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.personal_number}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                                <Row>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Company Email" />
                                            </Label>
                                            <Field type="email" className="form-control" name="company_email" />
                                            {errors.company_email && touched.company_email ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.company_email}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Personal Email" />
                                            </Label>
                                            <Field type="email" className="form-control" name="personal_email" />
                                            {errors.personal_email && touched.personal_email ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.personal_email}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                                <Row>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Emergency Name" />
                                            </Label>
                                            <Field type="text" className="form-control" name="emergency_name" />
                                            {errors.emergency_name && touched.emergency_name ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.emergency_name}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                    <Colxx xxs="6">
                                        <FormGroup className="form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Emergency Number" />
                                            </Label>
                                            <PhoneInput
                                                className="form-control"
                                                name="emergency_number"
                                                value={values.emergency_number}
                                                onChange={e => setFieldValue("emergency_number", e)}
                                            />
                                            {errors.emergency_number && touched.emergency_number ? (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.emergency_number}
                                                        </div>
                                                    ) : null}
                                        </FormGroup>
                                    </Colxx>
                                </Row>



                                {frequentFlyerShow ?
                                    <FieldArray name="frequentFlyer">
                                        {
                                            (frequentFlyerprops) => {
                                                console.log("fieldArrayprops", frequentFlyerprops)
                                                const { push, remove, form } = frequentFlyerprops;
                                                /* const { values } = form; */
                                                const { frequentFlyer } = form.values;

                                                return (
                                                    frequentFlyer && frequentFlyer.length > 0 ?
                                                    frequentFlyer.map((f, index) => {
                                                        const flyerErrors = errors.frequentFlyer?.length && errors.frequentFlyer[index] || {};
                                                        const flyerTouched = touched.frequentFlyer?.length && touched.frequentFlyer[index] || {};
                                                        return (
                                                            <Fragment key={f}>
                                                          {index===0?   <Button className="mb-3 mr-2 col-12" onClick={() => push({})}>Add frequent flyer details</Button>:null}
                                                                        <h4>Air miles / frequent flyer program {index + 1}</h4>                                                                <FormGroup className="form-group has-float-label">
                                                                    <Label>
                                                                        <IntlMessages id="Miles Program" />
                                                                    </Label>
                                                                    <FormikReactSelect
                                                                        name={`frequentFlyer[${index}].miles_program`}
                                                                        id="miles_program"
                                                                        value={options.find(obj => obj.value === f.miles_program)}
                                                                        options={options}
                                                                        onChange={setFieldValue}
                                                                        onBlur={setFieldTouched}
                                                                    />
                                                                        {flyerErrors.miles_program && flyerTouched.miles_program ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flyerErrors.miles_program}
                                                                                </div>
                                                                            ) : null}
                                                                        </FormGroup>
                                                                        {f.miles_program === "Other"?
                                                                        <FormGroup className="form-group has-float-label">
                                                                        <Label>
                                                                            <IntlMessages id="Miles Program" />
                                                                        </Label>
                                                                        <Field className="form-control" value={f.othermiles_program} name={`flyerErrors[${index}].othermiles_program`} />
                                                                        {flyerErrors.othermiles_program && flyerTouched.othermiles_program ? (
                                                                            <div className="invalid-feedback d-block">
                                                                                {flyerErrors.othermiles_program}
                                                                            </div>
                                                                        ) : null}
                                                                    </FormGroup>:" "}

                                                                <FormGroup className="form-group has-float-label">
                                                                    <Label>
                                                                        <IntlMessages id="Flyer Number" />
                                                                    </Label>
                                                                    <Field className="form-control" name={`frequentFlyer[${index}].flyer_number`} value={f.flyer_number} />
                                                                    {flyerErrors.flyer_number && flyerTouched.flyer_number ? (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {flyerErrors.flyer_number}
                                                                                </div>
                                                                            ) : null}
                                                                </FormGroup>
                                        
                                                            
                                                                    <Button className="mb-3" onClick={() => remove(index)}>Delete</Button>

                                                            </Fragment>
                                                        )
                                                    }) : <Button className="btn-block" color="primary mt-2" onClick={() => push({})}>
                                                                Add Frequent Flyer Details<sup> +</sup>
                                                            </Button>


                                                )


                                            }
                                        }


                                    </FieldArray>
                                    :
                                    <Button className="btn-block" color="primary mt-2" onClick={handleFrequentFlyer}>
                                        Add Frequent Flyer Details<sup> +</sup>
                                    </Button>}
                               
                                    <FieldArray name="travel_documents">
                                        {
                                            (TravelArrayprops) => {
                                                console.log("travelProps", TravelArrayprops)
                                                const { push, remove, form } = TravelArrayprops;
                                                /* const { values } = form; */
                                                const { travel_documents } = form.values;

                                                return (
                                                    travel_documents && travel_documents.length > 0 ?
                                                    travel_documents.map((doc, index) => {
                                                        const travelErrors = errors.travel_documents?.length && errors.travel_documents[index] || {};
                                                        const travelTouched = touched.travel_documents?.length && touched.travel_documents[index] || {};
                                                        return (
                                                            <Fragment key={doc}>
                                                           {index===0?   <Button className="col-12 mb-3 mt-2 mr-2" onClick={() => push({})}>Add travel document details</Button> :null}
                                                                        <h4 className="mt-2">Travel document {index + 1}</h4>
                                                                <Row >
                                                                    <Colxx xxs={doc.doc_type && doc.doc_type === "Other" ? "6" : "12"}>
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Document Type" />
                                                                            </Label>
                                                                            <FormikReactSelect
                                                                                name={`travel_documents[${index}].doc_type`}
                                                                                id="document_type"
                                                                                value={Documents.find(obj => obj.value === doc.doc_type)}
                                                                                options={Documents}
                                                                                onChange={setFieldValue}
                                                                                onBlur={setFieldTouched}
                                                                            /> 
                                                                              {travelErrors.doc_type && travelTouched.doc_type ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.doc_type}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                    {doc.doc_type && doc.doc_type === "Other" ?
                                                                        <Colxx xxs="6">
                                                                            <FormGroup className="form-group has-float-label">
                                                                                <Label>
                                                                                    <IntlMessages id="Document Name" />
                                                                                </Label>
                                                                                <Field className="form-control" value={doc.doc_name} name={`travel_documents[${index}].doc_name`} />

                                                                            </FormGroup>
                                                                        </Colxx > : ""}
                                                                </Row>

                                                                <Row>
                                                                    <Colxx xxs="4">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Title" />
                                                                            </Label>
                                                                            <FormikReactSelect
                                                                                name={`travel_documents[${index}].title`}
                                                                                id="title"
                                                                                value={title.find(obj => obj.value === doc.title)}
                                                                                options={title}
                                                                                onChange={setFieldValue}
                                                                                onBlur={setFieldTouched}
                                                                            />
                                                                            {travelErrors.title && travelTouched.title ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.title}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                    <Colxx xxs="4">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="First Name" />
                                                                            </Label>
                                                                            <Field className="form-control" value={doc.first_name} name={`travel_documents[${index}].first_name`} onChange={handleChange} />
                                                                            {travelErrors.first_name && travelTouched.first_name ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.first_name}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                    <Colxx xxs="4">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Last Name" />
                                                                            </Label>
                                                                            <Field className="form-control" value={doc.last_name} name={`travel_documents[${index}].last_name`} />
                                                                            {travelErrors.last_name && travelTouched.last_name ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.last_name}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>

                                                                    </Colxx>

                                                                </Row>
                                                                <Row>
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label className="d-block">
                                                                                <IntlMessages id="Date Of Birth" />
                                                                            </Label>
                                                                            <FormikDatePicker
                                                                                name={`travel_documents[${index}].dob`}
                                                                                value={doc.dob}
                                                                                onBlur={setFieldTouched}
                                                                                onChange={setFieldValue}
                                                                                maxDate={new Date()}
                                                                                dateFormat="dd/MM/yyyy"
                                                                            />
                                                                             {travelErrors.dob && travelTouched.dob ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.dob}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx>
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Document Unique Number" />
                                                                            </Label>
                                                                            <Field className="form-control" value={doc.doc_number} name={`travel_documents[${index}].doc_number`} />
                                                                            {travelErrors.doc_number && travelTouched.doc_number ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.doc_number}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx>
                                                                </Row>
                                                                <Row>
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Country Of Issue" />
                                                                            </Label>                                                              
                                                                            <CountryDropdown
                                                                                name={`travel_documents[${index}].issuing_country`}
                                                                                id="issuing_country"
                                                                                className="form-control"
                                                                                value={doc.issuing_country}
                                                                                onChange={(val) => setFieldValue(`travel_documents[${index}].issuing_country`, val)}
                                                                            />
                                                                              {travelErrors.issuing_country && travelTouched.issuing_country ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.issuing_country}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Place Of Issue" />
                                                                            </Label>
                                                                         
                                                                            <CountryDropdown
                                                                                country={doc.issuing_country}
                                                                                className="form-control"
                                                                                value={doc.issuing_state}
                                                                                onChange={(val) => setFieldValue(`travel_documents[${index}].issuing_state`, val)} />
                                                                                   {travelErrors.issuing_state && travelTouched.issuing_state ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.issuing_state}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                </Row>
                                                                <Row>
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label className="d-block">
                                                                                <IntlMessages id="Date Of Issue" />
                                                                            </Label>
                                                                            <FormikDatePicker
                                                                                name={`travel_documents[${index}].issuing_date`}
                                                                                value={doc.issuing_date}
                                                                                onBlur={setFieldTouched}
                                                                                onChange={setFieldValue}
                                                                                maxDate={new Date()}
                                                                                dateFormat="dd/MM/yyyy"
                                                                            />
                                                                             {travelErrors.issuing_date && travelTouched.issuing_date ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.issuing_date}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx>
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label className="d-block">
                                                                                <IntlMessages id="Date Of Expiry" />
                                                                            </Label>
                                                                            <FormikDatePicker
                                                                                name={`travel_documents[${index}].expiry_date`}
                                                                                value={doc.expiry_date}
                                                                                onBlur={setFieldTouched}
                                                                                onChange={setFieldValue}
                                                                                minDate={new Date()}
                                                                                dateFormat="dd/MM/yyyy"
                                                                            />
                                                                            {travelErrors.expiry_date && travelTouched.expiry_date ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.expiry_date}
                                                                                        </div>
                                                                                    ) : null} 
                                                                        </FormGroup>
                                                                    </Colxx>
                                                                </Row>
                                                                <Row>
                                                                    <Colxx xxs="12">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>Address</Label>
                                                                            <Field
                                                                                className="form-control"
                                                                                name={`travel_documents[${index}].issuing_address`}
                                                                                component="textarea"
                                                                                value={doc.issuing_address}
                                                                            />
                                                                             {travelErrors.issuing_address && travelTouched.issuing_address ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.issuing_address}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx>
                                                                </Row>
                                                                <Row>
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Country" />
                                                                            </Label>                                                                     
                                                                            <CountryDropdown
                                                                                name={`travel_documents[${index}].country`}
                                                                                id="country"
                                                                                className="form-control"
                                                                                value={doc.country}
                                                                                onChange={(val) => setFieldValue(`travel_documents[${index}].country`, val)}
                                                                            />
                                                                             {travelErrors.country && travelTouched.country ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.country}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Place" />
                                                                            </Label>
                                                                           
                                                                            <RegionDropdown
                                                                                country={doc.country}
                                                                                className="form-control"
                                                                                value={doc.state}
                                                                                onChange={(val) => setFieldValue(`travel_documents[${index}].state`, val)} />
                                                                      {travelErrors.state && travelTouched.state ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.state}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                </Row>
                                                                <Row>

                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="City" />
                                                                            </Label>
                                                                            <Field className="form-control" value={doc.city} name={`travel_documents[${index}].city`} onChange={handleChange} />
                                                                            {travelErrors.city && travelTouched.city ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.city}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>
                                                                    </Colxx >
                                                                    <Colxx xxs="6">
                                                                        <FormGroup className="form-group has-float-label">
                                                                            <Label>
                                                                                <IntlMessages id="Pin Code / Zip Code" />
                                                                            </Label>
                                                                            <Field className="form-control" value={doc.pin_code} name={`travel_documents[${index}].pin_code`} />
                                                                            {travelErrors.pin_code && travelTouched.pin_code ? (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {travelErrors.pin_code}
                                                                                        </div>
                                                                                    ) : null}
                                                                        </FormGroup>

                                                                    </Colxx>
                                                         
                                                                        <Button className="mb-3" onClick={() => remove(index)}>Delete</Button>
                                                                </Row>


                                                            </Fragment>
                                                        )
                                                    })  : <Button className="btn-block" color="primary mb-3" onClick={() => push({})}>
                                                    Add Travel Documents<sup> +</sup>
                                                </Button>

                                                )


                                            }
                                        }


                                    </FieldArray>
                                   
                                <Button color="primary" type="submit" className="mt-3 mr-2">
                                    {isSubmitting ? "loading..." : "Save Changes"}
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
}

const mapStateToProps = ({ profileUser }) => {
    const { profile, loading } = profileUser;
    /* console.log("profile", profileUser) */

    return { profile, loading };

};

export default connect(mapStateToProps, { userProfileAction: UserProfile })(ProfileModal);




