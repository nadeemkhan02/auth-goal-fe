import React from "react";
import { useNavigate } from "react-router-dom";

const NoPageFound = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        No data found page, Go to{" "}
        <span
          style={{ color: "blue", cursor:"pointer" }}
          onClick={() => {
            navigate("/users");
          }}
        >
          users
        </span>
        page
      </h1>
    </div>
  );
};

export default NoPageFound;
