import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Joi from "joi-browser";
import _ from "lodash";
import "./index.css";
import axios from "axios";
import { addUserAPIUrl } from "../../utils/urls";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    name: "",
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
    const { error } = validateForm(
      _.pick(FormData, ["name", "email", "password"])
    );
    FormData.isValidForm = error ? false : true;
    setFormData(FormData);
  };

  const validateForm = (user) => {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { error } = validateForm(
      _.pick(formData, ["name", "email", "password"])
    );
    if (!error) {
      setIsFormLoading(true);
      axios
        .post(addUserAPIUrl, formData)
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            password: "",
            isValidForm: false,
          });
          setIsFormLoading(false);
          navigate("/signin");
        })
        .catch((err) => {
          setIsFormLoading(false);
          console.log("error while signup!", err);
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
      <div className="container mt-5 form-container ">
        <h1 className="mb-4">Sign Up</h1>
        <form className="signup-form">
          <div className="name form-group form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
