import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

function Contact(props) {
  const [touched, setTouched] = useState({ firstname: false, telnum: false });

  const handleBlur = (field) => (evt) => {
    setTouched({ ...touched, [field]: true });
  };

  const validate = () => {
    const errors = {
      firstname: "",
      telnum: "",
    };
    if (touched.firstname && firstname.length < 3) {
      errors.firstname = "Name can't be less than 3 characters";
    }
    const reg = /^\d+$/;
    if (touched.telnum && !reg.test(telnum)) {
      errors.telnum = "Telephone can be only of type numeric";
    }

    return errors;
  };

  const {
    value: firstname,
    bind: bindfirstname,
    reset: resetfirstname,
  } = useInput("");

  const {
    value: lastname,
    bind: bindlastname,
    reset: resetlastname,
  } = useInput("");

  const { value: email, bind: bindemail, reset: resetemail } = useInput("");
  const { value: telnum, bind: bindtelnum, reset: resettelnum } = useInput("");
  const { value: agree, bind: bindagree, reset: resetagree } = useInput(false);
  const {
    value: firstcontactType,
    bind: bindcontactType,
    reset: resetcontactType,
  } = useInput("Tel.");
  const { value: message, bind: bindmessage, reset: resetmessage } = useInput(
    ""
  );

  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [telnum, setTelnum] = useState("");
  // const [email, setEmail] = useState("");
  // const [agree, setAgree] = useState(false);
  // const [contactType, setContactType] = useState("Tel.");
  // const [message, setMessage] = useState("");

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
  }
  function handleSubmit(event) {
    alert(JSON.stringify(firstname));
    event.preventDefault();
    resetfirstname();
  }
  const errors = validate();
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
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  onBlur={handleBlur("firstname")}
                  invalid={errors.firstname !== ""}
                  valid={touched.firstname && errors.firstname === ""}
                  {...bindfirstname}
                />
                <FormFeedback>{errors.firstname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  {...bindlastname}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="telnum" md={2}>
                Telephone no.
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="telnum"
                  invalid={errors.telnum !== ""}
                  valid={touched.telnum && errors.telnum === ""}
                  name="telnum"
                  placeholder="Telephone no."
                  onBlur={handleBlur("telnum")}
                  {...bindtelnum}
                />
                <FormFeedback>{errors.telnum}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  {...bindemail}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="agree" {...bindagree} />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Input type="select" name="contactType" {...bindcontactType}>
                  <option>Tel.</option>
                  <option>Email</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="message" md={2}>
                Your FeedBack
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  id="message"
                  name="message"
                  rows="12"
                  {...bindmessage}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send FeedBack
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
