import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const ForgotPassword = ({
  history,
  forgotUserMail,
  loading,
  error,
  forgotPasswordAction,
}) => {
  const [email] = useState("");

  const onForgotPassword = (values) => {
    if (values.email !== "") {
      forgotPasswordAction(values, history);
    }
  };

  const initialValues = { email };

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
          <div className="position-relative image-side ">
            <NavLink to="/" className="white">
              <img
                src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1632773361/Lucky/Full_logo_o4hybm.png"
                className="logo-single"
                alt="TravelQuail"
              />
            </NavLink>
            {/* <p className="text-white h2">MAGIC IS IN THE DETAILS</p> */}
          </div>
          <div className="form-side">
            <p className="black mb-0 h3">Welcome back to TravelQuail!</p>
            <p className="crendClass mb-2">
              Please use your registered email to reset your password.
            </p>
            <CardTitle className="mb-4">
              <IntlMessages id="FORGOT PASSWORD" />
            </CardTitle>
            <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
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

                  <div className="d-flex justify-content-between align-items-center">
                    {/* <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink> */}
                    <Button
                      type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? "" : ""
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
                  <p className="crendClass mt-2">
                    Not a member of TravelQuail?{" "}
                    <u>
                      {" "}
                      <NavLink to="/user/enquiry">Enquire Now</NavLink>
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPasswordAction: forgotPassword,
})(ForgotPassword);
