import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Users from "../page/Users";
import NoPageFound from "../page/NoPageFound";
import UserDetails from "../page/UserDetails";

const App = (props) => {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/user-details/:id?" element={<UserDetails />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  );
};

export default App;
