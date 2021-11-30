import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import axios from "axios";
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from 'reactstrap';
import { NotificationManager } from '../../components/common/react-notifications';


import IntlMessages from '../../helpers/IntlMessages';
import {getCurrentUser} from '../../helpers/Utils';
import {API_URL} from "../../apiUrl"

const EditProfile =()=>{
  const initialValues = {
    editname: getCurrentUser().name,
    email :getCurrentUser().email,
    mobile: getCurrentUser().mobile,
    // role:getCurrentUser().roles,
}


// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//       .min(2, 'Too Short!')
//       .required('Please enter your name')
// });

const onSubmit = (values, { resetForm, setSubmitting }) => {
  console.log(values)
  const payload = {
      ...values,
  };
  axios.post(`${API_URL}/user/updatemyprofile`,payload)
  .then((profile) => {
      console.log("profile", payload)
      if (profile.status === 200) {

          NotificationManager.success(profile.data.msg, 'Profile Created', 3000, null, null, '');

      } else if (profile.status === 206) {

          NotificationManager.warning(profile.data.msg, 'Error in Creating Profile', 3000, null, null, '');
      }
  })
  .catch((error) => NotificationManager.warning(error, 'Update Error', 3000, null, null, ''));
  alert(JSON.stringify(payload, null, 2));
}
return(
<div>
<span >
                <img className="rounded mx-auto d-block" style={{width:"165px"}} alt="Profile" src="/assets/img/profiles/l-1.jpg" />
              </span>
              <Formik
              initialValues={initialValues}
              // validationSchema={SignupSchema}
              onSubmit={onSubmit}
              >
                {(

                  errors,
                touched
                )=>
                (
                  <Form className="av-tooltip tooltip-label-bottom mx-auto w-50">
                       <FormGroup className="form-group has-float-label mt-3">
                                                <IntlMessages id="Name"/>
                                            <Field className="form-control"
                                             name="editname" 
                                             style={{border:"none"}} />
                                            {errors.name && touched.name ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.name}
                                                </div>
                                            ) : null}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label ">
                                                <IntlMessages id="Email-Id"/>
                                            <Field className="form-control" name="email" style={{border:"none"}} disabled />
                                            {/* {errors.name && touched.name ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.name}
                                                </div>
                                            ) : null} */}
                                            </FormGroup>
                                            <FormGroup className="form-group has-float-label ">
                                                <IntlMessages id="Mobile"/>
                                            <Field className="form-control" name="mobile" style={{border:"none"}} />
                                            {/* {errors.name && touched.name ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.name}
                                                </div>
                                            ) : null} */}
                                            </FormGroup>
                                             {/* <FormGroup className="form-group has-float-label ">
                                                <IntlMessages id="Role"/>
                                            <Field className="form-control" name="role" style={{border:"none"}} disabled/>
                                            {errors.name && touched.name ? (
                                                <div className="invalid-feedback d-block">
                                                    {errors.name}
                                                </div>
                                            ) : null}
                                            </FormGroup> */}
                                            <Button className="mx-auto my-auto" color="primary" type="submit">Submit</Button>
                                             </Form>
                )}
              </Formik>
</div>

)}

const mapStateToProps = ({ authUser }) => {
    const { loading, error } = authUser;
    return { loading, error };
  };

export default EditProfile