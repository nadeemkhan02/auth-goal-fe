import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteMovieAPIUrl, getMovieListApiUrl } from "../../utils/urls";
import { useNavigate } from "react-router-dom";

const Movies = (props) => {
  const [movieListData, setMovieListData] = useState([]);
  const [isListDataLoading, setIsListDataLoading] = useState(false);
  const [isDeleteListDataLoading, setIsDeleteListDataLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieData();
  }, []);

  const getMovieData = () => {
    setIsListDataLoading(true);
    axios
      .get(getMovieListApiUrl)
      .then((res) => {
        setMovieListData(res.data);
        setIsListDataLoading(false);
      })
      .catch((err) => {
        console.log(err, "error result");
        setIsListDataLoading(false);
      })
      .finally(() => {
        setIsListDataLoading(false);
      });
  };

  const handleEdit = () => {
    // Function to handle Edit action
    console.log("Edit clicked");
  };

  const handleDelete = (id) => {
    setIsDeleteListDataLoading(true);
    axios
      .delete(`${deleteMovieAPIUrl}/${id}`)
      .then((res) => {
        setIsDeleteListDataLoading(false);
        getMovieData();
      })
      .catch((err) => {
        setIsDeleteListDataLoading(false);
        console.log(err, "error while deleting user!");
      })
      .finally(() => {
        setIsDeleteListDataLoading(false);
      });
  };

  return (
    <div>
      <div className="headingContainer">
        <h2>Movies List</h2>
        <button onClick={getMovieData}>Refresh Data</button>
      </div>
      {isListDataLoading ? (
        <p className="loading-list">Loading...</p>
      ) : movieListData?.length > 0 ? (
        <div className="tableWrap">
          <table className="userTable">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Imbd Rating</th>
                <th>Genre</th>
                <th>Director</th>
                <th>Releas Year</th>
                <th>Sequel</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="user-list-table-body">
              {movieListData.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/movie-details/${item?.id}`);
                    }}
                  >
                    {item?.movie_name}
                  </td>
                  <td>{item?.imdb_rating}</td>
                  <td>{item?.genre}</td>
                  <td>{item?.director}</td>
                  <td>{item?.release_year}</td>
                  <td>{item?.sequel ? "Yes" : "No"}</td>
                  <td className="actions">
                    <button onClick={handleEdit}>Edit</button>
                    <button
                      className="delete"
                      onClick={() => {
                        handleDelete(item?.id);
                      }}
                      disabled={isDeleteListDataLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>No User Data</>
      )}
    </div>
  );
};

export default Movies;
