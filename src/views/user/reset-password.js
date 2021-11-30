import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { resetPassword } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';

const validateNewPassword = (values) => {
  const { new_password, new_password_again } = values;
  const errors = {};
  if (new_password_again === "" || new_password!== new_password_again) {
    errors.new_password_again = 'New Passwords do not match';
  }
  return errors;
};

const ResetPassword = ({
  location,
  history,
  loading,
  error,
  resetPasswordAction,
}) => {
  
  const [old_password] = useState('');
  const [new_password] = useState('');
  const [new_password_again] = useState('');

 

  const onResetPassword = (values) => {
     
    /*   const params = new URLSearchParams(location.search);
      const oobCode = params.get('oobCode');
      if (oobCode) { */
        /* console.log("values", values) */
        if (values.old_password !== '' && values.new_password !== '' && values.new_password_again!== '') {
          console.log(
          resetPasswordAction(
           values, history
          ));
        }
      
    
  };

  const initialValues = { old_password, new_password, new_password_again };
  

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your e-mail to reset your password. <br />
              If you are not a member, please{' '}
              <NavLink to="/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="Reset Password" />
            </CardTitle>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="Old Password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="old_password"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="New Password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="new_password"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="New Password Again" />
                    </Label>
                    <Field
                      className="form-control"
                      name="new_password_again"
                      type="password"
                    />
                    {errors.new_password_again && touched.new_password_again && (
                      <div className="invalid-feedback d-block">
                        {errors.new_password_again}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.reset-password-button" />
                      </span>
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
  resetPasswordAction: resetPassword,
  
})(ResetPassword);
