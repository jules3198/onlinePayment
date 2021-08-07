import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [societyName, setSocietyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeSocietyName = (e) => {
    const societyName = e.target.value;
    setSocietyName(societyName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeKbisFileName = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  
  const onChangeReversionaryCurrency = (e) => {
    const reversionaryCurrency = e.target.value;
    setReversionaryCurrency(reversionaryCurrency);
  };
  
  const onChangerediRectUrlCancellation = (e) => {
    const redirectUrlCancellation = e.target.value;
    setRedirectUrlCancellation(redirectUrlCancellation);
  };
  
  const onChangerediRectUrlConfirmation = (e) => {
    const redirectUrlConfirmation = e.target.value;
    setRedirectUrlConfirmation(redirectUrlConfirmation);
  };
  
  const onChangeAdress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };
  
  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(societyName, kbis_file_name, email, adress, phoneNumber, redirectUrlConfirmation, redirectUrlCancellation, reversionaryCurrency, password, confirmed="false").then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="societyName">Society name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="societyName"
                  value={societyName}
                  onChange={onChangeSocietyName}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="kbis_file_name">KBIS</label>
                <Input
                  type="text"
                  className="form-control"
                  name="kbis_file_name"
                  value={kbis_file_name}
                  onChange={onChangeKbisFileName}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAdress}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="redirectUrlConfirmation">redirectUrlConfirmation</label>
                <Input
                  type="text"
                  className="form-control"
                  name="redirectUrlConfirmation"
                  value={redirectUrlConfirmation}
                  onChange={onChangerediRectUrlConfirmation}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="redirectUrlCancellation">redirectUrlCancellation</label>
                <Input
                  type="text"
                  className="form-control"
                  name="redirectUrlCancellation"
                  value={redirectUrlCancellation}
                  onChange={onChangerediRectUrlCancellation}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reversionaryCurrency">Society name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="reversionaryCurrency"
                  value={reversionaryCurrency}
                  onChange={onChangeReversionaryCurrency}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;