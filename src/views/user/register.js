import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';


const Register = ({ history, registerUserAction }) => {
 

  const onUserRegister = (values) => {
    if (values.email !== '' && values.password !== '') {
      /* history.push(adminRoot); */
     /*  console.log("values", values, history) */
      registerUserAction(values, history)
     
    }
    
  };
  const initialValues = { name:"", mobile:"", email:"", password:""};
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
          <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            {/* <p className="text-white h2">MAGIC IS IN THE DETAILS</p> */}
           
          </div>
          <div className="form-side">
          <p className="black mb-0">
          <p className="black mb-0 h3">Welcome back to ArkPass!</p>
            </p>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
            {({ errors, touched , handleChange, values}) => (
            <Form className="av-tooltip tooltip-label-bottom">
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Field   className="form-control" type="name" name="name" value={values.name} />
              </FormGroup>
              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="Phone" />
                </Label>
                <Field className="form-control" type="number" name="mobile" value={values.mobile} />
              </FormGroup>


              <FormGroup  className="form-group has-float-label">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Field className="form-control" type="email" name="email" value={values.email} />
              </FormGroup>

              <FormGroup className="form-group has-float-label">
                <Label>
                  <IntlMessages id="user.password"  />
                </Label>
                <Field className="form-control" type="password" name="password" value={values.password}/>
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/user/login">
                  <span>Already have an Account?<u>Login</u> </span>
                </NavLink>
              </div>
              <div className="d-flex justify-content-end align-items-center">

                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  type="submit"
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
             )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => { 
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
