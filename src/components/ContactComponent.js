import React from "react";
import { Button, Label, Col, Row } from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";

const required = (value) => value && value.length;
const maxLength = (len) => (value) => !value || value.length <= len;
const minLength = (len) => (value) => !value || value.length >= len;
const isNumber = (value) => !isNaN(Number(value));
function Contact(props) {
  function handleSubmit(values) {
    alert(JSON.stringify(values));
    props.resetFeedBackForm();
  }

  return (
    <div className="container">
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className="fa fa-phone"></i>: +852 1234 5678
            <br />
            <i className="fa fa-fax"></i>: +852 8765 4321
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>

      <div className="row row-content">
        <div className="col12">
          <h3>Send us your FeedBack</h3>
        </div>
        <div className="col12 col-md-9">
          <Form model="feedback" onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Label for="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".firstname"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(8),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".firstname"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "min 2 characters",
                    maxLength: "max 8 characters",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label for="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".lastname"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label for="telnum" md={2}>
                Telephone no.
              </Label>
              <Col md={10}>
                <Control.text
                  model=".telnum"
                  className="form-control"
                  id="telnum"
                  name="telnum"
                  placeholder="Telephone no."
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(8),
                    isNumber,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".telnum"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "min 2 numbers",
                    maxLength: "max 8 numbers",
                    isNumber: "only numbers allowed",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label for="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Control.text
                  model=".email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label check>
                    <Control.checkbox
                      model=".agree"
                      className="form-check-input"
                      name="agree"
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Control.select
                  model=".contactType"
                  className="form-control"
                  name="contactType"
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label for="message" md={2}>
                Your FeedBack
              </Label>
              <Col md={10}>
                <Control.textarea
                  model=".message"
                  className="form-control"
                  id="message"
                  name="message"
                  rows="12"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send FeedBack
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
