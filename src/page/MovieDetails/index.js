import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieListApiUrl } from "../../utils/urls";

const MovieDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsUserDetailsLoading(true);
      axios
        .get(`${getMovieListApiUrl}/${id}`)
        .then((res) => {
          console.log(res, "success response");
          setUserData(res.data);
          setIsUserDetailsLoading(false);
        })
        .catch((err) => {
          navigate("/users");
          setIsUserDetailsLoading(false);
        });
    } else {
      navigate("/users");
    }
  }, []);

  return (
    <div >
      <h1>
        <span
          onClick={() => {
            navigate("/users");
          }}
          style={{ fontSize: "30px", cursor: "pointer" }}
        >
          &#8629;
        </span>
        This is movie details page
      </h1>
      {isUserDetailsLoading ? (
        <p>loading</p>
      ) : userData ? (
        <div className="userCard">
          <p className="name">Name: {userData?.name}</p>
          <p className="age">Age: {userData?.age}</p>
          <p className="city">City: {userData?.city}</p>
        </div>
      ) : (
        <p>No Data...</p>
      )}
    </div>
  );
};

export default MovieDetails;
