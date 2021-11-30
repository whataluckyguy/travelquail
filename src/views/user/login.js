import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
  /*  const [email] = useState('demo@gogo.com');
  const [password] = useState('gogo123'); */

  useEffect(() => {});

  const onUserLogin = (values) => {
    if (values.email !== "" && values.password !== "") {
      loginUserAction(values, history);
    }
  };

  const initialValues = { email: "", password: "" };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <NavLink to="/" className="black">
          <i
            className="iconsminds-left"
            style={{ fontSize: "35px", color: "black" }}
          ></i>
        </NavLink>
        <Card className="auth-card">
          <div className="position-relative image-side">
            <NavLink to="/" className="white">
              <img
                src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1632773361/Lucky/Full_logo_o4hybm.png"
                className="logo-single mx-auto"
                alt="TravelQuail"
              />
            </NavLink>
          </div>
          <div className="form-side">
            <p className="black mb-0 h3">Welcome back to TravelQuail</p>
            <p className="crendClass mb-2">
              Please use your credentials to Sign In.
            </p>

            <CardTitle className="mb-2">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-end align-items-center">
                    <Button
                      type="submit"
                      color="primary"
                      className="btn-shadow btn-multiple-state"
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>

                  <p className="crendClass mb-0 mt-2">
                    Forgot password?{" "}
                    <u>
                      <NavLink to="/user/forgot-password" className="black">
                        Click here
                      </NavLink>
                    </u>
                  </p>
                  <p className="crendClass">
                    Not a member of TravelQuail?{" "}
                    <u>
                      <NavLink to="/user/enquiry" className="black">
                        Enquire Now
                      </NavLink>
                    </u>
                  </p>
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
  const { loading } = authUser;

  return { loading };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
