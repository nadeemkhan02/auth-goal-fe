import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Joi from "joi-browser";
import _ from "lodash";
import "../SignUp/index.css";
import axios from "axios";
import { addUserAPIUrl, signInAPIUrl } from "../../utils/urls";
import { Navigate, useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isValidForm: false,
  });
  const [isformLoading, setIsFormLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    const FormData = { ...formData };
    FormData[name] = value;
    const { error } = validateForm(_.pick(FormData, ["email", "password"]));
    FormData.isValidForm = error ? false : true;
    setFormData(FormData);
  };

  const validateForm = (user) => {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { error } = validateForm(_.pick(formData, ["email", "password"]));
    if (!error) {
      setIsFormLoading(true);
      axios
        .post(signInAPIUrl, _.pick(formData, ["email", "password"]))
        .then((res) => {
          setIsFormLoading(false);
          localStorage.setItem("accesToke", res.headers["x-auth-token"]);
          setFormData({
            email: "",
            password: "",
            isValidForm: false,
          });
          navigate("/movies");
        })
        .catch((err) => {
          setIsFormLoading(false);
          console.log("error while SignIn!", err);
        })
        .finally(() => {
          setIsFormLoading(false);
        });
    } else {
      setFormData((preStat) => ({ ...preStat, isValidForm: false }));
    }
  };

  return (
    <div className="form-main-container">
      {" "}
      <div className="container mt-5 form-container ">
        <h1 className="mb-4">Sign In</h1>
        <form className="signup-form">
          <div className="email form-group form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="password form-group form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="submit form-group form-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitForm}
              disabled={!formData.isValidForm || isformLoading}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      I
    </div>
  );
};

export default SignIn;
