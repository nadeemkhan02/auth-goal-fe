import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NoPageFound from "../page/Home";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import MovieDetails from "../page/MovieDetails";
import Movies from "../page/Movies";
import Home from "../page/Home";

const App = (props) => {
  const isLogedIn = localStorage.getItem("accesToke");
  return (
    <div>
      {isLogedIn ? (
        <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/user-details/:id?" element={<MovieDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/user-details/:id?" element={<MovieDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
