import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";

import { Row, Card, CardTitle, FormGroup, Label, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { registerUser } from "../../redux/actions";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import "react-phone-number-input/style.css";
import { API_URL } from "../../apiUrl";
import { NotificationManager } from "../../components/common/react-notifications";

const Enquiry = ({ history, registerUserAction }) => {
  const [travelEnquiry, setTravelEnquiry] = useState("travelEnquiry");
  const enquiryOption = (e) => {
    setTravelEnquiry(e.target.value);
    console.log("travelEnquiry :", travelEnquiry);
  };
  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const payload = {
      ...values,
    };
    axios
      .post(`${API_URL}/enquiry`, payload)
      .then((profile) => {
        console.log("profile", payload);
        console.log("profile status>", profile.status);
        if (profile.status === 200) {
          NotificationManager.success(
            profile.data.msg,
            "We contact you as soon as possible",
            3000,
            null,
            null,
            ""
          );
        } else if (profile.status === 206) {
          NotificationManager.warning(
            profile.data.msg,
            "Please check the detail",
            3000,
            null,
            null,
            ""
          );
        }
      })
      .catch((error) =>
        NotificationManager.warning(error, "Update Error", 3000, null, null, "")
      );
    alert(JSON.stringify(payload, null, 2));
  };

  const initialValues = {
    phone: "",
    email: "",
    name_of_organisation: "",
    travel_requirements: "",
  };
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
          </div>
          <div className="form-side">
            <p className="black mb-0 h3">Welcome to TravelQuail!</p>
            <p className="crendClass mb-0">
              Please fill out the enquiry form and a member of the TravelQuail
              team will be in touch.
            </p>

            <CardTitle className="mt-2 mb-3 h6">
              <IntlMessages id="ENQUIRY FORM" />
            </CardTitle>
            <div
              className="travelChoice"
              style={{
                marginBottom: "2vh",
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                <input
                  type="radio"
                  name="travelEnquiry"
                  id="travelEnquiry"
                  value="travelEnquiry"
                  style={{ marginRight: "5px" }}
                  checked={travelEnquiry === "travelEnquiry"}
                  onChange={enquiryOption}
                />
                <label htmlFor="travelEnquiry">A Travel Booking</label>
              </span>
              <span>
                <input
                  type="radio"
                  name="travelEnquiry"
                  id="businessEnquiry"
                  value="businessEnquiry"
                  style={{ marginRight: "5px" }}
                  checked={travelEnquiry === "businessEnquiry"}
                  onChange={enquiryOption}
                />
                <label htmlFor="businessEnquiry">Travel Platform Enquiry</label>
              </span>
            </div>

            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ errors, touched, handleChange, setFieldValue, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.fullname" />
                    </Label>
                    <Field
                      className="form-control"
                      type="name"
                      name="full_name"
                      value={values.full_name}
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="Phone" />
                    </Label>
                    <PhoneInput
                      className="form-control"
                      name="phone"
                      value={values.phone}
                      onChange={(e) => setFieldValue("phone", e)}
                    />
                    {/* <Field className="form-control" type="number" name="mobile" value={values.mobile} /> */}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      value={values.email}
                    />
                  </FormGroup>

                  {travelEnquiry === "travelEnquiry" ? (
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Details of travel requirements" />
                      </Label>
                      <Field
                        className="form-control"
                        name="travel_requirements"
                        value={values.travel_requirements}
                      />
                    </FormGroup>
                  ) : (
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.organisation" />
                      </Label>
                      <Field
                        className="form-control"
                        name="name_of_organisation"
                        value={values.name_of_organisation}
                      />
                    </FormGroup>
                  )}

                  <div className="d-flex justify-content-end align-items-center">
                    <Button
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                      type="submit"
                    >
                      <IntlMessages id="SUBMIT ENQUIRY" />
                    </Button>
                  </div>
                  <p className="mt-2">
                    Already a member of TravelQuail?{" "}
                    <u>
                      {" "}
                      <a href="/user/login">Sign In</a>
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
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Enquiry);
