/* eslint no-param-reassign: "error" */
import React, { useEffect, useMemo } from 'react';
import { Link, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";

import { Formik, Form, Field, FieldArray } from 'formik';

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
import moment from 'moment';
import { NotificationManager } from '../../components/common/react-notifications';
import {API_URL} from "../../apiUrl"
import IntlMessages from '../../helpers/IntlMessages';

import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import products from '../../data/products';
import CustomTable from '../../containers/ui/ReactTableCards';
import { ProfileTable, ProfileDelete } from "../../redux/userProfile/actions";
import { getCurrentUser } from '../../helpers/Utils';
import { FormikReactSelect } from './FormikFields';
import { CustomSelect } from './customSelect';







const Profile = ({ ProfileTableAction, profileTable, ProfileDeleteAction }) => {
  const history = useHistory();

  const profileTableData = () => {
    let user_id = getCurrentUser().id
    if(getCurrentUser().roles=== 3 ||getCurrentUser().roles=== 2 )
     user_id = getCurrentUser().admin_id
    ProfileTableAction(user_id, history)
  }

  useEffect(() => {
    profileTableData()
  }, [])

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const payload = {
        ...values,
    };
    axios.post(`${API_URL}/user/register`,payload)
    .then((profile) => {
        console.log("profile", payload)
        if (profile.status === 200) {
  
            NotificationManager.success(profile.data.msg, 'Profile Updated', 3000, null, null, '');
  
        } else if (profile.status === 206) {
  
            NotificationManager.warning(profile.data.msg, 'Error in Updating Profile', 3000, null, null, '');
        }
    })
    .catch((error) => NotificationManager.warning(error, 'Update Error', 3000, null, null, ''));
    // alert(JSON.stringify(payload, null, 2));
  }

  const rolesoption = [
    { value: '2', label: 'Manager' },
    { value: '3', label: 'Employee'}
];
const profileoption=[]
console.log("profiletable",profileTable)

 profileTable.map(t => {
     return profileoption.push({user_id:t.user_id, id: t.id,value:t.id, label: `${t.first_name} ${t.middle_name} ${t.last_name}` })
    })
    console.log("profileoption",profileoption)

const initialValues = {
  profile_id: "",
  email :"",
  password:"",
}
return(
  <>
  <h4 className="d-flex justify-content-center mb-5">Manage Role</h4>
  <Formik
  initialValues={initialValues}
  // validationSchema={SignupSchema}
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
                                        
                                    <Form className="mx-auto mt-2 w-30 av-tooltip tooltip-label-bottom">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages  id="Profile" />
                                                    </Label>
                                                    <FormikReactSelect
                                                        name="profile_id"
                                                        id="profile_id"
                                                        value={profileoption.find(obj => obj.value === values.profile_id)}
                                                        options={profileoption}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                    />
                                                    </FormGroup>
                                                    {
                                                      profileTable.map(t=>{ 
                                                        if(t.id === values.profile_id)
                                                        {
                                                          values.name= `${t.first_name} ${t.middle_name} ${t.last_name}`
                                                           values.email = t.company_email
                                                           values.admin_id=t.user_id
                                                           values.mobile=t.company_number
                                                        }
                                                      
                                                      })   
                                                    }
                                                    {values.email!==""?
                                                     <FormGroup className="form-group has-float-label">
                                                     <Label>
                                                         <IntlMessages  id="Company E-Mail" />
                                                     </Label>
                                                   <Field
                                                   className="form-control"
                                                         name="email"
                                                         id="email"
                                                         value={values.email}
                                                        disabled
                                                     />
                                                   </FormGroup>:""
                                                    }
                                                    <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages  id="Select Roles" />
                                                    </Label>
                                                    <FormikReactSelect
                                                        name="roles"
                                                        id="roles"
                                                        value={rolesoption.find(obj => obj.value === values.roles)}
                                                        options={rolesoption}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                    />
                                                  </FormGroup>

                                                  <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages  id="Set Password" />
                                                    </Label>
                                                  <Field
                                                  className="form-control"
                                                        name="password"
                                                        id="password"
                                                        value={values.password}
                                                    />
                                                  </FormGroup>
                                                  <Button className="d-flex justify-content-center  mt-3" color="primary" type="submit"  /* disabled={values.dropzone?"disabled":""} */>
                                            Submit
                                        </Button>
                                                    </Form>
  )}
                                
  </Formik>
</>

  )

};

const mapStateToProps = ({ profileUser }) => {
  const { profileTable, loading } = profileUser;

  console.log("useeeee", profileTable)
  return { profileTable, loading };


};


export default connect(mapStateToProps, { ProfileTableAction: ProfileTable, ProfileDeleteAction: ProfileDelete })(Profile)
