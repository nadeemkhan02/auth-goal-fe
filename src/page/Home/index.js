import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const isLogedIn = localStorage.getItem("accesToke");
  return (
    <div>
      <h1>
        Home page: Authentication Status:{" "}
        {isLogedIn ? "Loged In" : "No Loged In"}
      </h1>
      <h1
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => {
          navigate("/movies");
        }}
      >
        Redirect to movies page
      </h1>
    </div>
  );
};

export default Home;
