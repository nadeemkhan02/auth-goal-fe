import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const SignUp = (props) => {
  return (
    <div className="container mt-5 signup-container ">
      <h1 className="mb-4">Sign Up</h1>
      <form className="signup-form">
        <div className="name form-group form-group">
          <label htmlFor="name">Name:</label>
          <input type="name" id="name" className="form-control" name="name" />
        </div>
        <div className="email form-group form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
          />
        </div>
        <div className="password form-group form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
          />
        </div>
        <div className="submit form-group form-group">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              console.log("submitted");
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
